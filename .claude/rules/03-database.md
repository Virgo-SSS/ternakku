# Database Rules (MySQL)

## Connection

Use the connection pool from `/server/src/config/database.js`:
```javascript
import pool from '../config/database.js';
const [rows] = await pool.query('SELECT * FROM table WHERE id = ?', [id]);
```

## Table Schemas

### users
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### user_profiles
```sql
CREATE TABLE user_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  phone_number VARCHAR(20),
  profile_picture VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### workers
```sql
CREATE TABLE workers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  gender ENUM('M', 'F') NOT NULL,
  phone_number VARCHAR(20),
  email VARCHAR(255) UNIQUE,
  status TINYINT DEFAULT 1,  -- 0=Inactive, 1=Active
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### cows
```sql
CREATE TABLE cows (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status TINYINT DEFAULT 1,  -- 0=Tidak Sehat, 1=Sehat
  gender ENUM('M', 'F') NOT NULL,
  birth_date DATE,
  weight DECIMAL(10,2),
  type VARCHAR(100),
  picture VARCHAR(255),
  is_bought TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### tasks
```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  deadline DATETIME,
  category VARCHAR(100),
  priority TINYINT DEFAULT 2,  -- 1=Low, 2=Medium, 3=High
  status TINYINT DEFAULT 0,    -- 0=Pending, 1=In Progress, 2=Completed
  details TEXT,
  reminder_date DATETIME,
  worker_id INT,
  cow_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE,
  FOREIGN KEY (cow_id) REFERENCES cows(id) ON DELETE CASCADE
);
```

### transactions
```sql
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  category INT,
  amount DECIMAL(15,2) NOT NULL,
  type TINYINT NOT NULL,  -- 1=Income, 2=Expense
  notes TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category) REFERENCES transaction_categories(id) ON DELETE SET NULL
);
```

### transaction_categories
```sql
CREATE TABLE transaction_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### events
```sql
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Query Patterns

### Always use parameterized queries
```javascript
// CORRECT
const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

// WRONG - SQL injection risk
const [rows] = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
```

### Dynamic filtering
```javascript
let sql = 'SELECT * FROM table WHERE user_id = ?';
const params = [userId];

if (filters.name) {
  sql += ' AND name LIKE ?';
  params.push(`%${filters.name}%`);
}

const [rows] = await pool.query(sql, params);
```

### Date range filtering
```javascript
if (filters.startDate && filters.endDate) {
  sql += ' AND date BETWEEN ? AND ?';
  params.push(filters.startDate, filters.endDate);
}
```

## Status/Type Values

| Field | Value | Meaning (Indonesian) |
|-------|-------|---------------------|
| cow.status | 0 | Tidak Sehat (Unhealthy) |
| cow.status | 1 | Sehat (Healthy) |
| worker.status | 0 | Tidak Aktif (Inactive) |
| worker.status | 1 | Aktif (Active) |
| task.priority | 1 | Rendah (Low) |
| task.priority | 2 | Sedang (Medium) |
| task.priority | 3 | Tinggi (High) |
| task.status | 0 | Pending |
| task.status | 1 | In Progress |
| task.status | 2 | Completed |
| transaction.type | 1 | Pemasukan (Income) |
| transaction.type | 2 | Pengeluaran (Expense) |
| gender | M | Jantan/Laki-laki (Male) |
| gender | F | Betina/Perempuan (Female) |

## Migration Location

Schema dump: `/server/src/Database/migrations/ternakku_dump.sql`
