import React from 'react';
import Main from 'components/app';

import * as helpers from './helpers.js';

describe('classHelper', () => {
  it('doit renvoyer une classe des paramètres sont indiqués', () => {
    expect(helpers.classHelper('a', { b:true }, { c:false }, ['d', 'e', 'f'])).toBe('a b d e f');
  });

  it('doit générer une erreur si un type incompatible est indiqué', () => {
    expect(() => { helpers.classHelper(true); }).toThrow();
  });
});
