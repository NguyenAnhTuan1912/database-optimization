-- JUST ONLY RUN 1 TIMES
SET profiling = 1;

-- Your SQL Query Goes Here
SELECT q.id, q.userId, q.title, q.description, u.username, u.fullName
FROM Quotes as q
	LEFT JOIN Users as u ON u.id = q.userId
WHERE q.id = 87372 AND q.deleted IS FALSE;

SELECT *
FROM Quotes as q
	LEFT JOIN Users as u ON u.id = q.userId
WHERE q.id = 87372 AND q.deleted IS FALSE;

SELECT COUNT(id)
FROM Quotes
WHERE deleted is not true;

-- Run this SQL to see performance
SHOW PROFILES;