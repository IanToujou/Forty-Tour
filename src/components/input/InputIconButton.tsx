import { InputIconButtonProps } from "@/types/props/input/InputIconButtonProps";

export const InputIconButton = (props: InputIconButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            title={props.label}
            aria-label={props.label}
            onPointerDown={props.onPointerDown}
            className={`flex aspect-square cursor-pointer items-center justify-center rounded-full bg-white p-2 duration-200 hover:scale-110 active:scale-95 ${props.className}`}
        >
            <props.icon />
        </button>
    );
};
