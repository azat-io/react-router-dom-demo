import dotenv from 'dotenv'
import path from 'path'
import {
  DefinePlugin,
  HotModuleReplacementPlugin,
} from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackTemplate from 'html-webpack-template'
import WebappWebpackPlugin from 'webapp-webpack-plugin'

dotenv.config()

export default {
  entry: './App',
  output: {
    path: path.join(__dirname, './public'),
    filename: 'js/main.[hash].js',
    pathinfo: false,
  },
  resolve: {
    modules: [
      path.resolve('./'),
      path.resolve('./node_modules'),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: HtmlWebpackTemplate,
      title: 'react-router-dom-demo',
      cache: true,
      inject: true,
      appMountId: 'app',
      mobile: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
      },
    }),
    new WebappWebpackPlugin({
      logo: './assets/logo.svg',
      favicons: {
        appName: 'react-router-dom-demo',
        background: '#725c7b',
        theme_color: '#725c7b',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false,
        },
      },
    }),
    new DefinePlugin({
      API_PREFIX: JSON.stringify(process.env.API_PREFIX),
    }),
    new HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [{
      test: /\.js$/i,
      exclude: [
        '/node_modules/',
        '/public/',
      ],
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      }],
    }, {
      test: /\.(graphql|gql)$/i,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    }, {
      test: /\.(gif|png|jpe?g)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75,
            },
          },
        },
      ],
    }, {
      test: /\.svg$/i,
      use: [{
        loader: 'raw-loader',
      }, {
        loader: 'svgo-loader',
        options: {
          plugins: [{
            removeTitle: true,
          }, {
            convertColors: {
              shorthex: false,
            },
          }, {
            convertPathData: false,
          }],
        },
      }],
    }],
  },
  devServer: {
    port: process.env.CLIENT_PORT,
    open: true,
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: false,
      publicPath: false,
    },
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
}
