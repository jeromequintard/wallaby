// Méthodes pour l'accès au path
const path = require('path');

// Obtient le chemin absolu du projet
const projectPath = path.resolve(__dirname, '..');

// Renvoi un bind de la fonction join avec projectPath comme argument
const getPath = path.join.bind(path, projectPath);

// Récupère le nom du script NPM exécuté
const EVENT = process.env.npm_lifecycle_event || '';

// Exporte les fonctions
exports.getPath = getPath;
