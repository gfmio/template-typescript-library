# Stale Bot Setup Guide

This guide explains how to set up and configure the Stale bot for automatic issue and pull request management.

## What is Stale Bot?

[Probot Stale](https://github.com/probot/stale) is a GitHub App that automatically closes abandoned issues and pull requests after a period of inactivity. It helps maintain a clean issue tracker by:

- Marking inactive issues/PRs as "stale" after a configurable period
- Automatically closing stale items if they remain inactive
- Allowing users to keep issues open by commenting
- Exempting certain labels, milestones, or assignees

## Installation

### Step 1: Install the GitHub App

1. Go to the [Stale GitHub App page](https://github.com/apps/stale)
2. Click **"Install"** or **"Configure"**
3. Choose whether to install on:
   - All repositories in your account/organization
   - Only selected repositories (recommended - choose this repository)
4. Click **"Install"** to grant permissions

### Step 2: Verify Installation

After installation:

1. Check that the app appears in your repository's Settings > Integrations
2. The bot will start monitoring your repository immediately
3. It runs every hour and processes up to 30 items per run (configurable)

## Configuration

The configuration file is located at [.github/stale.yml](../.github/stale.yml).

### Current Configuration

```yaml
# Number of days of inactivity before marking as stale
daysUntilStale: 60

# Number of days before closing after marked stale
daysUntilClose: 7

# Labels that prevent staling
exemptLabels:
  - pinned
  - security
  - [Status] Maybe Later
  - [Type] Enhancement
  - [Type] Breaking Change

# Label applied when marked stale
staleLabel: stale
```

### Configuration Options

#### Basic Timing

- **`daysUntilStale`**: Days of inactivity before marking as stale (default: 60)
- **`daysUntilClose`**: Days of inactivity after stale before closing (default: 7)
  - Set to `false` to disable auto-closing

#### Exemptions

```yaml
# Exempt specific labels
exemptLabels:
  - pinned
  - security

# Exempt items in projects
exemptProjects: true

# Exempt items in milestones
exemptMilestones: true

# Exempt items with assignees
exemptAssignees: true
```

#### Limiting Scope

```yaml
# Only process issues (not pull requests)
only: issues

# Or only process pull requests
only: pulls
```

#### Different Settings for Issues vs PRs

```yaml
# Settings specific to pull requests
pulls:
  daysUntilStale: 90
  daysUntilClose: 14
  markComment: >
    This pull request has been automatically marked as stale...

# Settings specific to issues
issues:
  daysUntilStale: 60
  daysUntilClose: 7
```

#### Performance

```yaml
# Limit operations per hour (1-30)
limitPerRun: 30
```

### Customizing Messages

#### Stale Comment

```yaml
markComment: >
  This issue has been automatically marked as stale because it has not had
  recent activity. It will be closed if no further activity occurs. Thank you
  for your contributions.
```

#### Close Comment

```yaml
closeComment: >
  This issue has been automatically closed due to inactivity. If you believe this
  is still relevant, please feel free to reopen it or create a new issue with
  updated information.
```

#### Unmark Comment

```yaml
unmarkComment: >
  This issue is no longer considered stale. Thank you for the update!
```

Set any comment to `false` to disable it:

```yaml
markComment: false  # Don't comment when marking stale
```

## Usage

### For Maintainers

#### Preventing Items from Going Stale

1. **Add exempt labels**:
   ```
   pinned, security, [Type] Breaking Change
   ```

2. **Add to a milestone**:
   - If `exemptMilestones: true` is set

3. **Assign someone**:
   - If `exemptAssignees: true` is set

4. **Add to a project**:
   - If `exemptProjects: true` is set

#### Manual Stale Management

Remove stale label:
```bash
# Via GitHub CLI
gh issue edit <number> --remove-label stale

# Or through GitHub UI
```

Add stale label manually:
```bash
gh issue edit <number> --add-label stale
```

### For Contributors

#### Keeping Issues Open

If an issue is marked stale but you're still working on it:

1. **Comment on the issue**:
   - Any comment removes the stale label
   - Resets the inactivity timer
   - Example: "Still working on this, will have a PR soon"

2. **Add activity**:
   - Push commits to linked PRs
   - Add new information
   - React to comments

#### Reopening Closed Issues

If an issue was auto-closed but is still relevant:

1. **Reopen the issue**:
   - Click "Reopen issue" button
   - Add a comment explaining why it's still relevant

2. **Create a new issue**:
   - Reference the closed issue
   - Provide updated context

## Workflow Examples

### Example 1: Standard Issue Lifecycle

```
Day 0:   Issue created
Day 30:  Last activity (comment)
Day 90:  Marked as stale (60 days after last activity)
Day 97:  Closed (7 days after marked stale)
```

### Example 2: Issue with Activity

```
Day 0:   Issue created
Day 30:  Last activity
Day 90:  Marked as stale
Day 92:  User comments → stale label removed
Day 152: Marked as stale again (60 days after comment)
Day 159: Closed
```

### Example 3: Pinned Issue

```
Day 0:   Issue created with "pinned" label
Day 365: Still open (exempt from staling)
```

## Best Practices

### Recommended Settings

For active projects:
```yaml
daysUntilStale: 60   # 2 months
daysUntilClose: 7    # 1 week warning
```

For less active projects:
```yaml
daysUntilStale: 120  # 4 months
daysUntilClose: 14   # 2 weeks warning
```

For very active projects:
```yaml
daysUntilStale: 30   # 1 month
daysUntilClose: 7    # 1 week warning
```

### Label Strategy

Create these labels in your repository:

1. **`stale`** (gray): Auto-applied by bot
2. **`pinned`** (blue): Exempt from staling
3. **`security`** (red): Security issues stay open
4. **`[Status] Maybe Later`** (yellow): Feature requests to revisit

### Communication Tips

1. **Be transparent**: Explain in CONTRIBUTING.md that stale bot is active
2. **Be helpful**: Make it clear how to prevent staling
3. **Be responsive**: Check stale issues regularly before they close
4. **Be flexible**: Adjust timing based on community feedback

## Monitoring

### Check Bot Activity

1. **View bot comments**: Search for comments from `stale[bot]`
2. **Check logs**: Repository Settings > Installed GitHub Apps > Stale > View logs
3. **Monitor labels**: Track issues with `stale` label

### GitHub CLI Examples

```bash
# List stale issues
gh issue list --label stale

# List issues about to go stale (pseudo-code)
gh issue list --json updatedAt,number,title \
  --jq '.[] | select(.updatedAt | fromdateiso8601 < (now - 60*24*60*60))'

# Remove stale label from all issues
gh issue list --label stale --json number --jq '.[].number' | \
  xargs -I {} gh issue edit {} --remove-label stale
```

## Troubleshooting

### Bot Not Working

1. **Check installation**:
   - Settings > Integrations > Stale should be listed

2. **Verify configuration**:
   - File must be at `.github/stale.yml`
   - YAML must be valid (use [YAML Lint](https://www.yamllint.com/))

3. **Check permissions**:
   - Bot needs "Read and write access to issues and pull requests"

4. **Wait for next run**:
   - Bot runs every hour
   - May take up to 1 hour to process

### Bot Marking Wrong Issues

1. **Add to exemptLabels**:
   ```yaml
   exemptLabels:
     - your-label-here
   ```

2. **Use project/milestone exemptions**:
   ```yaml
   exemptProjects: true
   exemptMilestones: true
   ```

3. **Adjust timing**:
   ```yaml
   daysUntilStale: 90  # Increase if too aggressive
   ```

### Disable for Specific Item Types

```yaml
# Disable for pull requests
pulls:
  daysUntilClose: false

# Disable for issues
issues:
  daysUntilClose: false
```

## Advanced Configuration

### Custom Search Query

For more complex rules, use the Stale app's advanced features:

```yaml
# Mark only issues (not PRs)
only: issues

# Different settings for issues vs PRs
pulls:
  daysUntilStale: 90
  exemptLabels:
    - dependencies

issues:
  daysUntilStale: 60
  exemptLabels:
    - feature-request
```

### Integration with Other Bots

Works well with:
- **Renovate**: Exempt dependency update PRs
- **Dependabot**: Use `exemptLabels: [dependencies]`
- **Release Please**: Exempt release PRs

## Uninstalling

If you want to remove the bot:

1. Go to Settings > Integrations
2. Click "Configure" next to Stale
3. Scroll down and click "Uninstall"
4. Optionally delete `.github/stale.yml`

## Resources

- [Probot Stale GitHub Repository](https://github.com/probot/stale)
- [GitHub App Marketplace](https://github.com/marketplace/stale)
- [Probot Documentation](https://probot.github.io/)
- [GitHub Apps Documentation](https://docs.github.com/en/apps)

## Example Workflows

### Weekly Maintenance

```bash
#!/bin/bash
# Check stale issues and decide which to keep

# List stale issues
echo "Stale Issues:"
gh issue list --label stale

# Remove stale from important issues
echo "Enter issue numbers to keep open (space-separated):"
read -r numbers
for num in $numbers; do
  gh issue edit "$num" --remove-label stale
  gh issue comment "$num" --body "Keeping this issue open for now."
done
```

### Monthly Report

```bash
#!/bin/bash
# Generate report of stale bot activity

echo "Stale Bot Activity Report"
echo "========================"
echo ""
echo "Currently Stale:"
gh issue list --label stale --json number,title | jq length
echo ""
echo "Closed by Stale Bot (last 30 days):"
gh issue list --state closed --search "closed:>$(date -d '30 days ago' +%Y-%m-%d) label:stale" | wc -l
```

## See Also

- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) - Community guidelines
- [Issue Templates](../.github/ISSUE_TEMPLATE/) - Issue creation templates
