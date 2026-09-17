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
- `email` (string, email, optional)
- `phone` (string, optional)

**Example:**
```json
{
  "name": "Jane Doe",
  "taxId": "123456789",
  "email": "jane@example.com",
  "phone": "+1234567890"
}
```

### PATCH /clients/:id
Update an existing client.

**Parameters:**
- `id` (number, path)

**Request body (`UpdateClientDto`):**
- `name` (string, optional)
- `taxId` (string, optional)
- `email` (string, email, optional)
- `phone` (string, optional)

**Example:**
```json
{
  "email": "jane.doe@example.com"
}
```

### DELETE /clients/:id
Remove a client by ID.

**Parameters:**
- `id` (number, path)
