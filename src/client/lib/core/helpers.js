/*
* Copyright (c) 2016 Ikise. All Rights reserved.
* Licensed under the MIT license. Contact us for full license information.
*
* This file is part of the Osiki UI package.
*
* First author : Jérôme Quintard <jquintard@ikise.com>
*
* Resume : Core Helpers
*/

import React from 'react';

/* Génère un GUID ======================================================= */

export function newGUID(size = 10) {
  // Caractères autorisés dans le GUID
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let GUID = '';
  // Tant que l'on a pas le nombre souhaité de caractères
  while (GUID.length < size) {
    // On cumul en prenant au hasard
    GUID += chars[Math.floor((Math.random() * chars.length))];
  }

  return GUID;
}

/* Génère une classe à partir d'un plain object ========================= */

export function classHelper(...args) {
  const classes = [];

  // Pour chaque argument
  for (const arg of args) {
    // En fonction du type d'argument
    switch (typeof arg) {
      case 'string':
      case 'number':
        classes.push(arg);
        break;
      case 'object':
        // Est-ce un tableau ?
        if (Array.isArray(arg)) {
          // On le push
          classes.push(...arg);
        } else {
          // Pour chaque propriété de l'objet
          for (const prop in arg) {
            // Si OK on l'ajoute à la liste
            if (arg[prop]) classes.push(prop);
          }
        }
        break;
      default:
        throw new Error('Incorrect arg type');
    }
  }
  // On retourne les classes
  return classes.join(' ');
}

/* Formate une chaine de caractères ===================================== */

export function format(expression, ...args) {
  // On recherche toutes occurences de pramètres dans expression
  return expression.replace(/{(\d+)}/g, (match, number) => {
    // Remplace le paramètre par sa valeur ou laisse l'occurence telle quelle
    return typeof args[number] !== 'undefined' ? args[number] : match;
  });
}

/* Détermine si un composant est de type ================================ */

export function isComponentOfType(componentType, elementReact) {
  // FIXME: https://github.com/react-toolbox/react-toolbox/pull/1164
  if (module.hot) {
    return componentType.displayName === elementReact.type.name;
  }
  return elementReact && elementReact.type === componentType;
}

/* Retourne une liste d'éléments répondant à une condition ============== */

export function filterReactChildren(children, predicate) {
  // si il y a des enfants
  if (children) {
    const result = [];
    // Pour chaque enfant
    React.Children.forEach(children, (entry) => {
      // On vérifie il y a correspondance avec le prédicat
      if (predicate && predicate.call(this, entry)) {
        // Si on ajoute le composant à la liste finale
        result.push(entry);
      }
    });
    // On renvoi le resultat
    return result;
  }
  return undefined;
}

/* Strip les tags HTML d'une expression ================================= */

export function stripTags(expression) {
  return expression.replace(/(<\/?[^>]+>)/ig, '');
}

/* Vérifie si un objet est vide ou non ================================== */

export function isEmpty(obj) {
  return obj !== undefined &&
         Object.keys(obj).length === 0 &&
         obj.constructor === Object;
}

/* Vérifie si deux valeurs sont égales ou non =========================== */

export function isEqual(value1, value2) {
  // En fonction du type
  if (typeof value1 !== typeof value2) return false;
  // Si ce sont des fonctions
  if (typeof value1 === 'function') return value1.toString() === value2.toString();

  // Si ce sont des tableaux
  if (Array.isArray(value1) && Array.isArray(value2)) {
    // Si leur longueurs sont différentes
    if (value1.length !== value2.length) return false;
    // On vérifie que toutes les valeurs
    return value1.every((item, index) => {
      // sont égales
      return isEqual(item, value2[index]) === true;
    });
  }

  // Si ce sont des objects
  if (typeof value1 === 'object') {
    // Si les deux objets sont nuls
    if (value1 !== null && value2 !== null) return true;
    // Si le nombre de propriétés diffèrent
    if (Object.keys(value1).length !== Object.keys(value1).length) return false;
    // Pour chauque propriété
    return Object.keys(value1).forEach((key) => {
      // Si elles sont différentes
      if (!isEqual(value1[key], value2[key])) return false;
      return true;
    });
  }

  // Sinon
  return value1 === value2;
}
