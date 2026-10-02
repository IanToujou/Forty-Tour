import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import SeoHead from "@/components/seo/SeoHead";
import { SectionHomeBanner } from "@/components/section/home/SectionHomeBanner";
import { Header } from "@/components/common/header/Header";
import { useTranslation } from "react-i18next";
import { Footer } from "@/components/common/footer/Footer";

const HomePage: NextPage = () => {
    const { t } = useTranslation("home");

    return (
        <>
            <SeoHead path="/" title={t("meta.title")} description={t("meta.description")} robots="index, follow" />
            <div>
                <Header />
                <SectionHomeBanner />
                <Footer />
            </div>
        </>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ["common", "home"])),
        },
    };
};
