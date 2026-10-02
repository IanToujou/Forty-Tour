import { GetStaticProps, NextPage } from "next";
import {useMemo, useRef, useState} from "react";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { Viewer } from "@photo-sphere-viewer/core";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { useTranslation } from "react-i18next";
import SeoHead from "@/components/seo/SeoHead";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { BoxMap } from "@/components/box/BoxMap";
import { BoxLocation } from "@/components/box/BoxLocation";
import { AnimatePresence, motion } from "framer-motion";
import { HeaderTour } from "@/components/common/header/HeaderTour";
import { createPortal } from "react-dom";
import {getTourPlugins} from "@/lib/getTourPlugins";

const TourPage: NextPage = () => {
    const { t } = useTranslation("tour");
    const plugins = useMemo(() => getTourPlugins(t), [t]);

    const instanceRef = useRef<Viewer | null>(null);
    const [location, setLocation] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [loaderNode, setLoaderNode] = useState<Element | null>(null);
    const [mapPosition, setMapPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleReady = (instance: Viewer) => {
        instanceRef.current = instance;

        const markersPlugin = instance.getPlugin(MarkersPlugin);
        const virtualTourPlugin = instance.getPlugin(VirtualTourPlugin);

        if (markersPlugin) {
            markersPlugin.addEventListener("select-marker", ({ marker }) => {
                const targetNode = marker.data?.targetNode;
                if (targetNode && virtualTourPlugin) {
                    virtualTourPlugin.setCurrentNode(targetNode);
                }
            });
        }

        if (virtualTourPlugin) {
            virtualTourPlugin.addEventListener("node-changed", ({ node }) => {
                setLocation(node.name ?? "");
                if (node.mapPosition) setMapPosition(node.mapPosition);
            });

            const currentNode = virtualTourPlugin.getCurrentNode();
            if (currentNode) {
                setLocation(currentNode.name ?? "");
                if (currentNode.mapPosition) setMapPosition(currentNode.mapPosition);
            }
        }

        /*instance.addEventListener("click", ({ data }) => {
            console.log(`Clicked at yaw: ${data.yaw}, pitch: ${data.pitch}`);
        });*/

        const container = instance.container;
        const observer = new MutationObserver(() => {
            const psvLoader = container.querySelector(".psv-loader-container");
            setLoaderNode(psvLoader ?? null);
        });
        observer.observe(container, { childList: true, subtree: true });

        setIsLoading(false);
    };

    return (
        <>
            <SeoHead path="/" title={t("meta.title")} description={t("meta.description")} robots="noindex, nofollow" />
            <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
                <ReactPhotoSphereViewer
                    height="100%"
                    width="100%"
                    plugins={plugins}
                    onReady={handleReady}
                    containerClass="psv-custom-container"
                    navbar={false}
                    maxFov={80}
                    minFov={30}
                />
                <div className="pointer-events-auto absolute top-0 left-0 z-1000 w-screen">
                    <HeaderTour />
                </div>
                <div className="pointer-events-auto absolute bottom-8 left-8 z-1000 flex flex-col gap-y-4">
                    <BoxLocation name={location} />
                    <BoxMap x={mapPosition.x} y={mapPosition.y} zoom={0.5} />
                </div>
                {loaderNode &&
                    createPortal(
                        <div className="pointer-events-auto absolute top-1/2 left-1/2 z-1000 flex h-full w-full -translate-1/2 items-center justify-center">
                            <div className="flex size-10 animate-spin items-center justify-center rounded-full border-4 border-black border-t-transparent bg-white ring-10 ring-white" />
                        </div>,
                        loaderNode
                    )}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="bg-neutral-darker fixed inset-0 z-2000 flex flex-col items-center justify-center gap-y-16"
                        >
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                                <svg width="923" height="324" viewBox="0 0 1845 649" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M752.488 472L444.488 520.879M752.488 472L734.488 344.5M444.488 520.879L426.037 403.369C425.181 397.917 428.904 392.802 434.355 391.94L734.488 344.5L782.773 337.424C788.167 336.633 793.2 340.308 794.089 345.687L811.828 452.961C812.74 458.477 808.952 463.669 803.421 464.485L752.488 472M816.988 306.787L814.884 293.69C814.085 288.722 809.72 285.12 804.691 285.281L594.488 292C568.988 293 545.488 290.094 526.988 282C501.388 270.8 478.988 214 467.988 196.5L453.488 181M467.988 196.5L384.488 270.778M444.488 520.879L268.623 548.788C264.126 549.502 259.715 547.088 257.892 542.916L213.977 442.408C213.016 440.21 212.878 437.739 213.587 435.447L218.163 420.662C218.703 418.921 219.708 417.359 221.07 416.148L384.488 270.778M1096.99 494C1101.49 456 1098.99 426 1075.99 413C1046.99 395.5 1018.99 405 991.988 431M1572.99 287.5L1554.2 338.496C1552.85 342.156 1553.75 346.266 1556.51 349.024L1572.33 364.844C1572.76 365.275 1573.08 365.805 1573.26 366.387C1574.06 369.002 1571.88 371.566 1569.17 371.188L1155.99 313.5C1138.49 311.5 1121.49 311 1104.49 320.5C1087.31 330.101 1032.49 360.5 1018.49 357.5L1001.69 354.775C1000.56 354.593 999.523 354.24 998.516 353.709C966.542 336.85 867.88 304.583 816.988 306.787C815.794 306.839 814.627 306.91 813.488 307L429.58 368.699C424.874 369.456 420.289 366.786 418.624 362.32L384.488 270.778M1263.49 355C1264.04 350.327 1268.31 347.009 1272.97 347.63L1461.4 372.723C1466.75 373.435 1470.56 378.259 1470.03 383.626L1460.98 474.49C1460.43 480.009 1455.5 484.026 1449.98 483.444L1261.65 463.572C1256.07 462.984 1252.07 457.927 1252.78 452.365L1254.99 435M847.362 433.405L901.111 424.722C902.024 424.575 902.913 424.301 903.75 423.91L984.914 385.979C992.179 382.584 992.548 372.737 985.26 369.393C942.097 349.59 862.896 326.451 829.419 325.824C824.096 325.724 820.653 330.624 821.5 335.88L835.895 425.125C836.774 430.579 841.909 434.286 847.362 433.405ZM1617.14 499.033L1580.01 395.161C1578.77 391.678 1575.7 389.166 1572.04 388.632L1495.95 377.526C1490.27 376.697 1485.06 380.81 1484.54 386.527L1475.37 488.686C1474.88 494.13 1478.85 498.957 1484.29 499.526L1606.68 512.344C1614 513.111 1619.62 505.967 1617.14 499.033ZM726.088 464.555L503.935 499.438C498.452 500.299 493.317 496.531 492.494 491.043L480.457 410.796C479.643 405.371 483.352 400.303 488.769 399.437L710.107 364.078C715.563 363.207 720.692 366.925 721.561 372.381L734.412 453.103C735.282 458.566 731.552 463.697 726.088 464.555Z"
                                        stroke="#4B616B"
                                        strokeWidth="4"
                                    />
                                    <path
                                        d="M844.988 536.5L113.199 645.353C108.666 646.027 104.254 643.533 102.494 639.301L4.26639 403.075C3.43625 401.079 3.2755 398.867 3.80824 396.772L9.71757 373.529C10.2189 371.557 11.31 369.784 12.845 368.449L380.053 48.9233C382.214 47.0435 385.496 47.3036 387.334 49.5M844.988 536.5L840.497 489.966C839.948 484.272 834.744 480.199 829.086 481.033L558.187 520.955C556.062 521.268 554.488 523.091 554.488 525.239C554.488 527.396 552.9 529.225 550.764 529.527L506.713 535.761C503.716 536.185 501.488 538.75 501.488 541.778C501.488 544.781 499.294 547.334 496.325 547.786L256.142 584.335C251.636 585.021 247.236 582.572 245.443 578.381L186.431 440.376C185.499 438.197 185.372 435.757 186.072 433.492L192.654 412.196C193.199 410.433 194.221 408.855 195.607 407.637L448.856 185.07C451.387 182.846 451.567 178.967 449.254 176.517C446.928 174.055 447.125 170.15 449.686 167.934L463.551 155.935C467.678 152.364 468.179 146.143 464.678 141.957L387.334 49.5M844.988 536.5L905.488 529M905.488 529L943.087 565.648C944.153 566.687 944.22 568.377 943.24 569.497C942.258 570.619 942.328 572.314 943.399 573.352L955.419 584.996C956.567 586.108 958.394 586.093 959.524 584.963C960.625 583.863 962.394 583.816 963.551 584.857L994.039 612.296C998.15 615.996 1004.48 615.656 1008.18 611.537L1033.84 582.895C1035.05 581.551 1037.09 581.382 1038.5 582.509C1039.9 583.629 1041.93 583.469 1043.14 582.144L1054.48 569.707C1055.62 568.453 1055.63 566.537 1054.5 565.267C1053.36 563.984 1053.39 562.041 1054.57 560.79L1091.99 521M905.488 529L936.908 491.573C938.35 489.855 938.184 487.305 936.53 485.789C934.842 484.242 934.708 481.626 936.23 479.915L946.757 468.072C948.258 466.383 950.852 466.25 952.517 467.777C954.16 469.283 956.711 469.178 958.224 467.542L985.708 437.829C989.454 433.78 995.772 433.528 999.828 437.268L1028.25 463.477C1029.76 464.867 1032.11 464.764 1033.49 463.246C1034.87 461.731 1037.21 461.624 1038.72 463.008L1051.26 474.503C1052.77 475.884 1052.88 478.222 1051.5 479.734C1050.12 481.258 1050.24 483.619 1051.77 484.994L1074.49 505.331M1074.49 505.331L1074.91 501.298C1075.5 495.67 1080.64 491.651 1086.24 492.436L1115.7 496.56C1121.32 497.346 1126.46 493.31 1127.04 487.668L1127.97 478.509C1128.53 472.991 1133.48 468.984 1138.99 469.578L1442.81 502.334C1446.32 502.713 1448.99 505.678 1448.99 509.212C1448.99 512.777 1451.7 515.759 1455.25 516.098L1643.03 534.024C1650.27 534.715 1655.8 527.692 1653.43 520.815L1571.82 283.693C1569.99 278.379 1572.9 272.602 1578.26 270.905L1702.99 231.4C1706.34 230.338 1709.94 232.109 1711.14 235.416L1839.01 587.416C1841.54 594.373 1835.89 601.569 1828.53 600.772L1091.99 521M1091.99 521L1074.49 505.331M387.334 49.5L439.196 5.84921C440.999 4.33198 443.28 3.5 445.636 3.5H1609.1C1613.25 3.5 1616.96 6.05941 1618.44 9.93357L1702.99 231.4M1135.68 410.089L1142.8 350.874C1143.46 345.412 1148.4 341.506 1153.87 342.132L1260.57 354.364C1266.05 354.992 1269.99 359.936 1269.37 365.416L1262.62 425.469C1261.99 430.993 1256.99 434.951 1251.47 434.277L1144.4 421.209C1138.92 420.541 1135.02 415.566 1135.68 410.089Z"
                                        stroke="#CAE2ED"
                                        strokeWidth="7"
                                    />
                                </svg>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default TourPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ["common", "tour"])),
        },
    };
};
