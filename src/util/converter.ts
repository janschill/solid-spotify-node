export function toKebabCase(str: string) {
  return str.replace(/\s+/g, '-').toLowerCase();
}
