const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const environment = isProduction ? "production" : "development";
  const devPort = process.env.DEV_PORT || 3001;

  return {
    entry: "./src/index.js",
    output: {
      filename: "[name].[chunkhash].js",
      chunkFilename: "[name].[chunkhash].js",
      path: path.resolve(__dirname, "build"),
    },
    mode: environment,
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "build"),
      },
      port: devPort,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
    },
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "disabled",
      }),
    ],
  };
};
