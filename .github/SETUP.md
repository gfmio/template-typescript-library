# Repository Setup Guide

This guide walks you through configuring your GitHub repository after creating it from this template.

## Table of Contents

- [Required Apps](#required-apps)
- [Repository Settings](#repository-settings)
- [Branch Protection](#branch-protection)
- [Labels](#labels)
- [Secrets](#secrets)
- [GitHub Pages](#github-pages)
- [Optional Configuration](#optional-configuration)

## Required Apps

Install these GitHub Apps to enable automation features:

### 1. Renovate (Dependency Updates)

**Install:** [Renovate GitHub App](https://github.com/apps/renovate)

**What it does:**
- Automatically creates PRs for dependency updates
- Configured via [.github/renovate.json](./renovate.json)
- Groups updates intelligently (Biome, TypeScript, etc.)
- Auto-merges minor/patch updates when CI passes

**After installation:** Renovate will automatically detect the config and start creating PRs.

## Repository Settings

Configure these settings manually in your repository:

### General Settings

**Path:** `Settings > General`

1. **Features:**
   - ✅ Issues
   - ❌ Projects
   - ❌ Wiki
   - ✅ Discussions (recommended)

2. **Pull Requests:**
   - ✅ Allow squash merging
     - Commit title: **Pull request title**
     - Commit message: **Pull request body**
   - ❌ Allow merge commits
   - ❌ Allow rebase merging
   - ✅ Always suggest updating pull request branches
   - ✅ Allow auto-merge
   - ✅ Automatically delete head branches

### Code Security and Analysis

**Path:** `Settings > Code security and analysis`

1. **Dependabot:**
   - ❌ Dependabot alerts (using Renovate instead)
   - ❌ Dependabot security updates (using Renovate instead)

2. **Code scanning:**
   - ✅ CodeQL analysis (configured via [.github/workflows/codeql.yml](../workflows/codeql.yml))

3. **Secret scanning:**
   - ✅ Secret scanning
   - ✅ Push protection

### Topics

**Path:** `Settings > General > About`

Add topics (tags) to help others discover your library:
```
typescript, library, template, bun, vitest, biome, task, devenv, nix
```

## Branch Protection

**Path:** `Settings > Branches > Branch protection rules > Add rule`

**Branch name pattern:** `main`

### Required Settings:

1. **Require a pull request before merging:**
   - ✅ Require approvals: **1**
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require review from Code Owners (if you have a CODEOWNERS file)

2. **Require status checks to pass before merging:**
   - ✅ Require branches to be up to date before merging
   - **Required checks:**
     - `ci` (main CI workflow)
     - `CodeQL` (security scanning)

3. **Require conversation resolution before merging:** ✅

4. **Require linear history:** ✅

5. **Do not allow bypassing the above settings:** ✅

6. **Restrictions:** (Leave empty for personal repos)

7. **Rules applied to everyone including administrators:** ❌
   - Allows admins to bypass for emergency fixes

## Labels

The repository includes issue templates that reference these labels. Create them in `Issues > Labels`:

| Label | Color | Description |
|-------|-------|-------------|
| `bug` | `#d73a4a` | Something isn't working |
| `documentation` | `#0075ca` | Improvements or additions to documentation |
| `duplicate` | `#cfd3d7` | This issue or pull request already exists |
| `enhancement` | `#a2eeef` | New feature or request |
| `good first issue` | `#7057ff` | Good for newcomers |
| `help wanted` | `#008672` | Extra attention is needed |
| `invalid` | `#e4e669` | This doesn't seem right |
| `question` | `#d876e3` | Further information is requested |
| `wontfix` | `#ffffff` | This will not be worked on |
| `dependencies` | `#0366d6` | Dependency updates |
| `security` | `#ee0701` | Security-related issues |
| `breaking change` | `#b60205` | Introduces a breaking change |
| `needs-triage` | `#fbca04` | Needs initial review and categorization |
| `blocked` | `#b60205` | Blocked by another issue or external factor |
| `chore` | `#fef2c0` | Maintenance tasks |
| `refactor` | `#c5def5` | Code refactoring |
| `performance` | `#c7e8ff` | Performance improvements |
| `test` | `#b4a7d6` | Testing-related changes |
| `ci` | `#84b6eb` | CI/CD related changes |
| `idea` | `#c2e0c6` | New idea or proposal |
| `showcase` | `#bfdadc` | Community showcase |
| `renovate` | `#0366d6` | Renovate dependency updates |

**Quick setup with GitHub CLI:**

```bash
gh label create "bug" --color "d73a4a" --description "Something isn't working"
gh label create "documentation" --color "0075ca" --description "Improvements or additions to documentation"
gh label create "duplicate" --color "cfd3d7" --description "This issue or pull request already exists"
gh label create "enhancement" --color "a2eeef" --description "New feature or request"
gh label create "good first issue" --color "7057ff" --description "Good for newcomers"
gh label create "help wanted" --color "008672" --description "Extra attention is needed"
gh label create "invalid" --color "e4e669" --description "This doesn't seem right"
gh label create "question" --color "d876e3" --description "Further information is requested"
gh label create "wontfix" --color "ffffff" --description "This will not be worked on"
gh label create "dependencies" --color "0366d6" --description "Dependency updates"
gh label create "security" --color "ee0701" --description "Security-related issues"
gh label create "breaking change" --color "b60205" --description "Introduces a breaking change"
gh label create "needs-triage" --color "fbca04" --description "Needs initial review and categorization"
gh label create "blocked" --color "b60205" --description "Blocked by another issue or external factor"
gh label create "chore" --color "fef2c0" --description "Maintenance tasks"
gh label create "refactor" --color "c5def5" --description "Code refactoring"
gh label create "performance" --color "c7e8ff" --description "Performance improvements"
gh label create "test" --color "b4a7d6" --description "Testing-related changes"
gh label create "ci" --color "84b6eb" --description "CI/CD related changes"
gh label create "idea" --color "c2e0c6" --description "New idea or proposal"
gh label create "showcase" --color "bfdadc" --description "Community showcase"
gh label create "renovate" --color "0366d6" --description "Renovate dependency updates"
```

## Secrets

**Path:** `Settings > Secrets and variables > Actions`

### Required for Publishing:

If you plan to publish to npm, you'll need:

1. **NPM_TOKEN** - npm access token with publish permissions
   - Create at: https://www.npmjs.com/settings/[username]/tokens
   - Type: **Automation** (for CI/CD)
   - See [docs/publishing-setup.md](../../docs/publishing-setup.md) for Trusted Publishers setup (recommended)

### Optional Secrets:

2. **CODECOV_TOKEN** - For Codecov coverage reports
   - Get from: https://codecov.io/
   - Used by: `.github/workflows/ci.yml`

## GitHub Pages

**Path:** `Settings > Pages`

To enable documentation hosting:

1. **Source:**
   - Deploy from a branch: `gh-pages` / `/ (root)`
   - Or use GitHub Actions (if you modify the docs workflow)

2. **Custom domain:** (Optional)
   - Add your custom domain if desired
   - Configure DNS as instructed

**Note:** Docs are automatically deployed when you create a GitHub release (via `.github/workflows/docs.yml`)

## Optional Configuration

### Enable Discussions

**Path:** `Settings > General > Features`

1. ✅ Enable Discussions
2. Go to `Discussions > Categories`
3. Create/customize categories:
   - 💬 **Q&A** - Ask questions about using the library
   - 💡 **Ideas** - Share ideas for new features
   - 🎉 **Show and Tell** - Show off what you've built
   - 📣 **Announcements** - Project announcements (maintainers only)

Discussion templates are provided in [.github/DISCUSSION_TEMPLATE/](./)

### Sponsors

**Path:** `Settings > General > Features`

If you want to accept sponsorships:

1. ✅ Enable Sponsorships
2. Edit [.github/FUNDING.yml](./FUNDING.yml)
3. Add your GitHub Sponsors username or other funding platforms

### Code Owners

Create `.github/CODEOWNERS` to automatically request reviews:

```
# Default owners for everything
* @yourusername

# Specific paths
/docs/ @yourusername @docs-team
/.github/ @yourusername
```

### Milestones

**Path:** `Issues > Milestones > New milestone`

Create milestones to organize work:

1. **v1.0.0** - Initial stable release
2. **v2.0.0** - Next major version

## Verification Checklist

After setup, verify everything works:

- [ ] Renovate app installed and creating PRs
- [ ] Branch protection enabled on `main`
- [ ] Required status checks configured (`ci`, `CodeQL`)
- [ ] Labels created
- [ ] NPM_TOKEN secret added (if publishing)
- [ ] Secret scanning enabled
- [ ] Test PR creation to verify auto-merge works
- [ ] Push a commit to verify CI runs
- [ ] Check CodeQL runs weekly

## Getting Help

If you encounter issues during setup:

- Check the [CONTRIBUTING.md](../../CONTRIBUTING.md) for development setup
- Review [GitHub's documentation](https://docs.github.com/)
- Open a [discussion](../../discussions) for questions

## Automation Scripts

For bulk setup across multiple repositories, consider using:

- **GitHub CLI (`gh`)** - Shown in the labels section above
- **Terraform** - For infrastructure-as-code approach
- **GitHub API** - For custom automation scripts

Example Terraform setup is available in the discussions if you need to manage multiple repositories.
