import Popup from "reactjs-popup";
import { PopupLanguage } from "@/components/popup/PopupLanguage";
import { DE, FlagComponent, FR, GB } from "country-flag-icons/react/3x2";
import { PopupActions } from "reactjs-popup/dist/types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

const flags: Record<string, FlagComponent> = {
    de: DE,
    en: GB,
    fr: FR,
};

export const HeaderLanguage = () => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const popupLanguage = useRef<PopupActions>(null!);
    const [canHover, setCanHover] = useState(true);

    useEffect(() => {
        const mq = window.matchMedia("(hover: hover)");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCanHover(mq.matches);
        const listener = (e: MediaQueryListEvent) => setCanHover(e.matches);
        mq.addEventListener("change", listener);
        return () => mq.removeEventListener("change", listener);
    }, []);

    const Flag = flags[router.locale ?? "en"];

    return (
        <Popup
            ref={popupLanguage}
            position="bottom center"
            arrow={false}
            on={canHover ? ["hover", "focus"] : ["click"]}
            mouseLeaveDelay={150}
            mouseEnterDelay={0}
            trigger={
                <button className="flex cursor-pointer items-center gap-x-3 rounded-full bg-white px-6 py-2 font-semibold text-black">
                    <Flag height={18} />
                    <span>{t(`locale.${router.locale}` as never)}</span>
                </button>
            }
        >
            <PopupLanguage
                onClose={() => {
                    if (popupLanguage.current != null) popupLanguage.current.close();
                }}
            />
        </Popup>
    );
};
