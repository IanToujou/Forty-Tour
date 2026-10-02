import { BoxTooltipProps } from "@/types/props/box/BoxTooltipProps";
import { LucideChevronRight } from "lucide-react";

export const BoxTooltip = (props: BoxTooltipProps) => (
    <div className="flex w-84 items-center gap-4 rounded-xl bg-white px-4 pt-3 pb-4">
        <div className="text-primary-medium flex size-9 items-center justify-center rounded-full">
            <props.icon strokeWidth={2} />
        </div>
        <div className="font-manrope">
            <p className="text-lg font-bold text-black">{props.title}</p>
            <p className="text-neutral-darker mt-1 font-medium">{props.description}</p>
            {props.clickable && (
                <div className="text-secondary-darker mt-2 flex items-center gap-x-1 font-semibold">
                    <p>{props.clickLabel}</p>
                    <LucideChevronRight size={20} />
                </div>
            )}
        </div>
    </div>
);