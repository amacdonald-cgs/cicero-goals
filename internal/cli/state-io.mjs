import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

export function writeText(path, text) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text.endsWith("\n") ? text : `${text}\n`);
}

export function readText(path, fallback = "") {
  return existsSync(path) ? readFileSync(path, "utf8") : fallback;
}

export function replaceScalar(text, key, value) {
  const pattern = new RegExp(`(^\\s*${escapeRegExp(key)}:\\s*).*$`, "m");
  if (pattern.test(text)) return text.replace(pattern, `$1${value}`);
  return `${text.replace(/\s*$/, "\n")}${key}: ${value}\n`;
}

function escapeRegExp(value) {
  return String(value).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}
