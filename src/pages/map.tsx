import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import SeoHead from "@/components/seo/SeoHead";
import { useTranslation } from "react-i18next";
import { Footer } from "@/components/common/footer/Footer";
import { SectionInteractiveMap } from "@/components/section/map/SectionInteractiveMap";
import { useMemo } from "react";
import { getTourNodes } from "@/lib/getTourNodes";
import { HeaderTour } from "@/components/common/header/HeaderTour";

const MapPage: NextPage = () => {
    const { t } = useTranslation(["map"]);
    const { t: tTour } = useTranslation("tour");
    const nodes = useMemo(() => getTourNodes(tTour), [tTour]);

    return (
        <>
            <SeoHead path="/map" title={t("meta.title")} description={t("meta.description")} robots="noindex, nofollow" />
            <div>
                <div className="pointer-events-auto absolute top-0 left-0 z-1000 w-screen">
                    <HeaderTour />
                </div>
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
