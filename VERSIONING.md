# Versioning Guide

This project follows [Semantic Versioning](https://semver.org/) (SemVer) for version management.

## Version Format

Versions follow the format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes that require major updates
- **MINOR**: New features that are backward compatible
- **PATCH**: Bug fixes that are backward compatible

## Available Versioning Commands

### Production Releases

```bash
# Patch release (1.0.0 -> 1.0.1) - Bug fixes
npm run release:patch

# Minor release (1.0.0 -> 1.1.0) - New features
npm run release:minor

# Major release (1.0.0 -> 2.0.0) - Breaking changes
npm run release:major
```

### Beta/Pre-release Versions

```bash
# Beta release (1.0.0 -> 1.0.1-beta.0)
npm run release:beta

# Pre-patch (1.0.0 -> 1.0.1-0)
npm run version:prepatch

# Pre-minor (1.0.0 -> 1.1.0-0)
npm run version:preminor

# Pre-major (1.0.0 -> 2.0.0-0)
npm run version:premajor

# Prerelease (increments prerelease number)
npm run version:prerelease
```

### Changelog Management

```bash
# Generate changelog from git commits
npm run changelog

# Generate initial changelog (first time)
npm run changelog:first
```

## Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks
- `revert`: Reverting previous commits

### Examples

```bash
# Feature
git commit -m "feat: add new authentication hook"

# Bug fix
git commit -m "fix: resolve API client memory leak"

# Breaking change
git commit -m "feat!: remove deprecated API methods"

# With scope
git commit -m "feat(auth): add OAuth2 support"

# With body
git commit -m "feat: add new component

This component provides better user experience
for form validation.

Closes #123"
```

## Release Process

1. **Make your changes** and commit them using conventional commit format
2. **Choose the appropriate version bump**:
   - `npm run release:patch` for bug fixes
   - `npm run release:minor` for new features
   - `npm run release:major` for breaking changes
3. **The script will automatically**:
   - Bump the version in package.json
   - Build the project
   - Publish to npm
   - Create a git tag

## Beta Releases

For testing new features before a full release:

1. Use `npm run release:beta` to create a beta version
2. The package will be published with a `beta` tag
3. Users can install beta versions with: `npm install @koharx/core-ui@beta`

## Changelog

The CHANGELOG.md file is automatically generated from your commit messages. To update it:

```bash
npm run changelog
```

This will parse your git commits and update the changelog with the appropriate sections.

## Version Tags

Each release creates a git tag. You can view all tags with:

```bash
git tag -l
```

## Rollback

If you need to rollback a version:

1. Delete the git tag: `git tag -d v1.0.1`
2. Reset to previous commit: `git reset --hard HEAD~1`
3. Update package.json version manually
4. Rebuild and republish if necessary

## Best Practices

1. **Always use conventional commits** for automatic changelog generation
2. **Test thoroughly** before releasing
3. **Use beta releases** for major changes
4. **Keep the changelog updated** with meaningful descriptions
5. **Communicate breaking changes** clearly in release notes
