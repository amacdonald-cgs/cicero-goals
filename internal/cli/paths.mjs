import { join, resolve } from "node:path";

export const defaultDeveloperId = "local";

export function ciceroGoalsRoot(codexHome) {
  return join(resolve(codexHome), ".codex", "cicero-goals");
}

export function developersRoot(codexHome) {
  return join(ciceroGoalsRoot(codexHome), "developers");
}

export function developerRoot(codexHome, developer = defaultDeveloperId) {
  return join(developersRoot(codexHome), developer);
}

export function inboxRoot(codexHome, developer = defaultDeveloperId) {
  return join(developerRoot(codexHome, developer), "inbox");
}

export function goalsRoot(codexHome, developer = defaultDeveloperId) {
  return join(developerRoot(codexHome, developer), "goals");
}

export function goalRoot(codexHome, slug, developer = defaultDeveloperId) {
  return join(goalsRoot(codexHome, developer), slug);
}

export function currentPath(codexHome, developer = defaultDeveloperId) {
  return join(developerRoot(codexHome, developer), "current.yaml");
}

export function indexPath(codexHome, developer = defaultDeveloperId) {
  return join(developerRoot(codexHome, developer), "index.yaml");
}

export function inboxStatePath(codexHome, developer = defaultDeveloperId) {
  return join(inboxRoot(codexHome, developer), "state.yaml");
}

export function inboxGoalPath(codexHome, developer = defaultDeveloperId) {
  return join(inboxRoot(codexHome, developer), "goal.md");
}

export function goalStatePath(codexHome, slug, developer = defaultDeveloperId) {
  return join(goalRoot(codexHome, slug, developer), "state.yaml");
}

export function goalCharterPath(codexHome, slug, developer = defaultDeveloperId) {
  return join(goalRoot(codexHome, slug, developer), "goal.md");
}

export function goalNotesPath(codexHome, slug, developer = defaultDeveloperId) {
  return join(goalRoot(codexHome, slug, developer), "notes");
}

export function slugifyGoalTitle(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "goal";
}
