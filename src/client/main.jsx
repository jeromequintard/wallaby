import { AppContainer as HotContainer } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Redbox from 'redbox-react';

// import AppPage from 'components/appPage/container';
import App from 'components/app';

// Mise en place du console.error en plus de la redbox
const consoleErrorReporter = ({ error }) => {
  console.error(error);
  return <Redbox error={error} />;
};

consoleErrorReporter.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

// Fonction d'intialisation
(function init() {
  // On créé un tag app
  const app = document.createElement('app');
  // On cherche le tag script
  const script = document.getElementsByTagName('script')[0];
  // On l'insert avant le tag script
  document.body.insertBefore(app, script);
  // Le DOM est chargé
  document.addEventListener('DOMContentLoaded', () => {

    // On wrap le composant dans le AppContainer de HMR
    const render = (Component) => {
      ReactDOM.render(
        <HotContainer errorReporter={consoleErrorReporter}>
          <Component />
        </HotContainer>,
        document.getElementsByTagName('app')[0]);
    };

    // On effectue le rendu du composant
    render(App);

    // Si HMR est activé
    // A chaque mise à jour, on refait le rendu
    if (module.hot) {
      module.hot.accept('./components/app', () => {
        /* eslint-disable global-require */
        const UpdateApp = require('./components/app').default;
        /* eslint-enable global-require */
        render(UpdateApp);
      });
    }
  });
}());
