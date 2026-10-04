import Link from "next/link";
import { LucidePlay } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const SectionHomeBanner = () => {
    const { t } = useTranslation("home");

    return (
        <div>
            <div className="absolute -z-10 h-screen w-screen bg-black select-none">
                <Image src="/img/landing.png" alt="Fort des saumonards" loading="eager" fill className="object-cover" />
            </div>
            <div className="flex h-screen w-screen flex-col items-center justify-center text-center">
                <motion.p
                    initial={{ opacity: 0, translateY: -10 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="font-outfit text-primary-medium text-2xl lg:text-4xl font-medium"
                >
                    {t("banner.welcome")}
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, translateY: -30 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
                    className="lg:mt-0 mt-2 font-outfit text-7xl lg:text-9xl font-extrabold text-white uppercase"
                >
                    Forty 2
                </motion.h1>
                <Link
                    href="/tour"
                    className="bg-primary-medium hover:bg-primary-dark group mt-6 lg:mt-10 flex cursor-pointer items-center gap-x-4 rounded-full px-6 py-3 text-white duration-200"
                >
                    <p className="text-lg font-bold">{t("banner.button")}</p>
                    <LucidePlay className="duration-400 group-hover:rotate-360" />
                </Link>
            </div>
        </div>
    );
};
