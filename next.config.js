/** @type {import('next').NextConfig} */

const { ANALYZE } = process.env;
const nextTranslate = require("next-translate-plugin");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: ANALYZE === "true",
});

const { locales, defaultLocale } = require("./i18n.json");

const nextConfig = {
    ...withBundleAnalyzer(
        nextTranslate({
            i18n: {
                locales,
                defaultLocale,
                localeDetection: false,
            },
            transpilePackages: ["lucide-react"],
        }),
    ),
};

module.exports = nextConfig;
