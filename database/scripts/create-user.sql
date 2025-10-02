CREATE USER 'tuna'@'%' IDENTIFIED WITH caching_sha2_password BY 'letmein12345';
GRANT ALL PRIVILEGES ON dbop.* TO 'tuna'@'%';
FLUSH PRIVILEGES;

CREATE USER 'grafana'@'%' IDENTIFIED BY 'grafana123';
GRANT SELECT ON dbop.* TO 'grafana'@'%';
FLUSH PRIVILEGES;