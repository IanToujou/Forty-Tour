import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { PopupProps } from "@/types/props/popup/PopupProps";
import { FC } from "react";
import { LucideCheck } from "lucide-react";
import { GB, FR, DE } from "country-flag-icons/react/3x2";

const languages: { locale: string; Flag: FC<{ height: number }>; label: string }[] = [
    { locale: "en", Flag: GB, label: "locale.en" },
    { locale: "de", Flag: DE, label: "locale.de" },
    { locale: "fr", Flag: FR, label: "locale.fr" },
];

export const PopupLanguage = (props: PopupProps) => {
    const router = useRouter();
    const { t } = useTranslation("common");

    const changeLanguage = (locale: string) => {
        router.push(router.pathname, router.asPath, { locale }).then();
        props.onClose?.();
    };

    return (
        <div className="mt-2 flex flex-col overflow-hidden rounded-2xl bg-white py-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md">
            {languages.map(({ locale, Flag, label }) => (
                <button
                    key={locale}
                    onClick={() => changeLanguage(locale)}
                    className={`flex cursor-pointer items-center gap-x-3 rounded-full px-5 py-2 transition-all duration-200 hover:bg-black/10 active:scale-95 ${
                        router.locale === locale ? "text-black" : "text-neutral-dark hover:text-black"
                    }`}
                >
                    <Flag height={16} />
                    <span className="font-medium">{t(label as never)}</span>
                    {router.locale === locale && <LucideCheck size={16} />}
                </button>
            ))}
        </div>
    );
};
