import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Outfit:wght@100..900&display=swap"
                    rel="stylesheet"
                />
                <meta name="keywords" content="School 42, Campus, Forty2, Forty 2, Island, Oléron, Digital, Tour" />
                <meta name="author" content="Toujou Studios" />
                <meta name="rating" content="general" />
                <meta name="theme-color" content="#14b8a6" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
