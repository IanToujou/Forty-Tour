import { BoxMapProps } from "@/types/props/box/BoxMapProps";
import { useEffect, useRef, useState } from "react";
import { SvgMap } from "@/components/svg/SvgMap";

export const BoxMap = (props: BoxMapProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const zoom = props.zoom ?? 2;
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const translateX = size.width / 2 - props.x * zoom;
    const translateY = size.height / 2 - props.y * zoom;

    return (
        <div ref={containerRef} className="bg-neutral-darker border-neutral-medium relative h-48 w-82 overflow-hidden rounded-2xl border-3">
            <div
                className="absolute top-0 left-0 transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translate(${translateX}px, ${translateY}px) scale(${zoom})`,
                    transformOrigin: "0 0",
                }}
            >
                <SvgMap />
            </div>

            <div className="bg-primary-medium absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        </div>
    );
};
