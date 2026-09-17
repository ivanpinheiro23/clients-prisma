# API Routes

Documentation of public HTTP endpoints exposed by the API.

## Clients

### GET /clients
List all clients.

**Response:** array of `Client`

### GET /clients/search-test
Search clients by name.

**Query parameters:**
- `name` (string)

**Response:** array of `Client`

### GET /clients/:id
Get a single client by ID.

**Parameters:**
- `id` (number, path)

### POST /clients
Create a new client.

**Request body (`CreateClientDto`):**
- _(fill in fields from create-client.dto.ts)_

### PATCH /clients/:id
Update an existing client.

**Parameters:**
- `id` (number, path)

**Request body (`UpdateClientDto`):**
- _(fill in fields from update-client.dto.ts)_

### DELETE /clients/:id
Remove a client by ID.

**Parameters:**
- `id` (number, path)
