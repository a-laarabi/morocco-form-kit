# Contributing to MoroccoFormKit

Thank you for helping improve digital forms for Moroccan users.

## First contribution

1. Open an issue describing the problem, use case, or language improvement.
2. Fork the repository and create a focused branch.
3. Add tests for any change in validation behavior.
4. Run `npm test` and verify it passes.
5. Open a pull request explaining what changed and why.

We welcome contributions to code, documentation, accessibility, French/Arabic/Darija messaging, and UX testing. Darija expressions differ across regions, so explain the context of proposed translations when possible.

## Quality and privacy

- Do not paste real phone numbers, addresses, or other personal data into issues, tests, or examples.
- Be clear whether a rule validates **format** or verifies authoritative records. This project currently does format validation only.
- For numbering-plan changes, link to official ANRT materials or other credible technical sources.
- Do not add external dependencies without discussing the need first.
- Be respectful and constructive with other contributors.

## Development

Requires Node.js 18+.

```bash
npm test
python3 -m http.server 8000
```

Open http://localhost:8000/demo/ to test the sample form.
