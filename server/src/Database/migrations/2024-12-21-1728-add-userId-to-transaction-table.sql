ALTER TABLE transactions
ADD COLUMN user_id BIGINT UNSIGNED NOT NULL AFTER id,
ADD CONSTRAINT fk_transactions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE transaction_categories
ADD COLUMN user_id BIGINT UNSIGNED NOT NULL AFTER id,
ADD CONSTRAINT fk_transaction_categories_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;