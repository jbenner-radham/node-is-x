#!/usr/bin/env node

import pkg from '../package.json' with { type: 'json' };
import { isExecutable } from './index.js';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import meow from 'meow';
import path from 'node:path';
import process from 'node:process';

const cli = meow(`
  Usage
    $ ${pkg.name.replace('@radham/', '')} <FILE>  [ADDITIONAL FILES...]

  Options
    --help, -h     Display this message.
    --verbose, -V  Display messages pertaining to each operation.
    --version, -v  Display the application version.
`, {
  importMeta: import.meta,
  flags: {
    help: {
      type: 'boolean',
      shortFlag: 'h'
    },
    verbose: {
      default: false,
      type: 'boolean',
      shortFlag: 'V'
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

  if (cli.flags.verbose) {
    results.forEach((result, index) => {
      const filepath = filepaths[index]!;
      const relativePath = path.relative(process.cwd(), filepath);

      if (result) {
        console.log(logSymbols.success, `File ${chalk.underline(relativePath)} is executable.`);
      } else {
        console.error(
          logSymbols.error,
          `File ${chalk.underline(relativePath)} is ${chalk.bold('NOT')} executable.`
        );
      }
    });
  }

  if (!results.every(Boolean)) {
    process.exit(1);
  }
} catch (error) {
  console.error(logSymbols.error, error instanceof Error ? error.message : error);
  process.exit(1);
}
