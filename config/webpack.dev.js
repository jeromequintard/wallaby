// On requiert webpack
const webpack = require('webpack');

// Helper
const helpers = require('./webpack.helpers.js');

// Configuration commune de webpack
const commonConfig = require('./webpack.common.js');

// Pour fusioner les configurations de webpack
const webpackMerge = require('webpack-merge');

// Définie une constante sur l'environnement courant
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = function() {
  // Renvoi la configuration actuelle fusionné avec la configuration commune
  return webpackMerge(commonConfig(), {

    // On définit le point d'entrée.
    entry: {
      app: [
        'react-hot-loader/patch',
        './src/client/main',
      ],
    },

    // On définit le point de sortie
    output: {
      path: helpers.getPath('dist'),
      filename: '[name].[hash].js',
      sourceMapFilename: '[file].map',
      devtoolModuleFilenameTemplate: 'webpack:///[resource-path]?[loaders]',
    },

    // Génère le source map
    devtool: 'eval',

    // Plugins (tâches)
    plugins: [

      // Nomme le plugins (console)
      new webpack.NamedModulesPlugin(),
    ],

    // Configuration de webpack dev server
    devServer: {
      port: '8080',
      host: '0.0.0.0',
      stats: 'errors-only',
      hot: true,
      contentBase: helpers.getPath('dist'),
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
    },
  });
};
