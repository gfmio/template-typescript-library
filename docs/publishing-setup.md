# Publishing Setup Guide

This guide explains how to set up automated publishing to npm using GitHub Actions with Trusted Publishers for enhanced security.

## Overview

This project uses:
- **Release Please** for automated semantic versioning and changelog generation
- **GitHub Actions** for CI/CD
- **npm Trusted Publishers** for secure, token-free publishing via OpenID Connect (OIDC)
- **GitHub Environments** for additional protection and approval workflows

## Benefits of Trusted Publishers

✅ **More Secure** - No long-lived npm tokens to manage or risk leaking
✅ **Automatic** - No need to rotate credentials
✅ **Transparent** - Publish provenance shows exactly what was published and from where
✅ **Simpler** - No secrets to configure in GitHub

## Setup Instructions

### 1. Publish Your First Version Manually (One-Time Setup)

Before you can configure Trusted Publishers, the package must exist on npm:

```bash
# Build the package
task build

# Publish manually (you'll need npm login credentials)
cd out/build
npm publish --access public
cd ../..
```

### 2. Configure Trusted Publisher on npm

Once your package exists on npm, configure the Trusted Publisher:

1. **Go to your package on npm**: `https://www.npmjs.com/package/YOUR-PACKAGE-NAME`
2. **Navigate to Settings** → **Publishing Access**
3. **Click "Add Trusted Publisher"**
4. **Select "GitHub Actions"** as the provider
5. **Fill in the details**:
   - **Repository owner**: Your GitHub username or organization (e.g., `gfmio`)
   - **Repository name**: Your repository name (e.g., `template-typescript-library`)
   - **Workflow filename**: `publish.yml`
   - **Environment name**: `npm`
6. **Click "Add"**

### 3. Configure GitHub Environment (Optional but Recommended)

GitHub Environments provide additional security by allowing you to:
- Require manual approval before publishing
- Restrict which branches can publish
- Add deployment protection rules

**To create the environment:**

1. **Go to your repository on GitHub**
2. **Navigate to Settings** → **Environments**
3. **Click "New environment"**
4. **Name it**: `npm` (must match the workflow)
5. **Configure protection rules** (optional):
   - ✅ **Required reviewers**: Add maintainers who must approve each publish
   - ✅ **Wait timer**: Add a delay before publishing (e.g., 5 minutes to catch mistakes)
   - ✅ **Deployment branches**: Select "Selected branches" and add `main`
6. **Click "Save protection rules"**

**Environment protection rules examples:**
- **For solo maintainers**: No required reviewers, but set a 5-minute wait timer as a safety net
- **For teams**: Require 1+ reviewers from your team
- **For organizations**: Require reviewers from specific teams (e.g., `@org/npm-publishers`)

### 4. Verify the Setup

The publish workflow (`.github/workflows/publish.yml`) is already configured to use:
- ✅ `id-token: write` permission (for OIDC)
- ✅ `--provenance` flag (for build attestation)
- ✅ `environment: npm` (for GitHub Environment protection)
- ✅ Latest npm via `npx npm@latest` (full OIDC support)

No changes to the workflow are needed!

### 5. Test the Publishing Flow

1. **Make a commit** following [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add new feature"
   git push
   ```

2. **Release Please will**:
   - Create or update a release PR
   - Generate changelog entries
   - Calculate the next version number

3. **When you merge the release PR**:
   - A GitHub release is created
   - The publish workflow triggers
   - If you configured required reviewers, approve the deployment
   - Package is published to npm automatically

4. **Check the results**:
   - View the workflow run in Actions tab
   - Check the published package on npm
   - View provenance attestation on npm (look for the shield icon)

## Troubleshooting

### "Unable to authenticate" error during publish

**Cause**: Trusted Publisher not configured correctly on npm.

**Solution**: Double-check the settings on npm:
- Repository owner and name match exactly (case-sensitive)
- Workflow filename is `publish.yml` (not `.github/workflows/publish.yml`)
- Environment name is `npm` if you're using environments

### Workflow pending forever on "Waiting for approval"

**Cause**: Environment requires reviewers but none have approved.

**Solution**:
- Go to Actions tab → Click on the workflow run → Click "Review deployments" → Approve
- Or adjust environment settings to remove required reviewers

### "Environment not found" error

**Cause**: Environment name in workflow doesn't match GitHub environment.

**Solution**:
- Either create the environment in GitHub Settings → Environments
- Or remove the `environment:` section from the workflow (less secure)

### Build provenance not showing on npm

**Cause**: Missing `--provenance` flag or `id-token: write` permission.

**Solution**: These are already configured in the workflow. Ensure npm registry supports provenance (it does as of 2023).

## Security Best Practices

1. **Use GitHub Environments** with required reviewers for production packages
2. **Restrict deployment branches** to `main` or `release/*` only
3. **Enable two-factor authentication** on your npm account
4. **Review Release Please PRs carefully** before merging
5. **Monitor npm package** for unexpected publishes
6. **Use provenance attestation** to verify published packages

## Migration from NPM_TOKEN

If you previously used `NPM_TOKEN` secrets:

1. **Follow the setup instructions above** to configure Trusted Publishers
2. **Delete the `NPM_TOKEN` secret** from GitHub Settings → Secrets and variables → Actions
3. **Test the workflow** with a patch release
4. **Revoke the old npm token** on npmjs.com → Access Tokens

## Additional Resources

- [npm Trusted Publishers Documentation](https://docs.npmjs.com/generating-provenance-statements)
- [GitHub OIDC Documentation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [Release Please Documentation](https://github.com/googleapis/release-please)
- [Conventional Commits Specification](https://www.conventionalcommits.org/)

## Support

If you encounter issues:
- Check the [Troubleshooting](#troubleshooting) section
- Review workflow logs in the Actions tab
- Open an issue with workflow logs and error messages
