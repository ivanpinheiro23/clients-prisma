import fs from 'node:fs/promises';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY is not configured');
}

const diff = await fs.readFile('api-diff.txt', 'utf8');

if (!diff.trim()) {
  console.log('No API changes detected.');
  process.exit(0);
}

let routes;
try {
  routes = await fs.readFile('ROUTES.md', 'utf8');
} catch {
  routes = '# API Routes\n\nThis file documents the public HTTP endpoints of the API.\n';
}

const prompt = `
You maintain ROUTES.md, a file that documents the public HTTP endpoints of a NestJS REST API.
This file is separate from README.md and must contain ONLY endpoint documentation
(routes, HTTP methods, request/response bodies, parameters, and examples).

Analyze the API changes in the git diff and update ROUTES.md accordingly.

Rules:

- All documentation must be written in English.
- Update only endpoints affected by the API changes.
- Preserve documentation for unrelated endpoints.
- Keep the documentation concise.
- Document endpoints, request bodies, parameters and examples when relevant.
- If a DTO field was added, removed or renamed, update the corresponding examples.
- If a controller route or HTTP method changed, update the endpoint documentation.
- If the Prisma schema changes but does not affect the public API, do not invent API changes.
- Do not document implementation details unless they are already documented.
- Do not use markdown code fences around the entire response.
- Return ONLY the complete updated ROUTES.md.
- Do not explain your changes.

CURRENT ROUTES.md:

${routes}

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
    model: 'gpt-5.6-terra',
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

const updatedRoutes = data.output
  ?.flatMap((item) => item.content ?? [])
  ?.find((item) => item.type === 'output_text')
  ?.text;

if (!updatedRoutes) {
  throw new Error('The model did not return updated ROUTES.md content');
}

await fs.writeFile(
  'ROUTES.md',
  updatedRoutes.trim() + '\n',
  'utf8',
);

console.log('ROUTES.md updated successfully.');