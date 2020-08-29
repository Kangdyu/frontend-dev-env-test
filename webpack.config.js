const path = require("path");
const MyWebpackPlugin = require("./my-webpack-plugin");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/app.js",
    },
    output: {
        path: path.resolve("./dist"),
        filename: "[name].js",
    },
    // 로더는 module에 넣음
    // 로더는 각 파일에 대해서 실행
    module: {
        rules: [
            {
                test: /\.css$/,
                // 순서: 뒤에서 앞으로
                use: [
                    process.env.NODE_ENV === "production"
                        ? MiniCssExtractPlugin.loader
                        : "style-loader",
                    "css-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "url-loader",
                options: {
                    // publicPath: "./dist/",
                    name: "[name].[ext]?[hash]",
                    // 20kb 아래면 바로 base64 기반으로 박아버리고 아니면
                    // file-loader를 실행하여 이미지의 src를 설정함
                    limit: 20000, // 20kb
                },
            },
        ],
    },
    // 플러그인은 plugins에 넣음
    // 플러그인은 하나로 뭉친 번들 파일에 대해 실행
    plugins: [
        // new MyWebpackPlugin()
        // output js 맨 상단에 주석 달아줌
        new webpack.BannerPlugin({
            banner: `
                Build Date: ${new Date().toLocaleString()}
                Commit Version: ${childProcess.execSync(
                    "git rev-parse --short HEAD"
                )}
                Author: ${childProcess.execSync("git config user.name")}
            `,
        }),
        // js 파일에서 TWO 라는 상수로 접근 가능
        // console.log(TWO)
        new webpack.DefinePlugin({
            TWO: "1+1",
            TWO_STRING: JSON.stringify("1+1"),
            "api.domain": JSON.stringify("http://dev.api.domain.com"),
        }),
        // 빌드 과정에 html 파일을 포함하도록 해주는 플러그인
        // dist에 index.html이 들어감
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            templateParameters: {
                env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
            },
            // production일때만 minify를 실행
            minify:
                process.env.NODE_ENV === "production"
                    ? {
                          // 빈칸 제거
                          collapseWhitespace: true,
                          // 주석 제거
                          removeComments: true,
                      }
                    : false,
        }),
        // 빌드 시 dist 폴더 자동 삭제
        new CleanWebpackPlugin(),
        // js에서 css를 뽑아내는 역할을 함
        ...(process.env.NODE_ENV === "production"
            ? [
                  new MiniCssExtractPlugin({
                      filename: "[name].css",
                  }),
              ]
            : []),
    ],
};
