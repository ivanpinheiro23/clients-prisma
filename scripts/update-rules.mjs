import fs from 'node:fs/promises';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY is not configured');
}

const diff = await fs.readFile('business-rules-diff.txt', 'utf8');

if (!diff.trim()) {
  console.log('No business rule changes detected.');
  process.exit(0);
}

let rules;
try {
  rules = await fs.readFile('BUSINESS_RULES.md', 'utf8');
} catch {
  rules = '# Business Rules\n\nThis document describes the business behavior supported by the application.\n';
}

const prompt = `
You maintain BUSINESS_RULES.md for a NestJS client management API.
This document describes business behavior and domain decisions, not API documentation.

Analyze the code diff and update BUSINESS_RULES.md.

Rules:

- Write the documentation in English.
- Document only rules supported by the code, DTO validation, Prisma schema, tests, or explicit domain comments.
- Do not describe HTTP routes, status codes, curl commands, Swagger, controller decorators, or implementation details.
- Explain what the business means: required client identity, uniqueness, optional contact data, search behavior, lifecycle behavior, and validation or error outcomes.
- Group rules by meaningful domain topic, such as Client Identity, Contact Information, Search, Lifecycle, and Data Integrity.
- Keep unrelated existing rules unchanged.
- Remove rules that are no longer supported by the code.
- When a rule changes, update its wording instead of duplicating it.
- Use concise numbered rules or bullets with clear normative language.
- Do not invent permissions, workflows, statuses, audit requirements, or policies absent from the evidence.
- Do not use markdown code fences around the entire response.
- Return ONLY the complete updated BUSINESS_RULES.md.
- Do not explain your changes.

CURRENT BUSINESS_RULES.md:

${rules}

CODE DIFF:

${diff}
`;

const response = await fetch('https://api.openai.com/v1/responses', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-5.6-terra',
    input: prompt,
  }),
});

if (!response.ok) {
  const error = await response.text();
  throw new Error(`OpenAI request failed: ${response.status} ${error}`);
}

const data = await response.json();
const updatedRules = data.output
  ?.flatMap((item) => item.content ?? [])
  ?.find((item) => item.type === 'output_text')
  ?.text;

if (!updatedRules) {
  throw new Error('The model did not return updated BUSINESS_RULES.md content');
}

await fs.writeFile('BUSINESS_RULES.md', updatedRules.trim() + '\n', 'utf8');
console.log('BUSINESS_RULES.md updated successfully.');
