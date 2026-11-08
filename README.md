# MoroccoFormKit 🇲🇦

**Open-source, dependency-free JavaScript utilities for more inclusive digital forms in Morocco.**

MoroccoFormKit is an early-stage developer toolkit that helps websites and apps handle common Moroccan form inputs and display clear user-facing messages in **Moroccan Darija (الدارجة)**, **Modern Standard Arabic (العربية)**, and **French (français)**.

> **Project status:** working proof of concept, v0.1.0. We have not yet released an npm package or established real-world usage metrics. Contributions and feedback are welcome.

## Why this exists

Developers building Moroccan e-commerce sites, school portals, community apps, and public-service interfaces often have to repeat the same work: handling local phone-number formats, displaying meaningful localized validation errors, and making forms usable for people who prefer different languages.

MoroccoFormKit aims to make those common building blocks **free, transparent, reusable, and open to community improvement**. The goal is to lower barriers for small teams and independent developers building tools for Moroccan users.

## What works today

- **Moroccan mobile number format checks** for local `06`/`07` and international `+212`/`00212` notations.
- **Phone normalization** to a standard `+212...` representation.
- **Five-digit postal-code format checks** (format only, not a geographic lookup).
- **Arabic-Indic numeral conversion**, so people can type numbers with different keyboard layouts.
- **Localized form labels and error messages** in Darija, Arabic, and French.
- **Dependency-free code**, automated tests, and an interactive browser demo.

**Important limitations:** A valid format does not mean a telephone line is allocated or active, or that a postal code exists. This prototype does not validate customer identities, addresses, or carrier assignments. Darija translations are initial drafts and need feedback from native speakers across regions.

## Quick start

Requires Node.js 18 or newer.

```bash
git clone https://github.com/YOUR_USERNAME/morocco-form-kit.git
cd morocco-form-kit
npm test
```

The GitHub URL above is a placeholder. Replace `YOUR_USERNAME` with your own GitHub handle once you publish the repository.

No dependencies are needed to run the library or its tests.

```js
import {
  normalizeMoroccanMobile,
  isValidMoroccanMobile,
  isValidMoroccanPostalCode,
  getMessage
} from './src/index.js';

normalizeMoroccanMobile('06 12 34 56 78'); // '+212612345678'
isValidMoroccanMobile('+212 7 12 34 56 78'); // true
isValidMoroccanPostalCode('٤٠٠٠٠'); // true
getMessage('invalidMobile', 'darija'); // 'دخل نمرة مغربية صحيحة كتبدا بـ 06 ولا 07.'
```

### Try the browser demo

From the repository root, run:

```bash
python3 -m http.server 8000
```

Then open **http://localhost:8000/demo/**. Switch between French, Arabic and Darija, then try valid and invalid inputs. The demo runs entirely in your browser: it does not send data to a server.

## Roadmap

These are **planned features**, not claims about current functionality.

- [x] Initial validation helpers, localization, tests, and browser demo
- [ ] Improve Darija translations through open community review
- [ ] Optional integration examples for React, Vue, and vanilla JS forms
- [ ] More accessible form patterns and RTL usability testing
- [ ] Maintainable, source-linked datasets for Moroccan regions and cities
- [ ] Documentation website and versioned package release
- [ ] Publish community feedback and real adoption metrics when available

See [CONTRIBUTING.md](CONTRIBUTING.md) to help with issues, code, documentation, testing, or localization.

## Who is it for?

Moroccan developers, independent businesses, educational initiatives, civic-tech groups, and anyone building digital services intended for Moroccan audiences.

## How contributors can help

Open an issue with a form UX challenge you've encountered in a Moroccan app, suggest a Darija translation improvement, propose an accessibility test, or submit a pull request. Small, well-scoped contributions are welcome. Please don't include real customers' phone numbers or personal data in issues and tests.

## Reference and design notes

Mobile-number format checks are informed by Morocco's national numbering plan maintained by **ANRT**: [ANRT numbering guidance](https://www.anrt.ma/en/infos-pratiques/ce-que-vous-devez-savoir/numerotation). These checks intentionally cover common `06`/`07` mobile formats and are not a full numbering-plan validator. Future updates should re-check official guidance before changing accepted formats.

The toolkit does not collect, send, or store personal information. Local integrators are responsible for implementing their own secure handling and privacy compliance.

## License

[MIT](LICENSE) — free to use, modify, and distribute with attribution.

---

**Made for the Moroccan developer ecosystem. Built in the open.**
