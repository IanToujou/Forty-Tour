import { FooterLinkProps } from "@/types/props/common/footer/FooterLinkProps";
import Link from "next/link";

export const FooterLink = (props: FooterLinkProps) => {
    return (
        <Link href={props.href} className="group text-neutral-medium relative inline-block w-fit text-sm font-medium">
            {props.title}
            <span className="bg-neutral-medium absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </Link>
    );
};
