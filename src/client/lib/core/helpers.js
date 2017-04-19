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
