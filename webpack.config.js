const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "main.js",
    clean: true,
  },
  target: "web",
  devServer: {
    static: ["./public"],
    port: 3000,
    open: true,
    hot: true,
    liveReload: true,
    allowedHosts: ["all"],
    historyApiFallback: true,
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: "src/template/index.html",
      inject: "body",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      // swDest: "../workboxServiceWorker.js",
      maximumFileSizeToCacheInBytes: 1024000 * 4, // 只缓存 4M 以下的文件
      include: [/.*.(png|jpg|jpeg|svg|ico|webp)$/], // 只缓存图片、js、css
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: "favicon" },
        { from: "src/asset/favicon", to: "favicon" },
        { from: "src/asset/images", to: "images" },
      ],
    }),
  ],
};
