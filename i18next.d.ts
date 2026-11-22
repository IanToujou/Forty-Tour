import "i18next";
import type common from "@/locales/en/common.json";
import type error from "@/locales/en/error.json";
import type form from "@/locales/en/form.json";
import type home from "@/locales/en/home.json";
import type tour from "@/locales/en/tour.json";
import type map from "@/locales/en/map.json";
import type privacy from "@/locales/en/privacy.json";
import type legal from "@/locales/en/legal.json";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "common";
        resources: {
            common: typeof common;
            error: typeof error;
            form: typeof form;
            home: typeof home;
            tour: typeof tour;
            map: typeof map;
            privacy: typeof privacy;
            legal: typeof legal;
        };
    }
}
