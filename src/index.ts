import fs from 'node:fs';
import { open } from 'node:fs/promises';
import type { FileHandle } from 'node:fs/promises';

const { S_IXUSR, S_IXGRP, S_IXOTH } = fs.constants;

export async function isExecutable(filepath: string): Promise<boolean> {
  let file: FileHandle;

  try {
    file = await open(filepath);
    const stats = await file.stat();

    return stats.mode === (stats.mode | S_IXUSR | S_IXGRP | S_IXOTH);
  } finally {
    // @ts-expect-error File is defined if the try block is executed.
    file?.close();
  }
}

export function isExecutableSync(filepath: string): boolean {
  const stats = fs.statSync(filepath);

  return stats.mode === (stats.mode | S_IXUSR | S_IXGRP | S_IXOTH);
}
