# API Design Rules

## Base Configuration

- Base URL: `/api/v1/`
- Content-Type: `application/json`
- Auth Header: `Authorization: Bearer <token>`

## Endpoint Naming

| Action | Method | Endpoint Pattern |
|--------|--------|------------------|
| List all | GET | `/resource` |
| Get one | GET | `/resource/:id` |
| Create | POST | `/resource` |
| Full update | PUT | `/resource/:id` |
| Partial update | PATCH | `/resource/:id` |
| Delete | DELETE | `/resource/:id` |

## Query Parameters for Filtering

### Standard filters
```
GET /cow?name=sapi&status=1&birth_date=2024-01-01
GET /worker?name=john&gender=M&status=1
GET /transaction?name=pakan&category=1&start_date=2024-01-01&end_date=2024-12-31
```

### Date range formats supported
```
date=2024-01          # Year-month
date=2024             # Year only
date=2024-01-01 - 2024-12-31  # Range
```

## Request Bodies

### Create/Update cow
```json
{
  "name": "Sapi A",
  "status": 1,
  "gender": "M",
  "birth_date": "2023-05-15",
  "weight": 450.5,
  "type": "Limosin",
  "is_bought": 0
}
```

### Create/Update worker
```json
{
  "name": "John Doe",
  "gender": "M",
  "phone_number": "08123456789",
  "email": "john@example.com",
  "status": 1
}
```

### Create/Update task
```json
{
  "title": "Vaksinasi Sapi",
  "deadline": "2024-12-01T10:00:00",
  "category": "Kesehatan",
  "priority": 2,
  "status": 0,
  "details": "Vaksinasi rutin bulanan",
  "worker_id": 1,
  "cow_id": 1
}
```

### Create/Update transaction
```json
{
  "name": "Penjualan Sapi",
  "category": 1,
  "amount": 15000000,
  "type": 1,
  "notes": "Penjualan sapi limosin",
  "date": "2024-11-15"
}
```

### Login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Register
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

## Response Formats

### Success - List
```json
{
  "data": [
    { "id": 1, "name": "Item 1" },
    { "id": 2, "name": "Item 2" }
  ]
}
```

### Success - Single item
```json
{
  "data": { "id": 1, "name": "Item 1" }
}
```

### Success - Create/Update/Delete
```json
{
  "message": "Data berhasil disimpan",
  "data": { "id": 1, "name": "Item 1" }
}
```

### Success - Login
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Error
```json
{
  "message": "Deskripsi error"
}
```

## HTTP Status Codes

| Code | Usage |
|------|-------|
| 200 | Success (GET, PUT, DELETE) |
| 201 | Created (POST) |
| 400 | Bad request / Validation error |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (guest accessing auth route) |
| 404 | Resource not found |
| 500 | Server error |

## Authentication Endpoints

### Login
```
POST /login
Body: { email, password }
Response: { accessToken, user }
Sets: refresh_token httpOnly cookie
```

### Refresh Token
```
GET /token
Requires: refresh_token cookie
Response: { accessToken }
```

### Logout
```
POST /logout
Requires: Authorization header
Clears: refresh_token cookie and DB
```

## CORS Configuration

Allowed origins:
- `http://localhost:5173` (development)
- `https://ternakku.vercel.app` (production)

Credentials: enabled (for cookies)
