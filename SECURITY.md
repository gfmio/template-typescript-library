# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of our project seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Disclose Publicly

Please do **not** open a public GitHub issue for security vulnerabilities. This could put all users at risk.

### 2. Report Privately

Send a detailed report to: **npm@gfm.io**

Include the following information:

- **Type of vulnerability** (e.g., XSS, SQL injection, authentication bypass)
- **Full paths of source file(s)** related to the vulnerability
- **Location of the affected source code** (tag/branch/commit or direct URL)
- **Step-by-step instructions to reproduce** the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the vulnerability** - what can an attacker achieve?
- **Suggested fix** (if you have one)

### 3. Response Timeline

- **Initial Response:** Within 48 hours of your report
- **Status Update:** Within 7 days with an assessment and timeline
- **Resolution:** We aim to release a fix within 90 days for valid vulnerabilities

### 4. Coordinated Disclosure

We follow a coordinated disclosure process:

1. **Acknowledgment** - We confirm receipt of your report
2. **Investigation** - We investigate and validate the vulnerability
3. **Fix Development** - We develop and test a fix
4. **Release** - We release a patched version
5. **Public Disclosure** - After the fix is released, we publish a security advisory

We request that you:
- Give us reasonable time to respond and fix the issue before public disclosure
- Make a good faith effort to avoid privacy violations, data destruction, and service disruption

### 5. Recognition

We maintain a [SECURITY_ACKNOWLEDGMENTS.md](./SECURITY_ACKNOWLEDGMENTS.md) file to recognize security researchers who have responsibly disclosed vulnerabilities. With your permission, we will:

- Add your name/handle to our acknowledgments
- Credit you in the security advisory
- Provide a reference for responsible disclosure practices

## Security Best Practices

When using this library, we recommend:

1. **Keep Updated** - Always use the latest stable version
2. **Review Dependencies** - Regularly audit your dependencies with `task deps:audit`
3. **Enable Security Features** - Follow our [security guidelines](https://gfmio.github.io/template-typescript-library/security)
4. **Monitor Advisories** - Watch this repository for security advisories
5. **Use Dependabot/Renovate** - Enable automated dependency updates

## Security Features

This library implements the following security measures:

- **TypeScript Strict Mode** - Catch potential issues at compile time
- **Input Validation** - All public APIs validate inputs
- **No Eval/Function** - We never use `eval()` or `new Function()`
- **Dependency Scanning** - Automated scanning via GitHub Dependabot
- **Code Scanning** - CodeQL analysis on every commit
- **Secure CI/CD** - Signed releases with provenance

## Known Security Considerations

### Type Safety

This library is written in TypeScript with strict type checking enabled. However, type safety can only be guaranteed at compile time. Always validate runtime data, especially from untrusted sources.

### Dependencies

We regularly audit and update our dependencies. You can view the full dependency tree:

```bash
task deps:list
```

## Security Updates

Security updates are released as:

- **Patch releases** (x.x.X) for vulnerabilities in supported versions
- **Security advisories** published on GitHub
- **CVE assignments** for significant vulnerabilities (when applicable)

Subscribe to releases and security advisories on GitHub to stay informed.

## Questions?

If you have questions about this security policy, please email: **npm@gfm.io**

---

**Last Updated:** 2025-01-11
