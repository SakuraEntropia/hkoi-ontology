// Shared helpers for the OCC occupations generator.
export function o(name, opts = {}, ...children) {
  const node = { name };
  if (opts.s) node._slug = opts.s;
  if (opts.z) node.name_zh = opts.z;
  if (opts.d) node.description = opts.d;
  if (opts.a) node.aliases = opts.a;
  if (opts.h) node.historical = true;
  if (opts.g === false) node.global = false;
  if (opts.k) node._key = opts.k;
  if (children.length) node.children = children;
  return node;
}

export function slugify(name) {
  return String(name)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}
