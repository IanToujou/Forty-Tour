import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import SeoHead from "@/components/seo/SeoHead";
import { Header } from "@/components/common/header/Header";
import { useTranslation } from "react-i18next";
import { Footer } from "@/components/common/footer/Footer";
import { SectionPrivacy } from "@/components/section/privacy/SectionPrivacy";

const PrivacyPage: NextPage = () => {
    const { t } = useTranslation("privacy");

    return (
        <>
            <SeoHead path="/" title={t("meta.title")} description={t("meta.description")} robots="noindex, nofollow" />
            <div>
                <Header fillBackground />
                <SectionPrivacy />
                <div className="bg-neutral-lighter h-0.5 w-full" />
                <Footer />
            </div>
        </>
    );
};

export default PrivacyPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ["common", "privacy"])),
        },
    };
};
