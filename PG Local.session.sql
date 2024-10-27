INSERT INTO users (username, email) VALUES
    ('john_doe', 'john@examp te.com'),
    ( 'jane_smith', 'jane@example. comi' ),
    ( 'bob_j ones', 'bob@examp le . com' ) ;

SELECT * FROM person
ORDER BY id ASC;

DELETE FROM users;

DROP TABLE users;

insert into person(id, firstName, lastName, phoneNumber) VALUES
(00003, 'mango', 'ajam', 12343215),
(00004, 'jasmine', 'ajam', 12345612);

insert into users(firstName, lastName, email, phoneNumber) VALUES
('ammar', 'ajam', NULL, NULL),
('das', 'ajam', NULL, NULL),
('asd', 'ajam', NULL, NULL),
('213', 'ajam', NULL, NULL);

UPDATE person
SET id = 2
WHERE id = 12345;