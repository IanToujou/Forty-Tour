import type { TFunction } from "i18next";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import { getTourNodes } from "./getTourNodes";
import { ComponentProps } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

type Plugins = ComponentProps<typeof ReactPhotoSphereViewer>["plugins"];

export const getTourPlugins = (t: TFunction<"tour">): Plugins => [
    [MarkersPlugin, {}],
    [
        VirtualTourPlugin,
        {
            renderMode: "3d",
            transitionOptions: { showLoader: true, speed: "20rpm", effect: "fade", rotation: true },
            arrowStyle: {
                size: { width: 60, height: 60 },
                className: "psv-custom-arrow",
                element: () => {
                    const el = document.createElement("div");
                    el.className = "psv-custom-arrow";
                    el.innerHTML = `
                        <svg width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg" class="hover:scale-110 duration-200">
                            <circle cx="42.5" cy="42.5" r="42.5" fill="white"/>
                            <path d="M68 54L43.954 28.5396C43.1648 27.7039 41.8352 27.7039 41.046 28.5396L17 54" stroke="#263136" stroke-width="7" stroke-linecap="round"/>
                        </svg>
                    `;
                    return el;
                },
            },
            nodes: getTourNodes(t),
            startNodeId: "parking_1",
        },
    ],
];
