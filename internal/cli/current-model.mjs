export function createCurrentText({ developer, repoRoot, worktreePath, branch, activeRef, activeKind, activeMode, now }) {
  return [
    "version: 1",
    `developer: ${developer}`,
    "",
    "currents:",
    `  - repo_root: ${json(repoRoot)}`,
    `    worktree_path: ${json(worktreePath)}`,
    `    branch: ${json(branch)}`,
    `    active_ref: ${activeRef}`,
    `    active_kind: ${activeKind}`,
    `    active_mode: ${activeMode}`,
    `    updated_at: ${now}`,
    "",
  ].join("\n");
}

export function readCurrentRef(text) {
  const match = text.match(/^\s*active_ref:\s*(.+)$/m);
  return match ? match[1].trim() : "inbox";
}

function json(value) {
  return JSON.stringify(String(value));
}
