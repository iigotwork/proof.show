# proof.show

**Prove your photos are real, not AI-generated.**

[![Live Site](https://img.shields.io/badge/Live-proof.show-007AFF?style=for-the-badge)](https://proof.show)
[![C2PA v1.3](https://img.shields.io/badge/C2PA-v1.3_Compatible-10B981?style=for-the-badge)](https://c2pa.org)
[![License: Source Available](https://img.shields.io/badge/License-Source_Available-EF4444?style=for-the-badge)](#license)

---

## What is proof.show?

proof.show is a content integrity platform that lets anyone prove a photo is authentic — not AI-generated, not edited, not pulled from a gallery. It's the "trust layer" for visual media on the internet.

**The problem:** AI can generate photorealistic images in seconds. Anyone can fake a car photo, a property listing, an insurance claim, or a news image. There's no easy way for the person on the other end to know if what they're looking at is real.

**The solution:** proof.show lets you take a live photo through your browser camera, seals it with a SHA-256 cryptographic hash and atomic timestamp, and gives you an 8-character **Proof Code**. Anyone can enter that code at [proof.show/v](https://proof.show/v) to instantly verify the photo is genuine — no account needed.

---

## How It Works

1. **Capture** — Open [proof.show/capture](https://proof.show/capture) on any device. The browser camera opens instantly. Gallery uploads are blocked.
2. **Seal** — SHA-256 hashing, atomic time sync (NTP), and human-presence detection happen in under a second, on-device.
3. **Share** — You receive an 8-character Proof Code. Share it alongside your photo anywhere.
4. **Verify** — Anyone visits [proof.show/v](https://proof.show/v), enters the code, and sees verification results instantly.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Live-Only Capture** | Gallery uploads blocked. Only real-time camera captures accepted. |
| **Zero Cloud Storage** | Full images never leave the device. Only the hash and metadata are stored. |
| **C2PA v1.3 Compatible** | Full support for Coalition for Content Provenance and Authenticity standards. |
| **Open Verification** | Anyone can verify a Proof Code — no account, app, or subscription required. |
| **Anti-Spoofing** | Virtual camera detection, moire pattern analysis, device motion liveness checks. |
| **Embeddable Widget** | Add verification badges to any website with a single script tag. |
| **7 Languages** | English, Spanish, French, German, Portuguese, Japanese, Chinese. |
| **10 Industry Solutions** | Legal, real estate, marketplaces, insurance, dating, journalism, collectors, automotive, construction, government. |

---

## Architecture

- **Frontend:** Expo (React Native) with web support — runs as a PWA on all devices
- **Backend:** Express.js with TypeScript
- **Database:** PostgreSQL with Drizzle ORM
- **Crypto:** SHA-256 via Web Crypto API, ECDSA P-256 for manifest signing
- **Standard:** C2PA v1.3 content credentials

---

## Embeddable Widget

Add a verification badge to any website:

```html
<div data-proof-widget data-proof-id="YOUR_PROOF_KEY"></div>
<script src="https://proof.show/proof-widget.js"></script>
```

Options: `data-theme="light"` | `data-size="compact"`

---

## API

**Verify a Proof Code:**
```
GET https://proof.show/api/v1/widget/AB3K7TYN
```

**Response:**
```json
{
  "verified": true,
  "proofKey": "AB3K7TYN",
  "capturedAt": "2026-03-08T12:00:00.000Z",
  "captureType": "web_capture",
  "imageHash": "a7ffc6f8..."
}
```

Full API documentation: [llms-full.txt](https://proof.show/llms-full.txt)

---

## AI Transparency

| File | Purpose |
|------|---------|
| [`llms.txt`](https://proof.show/llms.txt) | AI agent summary — capabilities, citation guidance, brand identity |
| [`llms-full.txt`](https://proof.show/llms-full.txt) | Full technical specification with C2PA implementation details |
| [`ai.txt`](https://proof.show/ai.txt) | Spawning standard — training: allow, search: allow, attribution: required |
| [`/.well-known/ai-provenance.json`](https://proof.show/.well-known/ai-provenance.json) | Cryptographic identity and C2PA v1.3 compatibility declaration |

---

## Contributing

We welcome contributions to the UI and frontend components. Please note:

- **Open:** Frontend components, templates, styling, i18n translations, widget code
- **Closed:** Core detection algorithms, cryptographic signing logic, database schemas

To contribute:
1. Fork this repository
2. Create a feature branch
3. Submit a pull request with a clear description

---

## License

This project uses a **Source Available** license. You may view, study, and contribute to the code, but commercial redistribution or cloning of the core business model is strictly prohibited. See [LICENSE](LICENSE) for full terms.

---

## Links

- **Live Site:** [proof.show](https://proof.show)
- **Verify a Photo:** [proof.show/v](https://proof.show/v)
- **Take a Proof Photo:** [proof.show/capture](https://proof.show/capture)
- **Developer API Keys:** [proof.show/developers](https://proof.show/developers)
- **AI Transparency:** [proof.show/llms.txt](https://proof.show/llms.txt)

---

*Built by proof.show — the trust layer for the internet.*
