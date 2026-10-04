import { TourNode } from "@/lib/getTourNodes";

export type BoxMapProps = {
    x: number;
    y: number;
    zoom?: number;
    nodes?: TourNode[];
    onNodeClick?: (node: TourNode) => void;
};
