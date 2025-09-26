USE dbop;

-- Insert to Roles
INSERT INTO Roles (`id`, `value`, `label`)
VALUES
  (0, 'guest', 'Guest'),
  (1, 'user', 'User'),
  (99, 'super_admin', 'Super Admin');

-- Insert to Users
-- Hashed from `user123456`
INSERT INTO Users (roleId, username, email, userHash, fullName, phone, birthDate, bio)
VALUES
(1, 'nguyenvana', 'nguyenvana@example.com', '$2a$12$XxWzUsRaDvHKWn6faHVZnOv9lv8gQrRuLCKFgjdsYONhCAod4xz8S', 'Nguyễn Văn A', '0909123456', '1990-01-15', 'Yêu công nghệ và du lịch.'),
(1, 'tranthib', 'tranthib@example.com', '$2a$12$XxWzUsRaDvHKWn6faHVZnOv9lv8gQrRuLCKFgjdsYONhCAod4xz8S', 'Trần Thị B', '0909234567', '1992-03-22', 'Thích đọc sách và cà phê.'),
(0, 'lehoangc', 'lehoangc@example.com', '$2a$12$XxWzUsRaDvHKWn6faHVZnOv9lv8gQrRuLCKFgjdsYONhCAod4xz8S', 'Lê Hoàng C', '0910345678', '1995-07-09', 'Khách mới thích tìm hiểu sản phẩm.'),
(1, 'phamminhd', 'phamminhd@example.com', '$2a$12$XxWzUsRaDvHKWn6faHVZnOv9lv8gQrRuLCKFgjdsYONhCAod4xz8S', 'Phạm Minh D', '0911456789', '1989-11-05', 'Đam mê nhiếp ảnh.'),
(99, 'vuongthie', 'vuongthie@example.com', '$2a$12$XxWzUsRaDvHKWn6faHVZnOv9lv8gQrRuLCKFgjdsYONhCAod4xz8S', 'Vương Thị E', '0912567890', '1991-12-17', 'Quản trị viên hệ thống.'),
(1, 'dinhvant', 'dinhvant@example.com', '$2a$12$XxWzUsRaDvHKWn6faHVZnOv9lv8gQrRuLCKFgjdsYONhCAod4xz8S', 'Đinh Văn T', '0913678901', '1993-02-28', 'Thích thể thao và âm nhạc.'),
(1, 'nguyenthu', 'nguyenthu@example.com', '$2a$12$XxWzUsRaDvHKWn6faHVZnOv9lv8gQrRuLCKFgjdsYONhCAod4xz8S', 'Nguyễn Thu', '0914789012', '1994-04-18', 'Chuyên gia marketing.'),
(0, 'hoangha', 'hoangha@example.com', '$2a$12$XxWzUsRaDvHKWn6faHVZnOv9lv8gQrRuLCKFgjdsYONhCAod4xz8S', 'Hoàng Hà', '0915890123', '1996-06-20', 'Khách tham khảo.'),
(1, 'tranmanh', 'tranmanh@example.com', '$2a$12$XxWzUsRaDvHKWn6faHVZnOv9lv8gQrRuLCKFgjdsYONhCAod4xz8S', 'Trần Mạnh', '0916901234', '1990-08-14', 'Lập trình viên backend.'),
(1, 'lethao', 'lethao@example.com', '$2a$12$XxWzUsRaDvHKWn6faHVZnOv9lv8gQrRuLCKFgjdsYONhCAod4xz8S', 'Lê Thảo', '0917012345', '1997-10-30', 'Yêu thích du lịch và ẩm thực.');