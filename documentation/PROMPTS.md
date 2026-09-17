# Hackathon Development Prompts - Clients CRUD API

## Prompt 1: Project Initialization & Setup
> **Goal:** Set up a Node.js + NestJS/TypeScript project using `npm`, Prisma, and PostgreSQL.

Act as a Senior Backend Developer. Help me set up a Node.js REST API with TypeScript for managing `Clients`.
Requirements:
1. Package manager: `pnpm`
2. ORM: `Prisma` with `PostgreSQL` driver
3. Validation: `class-validator` and `class-transformer`
4. Folder structure:
   - `src/clients/dto`
   - `src/clients/clients.controller.ts`
   - `src/clients/clients.service.ts`
   - `src/clients/clients.module.ts`
   - `src/prisma/prisma.service.ts`
5. Provide terminal commands to install dependencies (`@prisma/client`, `class-validator`, `class-transformer`, `dotenv`, etc.) and dev dependencies (`prisma`, `typescript`, `@types/node`).
6. Fallback instruction: If dependency installation fails due to network/environment issues, provide instructions to generate a zip bundle or standard setup.

---

## Prompt 2: Prisma Schema Definition
> **Goal:** Create the database model matching the CreateClientDto fields.

Create a Prisma schema for the `Client` entity in PostgreSQL.
Fields mapping:
- `id`: String (UUID / `@id @default(uuid())`)
- `name`: String
- `taxId`: String (Unique)
- `email`: String (Optional, Unique)
- `phone`: String (Optional)
- `createdAt`: DateTime (`@default(now())`)
- `updatedAt`: DateTime (`@updatedAt`)

Provide the `prisma/schema.prisma` model code and the `pnpm` command to run migrations (`pnpm prisma migrate dev`).

---

## Prompt 3: DTOs & CRUD Controllers
> **Goal:** Implement DTOs and complete CRUD operations.

Write the TypeScript code for the Clients entity:

1. `src/clients/dto/create-client.dto.ts`:
```typescript
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  taxId: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

---

## Prompt 4: AI Agent Setup for API & DTO Sync (`routes.md`)
> **Goal:** Create an automated GitHub Action agent that inspects changes in Controllers and DTOs during a PR and updates `routes.md`.

Act as a DevOps and AI Engineer. Help me create an automated workflow using GitHub Actions and Node.js.
Requirements:
1. Detect changes in `src/clients/dto/*` and `src/clients/clients.controller.ts` whenever a PR is opened or updated.
2. Run a Node.js script using the Open AI (`openai`) to read the `git diff`.
3. Compare the changes against `routes.md`.
4. Update `routes.md` automatically with the updated request payloads, fields (`name`, `taxId`, `email`, `phone`), validation rules, and HTTP endpoints.
5. Commit the updated `routes.md` file back to the pull request branch.