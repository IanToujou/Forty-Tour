import "i18next";
import type common from "@/locales/en/common.json";
import type home from "@/locales/en/home.json";
import type tour from "@/locales/en/tour.json";
import type privacy from "@/locales/en/privacy.json";
import type legal from "@/locales/en/legal.json";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "common";
        resources: {
            common: typeof common;
            home: typeof home;
            tour: typeof tour;
            privacy: typeof privacy;
            legal: typeof legal;
        };
    }
}
