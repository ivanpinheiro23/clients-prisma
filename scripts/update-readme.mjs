import fs from 'node:fs/promises';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY is not configured');
}

const diff = await fs.readFile('api-diff.txt', 'utf8');
const readme = await fs.readFile('README.md', 'utf8');

if (!diff.trim()) {
  console.log('No API changes detected.');
  process.exit(0);
}

const prompt = `
You maintain the README of a NestJS REST API.

Analyze the API changes in the git diff and update the README accordingly.

Rules:

- All documentation must be written in English.
- Update only information affected by the API changes.
- Preserve unrelated README sections.
- Keep the documentation concise.
- Document endpoints, request bodies, parameters and examples when relevant.
- If a DTO field was added, removed or renamed, update the corresponding examples.
- If a controller route or HTTP method changed, update the endpoint documentation.
- If the Prisma schema changes but does not affect the public API, do not invent API changes.
- Do not document implementation details unless they are already documented.
- Do not use markdown code fences around the entire response.
- Return ONLY the complete updated README.md.
- Do not explain your changes.

CURRENT README:

${readme}

GIT DIFF:

${diff}
`;

const response = await fetch('https://api.openai.com/v1/responses', {
  method: 'POST',
  headers: {
    Authorization: \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-5.6',
    input: prompt,
  }),
});

if (!response.ok) {
  const error = await response.text();
  throw new Error(
    \`OpenAI request failed: \${response.status} \${error}\`,
  );
}

const data = await response.json();

const updatedReadme = data.output
  ?.flatMap((item) => item.content ?? [])
  ?.find((item) => item.type === 'output_text')
  ?.text;

if (!updatedReadme) {
  throw new Error('The model did not return an updated README');
}

await fs.writeFile(
  'README.md',
  updatedReadme.trim() + '\n',
  'utf8',
);

console.log('README.md updated successfully.');