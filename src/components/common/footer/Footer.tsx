import { FooterLink } from "@/components/common/footer/FooterLink";
import {useTranslation} from "react-i18next";

export const Footer = () => {
    const { t } = useTranslation("common");

    return (
        <footer className="w-full bg-white px-24 py-12">
            <div className="flex w-full flex-col items-start justify-between gap-12 lg:flex-row">
                <div className="flex max-w-sm flex-col gap-y-3">
                    <h6 className="font-outfit text-2xl font-bold">Forty Tour</h6>
                    <p className="text-neutral-medium text-sm font-medium">
                        {t("footer.description")}
                    </p>
                </div>
                <div className="flex flex-wrap items-start gap-x-32 gap-y-8">
                    <div className="flex min-w-40 flex-col gap-y-3">
                        <h6 className="font-outfit text-xl font-bold">{t("footer.about.title")}</h6>
                        <FooterLink title={t("footer.about.privacy")} href="/" />
                        <FooterLink title={t("footer.about.legal")} href="/" />
                    </div>
                    <div className="flex min-w-40 flex-col gap-y-3">
                        <h6 className="font-outfit text-xl font-bold">{t("footer.tour.title")}</h6>
                        <FooterLink title={t("footer.tour.map")} href="/" />
                        <FooterLink title={t("footer.tour.poi")} href="/" />
                    </div>
                </div>
            </div>
            <div className="bg-primary-medium mt-12 mb-6 h-px w-full" />
            <div className="text-neutral-medium flex w-full flex-col items-center justify-between gap-2 text-center text-sm font-medium sm:flex-row sm:text-left">
                <p>Copyright (c) 2026 Ian Bour</p>
            </div>
        </footer>
    );
};
