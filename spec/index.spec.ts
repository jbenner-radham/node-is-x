import { isExecutable, isExecutableSync } from '../src/index.js';
import fs from 'node:fs';
import { open } from 'node:fs/promises';
import type { FileHandle } from 'node:fs/promises';
import { rimraf } from 'rimraf';
import { temporaryWrite } from 'tempy';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('isExecutable', () => {
  let file: FileHandle;
  let filepath: string;

  beforeEach(async () => {
    filepath = await temporaryWrite('#!/usr/bin/env node');
    file = await open(filepath);
  });

  afterEach(async () => {
    await file?.close();
    await rimraf(filepath);
  });

  it('is a function', () => {
    expect(isExecutable).toBeTypeOf('function');
  });

  it('resolves to a boolean', async () => {
    await expect(isExecutable(filepath)).resolves.toBeTypeOf('boolean');
  });

  it('resolves to true when the file is executable for all', async () => {
    await file.chmod(0o777);

    await expect(isExecutable(filepath)).resolves.toBe(true);
  });

  it('resolves to false when the file is not executable at all', async () => {
    await file.chmod(0o666);

    await expect(isExecutable(filepath)).resolves.toBe(false);
  });

  it('resolves to false when the file is executable for only the owner', async () => {
    await file.chmod(0o766);

    await expect(isExecutable(filepath)).resolves.toBe(false);
  });

  it('resolves to false when the file is executable for only the group', async () => {
    await file.chmod(0o676);

    await expect(isExecutable(filepath)).resolves.toBe(false);
  });

  it('resolves to false when the file is executable for only the other', async () => {
    await file.chmod(0o667);

    await expect(isExecutable(filepath)).resolves.toBe(false);
  });

  it('resolves to false when the file is executable for only the user & group', async () => {
    await file.chmod(0o776);

    await expect(isExecutable(filepath)).resolves.toBe(false);
  });
});

describe('isExecutableSync', () => {
  let filepath: string;

  beforeEach(async () => {
    filepath = await temporaryWrite('#!/usr/bin/env node');
  });

  afterEach(async () => {
    await rimraf(filepath);
  });

  it('is a function', () => {
    expect(isExecutableSync).toBeTypeOf('function');
  });

  it('returns a boolean', () => {
    expect(isExecutableSync(filepath)).toBeTypeOf('boolean');
  });

  it('returns true when the file is executable for all', () => {
    fs.chmodSync(filepath, 0o777);

    expect(isExecutableSync(filepath)).toBe(true);
  });

  it('returns false when the file is not executable at all', () => {
    fs.chmodSync(filepath, 0o666);

    expect(isExecutableSync(filepath)).toBe(false);
  });

  it('returns false when the file is executable for only the owner', () => {
    fs.chmodSync(filepath, 0o766);

    expect(isExecutableSync(filepath)).toBe(false);
  });

  it('returns false when the file is executable for only the group', () => {
    fs.chmodSync(filepath, 0o676);

    expect(isExecutableSync(filepath)).toBe(false);
  });

  it('returns false when the file is executable for only the other', () => {
    fs.chmodSync(filepath, 0o667);

    expect(isExecutableSync(filepath)).toBe(false);
  });

  it('returns false when the file is executable for only the user & group', () => {
    fs.chmodSync(filepath, 0o776);

    expect(isExecutableSync(filepath)).toBe(false);
  });
});
