# Ask Nietzsche

A small chat app that answers your questions in the voice of Nietzsche's philosophy.

- **Classic mode**: keyword-matched retrieval against a curated set of real Nietzsche quotes (`api/quotes.json`).
- **Modern mode**: calls the Anthropic API with a Nietzsche-persona system prompt to generate a fresh response.

No build step, no database, no local model downloads — this is intentionally the minimal version of the idea.

## Run locally

```bash
npm install -g vercel   # if you don't have it
vercel dev
```

This serves `index.html` and the `/api/ask` function together at `http://localhost:3000`.

## Deploy (Vercel, ~2 minutes)

1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. In the project's **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your Anthropic API key (needed for Modern mode only — Classic mode works with no key at all)
4. Deploy. Vercel auto-detects the static `index.html` + the `/api` serverless function, no config needed.

If you don't have an Anthropic key handy, Classic mode alone is enough for a working, demoable prototype — just don't wire up the "Modern" button in your walkthrough, or mention it as a stretch feature that needs a key.

## Project structure

```
index.html        # entire frontend — HTML/CSS/JS, no framework, no bundler
api/ask.js         # serverless function: keyword retrieval (classic) + LLM call (modern)
api/quotes.json    # curated real quotes, tagged by theme, used for Classic mode
package.json       # just declares the Node engine version for Vercel
```

---

## Build write-up (fill in with your own specifics)

Use this as a skeleton — replace the bracketed parts with what actually happened when you worked with the AI assistant.

### 1. Planning
- I asked [assistant] to help me build a simplified version of an existing "Ask Nietzsche" repo idea that had stalled on local model complexity (gated Llama 2 downloads, GGML quantization).
- Decision I made: cut scope to a keyword-matched quote mode + one API-backed "modern" mode, instead of running any model locally — this was the single biggest choice that made the build finishable in hours instead of days.

### 2. What the AI generated
- [Assistant] scaffolded the file structure, the keyword-matching function, the serverless API handler, the persona system prompt, and the frontend in one pass.
- Where it helped: [e.g. the CSS/animation details, the JSON quote structure, remembering Vercel's zero-config conventions]
- Where I'd want to double check / where it could be wrong: [e.g. verify the exact Vercel Node runtime behavior once deployed; verify quote attributions are accurate before publishing; confirm the model name string used in api/ask.js is still valid at deploy time]

### 3. My review and edits
- [What you changed after testing locally — e.g. tightened the system prompt, added an error state, adjusted quote themes after testing a few queries]
- [Any bug you caught — e.g. I ran the matching function standalone with a few sample questions before wiring it into the endpoint, to catch logic issues early]

### 4. Honest assessment
- What I would NOT trust the AI to have gotten right without checking: [e.g. quote attributions/accuracy, whether the model string is current, edge cases in matching logic]
- What I'd build next with more time: [e.g. embeddings-based retrieval instead of keyword matching, conversation memory, more curated quotes]
