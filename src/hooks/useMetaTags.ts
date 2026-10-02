import { useRouter } from "next/router";

const DOMAIN = "https://forty-tour.com";
const LOCALES = ["en", "de", "fr"] as const;
type LocaleCode = (typeof LOCALES)[number];

const OG_LOCALE_MAP: Record<LocaleCode, string> = {
    en: "en_GB",
    de: "de_DE",
    fr: "fr_FR",
};

function buildUrl(path: string, locale: string, defaultLocale: string) {
    const cleanPath = path === "/" ? "" : path;
    return locale === defaultLocale ? `${DOMAIN}${cleanPath}` : `${DOMAIN}/${locale}${cleanPath}`;
}

export function useMetaTags(path: string) {
    const router = useRouter();
    const locale = (router.locale ?? "lb") as LocaleCode;
    const defaultLocale = router.defaultLocale ?? "lb";

    const canonical = buildUrl(path, locale, defaultLocale);
    const xDefault = buildUrl(path, defaultLocale, defaultLocale);

    const alternates = LOCALES.map((code) => ({
        hrefLang: code,
        href: buildUrl(path, code, defaultLocale),
    }));

    const ogLocale = OG_LOCALE_MAP[locale] ?? OG_LOCALE_MAP.en;
    const ogAlternates = LOCALES.filter((c) => c !== locale).map((c) => OG_LOCALE_MAP[c]);

    return { canonical, xDefault, alternates, ogLocale, ogAlternates };
}
