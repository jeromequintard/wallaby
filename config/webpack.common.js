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

        // Eslint
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          loader: 'eslint-loader',
          exclude: [
            /(node_modules|\.spec\.js)/,
          ],
          options: {
            quiet: true,
          },
        },

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

        // Fichiers JSON
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: /node_modules/,
        },

        // Fichiers CSS
        {
          test: /\.css$/,
          loader: ['style-loader', 'css-loader'],
          exclude: /node_modules/,
       //       exclude: [helpers.getPath('src/assets/css'), helpers.getPath('src/lib/**/')]
        },

        // Fichier SASS
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader',
              options: {
                data: '@import "src/client/assets/sass/themes/light/theme.scss";',
              },
            },
          ],
          exclude: /node_modules/,
      //          exclude: [helpers.getPath('src/assets/sass'), helpers.getPath('src/scss/**/')]
        },

        // Images
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file-loader',
        },

        // Polices
        {
          test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
          loader: 'file-loader',
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
