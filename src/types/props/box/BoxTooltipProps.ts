import { LucideIcon } from "lucide-react";

export type BoxTooltipProps = {
    title: string;
    description: string;
    icon: LucideIcon;
    clickable?: boolean;
    clickLabel?: string;
};
