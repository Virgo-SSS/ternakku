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