# Databae Optimization

Trong bài này thì mình sẽ thực hiện về cách để tối ưu cơ sở dữ liệu trong hệ thống để học sâu hơn về các kỹ thuật trong database.

## Setup

Để setup bài này, thì trong máy của bạn sẽ cần phải có:

- Docker (WSL2)
- NodeJS
- Python

### Run docker containers

Đầu tiên thì ở trong thư mục gốc của toàn bộ dự án, chạy lệnh.

```bash
docker compose up
```

Khi đó thì sẽ có 2 containers dược tạo ra và chạy.

### Seed data

Sau khi 2 containers đã chạy ổn rồi, thì giờ mình sẽ thực hiện việc tạo nhiều dữ liệu mẫu và đưa nó vào trong cơ sở dữ liệu. Truy vập vào trong container app.

```bash
docker exec -it dbopapp sh
```

Chạy script `build/scripts/seed-users.js`.

```bash
node build/scripts/seed-users.js
```

## Remove

Để xoá toàn bộ containers đã chạy và images đã cài. Thì đầu tiên là ấn Ctrl + C trong session chạy docker compose, nếu không dùng Detach Mode. Sau đó dùng lệnh bên dưới để xoá hết containers:

```bash
docker compose down
```

Tiếp theo, để xoá images thì dùng lệnh.

```bash
docker compose down --rmi all
```
