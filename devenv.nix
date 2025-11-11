{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "TypeScript Library Template";

  # https://devenv.sh/packages/
  packages = with pkgs; [
    # Core tooling
    bun
    nodejs_22

    # Task runner
    go-task

    # Linters and formatters
    yamllint
    taplo

    # Git tooling
    git
  ];

  # https://devenv.sh/languages/
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_22;
    bun.enable = true;
  };

  # https://devenv.sh/scripts/
  scripts.hello.exec = ''
    echo "Welcome to $GREET development environment!"
    echo "Available commands:"
    echo "  task --list-all  - Show all available tasks"
    echo "  bun install      - Install Node.js dependencies"
  '';

  enterShell = ''
    hello
  '';

  # https://devenv.sh/tasks/
  # tasks = {
  #   "myproj:setup".exec = "mytool build";
  #   "devenv:enterShell".after = [ "myproj:setup" ];
  # };

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    task ci:check
  '';

  # https://devenv.sh/pre-commit-hooks/
  pre-commit.hooks = {
    # Nix formatting
    nixpkgs-fmt.enable = true;

    # Run task-based pre-commit checks
    task-precommit = {
      enable = true;
      name = "Task pre-commit";
      entry = "task ci:precommit";
      pass_filenames = false;
    };
  };

  # See full reference at https://devenv.sh/reference/options/
}
