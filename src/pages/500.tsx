import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import SeoHead from "@/components/seo/SeoHead";
import { Header } from "@/components/common/header/Header";
import { Footer } from "@/components/common/footer/Footer";
import { useTranslation } from "react-i18next";
import { SectionInternalError } from "@/components/section/error/SectionInternalError";

const NotFoundPage: NextPage = () => {
    const { t } = useTranslation("error");

    return (
        <>
            <SeoHead path="/500" title={"500 " + t("http.500.title")} description={t("http.500.description")} robots="noindex, nofollow" />
            <div>
                <Header fillBackground />
                <SectionInternalError />
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
