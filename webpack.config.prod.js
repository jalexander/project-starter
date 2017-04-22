import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin';

const devtool = 'source-map'
const isSourceMap = devtool.indexOf('sourcemap') >= 0 || devtool.indexOf('source-map') >= 0

export default {
  devtool,
  entry: {
      vendor: path.resolve(__dirname, 'src/vendor'),
      main: path.resolve(__dirname, 'src/index')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  plugins: [
    // generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    new webpack.optimize.CommonsChunkPlugin({
      // vendor libs + extracted manifest
      name: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),

    new webpack.HashedModuleIdsPlugin(),
    // hash the files using MD5 so that their names change when the content changes
    new WebpackMd5Hash(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),

    // create HTML file that includes reference to bundled js
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    }),

    // minify js
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: isSourceMap
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: isSourceMap
            }
          }
        })
      }
    ]
  },
  resolve: {
    modules: [ 'node_modules' ],
  }
}
