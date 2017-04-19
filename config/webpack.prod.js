// Helper
const helpers = require('./webpack.helpers.js');

// Configuration commune de webpack
const commonConfig = require('./webpack.common.js');

// Pour fusioner les configurations de webpack
const webpackMerge = require('webpack-merge');

// Définie une constante sur l'environnement courant
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

// On définit quelques plugins à charger
const DefinePlugin       = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const OptimizeJsPlugin   = require('optimize-js-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const WebpackMd5Hash     = require('webpack-md5-hash');
const UglifyJsPlugin     = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = function() {
  // Renvoi la configuration actuelle fusionné avec la configuration commune
  return webpackMerge(commonConfig(), {

    // On définit le point d'entrée.
    entry: {
      app: './src/main.jsx',
    },

    // On définit le point de sortie
    output: {
      path: helpers.getPath('dist'),
      filename: '[name].[chunkHash].js',
    },

    // Génère le source map par ligne
    devtool: 'source-map',

    // Module (loaders)
    module: {
      rules: [

        // Fichiers CSS
        // {
        //     test: /\.css$/,
        //     loader: ExtractTextPlugin.extract({
        //         fallback: 'style-loader',
        //         loader: 'css-loader'
        //     }),
        //     include: [helpers.getPath('src/assets/css')]
        // },

        // Fichiers SASS
        // {
        //     test: /\.scss$/,
        //     loader: ExtractTextPlugin.extract({
        //         fallback: 'style-loader',
        //         loader: 'css-loader!sass-loader'
        //     }),
        //     include: [helpers.getPath('src/assets/sass')]
        // }

      ],
    },

    // Plugins (tâches)
    plugins: [

      new DefinePlugin({
        ENV: JSON.stringify(ENV),
        'process.env': {
          ENV: JSON.stringify(ENV),
        },
        osiki: {
          API : 'A DEFINIR',
        },
      }),

      // Optimisation des JS
      new OptimizeJsPlugin({
        sourceMap: false,
      }),

      new CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module => /node_modules/.test(module.resource),
      }),

      new WebpackMd5Hash(),

      // Minimize et rend complexe le code JS à lire
      new UglifyJsPlugin({
        beautify: false,
        output: { comments: false },
        mangle: { screw_ie8: true },
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false,
        },
      }),
    ],
  });
};
