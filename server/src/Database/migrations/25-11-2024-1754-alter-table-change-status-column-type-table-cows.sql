-- set column status not null
ALTER TABLE cows 
MODIFY COLUMN status BOOLEAN NOT NULL;

ALTER TABLE tasks
MODIFY COLUMN deadline DATE NOT NULL;

ALTER TABLE tasks
MODIFY COLUMN reminder_date DATE NOT NULL;