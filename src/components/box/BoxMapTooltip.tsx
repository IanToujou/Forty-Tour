import { BoxMapTooltipProps } from "@/types/props/box/BoxMapTooltipProps";
import Image from "next/image";

export const BoxMapTooltip = (props: BoxMapTooltipProps) => (
    <div className="w-84 overflow-hidden rounded-xl bg-white">
        {props.imageUrl && (
            <div className="bg-neutral-lighter relative aspect-video w-full">
                <Image src={props.imageUrl} alt={props.title} fill sizes="336px" className="object-cover" />
            </div>
        )}
        <div className="font-manrope px-4 pt-3 pb-4">
            <p className="text-lg font-bold text-black">{props.title}</p>
        </div>
    </div>
);
