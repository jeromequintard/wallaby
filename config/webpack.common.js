// On requiert webpack
const webpack = require('webpack');

// On requiert un helper pour la configuration
const helpers = require('./webpack.helpers.js');

// On définit quelques plugins à charger
const HappyPack                  = require('happypack');
const CopyWebpackPlugin          = require('copy-webpack-plugin');
const HtmlWebpackPlugin          = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = function (options) {
  return {

    // On configure la découverte
    resolve: {
      // Définit les fichier à découvrir dans un répertoire si aucune précision
      // ex. import { comp } from component cherchera component/main.js par exemple
      mainFiles: ['index', 'main'],
      // On définit les extensions à découvrir
      extensions: ['.js', '.jsx'],
      // On créé un alias vers le répertoire lib pour facilier l'accès
      alias: {
        lib: helpers.getPath('src/client/lib/'),
        components: helpers.getPath('src/client/components/'),
      },
      // On définit les répertoires ou la résolution est possible (accélère le build de webpack)
      modules: [
        helpers.getPath('src/client'),
        helpers.getPath('node_modules'),
      ],
    },

    // Module (loaders)
    module: {
      rules: [

        // Fichier JS
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },

        // Fichier JSX
        {
          test: /\.jsx$/,
          loader: 'happypack/loader',
          exclude: /node_modules/,
        },
      ],
    },

    // Plugins (tâches)
    plugins: [

      new HappyPack({
        loaders: ['babel-loader'],
        cacheContext: {
          env: process.env.NODE_ENV,
        },
      }),

      // Injecte dans le head le fichier bundle JS de webpack
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/client/main.html',
        chunksSortMode: 'dependency',
        inject: 'body',
      }),

      // Ajoute l'attribut defer au script
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
      }),
    ],
  };
};
