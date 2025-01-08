CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) engine=InnoDB;

CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    phone_number VARCHAR(255) NULL,
    profile_picture VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_profiles_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) engine=InnoDB;

CREATE TABLE IF NOT EXISTS workers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender enum('M', 'F') NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    status boolean NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) engine=InnoDB;

CREATE TABLE IF NOT EXISTS cows (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    gender enum('M','F') NOT NULL,
    birth_date DATE NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    type VARCHAR(255) NOT NULL,
    picture VARCHAR(255) NOT NULL,
    is_bought BOOLEAN NOT NULL
) engine=InnoDB;

ALTER TABLE cows ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE cows MODIFY COLUMN picture VARCHAR(255) NULL;

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    deadline TIMESTAMP NOT NULL,
    category VARCHAR(255) NOT NULL,
    priority TINYINT(1) NOT NULL,
    status TINYINT(1) NOT NULL,
    details TEXT,
    reminder_date TIMESTAMP,
    worker_id BIGINT UNSIGNED NOT NULL,
    cow_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tasks_workers FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE,
    CONSTRAINT fk_tasks_cows FOREIGN KEY (cow_id) REFERENCES cows(id) ON DELETE CASCADE
) engine=InnoDB;

ALTER TABLE cows MODIFY COLUMN status BOOLEAN NOT NULL;

ALTER TABLE tasks MODIFY COLUMN deadline DATE NOT NULL;

ALTER TABLE tasks MODIFY COLUMN reminder_date DATE NOT NULL;

CREATE TABLE IF NOT EXISTS transaction_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) engine=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category BIGINT UNSIGNED NULL,
    amount BIGINT NOT NULL,
    type TINYINT(1) NOT NULL,
    notes TEXT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_transactions_transaction_categories FOREIGN KEY (category) REFERENCES transaction_categories(id) ON DELETE SET NULL
) engine=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) engine=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE users ADD COLUMN refresh_token VARCHAR(255) NULL;

ALTER TABLE transactions
ADD COLUMN user_id BIGINT UNSIGNED NOT NULL AFTER id,
ADD CONSTRAINT fk_transactions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE transaction_categories
ADD COLUMN user_id BIGINT UNSIGNED NOT NULL AFTER id,
ADD CONSTRAINT fk_transaction_categories_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;