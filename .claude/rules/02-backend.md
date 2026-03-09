# Backend Rules (Express/Node.js)

## Controller Pattern

### Standard CRUD Controller
```javascript
import Model from '../models/model.js';

// GET - List with filters
export const index = async (req, res) => {
  try {
    const userId = req.user.id;
    const filters = {
      name: req.query.name || null,
      status: req.query.status || null,
    };
    const data = await Model.getAll(userId, filters);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET - Single by ID
export const show = async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST - Create
export const store = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await Model.create({ ...req.body, user_id: userId });
    return res.status(201).json({ data, message: 'Data berhasil ditambahkan' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT - Update
export const update = async (req, res) => {
  try {
    await Model.update(req.params.id, req.body);
    return res.status(200).json({ message: 'Data berhasil diperbarui' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE - Destroy
export const destroy = async (req, res) => {
  try {
    await Model.delete(req.params.id);
    return res.status(200).json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
```

## Model Pattern

### Standard Model with Raw SQL
```javascript
import pool from '../config/database.js';

const tableName = 'table_name';
const allowedFields = ['name', 'status', 'user_id'];

export const getAll = async (userId, filters = {}) => {
  let sql = `SELECT * FROM ${tableName} WHERE user_id = ?`;
  const params = [userId];

  if (filters.name) {
    sql += ' AND name LIKE ?';
    params.push(`%${filters.name}%`);
  }

  if (filters.status !== null) {
    sql += ' AND status = ?';
    params.push(filters.status);
  }

  sql += ' ORDER BY created_at DESC';
  const [rows] = await pool.query(sql, params);
  return rows;
};

export const findById = async (id) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${tableName} WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
};

export const create = async (data) => {
  const filtered = Object.keys(data)
    .filter(key => allowedFields.includes(key))
    .reduce((obj, key) => ({ ...obj, [key]: data[key] }), {});

  const [result] = await pool.query(
    `INSERT INTO ${tableName} SET ?`,
    [filtered]
  );
  return { id: result.insertId, ...filtered };
};

export const update = async (id, data) => {
  const filtered = Object.keys(data)
    .filter(key => allowedFields.includes(key))
    .reduce((obj, key) => ({ ...obj, [key]: data[key] }), {});

  await pool.query(
    `UPDATE ${tableName} SET ? WHERE id = ?`,
    [filtered, id]
  );
};

export const remove = async (id) => {
  await pool.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
};

export default { getAll, findById, create, update, remove };
```

## Route Definition

```javascript
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import * as Controller from '../controllers/example-controller.js';

const router = Router();

router.get('/resource', authMiddleware, Controller.index);
router.post('/resource', authMiddleware, Controller.store);
router.get('/resource/:id', authMiddleware, Controller.show);
router.put('/resource/:id', authMiddleware, Controller.update);
router.delete('/resource/:id', authMiddleware, Controller.destroy);

export default router;
```

## Middleware Usage

### Protected routes (requires JWT)
```javascript
router.get('/endpoint', authMiddleware, Controller.method);
```

### Guest-only routes (login/register)
```javascript
router.post('/login', guestMiddleware, LoginController.login);
```

## Response Formats

### Success with data
```json
{ "data": [...], "message": "optional message" }
```

### Success without data
```json
{ "message": "Data berhasil disimpan" }
```

### Error
```json
{ "message": "Error description" }
```

## Security Rules

1. Always use parameterized queries (? placeholders)
2. Always get user_id from `req.user.id`, never from request body
3. Filter allowed fields before INSERT/UPDATE
4. Validate input before database operations
5. Return generic error messages to client, log details server-side
