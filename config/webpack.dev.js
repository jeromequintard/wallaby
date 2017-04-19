// On requiert webpack
const webpack = require('webpack');

// Helper
const helpers = require('./webpack.helpers.js');

// Configuration commune de webpack
const commonConfig = require('./webpack.common.js');

// Pour fusioner les configurations de webpack
const webpackMerge = require('webpack-merge');

// Pour définir des variables accessibles via le code
const DefinePlugin = require('webpack/lib/DefinePlugin');

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

    // Module (loaders)
    module: {
      rules: [

        // Fichier CSS
        // {
        //     test: /\.css$/,
        //     loader: ['style-loader', 'css-loader'],
        //     include: [helpers.getPath('src/assets/css'), helpers.getPath('src/lib/**/')]
        // },

        // Fichier SASS
        // {
        //     test: /\.scss$/,
        //     loader: ['style-loader', 'css-loader', 'sass-loader'],
        //     include: [helpers.getPath('src/assets/sass'), helpers.getPath('src/lib/**/')]
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
      }),

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
