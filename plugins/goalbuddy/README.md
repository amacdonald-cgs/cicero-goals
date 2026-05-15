# Cicero Goals Codex Plugin

Cicero Goals packages the canonical `$goal-prep` skill as a Codex plugin so teams can install the reusable workflow as a plugin while keeping the npm CLI for local setup, doctor checks, extension management, and repo-local workstream commands.

## What It Contains

- `.codex-plugin/plugin.json`: plugin metadata and Codex UI copy.
- `skills/goalbuddy/`: the tracked skill payload copied into the plugin.
- `assets/goalbuddy-icon.svg`: lightweight plugin icon.

The tracked repo path remains `plugins/goalbuddy/`, but the published package and plugin identity are now `cicero-goals`.

## Local Testing

From the repo root:

```bash
npm run check
npx cicero-goals doctor
npx cicero-goals check-update
```

## Native Codex Install

Install and enable Cicero Goals:

```bash
npx cicero-goals
```

Restart Codex, then use `$goal-prep`. Optional extensions can be installed with:

```bash
npx cicero-goals extend install --all
```

Or install the npm package globally:

```bash
npm i -g cicero-goals
cicero-goals
goalbuddy
goal-maker
```

The marketplace manifest is included for Codex discovery, but current Codex CLI builds only register the marketplace with `codex plugin marketplace add`; the npm CLI also caches and enables the plugin.

For local CLI testing before npm publish:

```bash
node internal/cli/goal-maker.mjs --catalog-url extend/catalog.json
node internal/cli/goal-maker.mjs doctor
```

## Release Notes

The plugin is prepared for the `tolibear/cicero-goals` package identity while the tracked repo path remains `plugins/goalbuddy/`. Keep `.codex-plugin/plugin.json` aligned with `package.json` before publishing a new package release.
