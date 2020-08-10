const webpack = require("webpack");
const withPlugins = require("next-compose-plugins");
// const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withGraphql = require("next-plugin-graphql");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withSourceMaps = require("@zeit/next-source-maps")();

const env = require("./env.js");
const {withOffline, offlinePluginConfig} = require("./next-offline.config");

const sourceMapsconfig = {
    webpack: (config, {isServer, buildId}) => {
        config.plugins.push(
            new webpack.DefinePlugin({
                "process.env.SENTRY_RELEASE": JSON.stringify(buildId)
            })
        );
        if (!isServer) {
            config.resolve.alias["@sentry/node"] = "@sentry/browser";
        }
        return config;
    }
};

module.exports = withPlugins([
    [withSourceMaps, sourceMapsconfig],
    [withGraphql],
    // [withCSS],
    // [withOffline, offlinePluginConfig],
    [withSass],
    [withBundleAnalyzer],
], {
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: "static",
            reportFilename: "./analyze/server.html"
        },
        browser: {
            analyzerMode: "static",
            reportFilename: "./analyze/client.html"
        }
    },
    env
});
