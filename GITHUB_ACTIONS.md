# GitHub Actions Setup

This project uses GitHub Actions for automated CI/CD, versioning, and publishing to npm.

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**

- Push to `main` or `develop` branches
- Pull requests to `main` branch

**What it does:**

- Runs on Node.js versions 16, 18, and 20
- Installs dependencies
- Runs linting
- Builds the package
- Runs tests (only on Node.js 18)

### 2. Release Workflow (`.github/workflows/release.yml`)

**Triggers:**

- Push to `main` branch (excluding commits with `[skip ci]` or `[ci skip]`)

**What it does:**

- Checks for conventional commits
- Automatically bumps version based on commit type:
  - `feat:` → minor version bump
  - `fix:` → patch version bump
  - `BREAKING CHANGE:` → major version bump
- Generates changelog
- Creates git tag
- Pushes changes back to repository

### 3. Publish Workflow (`.github/workflows/publish.yml`)

**Triggers:**

- Push of version tags (e.g., `v1.0.0`)
- GitHub releases
- Manual workflow dispatch

**What it does:**

- Builds the package
- Runs linting
- Generates changelog
- Publishes to npm
- Creates GitHub release

## Setup Instructions

### 1. Create NPM Token

1. Go to [npmjs.com](https://www.npmjs.com) and log in
2. Go to your profile settings
3. Click on "Access Tokens"
4. Create a new token with "Automation" type
5. Copy the token

### 2. Add GitHub Secrets

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the following secrets:

   **NPM_TOKEN**

   - Name: `NPM_TOKEN`
   - Value: Your npm automation token

   **GITHUB_TOKEN** (usually auto-generated)

   - This is automatically provided by GitHub

### 3. Configure Repository Permissions

1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions":
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"

### 4. Enable Actions

1. Go to **Settings** → **Actions** → **General**
2. Ensure "Allow all actions and reusable workflows" is selected

## Usage

### Automatic Releases

The release workflow will automatically:

1. Detect conventional commits
2. Bump version accordingly
3. Create git tags
4. Trigger the publish workflow

### Manual Releases

To manually trigger a release:

1. Go to **Actions** tab in your repository
2. Select **Publish to NPM** workflow
3. Click **Run workflow**
4. Select branch and click **Run workflow**

### Conventional Commits

Use these commit message formats for automatic versioning:

```bash
# Patch release (1.0.0 → 1.0.1)
git commit -m "fix: resolve authentication issue"

# Minor release (1.0.0 → 1.1.0)
git commit -m "feat: add new alert component"

# Major release (1.0.0 → 2.0.0)
git commit -m "feat: completely new API

BREAKING CHANGE: API has been completely rewritten"
```

## Troubleshooting

### Common Issues

1. **NPM_TOKEN not found**

   - Ensure you've added the NPM_TOKEN secret
   - Check that the token has publish permissions

2. **Permission denied**

   - Verify repository permissions are set correctly
   - Check that GITHUB_TOKEN has write permissions

3. **Version conflicts**
   - Ensure no manual version bumps conflict with automated ones
   - Check that conventional commits are properly formatted

### Debugging

To debug workflow issues:

1. Check the **Actions** tab for failed workflows
2. Review the logs for specific error messages
3. Test locally with the same Node.js version
4. Verify all secrets are properly configured

## Security

- NPM tokens are stored as encrypted secrets
- Workflows run in isolated environments
- No sensitive data is logged in workflow outputs
- Tokens have minimal required permissions
