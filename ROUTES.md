# API Routes

Documentation of public HTTP endpoints exposed by the API.

## Clients

### GET /clients
List all clients.

**Response:** array of `Client`

### GET /clients/search
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
- `name` (string, required)
- `taxId` (string, required)
- `age` (integer, optional, minimum: `19`)
- `email` (string, optional, valid email)
- `phone` (string, optional)

### PATCH /clients/:id
Update an existing client.

**Parameters:**
- `id` (number, path)

**Request body (`UpdateClientDto`):**
- `name` (string, optional)
- `taxId` (string, optional)
- `age` (integer, optional, minimum: `19`)
- `email` (string, optional, valid email)
- `phone` (string, optional)

### PATCH /clients/:id/email
Update a client's email address.

**Parameters:**
- `id` (number, path)

**Request body (`UpdateEmailDto`):**
- `email` (string, required, valid email address)

**Example:**
```json
{
  "email": "client@example.com"
}
```

### DELETE /clients/:id
Remove a client by ID.

**Parameters:**
- `id` (number, path)
