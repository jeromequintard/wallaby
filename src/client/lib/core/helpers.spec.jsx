import React from 'react';
import App from 'components/app';

import * as helpers from './helpers.js';

describe('newGUID', () => {
  it('doit renvoyer un GUID de 10 caractères', () => {
    expect(helpers.newGUID()).toHaveLength(10);
  });
});

describe('classHelper', () => {
  it('doit renvoyer une classe des paramètres sont indiqués', () => {
    expect(helpers.classHelper('a', { b:true }, { c:false }, ['d', 'e', 'f'])).toBe('a b d e f');
  });

  it('doit généréer une erreur si un type incompatible est indiqué', () => {
    expect(() => { helpers.classHelper(true); }).toThrow();
  });
});

describe('stripTags', () => {
  it('doit renvoyer un contenu sans tag', () => {
    expect(helpers.stripTags('<div>Texte1</div><p>Texte2<span>Texte3</span></p>')).toBe('Texte1Texte2Texte3');
  });
});

describe('format', () => {
  it('doit renvoyer une chaîne formatée si un paramétre est indiqué', () => {
    expect(helpers.format('Je suis {0}', 'Jérôme')).toBe('Je suis Jérôme');
  });
  it('doit renvoyer la chaîne d\'origine sans paramètre', () => {
    expect(helpers.format('Je suis {0}', undefined)).toBe('Je suis {0}');
  });
});

// const radio = <Radio><Option>1</Option><Option>2</Option></Radio>;

/* it('doit vérifier le type de composant', () => {
  expect(helpers.isComponentOfType(Radio, radio)).toBe(true);
}); */

// it('doit filtrer des composants', () => {
//   // expect(helpers.filterReactChildren('','')
// });

describe('isEmpty', () => {
  it('renvoi vrai si un objet est vide', () => {
    expect(helpers.isEmpty({})).toBeTruthy();
  });
});

describe('isEqual', () => {
  it('renvoi faux avec des types différents', () => {
    expect(helpers.isEqual(true, 'abc')).toBeFalsy();
  });
  it('renvoi vrai des types identiques', () => {
    expect(helpers.isEqual('abc', 'abc')).toBeTruthy();
  });
  it('renvoi faux avec des tableaux de tailles différentes', () => {
    expect(helpers.isEqual(['a', 'b', 'c'], ['a', 'b'])).toBeFalsy();
  });
  it('renvoi vrai avec des tableaux de tailles identiques', () => {
    expect(helpers.isEqual(['a', 'b', 'c'], ['a', 'b', 'c'])).toBeTruthy();
  });
  it('renvoi vrai avec des objets identiques', () => {
    expect(helpers.isEqual(String, String)).toBeTruthy();
  });
  it('renvoi vrai avec des objets null', () => {
    expect(helpers.isEqual({}, {})).toBeTruthy();
  });
  it('renvoi vrai avec des fonctions identiques', () => {
    expect(helpers.isEqual(Math.abs, Math.abs)).toBeTruthy();
  });
});
