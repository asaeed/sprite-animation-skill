# Sprite Animation Skill

A shared Claude Code and Codex skill for producing, refining, and validating animated 2D sprite assets. It covers authored frames, segmented 2D rigs, and rigged 3D sources baked into sprite sheets, with separate visual, technical, and runtime checks.

## Install

```bash
git clone https://github.com/asaeed/sprite-animation-skill.git ~/claude/sprite-animation-skill
cd ~/claude/sprite-animation-skill
./install.sh
```

The installer links both `~/.claude/skills/sprite-animation` and `~/.codex/skills/sprite-animation` to this checkout. It can be run from any working directory and repeated safely. Existing regular files or directories are never overwritten; move those aside deliberately before installing.

Use `/sprite-animation` in Claude Code or `$sprite-animation` in Codex. Updates from `git pull` are available through the same links without copying or reinstalling the skill.

## Contents

- `SKILL.md`: shared workflow and method selection.
- `references/production.md`: reusable production, alignment, resolution, motion, and QA methodology.
- `references/lessons.md`: recorded successes, rejected experiments, and evidence limitations.
- `references/dead-zone.md`: project-specific recipes, settings, historical results, and local asset paths.
- `scripts/inspect-sheet.mjs`: decoded-pixel auditing and an HTML playback/frame-stepping review.
- `agents/openai.yaml`: Codex display metadata and invocation policy.

The Dead Zone profile references a separate local game checkout; its assets and production tools are not bundled here. Historical settings and test counts describe their recorded iterations, not a guarantee about another project or the current game.

## Sheet Inspection

Use Node.js and a project with `playwright-core` or `playwright`, plus a compatible Chromium browser:

```bash
node scripts/inspect-sheet.mjs /path/to/sheet.png \
  --columns 4 --rows 1 \
  --module-root /path/to/project-with-playwright \
  --report /tmp/sheet-audit.json \
  --preview /tmp/sheet-review.html
```

For irregular layouts, use `--frames /path/to/frames.json` instead of a grid. The helper checks transparency, blank/duplicate frames, bounds, and possible clipping. Its reports do not establish anatomical quality or visual approval.

## Test Installation

```bash
bash -n install.sh
node --test tests/install.test.mjs
```

Tests use temporary home directories and do not alter your installed skills.
