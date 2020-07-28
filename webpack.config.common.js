const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');


const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev;


const filename = ext => isDev ? `${ext}/[name].${ext}` : `${ext}/[name].[hash].${ext}`

const webpackConfig = {
    context: path.resolve(__dirname, "src"),
    entry: {
        main: ["@babel/polyfill", "./main.js"],
    },
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".js", ".json", ".png", ".jpg", ".jpeg", ".svg", ".gif", '.vue',],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "$style": path.resolve(__dirname, "src/style"),
            '@comps': path.resolve(__dirname, "src/components"),
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            // title: "kran", без template
            template: "index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({
        }),
        new MiniCssExtractPlugin({
            filename: filename("css")
        }),

        // new CopyWebpackPlugin({
        //     patterns: [
        //         // {
        //         //     from: path.resolve(__dirname, "/../../src/favicon.ico"),
        //         //     to: path.resolve(__dirname, "dist")
        //         // }
        //     ]
        // }),


    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env"
                        ]

                    }
                }
            },

            {
                test: /\.css$/,
                use: [
                    // isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    
                    MiniCssExtractPlugin.loader,
                    
                    {
                        loader: 'css-loader',
                        options:
                        {
                            sourceMap: isDev
                        }
                    },
                    {
                        loader: 'postcss-loader', options: {
                            sourceMap: isDev,
                            config: {
                                path: './postcss.config.js'
                            },
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|svg|gif|jpeg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: "images"
                        }
                    }
                ],
            },
            {
                test: /\.(woff2|woff|ttf|eot )$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            // name: '[path][name].[ext]',
                            outputPath: "fonts"
                        }
                    }
                ]
            },
            {
                test: /\.xml$/,
                use: [{ loader: "xml-loader" }]
            },
            {
                test: /\.csv$/,
                use: ["csv-loader"]
            }
        ]
    }
}

module.exports = webpackConfig;