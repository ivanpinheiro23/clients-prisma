# Copilot Instructions

## Generated Documentation

- Treat `BUSINESS_RULES.md` and `ROUTES.md` as read-only files during local development and coding tasks.
- Do not create, edit, delete, or reformat either file manually.
- These files are maintained exclusively by the GitHub Actions workflows that generate and commit their contents: `.github/workflows/update-rules.yml` and `.github/workflows/update-readme.yml`.
- If a code or API change requires documentation updates, modify the source code and related tests only. The GitHub Actions workflows will update and commit the generated documentation.
- If the user explicitly asks to change either generated file, explain that the change must be made through the corresponding GitHub Action instead of editing the file directly.
