import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import SeoHead from "@/components/seo/SeoHead";
import { Header } from "@/components/common/header/Header";
import { Footer } from "@/components/common/footer/Footer";
import { SectionNotFoundError } from "@/components/section/error/SectionNotFoundError";
import { useTranslation } from "react-i18next";

const NotFoundPage: NextPage = () => {
    const { t } = useTranslation("error");

    return (
        <>
            <SeoHead path="/404" title={"404 " + t("http.404.title")} description={t("http.404.description")} robots="noindex, nofollow" />
            <div>
                <Header fillBackground />
                <SectionNotFoundError />
                <div className="bg-neutral-lighter h-0.5 w-full" />
                <Footer />
            </div>
        </>
    );
};

export default NotFoundPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ["common", "error", "form"])),
        },
    };
};
