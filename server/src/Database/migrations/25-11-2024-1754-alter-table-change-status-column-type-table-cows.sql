-- set column status not null
ALTER TABLE cows 
MODIFY COLUMN status BOOLEAN NOT NULL;