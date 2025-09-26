USE dbop;
SET NAMES utf8mb4;

-- Select users
SELECT COUNT(id) FROM Users;

SELECT * FROM Users;

EXPLAIN SELECT * FROM Users;

SELECT roleId, username, email, fullName, phone, birthDate, bio
FROM Users;

EXPLAIN SELECT roleId, username, email, fullName, phone, birthDate, bio
FROM Users;

-- Select quotes
SELECT COUNT(id) FROM Quotes;

SELECT COUNT(userId), userId
FROM Quotes
GROUP BY userId;

SELECT * FROM Quotes;

SELECT id, userId, title, description
FROM Quotes
WHERE id = 23425;

SELECT q.id, q.userId, q.title, q.description, u.username, u.fullName
FROM Quotes as q
	LEFT JOIN Users as u ON u.id = q.userId
WHERE u.id = 3;

SELECT q.id, q.userId, q.title, q.description, u.username, u.fullName
FROM Quotes as q
	LEFT JOIN Users as u ON u.id = q.userId
WHERE q.id = 42832;