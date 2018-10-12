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
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        library: "bundle",
        libraryTarget: "umd",
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    target: "node",
    mode: "none",
    plugins: [
        new CleanWebpackPlugin(clean_paths, clean_options),
        new UglifyJsPlugin({
            cache: true,
            parallel: true
        }),
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
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: "bundle.js.map"
        })
    ]
};
