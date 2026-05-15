export function createInboxGoalText() {
  return [
    "# Inbox",
    "",
    "Catchall workstream for uncategorized Codex activity in this repo.",
    "",
  ].join("\n");
}

export function createGoalText(title) {
  return [
    `# ${title}`,
    "",
    "## Objective",
    "",
    "<Describe the bounded outcome for this goal.>",
    "",
  ].join("\n");
}

export function createInboxStateText({ owner, repoRoot, worktreePath, branch, now }) {
  return [
    "version: 1",
    "",
    "workstream:",
    "  id: inbox",
    "  kind: inbox",
    "  mode: light",
    "  title: Inbox",
    "  slug: inbox",
    "  status: active",
    `  owner: ${owner}`,
    "  source: implicit",
    "",
    "repo:",
    `  repo_root: ${yamlScalar(repoRoot)}`,
    "",
    "context:",
    `  current_worktree_path: ${yamlScalar(worktreePath)}`,
    `  current_branch: ${yamlScalar(branch)}`,
    "",
    "lifecycle:",
    `  created_at: ${now}`,
    `  updated_at: ${now}`,
    `  started_at: ${now}`,
    "  paused_at: null",
    "  completed_at: null",
    "",
    "summary:",
    '  objective: "Catchall workstream for uncategorized Codex activity."',
    '  current_focus: "Unclassified work."',
    '  completion_proof: "Not applicable."',
    "",
    "activity: []",
    "",
    "checks:",
    "  last_verification:",
    "    result: unknown",
    "    at: null",
    "    commands: []",
    "",
  ].join("\n");
}

export function createGoalStateText({ owner, title, slug, repoRoot, worktreePath, branch, now }) {
  return [
    "version: 1",
    "",
    "workstream:",
    `  id: goal-${slug}`,
    "  kind: goal",
    "  mode: structured",
    `  title: ${yamlScalar(title)}`,
    `  slug: ${slug}`,
    "  status: active",
    `  owner: ${owner}`,
    "  source: manual",
    "",
    "repo:",
    `  repo_root: ${yamlScalar(repoRoot)}`,
    "",
    "context:",
    `  current_worktree_path: ${yamlScalar(worktreePath)}`,
    `  current_branch: ${yamlScalar(branch)}`,
    "",
    "lifecycle:",
    `  created_at: ${now}`,
    `  updated_at: ${now}`,
    `  started_at: ${now}`,
    "  paused_at: null",
    "  completed_at: null",
    "",
    "summary:",
    `  objective: ${yamlScalar(title)}`,
    '  current_focus: "Newly created goal."',
    '  completion_proof: "Goal-specific completion proof not set yet."',
    "",
    "activity: []",
    "",
    "checks:",
    "  last_verification:",
    "    result: unknown",
    "    at: null",
    "    commands: []",
    "",
  ].join("\n");
}

export function updateWorkstreamStatus(text, status, now, pausedAt = null, completedAt = null) {
  let updated = text;
  updated = replaceMappedScalar(updated, "status", status);
  updated = replaceMappedScalar(updated, "updated_at", now);
  if (pausedAt !== null) updated = replaceMappedScalar(updated, "paused_at", pausedAt);
  if (completedAt !== null) updated = replaceMappedScalar(updated, "completed_at", completedAt);
  return updated;
}

export function updateWorkstreamMode(text, mode, now) {
  let updated = text;
  updated = replaceMappedScalar(updated, "mode", mode);
  updated = replaceMappedScalar(updated, "updated_at", now);
  return updated;
}

export function attachGoalRuntime(text, { command, now }) {
  let updated = updateWorkstreamMode(text, "deep", now);
  if (!/\ngoal_runtime:\n/.test(updated)) {
    updated = `${updated.replace(/\s*$/, "\n")}goal_runtime:\n`;
    updated += "  attached: true\n";
    updated += "  status: active\n";
    updated += `  first_attached_at: ${now}\n`;
    updated += `  last_attached_at: ${now}\n`;
    updated += "  attach_count: 1\n";
    updated += `  command: ${yamlScalar(command)}\n`;
    return updated;
  }

  updated = replaceGoalRuntimeScalar(updated, "attached", "true");
  updated = replaceGoalRuntimeScalar(updated, "status", "active");
  updated = replaceGoalRuntimeScalar(updated, "last_attached_at", now);
  updated = replaceGoalRuntimeScalar(updated, "command", yamlScalar(command));
  const currentCount = Number.parseInt(unquote(findGoalRuntimeScalar(updated, "attach_count") || "0"), 10) || 0;
  updated = replaceGoalRuntimeScalar(updated, "attach_count", String(currentCount + 1));
  return updated;
}

export function summarizeWorkstreamFromText(ref, text) {
  return {
    ref,
    kind: findMappedScalar(text, "kind") || "goal",
    mode: findMappedScalar(text, "mode") || "structured",
    title: unquote(findMappedScalar(text, "title") || ref),
    slug: unquote(findMappedScalar(text, "slug") || ref.split("/").at(-1) || ref),
    status: findMappedScalar(text, "status") || "active",
    repoRoot: unquote(findMappedScalar(text, "repo_root") || ""),
    updatedAt: unquote(findMappedScalar(text, "updated_at") || ""),
  };
}

function replaceMappedScalar(text, key, value) {
  const pattern = new RegExp(`(^\\s+${escapeRegExp(key)}:\\s*).*$`, "m");
  return pattern.test(text) ? text.replace(pattern, `$1${value}`) : text;
}

function findMappedScalar(text, key) {
  const match = text.match(new RegExp(`^\\s+${escapeRegExp(key)}:\\s*(.+)$`, "m"));
  return match ? match[1].trim() : "";
}

function replaceGoalRuntimeScalar(text, key, value) {
  const block = goalRuntimeBlock(text);
  if (!block) return text;
  const pattern = new RegExp(`(^\\s{2}${escapeRegExp(key)}:\\s*).*$`, "m");
  const replaced = pattern.test(block) ? block.replace(pattern, `$1${value}`) : `${block}${key}: ${value}\n`;
  return text.replace(block, replaced);
}

function findGoalRuntimeScalar(text, key) {
  const block = goalRuntimeBlock(text);
  if (!block) return "";
  const match = block.match(new RegExp(`^\\s{2}${escapeRegExp(key)}:\\s*(.+)$`, "m"));
  return match ? match[1].trim() : "";
}

function goalRuntimeBlock(text) {
  const match = text.match(/\ngoal_runtime:\n(?:  .*\n)*/);
  return match ? match[0].slice(1) : "";
}

function yamlScalar(value) {
  return JSON.stringify(String(value));
}

function unquote(value) {
  return String(value).replace(/^"(.*)"$/, "$1");
}

function escapeRegExp(value) {
  return String(value).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}
