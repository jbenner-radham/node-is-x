#!/usr/bin/env node

import { isExecutable } from './index.js';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import meow from 'meow';
import { getHelpTextAndOptions } from 'meowtastic';
import path from 'node:path';
import process from 'node:process';

// See: https://no-color.org/
const NO_COLOR = Boolean(process.env.NO_COLOR);

const cli = meow(
  ...getHelpTextAndOptions({
    arguments: [
      { name: 'FILE', isRequired: true },
      { name: 'ADDITIONAL FILES...' }
    ],
    flags: {
      verbose: {
        default: false,
        description: 'Display messages pertaining to each operation.',
        type: 'boolean',
        shortFlag: 'V'
      }
    },
    importMeta: import.meta
  })
);

if (cli.input.length === 0) {
  cli.showHelp();
}

try {
  const filepaths = cli.input.map(filepath => path.resolve(filepath));
  const results = await Promise.all(filepaths.map(filepath => isExecutable(filepath)));

  if (cli.flags.verbose) {
    const passthrough = (value: string) => value;
    const bold = NO_COLOR ? passthrough : chalk.bold;
    const underline = NO_COLOR ? passthrough : chalk.underline;

    results.forEach((result, index) => {
      const filepath = filepaths[index]!;
      const relativePath = path.relative(process.cwd(), filepath);

      if (result) {
        console.log(logSymbols.success, `File ${underline(relativePath)} is executable.`);
      } else {
        console.error(
          logSymbols.error,
          `File ${underline(relativePath)} is ${bold('NOT')} executable.`
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
