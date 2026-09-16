# Clients CRUD API

Basic REST CRUD built with NestJS, Prisma, PostgreSQL and npm.

## Requirements

- Node.js 20+
- npm (updated to latest — see note below)
- PostgreSQL
- [DDEV](https://ddev.com) (optional, recommended for local development behind a corporate proxy)

## Running with DDEV (recommended)

This project doesn't use a native DDEV project type (like `laravel` or `craftcms`), since it's a plain Node.js/NestJS API. It runs through a custom Node service added via `.ddev/docker-compose.node.yaml`, alongside a PostgreSQL database managed by DDEV itself.

### 1. Start the DDEV environment

```bash
ddev start
```

This spins up three services:

- `web` — DDEV's default PHP/webserver container (not used by the API, kept for DDEV compatibility)
- `db` — PostgreSQL 15
- `node` — Node.js 20 container running the actual API

### 2. Update npm and install dependencies

Update npm to the latest version inside the container first — older bundled versions can fail installing some transitive dependencies:

```bash
ddev exec -s node npm install -g npm@latest
```

Install dependencies with `--legacy-peer-deps` (required due to peer dependency ranges in NestJS packages):

```bash
ddev exec -s node npm install --legacy-peer-deps
```

If you run into inconsistent `node_modules` state (e.g. after switching package managers or interrupted installs), reset and reinstall clean:

```bash
ddev exec -s node rm -rf package-lock.json node_modules
ddev exec -s node npm cache clean --force
ddev exec -s node npm install --legacy-peer-deps
```

> **Corporate network note:** if your network uses SSL-inspecting proxies (common on corporate machines), you may need to trust your corporate root certificate inside the `node` container. Generate it once from your Keychain:
>
> ```bash
> security find-certificate -a -p /Library/Keychains/System.keychain > nscacert_combined.pem
> ```
>
> Then point Node to it via the `NODE_EXTRA_CA_CERTS` environment variable in `.ddev/docker-compose.node.yaml` (already configured in this project's compose file). Add `nscacert_combined.pem` to `.gitignore` — it's machine-specific and should not be committed.

### 3. Generate Prisma Client

```bashtr
ddev exec -s node npx prisma generate
```

> **Known issue:** Prisma downloads native engine binaries from `binaries.prisma.sh` during this step. On some corporate networks, this download gets interrupted (`ECONNRESET`) even with the corporate certificate trusted, likely due to proxy inspection on large binary streams. If this happens:
>
> - Temporarily connect to a network without the corporate proxy (e.g. a phone hotspot) and run this command once — the downloaded engines are cached and will be reused on subsequent runs.
> - To persist the cache across container recreations, mount a named volume at `/root/.cache/prisma` in `.ddev/docker-compose.node.yaml`.
> - Ask your infrastructure/security team to allowlist `binaries.prisma.sh` for a permanent fix.
> - If the command fails the first time, running it a second time can succeed if some engine files were already partially cached.

### 4. Apply the database migration

For local development, run migrations interactively:

```bash
ddev exec -s node npx prisma migrate dev --name init
```

For a deploy/CI environment, use instead:

```bash
ddev exec -s node npx prisma migrate deploy
```

### 5. Start the API

```bash
ddev exec -s node npm run start:dev
```

If you change `.ddev/docker-compose.node.yaml` or the container gets into an inconsistent state, restart DDEV before starting the API again:

```bash
ddev restart
ddev exec -s node npm run start:dev
```

### 6. Access the API

The `node` service exposes port `3010` through DDEV's router:

```text
https://clients-prisma.ddev.site:3443
http://clients-prisma.ddev.site:3080
```

### Database connection inside DDEV

Inside the `node` container, PostgreSQL is reachable at host `db` with default credentials `db`/`db`:

```env
DATABASE_URL="postgresql://db:db@db:5432/db?schema=public"
```

---

## Running without DDEV

## 1. Install dependencies

```bash
ddev exec -s npm install -g npm@latest
ddev exec -s npm install --legacy-peer-deps
```

## 2. Configure PostgreSQL

Copy the environment file:

```bash
cp .env.example .env
```

Default value:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clients_db?schema=public"
PORT=3010
```

Change the connection string if your PostgreSQL username, password, host, port or database is different.

### Optional: start PostgreSQL with Docker

```bash
docker compose up -d
```

You can skip Docker if you already have access to a PostgreSQL database, or if you're using the DDEV setup described above.

## 3. Generate Prisma Client

```bash
ddev exec -s npx prisma generate
```

## 4. Apply the database migration

```bash
ddev exec -s npx prisma migrate dev --name init
```

For a deploy/CI environment, use instead, don't need in local machine:

```bash
npx prisma migrate deploy
```

## 5. Start the API

```bash
ddev exec -s node npm run start:dev
```

API URL:

```text
http://localhost:3010
```

---

## Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/clients` | Create a client |
| GET | `/clients` | List all clients |
| GET | `/clients/:id` | Get one client |
| PATCH | `/clients/:id` | Update a client |
| DELETE | `/clients/:id` | Delete a client |

## Create a client

```bash
curl -X POST http://localhost:3010/clients \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Acme Client",
    "taxId": "123456789",
    "email": "contact@acme.com",
    "phone": "+55 11 99999-9999"
  }'
```

## List clients

```bash
curl http://localhost:3010/clients
```

## Get one client

```bash
curl http://localhost:3010/clients/1
```

## Update a client

```bash
curl -X PATCH http://localhost:3010/clients/1 \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Updated Client"
  }'
```

## Delete a client

```bash
curl -X DELETE http://localhost:3010/clients/1
```

## Database model

```prisma
model Client {
  id        Int      @id @default(autoincrement())
  name      String
  taxId     String   @unique
  email     String?
  phone     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```