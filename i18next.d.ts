import "i18next";
import type common from "@/locales/en/common.json";
import type home from "@/locales/en/home.json";
import type tour from "@/locales/en/tour.json";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "common";
        resources: {
            common: typeof common;
            home: typeof home;
            tour: typeof tour;
        };
    }
}
