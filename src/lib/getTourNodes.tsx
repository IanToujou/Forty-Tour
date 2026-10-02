import type { TFunction } from "i18next";
import { renderToStaticMarkup } from "react-dom/server";
import { LucideBed, LucideComputer, LucideGamepad2, LucideSparkles, LucideSquareParking, LucideUtensils } from "lucide-react";
import { BoxTooltip } from "@/components/box/BoxTooltip";
import { VirtualTourNode } from "@photo-sphere-viewer/virtual-tour-plugin";

export type TourNode = VirtualTourNode & {
    mapPosition?: { x: number; y: number };
};

export const getTourNodes = (t: TFunction<"tour">): TourNode[] => [
    {
        id: "parking_1",
        name: t("node.parking"),
        panorama: "/img/tour/parking_1.jpg",
        mapPosition: { x: 1095, y: 599 },
        markers: [
            {
                id: "marker-1",
                polygon: [
                    [3.5997, -0.0972],
                    [4.5593, -0.0755],
                    [4.6871, -0.1143],
                    [3.5711, -0.157],
                ],
                svgStyle: {
                    fill: "rgba(147, 220, 50, 0.2)",
                    stroke: "rgb(147 220 50)",
                    strokeWidth: "8px",
                },
                tooltip: {
                    content: renderToStaticMarkup(
                        <BoxTooltip
                            icon={LucideSquareParking}
                            title={t("marker.parking.title")}
                            description={t("marker.parking.description")}
                        />
                    ),
                },
            },
        ],
        links: [{ nodeId: "parking_2", position: { yaw: "270deg", pitch: "0deg" } }],
    },
    {
        id: "parking_2",
        name: t("node.entrance"),
        panorama: "/img/tour/parking_2.jpg",
        mapPosition: { x: 1102, y: 546 },
        links: [
            { nodeId: "outside_18", position: { yaw: "270deg", pitch: "0deg" } },
            { nodeId: "parking_1", position: { yaw: "90deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_18",
        name: t("node.entrance"),
        panorama: "/img/tour/outside_18.jpg",
        mapPosition: { x: 1109, y: 481 },
        links: [
            { nodeId: "outside_13", position: { yaw: "270deg", pitch: "0deg" } },
            { nodeId: "parking_2", position: { yaw: "90deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_13",
        name: t("node.center"),
        panorama: "/img/tour/outside_13.jpg",
        mapPosition: { x: 1113, y: 434 },
        links: [
            { nodeId: "outside_12", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_14", position: { yaw: "240deg", pitch: "0deg" } },
            { nodeId: "outside_18", position: { yaw: "90deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_14",
        panorama: "/img/tour/outside_14.jpg",
        name: t("node.center"),
        mapPosition: { x: 1098, y: 372 },
        links: [
            { nodeId: "community_6", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_17", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "outside_13", position: { yaw: "60deg", pitch: "0deg" } },
            { nodeId: "outside_15", position: { yaw: "290deg", pitch: "0deg" } },
        ],
        markers: [
            {
                id: "marker-1",
                polygon: [
                    [6.1174, 0.3321],
                    [0.2052, 0.3347],
                    [0.2078, -0.0161],
                    [6.1174, -0.0161],
                ],
                svgStyle: {
                    fill: "rgba(147, 220, 50, 0.2)",
                    stroke: "rgb(147 220 50)",
                    strokeWidth: "8px",
                },
                tooltip: {
                    content: renderToStaticMarkup(
                        <BoxTooltip
                            icon={LucideSparkles}
                            title={t("marker.community.title")}
                            description={t("marker.community.description")}
                            clickable
                            clickLabel={t("label.enter")}
                        />
                    ),
                },
                data: { targetNode: "community_6" },
            },
        ],
    },
    {
        id: "outside_17",
        name: t("node.center"),
        panorama: "/img/tour/outside_17.jpg",
        mapPosition: { x: 1017, y: 378 },
        links: [
            { nodeId: "outside_14", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_19", position: { yaw: "160deg", pitch: "0deg" } },
            { nodeId: "outside_20", position: { yaw: "210deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_19",
        name: t("node.center"),
        panorama: "/img/tour/outside_19.jpg",
        mapPosition: { x: 919, y: 436 },
        links: [
            { nodeId: "outside_17", position: { yaw: "340deg", pitch: "0deg" } },
            { nodeId: "outside_22", position: { yaw: "180deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_22",
        name: t("node.center"),
        panorama: "/img/tour/outside_22.jpg",
        mapPosition: { x: 825, y: 444 },
        links: [
            { nodeId: "outside_19", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_21", position: { yaw: "270deg", pitch: "0deg" } },
            { nodeId: "outside_23", position: { yaw: "160deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_21",
        name: t("node.center"),
        panorama: "/img/tour/outside_21.jpg",
        mapPosition: { x: 803, y: 321 },
        links: [
            { nodeId: "outside_22", position: { yaw: "90deg", pitch: "0deg" } },
            { nodeId: "outside_20", position: { yaw: "20deg", pitch: "0deg" } },
            { nodeId: "outside_25", position: { yaw: "180deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_25",
        name: t("node.volleyball"),
        panorama: "/img/tour/outside_25.jpg",
        mapPosition: { x: 722, y: 328 },
        links: [
            { nodeId: "outside_21", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_24", position: { yaw: "90deg", pitch: "0deg" } },
            { nodeId: "outside_26", position: { yaw: "180deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_24",
        name: t("node.volleyball"),
        panorama: "/img/tour/outside_24.jpg",
        mapPosition: { x: 732, y: 406 },
        links: [
            { nodeId: "outside_23", position: { yaw: "90deg", pitch: "0deg" } },
            { nodeId: "outside_25", position: { yaw: "270deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_23",
        name: t("node.volleyball"),
        panorama: "/img/tour/outside_23.jpg",
        mapPosition: { x: 742, y: 478 },
        links: [
            { nodeId: "outside_27", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "outside_24", position: { yaw: "270deg", pitch: "0deg" } },
            { nodeId: "outside_22", position: { yaw: "340deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_26",
        name: t("node.volleyball"),
        panorama: "/img/tour/outside_26.jpg",
        mapPosition: { x: 563, y: 354 },
        links: [
            { nodeId: "outside_25", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_27", position: { yaw: "90deg", pitch: "0deg" } },
            { nodeId: "outside_36", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "outside_35", position: { yaw: "220deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_27",
        name: t("node.volleyball"),
        panorama: "/img/tour/outside_27.jpg",
        mapPosition: { x: 586, y: 503 },
        links: [
            { nodeId: "outside_23", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_26", position: { yaw: "270deg", pitch: "0deg" } },
            { nodeId: "outside_28", position: { yaw: "180deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_28",
        name: t("node.volleyball"),
        panorama: "/img/tour/outside_28.jpg",
        mapPosition: { x: 450, y: 526 },
        links: [
            { nodeId: "outside_27", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_29", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "outside_36", position: { yaw: "290deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_29",
        name: t("node.west"),
        panorama: "/img/tour/outside_29.jpg",
        mapPosition: { x: 347, y: 541 },
        links: [
            { nodeId: "outside_28", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_30", position: { yaw: "260deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_30",
        name: t("node.west"),
        panorama: "/img/tour/outside_30.jpg",
        mapPosition: { x: 329, y: 463 },
        links: [
            { nodeId: "outside_29", position: { yaw: "80deg", pitch: "0deg" } },
            { nodeId: "outside_31", position: { yaw: "250deg", pitch: "0deg" } },
            { nodeId: "outside_34", position: { yaw: "200deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_31",
        name: t("node.west"),
        panorama: "/img/tour/outside_31.jpg",
        mapPosition: { x: 308, y: 372 },
        markers: [
            {
                id: "marker-1",
                polygon: [
                    [3.0262, 0.1504],
                    [3.1221, 0.1578],
                    [3.1203, -0.107],
                    [3.0263, -0.1021],
                ],
                svgStyle: {
                    fill: "rgba(147, 220, 50, 0.2)",
                    stroke: "rgb(147 220 50)",
                    strokeWidth: "8px",
                },
                tooltip: {
                    content: renderToStaticMarkup(
                        <BoxTooltip
                            icon={LucideUtensils}
                            title={t("marker.refectory.title")}
                            description={t("marker.refectory.description")}
                            clickable
                            clickLabel={t("label.enter")}
                        />
                    ),
                },
                data: { targetNode: "kitchen_1" },
            },
        ],
        links: [
            { nodeId: "outside_30", position: { yaw: "110deg", pitch: "0deg" } },
            { nodeId: "outside_36", position: { yaw: "40deg", pitch: "0deg" } },
            { nodeId: "outside_34", position: { yaw: "165deg", pitch: "0deg" } },
            { nodeId: "outside_32", position: { yaw: "0deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_32",
        name: t("node.west"),
        panorama: "/img/tour/outside_32.jpg",
        mapPosition: { x: 353, y: 278 },
        markers: [
            {
                id: "marker-1",
                polygon: [
                    [4.3896, 0.6782],
                    [5.0226, 0.6844],
                    [5.0074, -0.5608],
                    [4.3756, -0.5455],
                ],
                svgStyle: {
                    fill: "rgba(147, 220, 50, 0.2)",
                    stroke: "rgb(147 220 50)",
                    strokeWidth: "8px",
                },
                tooltip: {
                    content: renderToStaticMarkup(<BoxTooltip icon={LucideBed} title={t("marker.dorm.title")} description={t("marker.dorm.description")} clickable clickLabel={t("label.enter")}/>),
                },
                data: { targetNode: "dorm_1" },
            },
        ],
        links: [
            { nodeId: "outside_33", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_31", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "outside_35", position: { yaw: "40deg", pitch: "0deg" } },
            { nodeId: "dorm_1", position: { yaw: "270deg", pitch: "0deg" } },
        ],
    },
    {
        id: "dorm_1",
        name: t("node.dorm"),
        panorama: "/img/tour/dorm_1.jpg",
        mapPosition: { x: 298, y: 214 },
        links: [{ nodeId: "outside_32", position: { yaw: "90deg", pitch: "0deg" } }],
    },
    {
        id: "outside_33",
        name: t("node.west"),
        panorama: "/img/tour/outside_33.jpg",
        mapPosition: { x: 412, y: 225 },
        links: [
            { nodeId: "outside_32", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "outside_35", position: { yaw: "90deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_34",
        name: t("node.west"),
        panorama: "/img/tour/outside_34.jpg",
        mapPosition: { x: 208, y: 456 },
        markers: [
            {
                id: "marker-1",
                polygon: [
                    [2.8533, 0.5941],
                    [3.4125, 0.6116],
                    [3.4214, -0.4966],
                    [2.8551, -0.4868],
                ],
                svgStyle: {
                    fill: "rgba(147, 220, 50, 0.2)",
                    stroke: "rgb(147 220 50)",
                    strokeWidth: "8px",
                },
                tooltip: {
                    content: renderToStaticMarkup(
                        <BoxTooltip
                            icon={LucideUtensils}
                            title={t("marker.refectory.title")}
                            description={t("marker.refectory.description")}
                            clickable
                            clickLabel={t("label.enter")}
                        />
                    ),
                },
                data: { targetNode: "kitchen_1" },
            },
        ],
        links: [
            { nodeId: "outside_31", position: { yaw: "320deg", pitch: "0deg" } },
            { nodeId: "kitchen_1", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "outside_30", position: { yaw: "50deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_35",
        name: t("node.west"),
        panorama: "/img/tour/outside_35.jpg",
        mapPosition: { x: 451, y: 282 },
        markers: [
            {
                id: "marker-1",
                polygon: [
                    [3.5697, 0.1202],
                    [3.623, 0.1272],
                    [3.6236, -0.0763],
                    [3.5701, -0.0723],
                ],
                svgStyle: {
                    fill: "rgba(147, 220, 50, 0.2)",
                    stroke: "rgb(147 220 50)",
                    strokeWidth: "8px",
                },
                tooltip: {
                    content: renderToStaticMarkup(<BoxTooltip icon={LucideBed} title={t("marker.dorm.title")} description={t("marker.dorm.description")} clickable clickLabel={t("label.enter")}/>),
                },
                data: { targetNode: "dorm_1" },
            },
        ],
        links: [
            { nodeId: "outside_33", position: { yaw: "270deg", pitch: "0deg" } },
            { nodeId: "outside_32", position: { yaw: "200deg", pitch: "0deg" } },
            { nodeId: "outside_36", position: { yaw: "110deg", pitch: "0deg" } },
            { nodeId: "outside_26", position: { yaw: "45deg", pitch: "0deg" } },
        ],
    },
    {
        id: "kitchen_1",
        name: t("node.refectory_main"),
        panorama: "/img/tour/kitchen_1.jpg",
        mapPosition: { x: 171, y: 470 },
        links: [
            { nodeId: "outside_34", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "kitchen_2", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "kitchen_4", position: { yaw: "270deg", pitch: "0deg" } },
        ],
    },
    {
        id: "kitchen_2",
        name: t("node.refectory_main"),
        panorama: "/img/tour/kitchen_2.jpg",
        mapPosition: { x: 115, y: 489 },
        links: [
            { nodeId: "kitchen_1", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "kitchen_3", position: { yaw: "270deg", pitch: "0deg" } },
        ],
    },
    {
        id: "kitchen_3",
        name: t("node.refectory_side"),
        panorama: "/img/tour/kitchen_3.jpg",
        mapPosition: { x: 101, y: 454 },
        links: [{ nodeId: "kitchen_2", position: { yaw: "90deg", pitch: "0deg" } }],
    },
    {
        id: "kitchen_4",
        name: t("node.refectory_side"),
        panorama: "/img/tour/kitchen_4.jpg",
        mapPosition: { x: 158, y: 438 },
        links: [{ nodeId: "kitchen_1", position: { yaw: "90deg", pitch: "0deg" } }],
    },
    {
        id: "outside_36",
        name: t("node.volleyball"),
        panorama: "/img/tour/outside_36.jpg",
        mapPosition: { x: 462, y: 370 },
        links: [
            { nodeId: "outside_26", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_28", position: { yaw: "110deg", pitch: "0deg" } },
            { nodeId: "outside_31", position: { yaw: "190deg", pitch: "0deg" } },
            { nodeId: "outside_35", position: { yaw: "270deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_20",
        name: t("node.center"),
        panorama: "/img/tour/outside_20.jpg",
        mapPosition: { x: 905, y: 328 },
        links: [
            { nodeId: "outside_17", position: { yaw: "20deg", pitch: "0deg" } },
            { nodeId: "outside_21", position: { yaw: "180deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_12",
        name: t("node.east"),
        panorama: "/img/tour/outside_12.jpg",
        mapPosition: { x: 1206, y: 448 },
        links: [
            { nodeId: "outside_9", position: { yaw: "20deg", pitch: "0deg" } },
            { nodeId: "outside_13", position: { yaw: "180deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_9",
        panorama: "/img/tour/outside_9.jpg",
        name: t("node.east"),
        mapPosition: { x: 1262, y: 469 },
        links: [
            { nodeId: "outside_8", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_10", position: { yaw: "270deg", pitch: "0deg" } },
            { nodeId: "outside_12", position: { yaw: "200deg", pitch: "0deg" } },
        ],
        markers: [
            {
                id: "marker-1",
                polygon: [
                    [4.0555, 0.1502],
                    [4.1587, 0.1307],
                    [4.1577, -0.1293],
                    [4.0553, -0.1492],
                ],
                svgStyle: {
                    fill: "rgba(147, 220, 50, 0.2)",
                    stroke: "rgb(147 220 50)",
                    strokeWidth: "8px",
                },
                tooltip: {
                    content: renderToStaticMarkup(
                        <BoxTooltip
                            icon={LucideSparkles}
                            title={t("marker.community.title")}
                            description={t("marker.community.description")}
                            clickable
                            clickLabel={t("label.enter")}
                        />
                    ),
                },
                data: { targetNode: "community_8" },
            },
        ],
    },
    {
        id: "outside_10",
        name: t("node.east"),
        panorama: "/img/tour/outside_10.jpg",
        mapPosition: { x: 1270, y: 393 },
        links: [
            { nodeId: "outside_7", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_9", position: { yaw: "90deg", pitch: "0deg" } },
            { nodeId: "community_1", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "outside_11", position: { yaw: "270deg", pitch: "0deg" } },
        ],
        markers: [
            {
                id: "marker-1",
                polygon: [
                    [2.3854, 0.1632],
                    [2.6081, 0.1958],
                    [2.6061, -0.2457],
                    [2.3848, -0.2053],
                ],
                svgStyle: {
                    fill: "rgba(147, 220, 50, 0.2)",
                    stroke: "rgb(147 220 50)",
                    strokeWidth: "8px",
                },
                tooltip: {
                    content: renderToStaticMarkup(
                        <BoxTooltip
                            icon={LucideSparkles}
                            title={t("marker.community.title")}
                            description={t("marker.community.description")}
                            clickable
                            clickLabel={t("label.enter")}
                        />
                    ),
                },
                data: { targetNode: "community_8" },
            },
        ],
    },
    {
        id: "outside_11",
        name: t("node.east"),
        panorama: "/img/tour/outside_11.jpg",
        mapPosition: { x: 1278, y: 336 },
        links: [
            { nodeId: "outside_10", position: { yaw: "90deg", pitch: "0deg" } },
            { nodeId: "outside_6", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_16", position: { yaw: "180deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_6",
        name: t("node.east"),
        panorama: "/img/tour/outside_6.jpg",
        mapPosition: { x: 1339, y: 345 },
        links: [
            { nodeId: "outside_11", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "outside_7", position: { yaw: "90deg", pitch: "0deg" } },
            { nodeId: "outside_5", position: { yaw: "0deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_5",
        name: t("node.east"),
        panorama: "/img/tour/outside_5.jpg",
        mapPosition: { x: 1476, y: 366 },
        links: [
            { nodeId: "outside_6", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "outside_2", position: { yaw: "50deg", pitch: "0deg" } },
            { nodeId: "outside_3", position: { yaw: "90deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_2",
        name: t("node.east"),
        mapPosition: { x: 1549, y: 438 },
        panorama: "/img/tour/outside_2.jpg",
        links: [
            { nodeId: "outside_5", position: { yaw: "240deg", pitch: "0deg" } },
            { nodeId: "outside_3", position: { yaw: "200deg", pitch: "0deg" } },
            { nodeId: "outside_1", position: { yaw: "10deg", pitch: "0deg" } },
            { nodeId: "gaming_1", position: { yaw: "45deg", pitch: "0deg" } },
        ],
        markers: [
            {
                id: "marker-1",
                polygon: [
                    [0.6678, 0.116],
                    [0.7259, 0.1078],
                    [0.7239, -0.0839],
                    [0.667, -0.0916],
                ],
                svgStyle: {
                    fill: "rgba(147, 220, 50, 0.2)",
                    stroke: "rgb(147 220 50)",
                    strokeWidth: "8px",
                },
                tooltip: {
                    content: renderToStaticMarkup(
                        <BoxTooltip
                            icon={LucideGamepad2}
                            title={t("marker.gaming.title")}
                            description={t("marker.gaming.description")}
                            clickable
                            clickLabel={t("label.enter")}
                        />
                    ),
                },
                data: { targetNode: "gaming_1" },
            },
            {
                id: "marker-2",
                polygon: [
                    [0.0945, 0.1718],
                    [0.2262, 0.1628],
                    [0.2262, -0.1477],
                    [0.0949, -0.1577],
                ],
                svgStyle: {
                    fill: "rgba(147, 220, 50, 0.2)",
                    stroke: "rgb(147 220 50)",
                    strokeWidth: "8px",
                },
                tooltip: {
                    content: renderToStaticMarkup(
                        <BoxTooltip
                            icon={LucideComputer}
                            title={t("marker.cluster.title")}
                            description={t("marker.cluster.description")}
                            clickable
                            clickLabel={t("label.enter")}
                        />
                    ),
                },
                data: { targetNode: "cluster_1" },
            },
        ],
    },
    {
        id: "outside_3",
        name: t("node.east"),
        panorama: "/img/tour/outside_3.jpg",
        mapPosition: { x: 1469, y: 428 },
        links: [
            { nodeId: "outside_2", position: { yaw: "10deg", pitch: "0deg" } },
            { nodeId: "outside_4", position: { yaw: "80deg", pitch: "0deg" } },
            { nodeId: "outside_7", position: { yaw: "190deg", pitch: "0deg" } },
            { nodeId: "outside_5", position: { yaw: "260deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_16",
        name: t("node.east"),
        panorama: "/img/tour/outside_16.jpg",
        mapPosition: { x: 1213, y: 329 },
        links: [
            { nodeId: "outside_11", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_15", position: { yaw: "170deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_15",
        name: t("node.center"),
        panorama: "/img/tour/outside_15.jpg",
        mapPosition: { x: 1122, y: 327 },
        links: [
            { nodeId: "outside_16", position: { yaw: "350deg", pitch: "0deg" } },
            { nodeId: "outside_14", position: { yaw: "110deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_8",
        name: t("node.east"),
        panorama: "/img/tour/outside_8.jpg",
        mapPosition: { x: 1322, y: 476 },
        links: [
            { nodeId: "outside_4", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_7", position: { yaw: "270deg", pitch: "0deg" } },
            { nodeId: "outside_9", position: { yaw: "180deg", pitch: "0deg" } },
        ],
    },
    {
        name: t("node.east"),
        id: "outside_4",
        panorama: "/img/tour/outside_4.jpg",
        mapPosition: { x: 1462, y: 491 },
        links: [
            { nodeId: "outside_3", position: { yaw: "270deg", pitch: "0deg" } },
            { nodeId: "outside_2", position: { yaw: "325deg", pitch: "0deg" } },
            { nodeId: "outside_8", position: { yaw: "180deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_7",
        name: t("node.east"),
        panorama: "/img/tour/outside_7.jpg",
        mapPosition: { x: 1331, y: 402 },
        links: [
            { nodeId: "outside_3", position: { yaw: "10deg", pitch: "0deg" } },
            { nodeId: "outside_10", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "outside_8", position: { yaw: "90deg", pitch: "0deg" } },
            { nodeId: "outside_6", position: { yaw: "270deg", pitch: "0deg" } },
        ],
    },
    {
        id: "outside_1",
        name: t("node.east"),
        panorama: "/img/tour/outside_1.jpg",
        mapPosition: { x: 1609, y: 450 },
        links: [
            { nodeId: "outside_2", position: { yaw: "210deg", pitch: "0deg" } },
            { nodeId: "cluster_1", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "gaming_1", position: { yaw: "80deg", pitch: "0deg" } },
        ],
    },
    {
        name: t("node.cluster"),
        id: "cluster_1",
        panorama: "/img/tour/cluster_1.jpg",
        mapPosition: { x: 1652, y: 438 },
        links: [
            { nodeId: "cluster_2", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_1", position: { yaw: "180deg", pitch: "0deg" } },
        ],
    },
    {
        name: t("node.cluster"),
        id: "cluster_2",
        panorama: "/img/tour/cluster_2.jpg",
        mapPosition: { x: 1701, y: 421 },
        links: [{ nodeId: "cluster_1", position: { yaw: "180deg", pitch: "0deg" } }],
    },
    {
        name: t("node.gaming_front"),
        id: "gaming_1",
        panorama: "/img/tour/gaming_1.jpg",
        mapPosition: { x: 1676, y: 504 },
        links: [
            { nodeId: "gaming_2", position: { yaw: "90deg", pitch: "0deg" } },
            { nodeId: "gaming_3", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "outside_2", position: { yaw: "200deg", pitch: "0deg" } },
        ],
    },
    {
        name: t("node.gaming_front"),
        id: "gaming_2",
        panorama: "/img/tour/gaming_2.jpg",
        mapPosition: { x: 1692, y: 546 },
        links: [{ nodeId: "gaming_1", position: { yaw: "270deg", pitch: "0deg" } }],
    },
    {
        name: t("node.gaming_back"),
        id: "gaming_3",
        panorama: "/img/tour/gaming_3.jpg",
        mapPosition: { x: 1723, y: 488 },
        links: [{ nodeId: "gaming_1", position: { yaw: "180deg", pitch: "0deg" } }],
    },
    {
        id: "community_1",
        panorama: "/img/tour/community_1.jpg",
        name: t("node.community_back"),
        mapPosition: { x: 1256, y: 390 },
        links: [
            { nodeId: "outside_10", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "community_8", position: { yaw: "130deg", pitch: "0deg" } },
        ],
        markers: [
            {
                id: "marker-1",
                polygon: [
                    [2.081, 0.2121],
                    [2.2951, 0.2943],
                    [2.2961, -0.3886],
                    [2.0825, -0.2856],
                ],
                svgStyle: {
                    fill: "rgba(147, 220, 50, 0.2)",
                    stroke: "rgb(147 220 50)",
                    strokeWidth: "8px",
                },
                tooltip: {
                    content: renderToStaticMarkup(
                        <BoxTooltip
                            icon={LucideSparkles}
                            title={t("marker.community.title")}
                            description={t("marker.community.description")}
                            clickable
                            clickLabel={t("label.enter")}
                        />
                    ),
                },
                data: { targetNode: "community_8" },
            },
        ],
    },
    {
        id: "community_2",
        panorama: "/img/tour/community_2.jpg",
        name: t("node.community_floor_2"),
        mapPosition: { x: 1236, y: 362 },
        links: [
            { nodeId: "community_8", position: { yaw: "90deg", pitch: "0deg" } },
            { nodeId: "community_7", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "community_3", position: { yaw: "40deg", pitch: "0deg" } },
        ],
    },
    {
        id: "community_3",
        panorama: "/img/tour/community_3.jpg",
        name: t("node.community_floor_2"),
        mapPosition: { x: 1248, y: 389 },
        links: [
            { nodeId: "community_2", position: { yaw: "220deg", pitch: "0deg" } },
            { nodeId: "community_4", position: { yaw: "110deg", pitch: "0deg" } },
        ],
    },
    {
        id: "community_4",
        panorama: "/img/tour/community_4.jpg",
        name: t("node.community_floor_2"),
        mapPosition: { x: 1237, y: 418 },
        links: [
            { nodeId: "community_3", position: { yaw: "290deg", pitch: "0deg" } },
            { nodeId: "community_5", position: { yaw: "180deg", pitch: "0deg" } },
        ],
    },
    {
        id: "community_5",
        panorama: "/img/tour/community_5.jpg",
        name: t("node.community_floor_2"),
        mapPosition: { x: 1170, y: 410 },
        links: [
            { nodeId: "community_4", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "community_6", position: { yaw: "230deg", pitch: "0deg" } },
        ],
    },
    {
        id: "community_6",
        panorama: "/img/tour/community_6.jpg",
        name: t("node.community_floor_2"),
        mapPosition: { x: 1148, y: 379 },
        links: [
            { nodeId: "community_5", position: { yaw: "50deg", pitch: "0deg" } },
            { nodeId: "outside_14", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "community_7", position: { yaw: "320deg", pitch: "0deg" } },
        ],
    },
    {
        id: "community_7",
        panorama: "/img/tour/community_7.jpg",
        name: t("node.community_floor_2"),
        mapPosition: { x: 1163, y: 353 },
        links: [
            { nodeId: "community_2", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "community_6", position: { yaw: "130deg", pitch: "0deg" } },
        ],
    },
    {
        id: "community_8",
        panorama: "/img/tour/community_8.jpg",
        name: t("node.community_floor_1"),
        mapPosition: { x: 1228, y: 417 },
        links: [
            { nodeId: "community_1", position: { yaw: "320deg", pitch: "0deg" } },
            { nodeId: "community_9", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "community_2", position: { yaw: "270deg", pitch: "0deg" } },
        ],
    },
    {
        id: "community_9",
        panorama: "/img/tour/community_9.jpg",
        name: t("node.community_floor_1"),
        mapPosition: { x: 1198, y: 413 },
        links: [
            { nodeId: "community_8", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "community_12", position: { yaw: "180deg", pitch: "0deg" } },
            { nodeId: "community_10", position: { yaw: "270deg", pitch: "0deg" } },
        ],
    },
    {
        id: "community_10",
        panorama: "/img/tour/community_10.jpg",
        name: t("node.community_floor_1"),
        mapPosition: { x: 1204, y: 358 },
        links: [
            { nodeId: "community_9", position: { yaw: "90deg", pitch: "0deg" } },
            { nodeId: "community_11", position: { yaw: "180deg", pitch: "0deg" } },
        ],
    },
    {
        id: "community_11",
        panorama: "/img/tour/community_11.jpg",
        name: t("node.community_floor_1"),
        mapPosition: { x: 1163, y: 353 },
        links: [
            { nodeId: "community_10", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "community_12", position: { yaw: "90deg", pitch: "0deg" } },
        ],
    },
    {
        id: "community_12",
        panorama: "/img/tour/community_12.jpg",
        name: t("node.community_floor_1"),
        mapPosition: { x: 1157, y: 408 },
        links: [
            { nodeId: "community_9", position: { yaw: "0deg", pitch: "0deg" } },
            { nodeId: "community_11", position: { yaw: "270deg", pitch: "0deg" } },
        ],
    }
];