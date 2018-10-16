const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const DeclarationFilesPlugin = require("@ahrakio/witty-webpack-declaration-files");
const webpack = require("webpack");

// Clean configurations
const clean_paths = ["dist"];

const clean_options = {
    watch: true
};

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: "source-map-loader",
                enforce: "pre"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        library: "router",
        libraryTarget: "umd",
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    target: "node",
    mode: "none",
    devtool: "source-map",
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    keep_classnames: true
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(clean_paths, clean_options),
        new DeclarationFilesPlugin({
            merge: true,
            include: [
                "Router",
                "Route",
                "Method",
                "RouteInstance",
                "RouteOptions",
                "RouteTargetParser",
                "RouteDefaultParser",
                "NoRoute",
                "RouteConflict",
                "Map",
                "Params"
            ]
        })
    ]
};
