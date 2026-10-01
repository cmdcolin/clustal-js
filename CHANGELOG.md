## [2.0.19](https://github.com/cmdcolin/clustal-js/compare/v2.0.18...v2.0.19) (2026-10-01)

### Chores

- Render only the commit subject, and link the commit ([d498008](https://github.com/cmdcolin/clustal-js/commit/d498008667d216d955f170079c3f610c0e560550))
- Create a GitHub release for each published tag ([2bd50d7](https://github.com/cmdcolin/clustal-js/commit/2bd50d78e2004b0e7195a2f006a360d9709a4ea9))
- Enforce type strippability in tsconfig ([dd65fce](https://github.com/cmdcolin/clustal-js/commit/dd65fce92c1845cc4881e22e12e4ab6428bc37a8))
- Keep agent worktrees out of the toolchain's way ([dfcb459](https://github.com/cmdcolin/clustal-js/commit/dfcb459dcbdc81824b9b85c036fdb99650289f87))

### Documentation

- Correct the release command in CONTRIBUTING, and its voice ([fb98f04](https://github.com/cmdcolin/clustal-js/commit/fb98f0477409b6ab754dd2ffd3559118dd8c8ae6))

## [2.0.18](https://github.com/cmdcolin/clustal-js/compare/v2.0.17...v2.0.18) (2026-08-10)

### Chores

- Share one eslint-plugin-unicorn opt-out list across the repos
- Turn off unicorn/prefer-early-return across the repos
- Add git-cliff for changelog generation
- Drop eslint-plugin-unicorn
- Type-check the tests and enforce prettier, as @gmod/bam does
- Let npm publish stop auto-correcting repository.url
- Exempt our own packages from the release quarantine
- Bump pnpm/action-setup to v6.0.10
- Run the test suite as `pnpm test --run`
- Gate preversion on format:check, as CI does
- Gate preversion on typecheck too, as CI does
- Converge package.json on the shape its siblings use

### Documentation

- Mark breaking changes in the generated changelog

### Other Changes

- Revert "chore: converge package.json" — the CHANGELOG prettier step ([2681b94](https://github.com/cmdcolin/clustal-js/commit/2681b9491cc1f65f027f385f89ea5af7c8b67dc4))

# v2.0.1

- Fix preversion build script

# v2.0.0

- Parse pairwise format, outputted by e.g. EMBOSS needle, etc

# v1.0.4

- Fix package name in README

# v1.0.3

- Add generated typescript declarations to output

## v1.0.2

- Add dist folder to package.json

## v1.0.1

Remove unused dependency on @babel/runtime

## v1.0.0

- Initial version parses .aln CLUSTAL files
