export function createIndexText({ developer, entries, now }) {
  const lines = [
    "version: 1",
    `developer: ${developer}`,
    `updated_at: ${now}`,
    "",
    "goals:",
  ];

  for (const entry of entries) {
    lines.push(`  - ref: ${entry.ref}`);
    lines.push(`    kind: ${entry.kind}`);
    lines.push(`    mode: ${entry.mode}`);
    lines.push(`    title: ${json(entry.title)}`);
    lines.push(`    slug: ${entry.slug}`);
    lines.push(`    status: ${entry.status}`);
    lines.push(`    repo_root: ${json(entry.repoRoot || "")}`);
    lines.push(`    updated_at: ${entry.updatedAt || now}`);
  }

  lines.push("");
  return lines.join("\n");
}

function json(value) {
  return JSON.stringify(String(value));
}
