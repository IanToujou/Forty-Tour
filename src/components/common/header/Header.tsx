import { HeaderCompany } from "@/components/common/header/HeaderCompany";
import { HeaderLanguage } from "@/components/common/header/HeaderLanguage";
import { HeaderProps } from "@/types/props/common/header/HeaderProps";

export const Header = (props: HeaderProps) => {
    return (
        <header
            className="absolute flex w-full items-center justify-between px-8 py-3"
            style={{ backgroundColor: props.fillBackground ? "var(--color-neutral-dark)" : "transparent" }}
        >
            <HeaderCompany />
            <HeaderLanguage />
        </header>
    );
};
