import { BoxMapProps } from "@/types/props/box/BoxMapProps";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SvgMap } from "@/components/svg/SvgMap";
import { animate, motion, useMotionValue } from "framer-motion";

const COLLAPSED = { width: 328, height: 192 };
const EXPANDED = { width: 450, height: 300 };
const PADDING = 80;

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

export const BoxMap = (props: BoxMapProps) => {
    const [hovered, setHovered] = useState(false);
    const [mapSize, setMapSize] = useState({ width: 0, height: 0 });

    const layerRef = useRef<HTMLDivElement>(null);
    const insideRef = useRef(false);
    const draggingRef = useRef(false);
    const initializedRef = useRef(false);
    const lastView = useRef({ ...COLLAPSED, zoom: props.zoom ?? 2 });

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const baseZoom = props.zoom ?? 2;
    const zoom = hovered ? baseZoom * 1.25 : baseZoom;
    const size = hovered ? EXPANDED : COLLAPSED;

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
    }, [props.x, props.y, mapSize.width, mapSize.height]);

    useEffect(() => {
        const prev = lastView.current;
        if (!initializedRef.current || (prev.width === size.width && prev.zoom === zoom)) return;
        const centerX = (prev.width / 2 - x.get()) / prev.zoom;
        const centerY = (prev.height / 2 - y.get()) / prev.zoom;
        animate(x, clampAxis(size.width / 2 - centerX * zoom, size.width, mapSize.width * zoom), transition);
        animate(y, clampAxis(size.height / 2 - centerY * zoom, size.height, mapSize.height * zoom), transition);
        lastView.current = { ...size, zoom };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size.width, size.height, zoom]);

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
                style={{ x, y, transformOrigin: "0 0" }}
                initial={false}
                animate={{ scale: zoom }}
                transition={transition}
                drag
                dragMomentum={false}
                dragElastic={0}
                dragConstraints={{ left: bx.min, right: bx.max, top: by.min, bottom: by.max }}
                onDragStart={() => {
                    draggingRef.current = true;
                }}
                onDragEnd={() => {
                    draggingRef.current = false;
                    if (!insideRef.current) setHovered(false);
                }}
            >
                <SvgMap />
                <div className="pointer-events-none absolute" style={{ left: props.x, top: props.y }}>
                    <motion.div
                        className="bg-primary-medium absolute -top-1 -left-1 size-2 rounded-full"
                        initial={false}
                        animate={{ scale: 1 / zoom }}
                        transition={transition}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};
