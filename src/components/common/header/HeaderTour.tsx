import { HeaderLanguage } from "@/components/common/header/HeaderLanguage";
import { LucideX } from "lucide-react";
import Link from "next/link";

export const HeaderTour = () => {
    return (
        <header className="absolute flex w-full items-center justify-between px-8 py-3">
            <Link href="/" className="flex items-center justify-center rounded-full bg-white p-2 duration-200 hover:scale-110">
                <LucideX />
            </Link>
            <HeaderLanguage />
        </header>
    );
};
