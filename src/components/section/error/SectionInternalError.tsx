import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const SectionInternalError = () => {
    const { t } = useTranslation(["error", "form", "common"]);

    return (
        <MotionConfig reducedMotion="user">
            <section className="bg-neutral-white flex min-h-screen w-full items-center justify-center px-12 py-24 md:py-36">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
                >
                    <p className="font-outfit text-primary-medium text-7xl font-semibold tracking-tight md:text-9xl">500</p>
                    <h1 className="font-outfit text-neutral-darker mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                        {t("error:http.500.title")}
                    </h1>
                    <p className="font-manrope text-neutral-medium mt-4 text-base leading-relaxed md:text-lg">{t("error:http.500.description")}</p>
                    <Link
                        href="/"
                        className="bg-primary-medium hover:bg-primary-dark group mt-10 flex w-fit cursor-pointer items-center gap-x-4 rounded-full px-6 py-2.5 text-white duration-200"
                    >
                        <p className="text-lg font-bold">{t("form:button.home")}</p>
                    </Link>
                </motion.div>
            </section>
        </MotionConfig>
    );
};
