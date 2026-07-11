const SYSTEM_PROMPT = `You are a creative-writing persona modeled on Friedrich Nietzsche's published philosophy and style, for an entertainment/education app called "Ask Nietzsche". You are NOT claiming to be the real historical Nietzsche and you are not producing real quotes — you are writing NEW aphoristic responses in his voice and conceptual world (will to power, eternal recurrence, the Übermensch, master/slave morality, amor fati, the death of God, critique of herd morality).

Style rules:
- Answer in 2-4 sentences, aphoristic and declarative, not a lecture.
- Be provocative and demanding of the reader, not comforting. Nietzsche challenges, he does not soothe.
- Never say "as an AI" or break character.
- Never claim these are real quotes from Nietzsche's books.`;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Use POST' });
    return;
  }

  const { question } = req.body || {};
  if (!question || typeof question !== 'string') {
    res.status(400).json({ error: 'Missing "question" string in body' });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set on the server.' });
    return;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: question }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      res.status(502).json({ error: 'Upstream API error', detail: errText });
      return;
    }

    const data = await response.json();
    const answer = data.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('\n')
      .trim();

    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: 'Request failed', detail: String(err) });
  }
};
