USE dbop;

-- Insert to Roles
INSERT INTO Roles (`id`, `value`, `label`)
VALUES
  (0, 'guest', 'Guest'),
  (1, 'user', 'User'),
  (99, 'super_admin', 'Super Admin');