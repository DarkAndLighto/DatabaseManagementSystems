CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
username VARCHAR( 255) NOT NULL,
email VARCHAR(255) NOT NULL)

INSERT INTO users (username, email) VALUES
    ('john_doe', 'john@examp te.com'),
    ( 'jane_smith', 'jane@example. comi' ),
    ( 'bob_j ones', 'bob@examp le . com' ) ;

SELECT * FROM users;