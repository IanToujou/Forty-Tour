import type { NextConfig } from "next";
import { i18n } from "./next-i18next.config";

module.exports = { i18n };

const nextConfig: NextConfig = {
    i18n,
    reactStrictMode: true,
};

export default nextConfig;
