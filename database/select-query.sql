USE dbop;
SET NAMES utf8mb4;

-- Alter tables
ALTER TABLE Roles
ADD COLUMN deleted BOOLEAN DEFAULT 0;

ALTER TABLE Users
ADD COLUMN deleted BOOLEAN DEFAULT 0;

ALTER TABLE Quotes
ADD COLUMN deleted BOOLEAN DEFAULT 0;

-- Select users
SELECT COUNT(id) FROM Users;

SELECT * FROM Users WHERE deleted IS FALSE;

EXPLAIN SELECT * FROM Users;

SELECT roleId, username, email, fullName, phone, birthDate, bio
FROM Users
WHERE deleted IS FALSE;

EXPLAIN SELECT roleId, username, email, fullName, phone, birthDate, bio
FROM Users
WHERE deleted IS FALSE;

-- Select quotes
SELECT COUNT(id) FROM Quotes;

SELECT COUNT(userId), userId
FROM Quotes
GROUP BY userId;

SELECT * FROM Quotes WHERE deleted IS FALSE;

SELECT id, userId, title, description
FROM Quotes
WHERE id = 23425 AND deleted IS FALSE;

SELECT q.id, q.userId, q.title, q.description, u.username, u.fullName
FROM Quotes as q
	LEFT JOIN Users as u ON u.id = q.userId
WHERE u.id = 3 AND q.deleted IS FALSE;

SELECT q.id, q.userId, q.title, q.description, u.username, u.fullName
FROM Quotes as q
	LEFT JOIN Users as u ON u.id = q.userId
WHERE q.id = 87372 AND q.deleted IS FALSE;