use ternakku;

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