import { HeaderCompany } from "@/components/common/header/HeaderCompany";
import { HeaderLanguage } from "@/components/common/header/HeaderLanguage";

export const Header = () => {
    return (
        <header className="absolute flex w-full items-center justify-between px-8 py-3">
            <HeaderCompany />
            <HeaderLanguage />
        </header>
    );
};
