import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const marketplace = JSON.parse(readFileSync(".agents/plugins/marketplace.json", "utf8"));
const plugin = JSON.parse(readFileSync("plugins/goalbuddy/.codex-plugin/plugin.json", "utf8"));

test("Cicero Goals plugin is exposed through a Codex marketplace manifest", () => {
  assert.equal(marketplace.name, "cicero-goals");
  assert.equal(marketplace.interface.displayName, "Cicero Goals");
  assert.equal(marketplace.plugins.length, 1);

  const [entry] = marketplace.plugins;
  assert.equal(entry.name, "cicero-goals");
  assert.equal(entry.source.source, "local");
  assert.equal(entry.source.path, "./plugins/goalbuddy");
  assert.equal(entry.policy.installation, "INSTALLED_BY_DEFAULT");
  assert.equal(entry.category, "Coding");
});

test("Cicero Goals plugin metadata tracks the package release", () => {
  assert.equal(plugin.name, pkg.name);
  assert.equal(plugin.version, pkg.version);
  assert.equal(plugin.repository, "https://github.com/tolibear/cicero-goals");
  assert.equal(plugin.skills, "./skills/");
  assert.equal(plugin.interface.displayName, "Cicero Goals");
  assert.match(plugin.description, /Cicero Goals/i);
});

test("Cicero Goals plugin delegates composer invocation to Goal Prep", () => {
  assert.deepEqual(plugin.interface.defaultPrompt, [
    "$goal-prep prepare a Cicero Goals board for this goal",
  ]);
});
