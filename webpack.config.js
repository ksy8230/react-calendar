const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // entry: 웹팩에게 어플리케이션이 어디서 시작하고 어디서부터 파일들을 묶을건지 시작점을 정해준다.
  entry: "./src/index.js",
  // 현재 개발 모드에서 작업 중임을 알려줌.
  mode: "development",
  // export한 JS 모듈이 어떻게 변환되는지 정의한다. 방법은 rules에 정의한 대로 이루어진다.
  module: {
    rules: [
      // 첫번째 룰: ES6, JSX 구문 변환에 대한 것.
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // 두번째 룰: CSS 처리에 대한 것. css-loader가 작동하기 위해서는 style-loader가 필요.
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // MiniCssExtractPlugin.loader, // js 스트링에서 스타일 노드 생성
          "style-loader",
          "css-loader", // css를 js로 변환
          "sass-loader" // 노드 사스를 이용해 sass를 css로 컴파일
        ],
        exclude: /node_modules/
      }
    ],
  },
  // resolve: 웹팩이 해석할 확장자를 지정.
  resolve: { extensions: ["*", ".js", ".jsx", ".scss"] },
  // output: 번들링 된 결과물을 어디다 둘 것인지에 대한 설정이 가능.
  output: {
    path: path.join(__dirname, "dist/"),
    filename: "bundle.js",
  },
  // webpack-dev-server의 옵션을 설정
  devServer: {
    // 정적 파일 경로 설정
    static: {
      directory: path.join(__dirname, "public/"),
    },
    devMiddleware: {
      publicPath: "https://localhost:3000/dist/",
    },
    port: 3000,
    // devserver 에서만 핫로딩 가능하게
    // hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      // 번들링된 JS를 주입하고 결과물을 옮길 대상이 되는 파일을 지정
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/style.css' })
  ],
};
