USE dbop;

-- Show table status
SHOW TABLE STATUS;

-- JUST ONLY RUN 1 TIMES
SET profiling = 1;

-- Your SQL Query Goes Here
SELECT q.id, q.userId, q.title, q.description, u.username, u.fullName
FROM Quotes as q
	LEFT JOIN Users as u ON u.id = q.userId
WHERE q.id = 873724 AND q.deleted IS FALSE;

SELECT *
FROM Quotes
WHERE deleted IS FALSE
LIMIT 10
OFFSET 1000;

SELECT *
FROM Quotes as q
	LEFT JOIN Users as u ON u.id = q.userId
WHERE q.id = 87372 AND q.deleted IS FALSE;

-- By default, MySQL will use lightness index, so in this case, it will use fk_quotes_user
EXPLAIN
SELECT COUNT(*)
FROM Quotes;

-- We will use PRIMARY index in this case
EXPLAIN
SELECT
COUNT(*)
FROM Quotes USE INDEX (PRIMARY);

SELECT COUNT(id)
FROM Quotes
WHERE deleted is not true;

-- Run this SQL to see performance
SHOW PROFILES;

--
-- CHECK SIZE
--

-- Size of a specific record
SELECT
	LENGTH(id) as `Id Bytes`,
    LENGTH(userId) as `UserId Bytes`,
    LENGTH(title) as `Title Bytes`,
    LENGTH(description) as `Description Bytes`,
    LENGTH(createdAt) as `CreatedAt Bytes`,
    LENGTH(updatedAt) as `UpdatedAt Bytes`,
	LENGTH(id) + LENGTH(userId) + LENGTH(title) + LENGTH(description) + LENGTH(createdAt) + LENGTH(updatedAt)
    as `Total Bytes`
FROM Quotes
WHERE id = 23243;

-- Total bytes of 1000 records / rows
SELECT
	SUM(LENGTH(id) + LENGTH(userId) + LENGTH(title) + LENGTH(description) + LENGTH(createdAt) + LENGTH(updatedAt))
    as `Total Bytes`
FROM Quotes;

-- Average bytes of records
SELECT
	AVG(LENGTH(id) + LENGTH(userId) + LENGTH(title) + LENGTH(description) + LENGTH(createdAt) + LENGTH(updatedAt))
    as `Total Bytes`
FROM Quotes;