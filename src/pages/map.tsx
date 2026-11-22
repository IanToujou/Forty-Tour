import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import SeoHead from "@/components/seo/SeoHead";
import { Header } from "@/components/common/header/Header";
import { useTranslation } from "react-i18next";
import { Footer } from "@/components/common/footer/Footer";
import { SectionInteractiveMap } from "@/components/section/map/SectionInteractiveMap";
import { useMemo } from "react";
import { getTourNodes } from "@/lib/getTourNodes";

const MapPage: NextPage = () => {
    const { t } = useTranslation(["map"]);
    const { t: tTour } = useTranslation("tour");
    const nodes = useMemo(() => getTourNodes(tTour), [tTour]);

    return (
        <>
            <SeoHead path="/map" title={t("meta.title")} description={t("meta.description")} robots="noindex, nofollow" />
            <div>
                <Header />
                <SectionInteractiveMap nodes={nodes} />
                <Footer />
            </div>
        </>
    );
};

export default MapPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ["common", "map", "tour"])),
        },
    };
};
