#!/bin/bash
# Installs this shared skill for both Claude and Codex.
set -euo pipefail

skill_name="sprite-animation"
source_dir="$(cd -- "$(dirname -- "$0")" && pwd -P)"

if [[ ! -f "$source_dir/SKILL.md" ]]; then
  echo "Missing skill entrypoint: $source_dir/SKILL.md" >&2
  exit 1
fi

for skills_dir in "$HOME/.claude/skills" "$HOME/.codex/skills"; do
  target="$skills_dir/$skill_name"
  if [[ -e "$target" && ! -L "$target" ]]; then
    echo "Refusing to replace non-symlink: $target" >&2
    exit 1
  fi
done

for skills_dir in "$HOME/.claude/skills" "$HOME/.codex/skills"; do
  target="$skills_dir/$skill_name"
  mkdir -p "$skills_dir"
  ln -sfn "$source_dir" "$target"
  echo "Installed: $target -> $source_dir"
done
