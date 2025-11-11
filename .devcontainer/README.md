# Dev Container Configuration

This directory contains the configuration for using this project with [Development Containers](https://containers.dev/).

## What is a Dev Container?

A dev container is a Docker container that provides a fully-featured development environment. It includes all the tools, runtimes, and dependencies you need to work on the project.

## Features

This dev container:

- Uses the official [devenv container image](https://github.com/cachix/devenv) with Nix support
- Automatically activates the devenv shell with all project dependencies
- Installs Node.js dependencies on container creation
- Includes recommended VS Code extensions for TypeScript, Biome, Markdown, YAML, TOML, and Nix
- Configures VS Code settings optimized for this project
- Provides access to all tools: Bun, Task, yamllint, taplo, etc.

## Prerequisites

You need one of the following:

- **VS Code**: Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- **GitHub Codespaces**: Works out of the box
- **Other IDEs**: Any IDE that supports devcontainers (JetBrains IDEs, etc.)

## Usage

### VS Code

1. Open the project in VS Code
2. When prompted, click "Reopen in Container"
   - Or use Command Palette: `Dev Containers: Reopen in Container`
3. Wait for the container to build and start
4. Start coding! All tools are automatically available

### GitHub Codespaces

1. Go to the repository on GitHub
2. Click the green "Code" button
3. Select the "Codespaces" tab
4. Click "Create codespace on main"
5. Wait for the environment to set up
6. Start coding in the browser or connect with VS Code

### CLI

You can also use the devcontainer CLI:

```bash
npm install -g @devcontainers/cli
devcontainer up --workspace-folder .
devcontainer exec --workspace-folder . bash
```

## Installed VS Code Extensions

- **biomejs.biome** - Fast linting and formatting
- **dbaeumer.vscode-eslint** - ESLint integration (JSDoc only)
- **yzhang.markdown-all-in-one** - Markdown support
- **DavidAnson.vscode-markdownlint** - Markdown linting
- **redhat.vscode-yaml** - YAML support
- **tamasfe.even-better-toml** - TOML support
- **eamodio.gitlens** - Git supercharged
- **task.vscode-task** - Task runner integration
- **jnoortheen.nix-ide** - Nix language support

## Customization

To customize the dev container for your needs:

1. Edit `.devcontainer/devcontainer.json`
2. Rebuild the container: Command Palette → `Dev Containers: Rebuild Container`

## Troubleshooting

### Container won't start

- Ensure Docker is running
- Try rebuilding: `Dev Containers: Rebuild Container`
- Check Docker logs for errors

### Tools not available

- The devenv shell should activate automatically
- If not, run: `devenv shell`
- Check that direnv was allowed: `direnv allow`

### Slow container startup

- First-time setup downloads the Nix environment, which can take a few minutes
- Subsequent starts are much faster due to caching
- The `.devenv` directory is mounted to persist the environment

## See Also

- [Development Containers Documentation](https://containers.dev/)
- [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
- [GitHub Codespaces](https://github.com/features/codespaces)
- [devenv Documentation](https://devenv.sh/)
