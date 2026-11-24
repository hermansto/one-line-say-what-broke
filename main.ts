// Say What Actually Broke — one brutally honest error message.
// The program writes exactly one line to entry.txt in the output
// directory the harness provides, then reads it back to prove
// the file on disk matches the line character for character.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "Error 418: I'm a teapot, and honestly, so is this code — nothing works, nobody knows why, and the last person who understood it quit.";

// The entry is a single line: no trailing newline, no extra spaces.
// The em dash counts as one character but three bytes in UTF-8,
// so the file is 133 characters and 135 bytes.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(entryPath, line, "utf8");

const written = readFileSync(entryPath, "utf8");
if (written !== line) {
  throw new Error("entry.txt does not match the expected line");
}
if (Buffer.byteLength(written, "utf8") !== 135) {
  throw new Error("entry.txt has the wrong byte length");
}

console.log(`Wrote entry.txt (${line.length} characters) to ${outDir}`);
