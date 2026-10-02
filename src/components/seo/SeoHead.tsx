import Head from "next/head";
import { useMetaTags } from "@/hooks/useMetaTags";
import { SeoHeadProps } from "@/types/props/seo/SeoHeadProps";

const SeoHead = ({
    path,
    title,
    description,
    image = "https://forty-tour.com/img/meta/logo.png",
    robots = "index, follow",
    ogType = "website",
    jsonLd,
}: SeoHeadProps) => {
    const { canonical, xDefault, alternates, ogLocale, ogAlternates } = useMetaTags(path);

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            {alternates.map(({ hrefLang, href }) => (
                <link key={hrefLang} rel="alternate" hrefLang={hrefLang} href={href} />
            ))}
            <link rel="alternate" hrefLang="x-default" href={xDefault} />
            <meta name="robots" content={robots} />
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content="Forty Tour" />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={image} />
            <meta property="og:description" content={description} />
            <meta property="og:locale" content={ogLocale} />
            {ogAlternates.map((alt) => (
                <meta key={alt} property="og:locale:alternate" content={alt} />
            ))}
            {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
        </Head>
    );
};

export default SeoHead;
