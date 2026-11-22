import { LucideIcon } from "lucide-react";

export type InputIconButtonProps = {
    className?: string;
    icon: LucideIcon;
    label?: string;
    onClick?: () => void;
    onPointerDown?: () => void;
};
