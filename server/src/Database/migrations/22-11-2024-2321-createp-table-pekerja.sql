
CREATE TABLE IF NOT EXISTS workers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender enum('M', 'F') NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    status boolean NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) engine=InnoDB;