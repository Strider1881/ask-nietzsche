# Ask Nietzsche

A small chat app that answers your questions in the voice of Nietzsche's philosophy.

The app calls the Anthropic API with a Nietzsche-persona system prompt to generate a fresh response for each question.

No build step, no database, no local model downloads — this is intentionally the minimal version of the idea.

## Run locally

```bash
npm install -g vercel   # if you don't have it
vercel dev
```

This serves `index.html` and the `/api/ask` function together at `http://localhost:3000`.

Set `ANTHROPIC_API_KEY` in your environment (or a `.env` file for `vercel dev`) before asking questions.

## Deploy (Vercel, ~2 minutes)

1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. In the project's **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your Anthropic API key
4. Deploy. Vercel auto-detects the static `index.html` + the `/api` serverless function, no config needed.

## Project structure

```
index.html        # entire frontend — HTML/CSS/JS, no framework, no bundler
api/ask.js        # serverless function: LLM call via Anthropic API
package.json      # just declares the Node engine version for Vercel
```

---

## Build write-up (fill in with your own specifics)

Use this as a skeleton — replace the bracketed parts with what actually happened when you worked with the AI assistant.

### 1. Planning
- I asked [assistant] to help me build a simplified version of an existing "Ask Nietzsche" repo idea that had stalled on local model complexity (gated Llama 2 downloads, GGML quantization).
- Decision I made: use one API-backed mode instead of running any model locally — this was the single biggest choice that made the build finishable in hours instead of days.

### 2. What the AI generated
- [Assistant] scaffolded the file structure, the serverless API handler, the persona system prompt, and the frontend in one pass.
- Where it helped: [e.g. the CSS/animation details, remembering Vercel's zero-config conventions]
- Where I'd want to double check / where it could be wrong: [e.g. verify the exact Vercel Node runtime behavior once deployed; confirm the model name string used in api/ask.js is still valid at deploy time]

### 3. My review and edits
- [What you changed after testing locally — e.g. tightened the system prompt, added an error state]
- [Any bug you caught — e.g. error handling edge cases in the API handler]

### 4. Honest assessment
- What I would NOT trust the AI to have gotten right without checking: [e.g. whether the model string is current]
- What I'd build next with more time: [e.g. conversation memory, richer persona tuning]
