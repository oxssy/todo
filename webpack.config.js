const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/* eslint-disable sort-keys, comma-dangle */
module.exports = (env) => {
  const cssFileName = 'bundle.css';
  const config = {
    context: resolve('./'),
    entry: {search: './app/index.jsx'},
    output: {
      filename: "bundle.js",
      path: resolve('./public'),
      pathinfo: true
    },
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [{
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader'
          }]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.(png|jpg|gif|swf|ico)$/,
          use: 'file-loader?name=[name].[ext]'
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
          use: 'file-loader?name=[name].[ext]'
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin(),
      new ExtractTextPlugin(cssFileName),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          autoprefixer: false,
          calc: false,
          colormin: false,
          convertValues: false,
          core: true,
          discardComments: {removeAll: true},
          discardDuplicate: true,
          discardEmpty: true,
          discardOverridden: true,
          discardUnused: false, // unsafe
          filterOptimiser: true,
          filterPlugins: true,
          functionOptimiser: true,
          mergeIdents: false, // unsafe
          mergeLonghand: true,
          mergeRules: true,
          minifyFontValues: true,
          minifyGradients: false,
          minifyParams: true,
          minifySelectors: true,
          normalizeCharset: true,
          normalizeStrings: {preferredQuote: 'single'},
          normalizeUnicode: false,
          normalizeUrl: false,
          orderedValues: true,
          reduceBackgroundRepeat: false,
          reduceDisplayValues: true,
          reduceIdents: false, // unsafe
          reduceInitial: false,
          reducePositions: false,
          reduceTimingFunctions: false,
          reduceTransforms: true,
          styleCache: true,
          svgo: true,
          uniqueSelectors: true,
          zindex: false, // unsafe
        },
        canPrint: false // Breaks parsing performed in processBundleHash if set to true
      }),
      new webpack.optimize.UglifyJsPlugin(),
    ]
  };
  return config;
};
