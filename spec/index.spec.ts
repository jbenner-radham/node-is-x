import { isExecutable, isExecutableSync } from '../src/index.js';
import { describe, expect, it } from 'vitest';

describe('isExecutable', () => {
  it('is a function', () => {
    expect(isExecutable).toBeTypeOf('function');
  });
});

describe('isExecutableSync', () => {
  it('is a function', () => {
    expect(isExecutableSync).toBeTypeOf('function');
  });
});
