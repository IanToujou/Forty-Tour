import { HeaderCompany } from "@/components/common/header/HeaderCompany";
import { HeaderLanguage } from "@/components/common/header/HeaderLanguage";
import { HeaderProps } from "@/types/props/common/header/HeaderProps";

export const Header = (props: HeaderProps) => {
    return (
        <header
            className="absolute z-50 flex w-full items-center justify-between py-3 pr-4 pl-6 lg:px-8"
            style={{ backgroundColor: props.fillBackground ? "var(--color-neutral-dark)" : "transparent" }}
        >
            <HeaderCompany />
            <HeaderLanguage />
        </header>
    );
};
