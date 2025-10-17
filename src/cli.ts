#!/usr/bin/env node

import pkg from '../package.json' with { type: 'json' };
import { isExecutable } from './index.js';
import logSymbols from 'log-symbols';
import meow from 'meow';
import path from 'node:path';
import process from 'node:process';

const cli = meow(`
  ${pkg.description}

  Usage
    $ ${pkg.name.replace('@radham/', '')} <FILE>  [ADDITIONAL FILES...]

  Options
    --help, -h     Display this message.
    --version, -v  Display the application version.
`, {
  importMeta: import.meta,
  flags: {
    help: {
      type: 'boolean',
      shortFlag: 'h'
    },
    version: {
      type: 'boolean',
      shortFlag: 'v'
    }
  }
});

if (cli.input.length === 0) {
  cli.showHelp();
}

try {
  const filepaths = cli.input.map(filepath => path.resolve(filepath));
  const results = await Promise.all(filepaths.map(filepath => isExecutable(filepath)));

  if (!results.every(Boolean)) {
    process.exit(1);
  }
} catch (error) {
  console.error(logSymbols.error, error instanceof Error ? error.message : error);
  process.exit(1);
}
