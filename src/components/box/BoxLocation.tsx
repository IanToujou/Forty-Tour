import { LucideMapPin } from "lucide-react";
import { BoxLocationProps } from "@/types/props/box/BoxLocationProps";

export const BoxLocation = (props: BoxLocationProps) => {
    return (
        <div className="flex gap-x-3 rounded-xl bg-white px-4 py-2.5">
            <LucideMapPin className="text-primary-medium" />
            <p className="font-manrope font-semibold text-black">{props.name}</p>
        </div>
    );
};
