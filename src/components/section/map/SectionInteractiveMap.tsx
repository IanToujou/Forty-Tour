import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useTranslation } from "react-i18next";
import { SvgMap } from "@/components/svg/SvgMap";
import { TourNode } from "@/lib/getTourNodes";

export type SectionInteractiveMapProps = {
    nodes?: TourNode[];
};

const PADDING = 800;
// Zoom levels are relative to "fit" (1 = the whole map exactly fits the screen)
const MIN_ZOOM = 0.4;
const INITIAL_ZOOM = 0.7;
const MAX_ZOOM = 6;
const ZOOM_STEP = 1.6;
const DRAG_THRESHOLD = 4;
const HIDDEN_NODES = [/^community_/];

const isHidden = (id: string) => HIDDEN_NODES.some((re) => re.test(id));

const transition = { type: "spring", stiffness: 260, damping: 30 } as const;

const axisBounds = (viewLen: number, contentLen: number) => {
    if (contentLen + PADDING * 2 <= viewLen) {
        const pos = (viewLen - contentLen) / 2;
        return { min: pos, max: pos };
    }
    return { min: viewLen - contentLen - PADDING, max: PADDING };
};

const clampAxis = (value: number, viewLen: number, contentLen: number) => {
    const { min, max } = axisBounds(viewLen, contentLen);
    return Math.min(max, Math.max(min, value));
};

type Point = { x: number; y: number };

export const SectionInteractiveMap = (props: SectionInteractiveMapProps) => {
    const { t } = useTranslation(["map"]);

    const [ready, setReady] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const layerRef = useRef<HTMLDivElement>(null);

    const viewRef = useRef({ w: 0, h: 0 });
    const mapRef = useRef({ w: 0, h: 0 });
    const initializedRef = useRef(false);

    const pointersRef = useRef(new Map<number, Point>());
    const startRef = useRef<Point>({ x: 0, y: 0 });
    const pinchRef = useRef<{ dist: number; cx: number; cy: number } | null>(null);
    const draggedRef = useRef(false);
    const animationsRef = useRef<{ stop: () => void }[]>([]);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useMotionValue(1);
    const markerScale = useTransform(scale, (s) => 1 / s);

    const getFitScale = useCallback(() => {
        const { w, h } = viewRef.current;
        const map = mapRef.current;
        return Math.min(w / map.w, h / map.h);
    }, []);

    const clampScale = useCallback(
        (value: number) => {
            const fit = getFitScale();
            return Math.min(fit * MAX_ZOOM, Math.max(fit * MIN_ZOOM, value));
        },
        [getFitScale]
    );

    const clampPosition = useCallback((nx: number, ny: number, s: number): Point => {
        const { w, h } = viewRef.current;
        const map = mapRef.current;
        return { x: clampAxis(nx, w, map.w * s), y: clampAxis(ny, h, map.h * s) };
    }, []);

    const stopAnimations = useCallback(() => {
        animationsRef.current.forEach((a) => a.stop());
        animationsRef.current = [];
    }, []);

    const zoomAt = useCallback(
        (cx: number, cy: number, nextScale: number) => {
            const s = scale.get();
            const ns = clampScale(nextScale);
            const ratio = ns / s;
            const pos = clampPosition(cx - (cx - x.get()) * ratio, cy - (cy - y.get()) * ratio, ns);
            scale.set(ns);
            x.set(pos.x);
            y.set(pos.y);
        },
        [clampPosition, clampScale, scale, x, y]
    );

    const panBy = useCallback(
        (dx: number, dy: number) => {
            const pos = clampPosition(x.get() + dx, y.get() + dy, scale.get());
            x.set(pos.x);
            y.set(pos.y);
        },
        [clampPosition, scale, x, y]
    );

    const animateTo = useCallback(
        (ns: number, nx: number, ny: number) => {
            stopAnimations();
            animationsRef.current = [animate(scale, ns, transition), animate(x, nx, transition), animate(y, ny, transition)];
        },
        [scale, stopAnimations, x, y]
    );

    const zoomBy = useCallback(
        (factor: number) => {
            const { w, h } = viewRef.current;
            const cx = w / 2;
            const cy = h / 2;
            const s = scale.get();
            const ns = clampScale(s * factor);
            const ratio = ns / s;
            const pos = clampPosition(cx - (cx - x.get()) * ratio, cy - (cy - y.get()) * ratio, ns);
            animateTo(ns, pos.x, pos.y);
        },
        [animateTo, clampPosition, clampScale, scale, x, y]
    );

    const resetView = useCallback(() => {
        const { w, h } = viewRef.current;
        const map = mapRef.current;
        const s = getFitScale() * INITIAL_ZOOM;
        const pos = clampPosition((w - map.w * s) / 2, (h - map.h * s) / 2, s);
        animateTo(s, pos.x, pos.y);
    }, [animateTo, clampPosition, getFitScale]);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const layer = layerRef.current;
        if (!container || !layer) return;

        const update = () => {
            viewRef.current = { w: container.clientWidth, h: container.clientHeight };
            mapRef.current = { w: layer.offsetWidth, h: layer.offsetHeight };

            const { w, h } = viewRef.current;
            const map = mapRef.current;
            if (!w || !h || !map.w || !map.h) return;

            if (!initializedRef.current) {
                const s = getFitScale() * INITIAL_ZOOM;
                const pos = clampPosition((w - map.w * s) / 2, (h - map.h * s) / 2, s);
                scale.set(s);
                x.set(pos.x);
                y.set(pos.y);
                initializedRef.current = true;
                setReady(true);
                return;
            }

            const s = clampScale(scale.get());
            const pos = clampPosition(x.get(), y.get(), s);
            scale.set(s);
            x.set(pos.x);
            y.set(pos.y);
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(container);
        observer.observe(layer);
        return () => observer.disconnect();
    }, [clampPosition, clampScale, getFitScale, scale, x, y]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            stopAnimations();

            const rect = container.getBoundingClientRect();
            const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
            const speed = e.ctrlKey ? 0.01 : 0.0015;
            zoomAt(e.clientX - rect.left, e.clientY - rect.top, scale.get() * Math.exp(-delta * speed));
        };

        container.addEventListener("wheel", onWheel, { passive: false });
        return () => container.removeEventListener("wheel", onWheel);
    }, [scale, stopAnimations, zoomAt]);

    useEffect(() => stopAnimations, [stopAnimations]);

    const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
        stopAnimations();
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (pointersRef.current.size === 1) {
            startRef.current = { x: e.clientX, y: e.clientY };
            draggedRef.current = false;
        } else if (pointersRef.current.size === 2) {
            const [a, b] = [...pointersRef.current.values()];
            pinchRef.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
            draggedRef.current = true;
        }
    };

    const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        const prev = pointersRef.current.get(e.pointerId);
        if (!prev) return;

        const current = { x: e.clientX, y: e.clientY };
        pointersRef.current.set(e.pointerId, current);

        if (pointersRef.current.size >= 2 && pinchRef.current) {
            const [a, b] = [...pointersRef.current.values()];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            const cx = (a.x + b.x) / 2;
            const cy = (a.y + b.y) / 2;
            const rect = e.currentTarget.getBoundingClientRect();

            if (pinchRef.current.dist > 0) {
                zoomAt(cx - rect.left, cy - rect.top, (scale.get() * dist) / pinchRef.current.dist);
            }
            panBy(cx - pinchRef.current.cx, cy - pinchRef.current.cy);
            pinchRef.current = { dist, cx, cy };
            return;
        }

        if (!draggedRef.current) {
            if (Math.hypot(current.x - startRef.current.x, current.y - startRef.current.y) < DRAG_THRESHOLD) return;
            draggedRef.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
        }

        panBy(current.x - prev.x, current.y - prev.y);
    };

    const onPointerEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
        pointersRef.current.delete(e.pointerId);
        if (pointersRef.current.size < 2) pinchRef.current = null;
        if (pointersRef.current.size === 0) {
            setTimeout(() => {
                draggedRef.current = false;
            }, 0);
        }
    };

    const handleNodeClick = (node: TourNode) => {
        // TODO: implement what happens when a node is clicked
        console.log("Node clicked:", node.id, node.name);
    };

    const handleNodeHover = (node: TourNode | null) => {
        // TODO: implement what happens when a node is hovered (node is null when the pointer leaves)
        console.log("Node hovered:", node ? `${node.id} ${node.name}` : null);
    };

    return (
        <section className="bg-neutral-darker relative h-screen w-full overflow-hidden">
            <div
                ref={containerRef}
                className="absolute inset-0 cursor-grab touch-none select-none active:cursor-grabbing"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerEnd}
                onPointerCancel={onPointerEnd}
            >
                <motion.div
                    ref={layerRef}
                    className="absolute top-0 left-0"
                    initial={false}
                    animate={{ opacity: ready ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ x, y, scale, transformOrigin: "0 0" }}
                >
                    <SvgMap />
                    {props.nodes?.map((node) => {
                        if (!node.mapPosition || isHidden(node.id)) return null;

                        return (
                            <div key={node.id} className="absolute" style={{ left: node.mapPosition.x, top: node.mapPosition.y }}>
                                <motion.button
                                    type="button"
                                    aria-label={node.name}
                                    className="group absolute -top-2 -left-2 grid size-6 cursor-pointer place-items-center rounded-full"
                                    style={{ scale: markerScale }}
                                    onPointerEnter={() => handleNodeHover(node)}
                                    onPointerLeave={() => handleNodeHover(null)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (draggedRef.current) return;
                                        handleNodeClick(node);
                                    }}
                                >
                                    <span className="group-hover:bg-primary-medium size-2.5 rounded-full bg-white/70 ring-2 ring-white/20 duration-200 group-hover:scale-150" />
                                </motion.button>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            <div className="absolute right-6 bottom-6 flex flex-col gap-y-2 md:right-10 md:bottom-10">
                <MapControlButton label={t("map:controls.zoomIn")} onClick={() => zoomBy(ZOOM_STEP)}>
                    <path d="M12 5v14M5 12h14" />
                </MapControlButton>
                <MapControlButton label={t("map:controls.zoomOut")} onClick={() => zoomBy(1 / ZOOM_STEP)}>
                    <path d="M5 12h14" />
                </MapControlButton>
                <MapControlButton label={t("map:controls.reset")} onClick={resetView}>
                    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                </MapControlButton>
            </div>
        </section>
    );
};

type MapControlButtonProps = {
    label: string;
    onClick: () => void;
    children: ReactNode;
};

const MapControlButton = (props: MapControlButtonProps) => (
    <button
        type="button"
        aria-label={props.label}
        title={props.label}
        onClick={props.onClick}
        onPointerDown={(e) => e.stopPropagation()}
        className="bg-neutral-darker/90 border-neutral-medium hover:bg-primary-medium grid size-11 cursor-pointer place-items-center rounded-full border-2 text-white duration-200"
    >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {props.children}
        </svg>
    </button>
);
