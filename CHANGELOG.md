## 1.0.1 (2025-07-07)

### Bug Fixes

- improve conventional commit detection in release workflow ([ed0e469](https://github.com/khuniverse/core-ui/commit/ed0e469d072dce3fb3e317b2a342093880e14fc2))
- updated release action write access ([5f451f9](https://github.com/khuniverse/core-ui/commit/5f451f980879a388b1d1deafbcf2045db900b446))
- updated release file ([f1ed45c](https://github.com/khuniverse/core-ui/commit/f1ed45ce97d3e4f58086547dd8402db6003738a6))

### Features

- add test section to README ([97e3544](https://github.com/khuniverse/core-ui/commit/97e35446a6dec36fa860ad3ce2e8913868e77fed))

## [Unreleased]

### Changed

- Migrated state management to Zustand. Removed all fixed store exports (e.g., useAppStore, useUserStore, useThemeStore, etc.).
- Now export Zustand's `create` function for callee projects to define their own dynamic stores.
- Updated README with advanced Zustand usage, troubleshooting, TypeScript tips, and demo guidance.
