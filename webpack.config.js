const path = require("path");
const os = require("os");
const fs = require("fs");
const NodeExternals = require("webpack-node-externals");
const TSCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ENTRY = fs
  .readdirSync(path.resolve(__dirname, "src/front"))
  .filter((v) => /^([A-Z]\w+?)+$/.test(v));
const ENTRY_FRONT = ENTRY.reduce((pv, v) => {
  pv[v] = path.resolve(__dirname, `src/front/${v}/index.ts`);
  return pv;
}, {});
const ENTRY_STYLE = ENTRY.reduce((pv, v) => {
  pv[v] = path.resolve(__dirname, `src/front/${v}/style.scss`);
  return pv;
}, {});

const ANCESTOR = {
  cache: true,
  module: {
    rules: [
      {
        test: /\.ts?$/i,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: os.cpus().length - 1,
            },
          },
          {
            loader: "ts-loader",
            options: {
              happyPackMode: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".scss", ".css"],
    alias: {
      back: path.resolve(__dirname, "src/back"),
      front: path.resolve(__dirname, "src/front"),
    },
  },
  plugins: [
    new TSCheckerPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
};

module.exports = [
  {
    ...ANCESTOR,
    name: "front",
    target: "web",
    entry: ENTRY_FRONT,
    output: {
      path: path.resolve(__dirname, "dist", "pages"),
    },
    externals: {},
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  },
  {
    ...ANCESTOR,
    name: "style",
    entry: ENTRY_STYLE,
    output: {
      path: path.resolve(__dirname, "dist", "pages"),
      filename: "[name].dummy.js",
    },
    plugins: [
      ...ANCESTOR.plugins,
      new CleanWebpackPlugin({
        protectWebpackAssets: false,
        cleanOnceBeforeBuildPatterns: [],
        cleanAfterEveryBuildPatterns: ["*.dummy.js"],
      }),
      new MiniCSSExtractPlugin(),
    ],
  },
  {
    ...ANCESTOR,
    name: "back",
    target: "node",
    devtool: "hidden-source-map",
    entry: path.resolve(__dirname, "src/back/Main.ts"),
    output: {
      path: path.join(__dirname, "dist"),
      filename: "Main.js",
    },
    node: {
      __filename: false,
      __dirname: false,
    },
    externals: [NodeExternals()],
    optimization: {
      minimize: false,
    },
  },
];
