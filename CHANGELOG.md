# Changelog


## v0.0.2


### 🚀 Enhancements

  - **commands.ts): add support for bun package manager ✨ feat(detect.ts): add support for detecting bun package manager ✨ feat(getVersion.ts): add support for getting bun package manager version ✨ feat(nyxi.ts): add support for bun package manager commands 🐛 fix(utils.ts:** Add missing utility functions for array manipulation ([65804fa](https://github.com/nyxb/nyxi-for-vscode/commit/65804fa))
  - **test:** Add tests for package managers (npm, yarn, pnpm) to ensure correct parsing of commands and arguments ([b4aac40](https://github.com/nyxb/nyxi-for-vscode/commit/b4aac40))
  - **test): add tests for package managers (npm, yarn, pnpm) and bun agent to ensure correct parsing of commands 🐛 fix(ng.spec.ts:** Add test to ensure getCommandStatement returns undefined when given an unknown agent ([29bdbdc](https://github.com/nyxb/nyxi-for-vscode/commit/29bdbdc))
  - **test:** Add tests for package managers' scripts parsing functionality ([40b184e](https://github.com/nyxb/nyxi-for-vscode/commit/40b184e))
  - **test:** Add tests for nyxa command parser for npm, pnpm, yarn, and yarn@berry agents. ([37a0c6d](https://github.com/nyxb/nyxi-for-vscode/commit/37a0c6d))
  - **nyxlx): add tests for parsing nyxlx commands for different package managers (npm, yarn, pnpm) and their variants (yarn@berry) 🧪 test(nyxlx:** Add tests for parsing nyxlx commands for different package managers (npm, yarn, pnpm) and their variants (yarn@berry) to ensure correct output is generated for each package manager and its variants ([cac76fd](https://github.com/nyxb/nyxi-for-vscode/commit/cac76fd))
  - **test:** Add tests for Nyxu package manager agents to improve test coverage and ensure correct behavior ([c6cf0a0](https://github.com/nyxb/nyxi-for-vscode/commit/c6cf0a0))
  - **nyxun:** Add tests for package managers (npm, yarn, pnpm) to parse uninstall commands and return the correct output. ([e7097d3](https://github.com/nyxb/nyxi-for-vscode/commit/e7097d3))

### 🩹 Fixes

  - **.gitignore): add coverage folder to ignore list ✨ feat(package.json): add coverage-v8 to devDependencies and update test script to include coverage 🔨 refactor(tests:** Rename parseNr function to parseNyxr in all tests to improve semantics ([4943c2b](https://github.com/nyxb/nyxi-for-vscode/commit/4943c2b))

### 🏡 Chore

  - **test:** Remove test files that are no longer needed ([a6fbaed](https://github.com/nyxb/nyxi-for-vscode/commit/a6fbaed))

### ✅ Tests

  - **nyxi:** Add tests for different package managers and their respective commands ([ca10a5a](https://github.com/nyxb/nyxi-for-vscode/commit/ca10a5a))
  - ***.spec.ts:** Add tests for parseNr function with different package managers and commands ([81d4ee4](https://github.com/nyxb/nyxi-for-vscode/commit/81d4ee4))

### ❤️  Contributors

- Nyxb <contact@nyxb.xyz>

