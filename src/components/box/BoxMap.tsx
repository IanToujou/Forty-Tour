import { BoxMapProps } from "@/types/props/box/BoxMapProps";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SvgMap } from "@/components/svg/SvgMap";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

const CONE_RADIUS = 36;
const CONE_HALF_ANGLE = 30;
const MAP_NORTH_OFFSET = 90;

const COLLAPSED = { width: 328, height: 192 };
const EXPANDED = { width: 590, height: 345 };
const HIDDEN_NODES = [/^community_/];
const PADDING = 120;

const transition = { type: "spring", stiffness: 260, damping: 30 } as const;
const isHidden = (id: string) => HIDDEN_NODES.some((re) => re.test(id));

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

export const BoxMap = (props: BoxMapProps) => {
    const [hovered, setHovered] = useState(false);
    const [mapSize, setMapSize] = useState({ width: 0, height: 0 });

    const layerRef = useRef<HTMLDivElement>(null);
    const insideRef = useRef(false);
    const draggingRef = useRef(false);
    const draggedRef = useRef(false);
    const initializedRef = useRef(false);

    const zoom = props.zoom ?? 2;

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useMotionValue(zoom);
    const markerScale = useTransform(scale, (s) => 1 / s);
    const rotation = useMotionValue(0);

    const size = hovered ? EXPANDED : COLLAPSED;
    const lastSize = useRef(COLLAPSED);

    const coneRad = (CONE_HALF_ANGLE * Math.PI) / 180;
    const coneX = Math.sin(coneRad) * CONE_RADIUS;
    const coneY = Math.cos(coneRad) * CONE_RADIUS;
    const CONE_PATH = `M ${CONE_RADIUS} ${CONE_RADIUS} L ${CONE_RADIUS - coneX} ${CONE_RADIUS - coneY} A ${CONE_RADIUS} ${CONE_RADIUS} 0 0 1 ${CONE_RADIUS + coneX} ${CONE_RADIUS - coneY} Z`;

    useEffect(() => {
        rotation.set(((props.yaw ?? 0) * 180) / Math.PI + MAP_NORTH_OFFSET);
    }, [props.yaw, rotation]);

    useEffect(() => {
        animate(scale, zoom, transition);
    }, [zoom, scale]);

    useLayoutEffect(() => {
        const el = layerRef.current;
        if (!el) return;

        const update = () =>
            setMapSize((prev) =>
                prev.width === el.offsetWidth && prev.height === el.offsetHeight ? prev : { width: el.offsetWidth, height: el.offsetHeight }
            );

        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!mapSize.width) return;

        const targetX = clampAxis(size.width / 2 - props.x * zoom, size.width, mapSize.width * zoom);
        const targetY = clampAxis(size.height / 2 - props.y * zoom, size.height, mapSize.height * zoom);

        if (!initializedRef.current) {
            x.set(targetX);
            y.set(targetY);
            initializedRef.current = true;
        } else {
            animate(x, targetX, transition);
            animate(y, targetY, transition);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.x, props.y, zoom, mapSize.width, mapSize.height]);

    useEffect(() => {
        const prev = lastSize.current;
        if (!initializedRef.current || (prev.width === size.width && prev.height === size.height)) return;

        const centerX = (prev.width / 2 - x.get()) / zoom;
        const centerY = (prev.height / 2 - y.get()) / zoom;

        animate(x, clampAxis(size.width / 2 - centerX * zoom, size.width, mapSize.width * zoom), transition);
        animate(y, clampAxis(size.height / 2 - centerY * zoom, size.height, mapSize.height * zoom), transition);

        lastSize.current = size;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size.width, size.height]);

    const bx = axisBounds(size.width, mapSize.width * zoom);
    const by = axisBounds(size.height, mapSize.height * zoom);

    return (
        <motion.div
            onHoverStart={() => {
                insideRef.current = true;
                setHovered(true);
            }}
            onHoverEnd={() => {
                insideRef.current = false;
                if (!draggingRef.current) setHovered(false);
            }}
            initial={false}
            animate={{ width: size.width, height: size.height }}
            transition={transition}
            className="bg-neutral-darker border-neutral-medium relative overflow-hidden rounded-2xl border-3"
        >
            <motion.div
                ref={layerRef}
                className="absolute top-0 left-0 cursor-grab touch-none select-none active:cursor-grabbing"
                style={{ x, y, scale, transformOrigin: "0 0" }}
                drag
                dragMomentum={false}
                dragElastic={0}
                dragConstraints={{ left: bx.min, right: bx.max, top: by.min, bottom: by.max }}
                onDragStart={() => {
                    draggingRef.current = true;
                    draggedRef.current = true;
                }}
                onDragEnd={() => {
                    draggingRef.current = false;
                    setTimeout(() => {
                        draggedRef.current = false;
                    }, 0);
                    if (!insideRef.current) setHovered(false);
                }}
            >
                <SvgMap />
                {props.nodes?.map((node) => {
                    if (!node.mapPosition || isHidden(node.id)) return null;
                    const isCurrent = node.mapPosition.x === props.x && node.mapPosition.y === props.y;

                    return (
                        <div key={node.id} className="absolute" style={{ left: node.mapPosition.x, top: node.mapPosition.y }}>
                            <motion.button
                                type="button"
                                aria-label={node.name}
                                title={node.name}
                                className="group absolute -top-2 -left-2 grid size-6 cursor-pointer place-items-center rounded-full"
                                style={{ scale: markerScale }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (draggedRef.current || isCurrent) return;
                                    props.onNodeClick?.(node);
                                }}
                            >
                                <motion.span className="size-2 rounded-full bg-white/50 duration-200 group-hover:scale-150" />
                            </motion.button>
                        </div>
                    );
                })}
                <div className="pointer-events-none absolute" style={{ left: props.x, top: props.y }}>
                    <motion.div
                        className="absolute"
                        style={{
                            width: CONE_RADIUS * 2,
                            height: CONE_RADIUS * 2,
                            top: -CONE_RADIUS,
                            left: -CONE_RADIUS,
                            scale: markerScale,
                        }}
                    >
                        <motion.svg
                            width={CONE_RADIUS * 2}
                            height={CONE_RADIUS * 2}
                            viewBox={`0 0 ${CONE_RADIUS * 2} ${CONE_RADIUS * 2}`}
                            style={{ rotate: rotation }}
                            className="text-primary-medium overflow-visible"
                        >
                            <defs>
                                <radialGradient
                                    id="box-map-cone"
                                    gradientUnits="userSpaceOnUse"
                                    cx={CONE_RADIUS}
                                    cy={CONE_RADIUS}
                                    r={CONE_RADIUS}
                                >
                                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
                                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                                </radialGradient>
                            </defs>
                            <path d={CONE_PATH} fill="url(#box-map-cone)" />
                        </motion.svg>
                    </motion.div>
                    <motion.div
                        className="bg-primary-medium absolute -top-1.5 -left-1.5 size-3 rounded-full ring-2 ring-white"
                        style={{ scale: markerScale }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};
