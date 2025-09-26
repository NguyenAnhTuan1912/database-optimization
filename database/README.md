# Test - Database

Trong phần này thì mình có nhiệm vụ là setup database sao cho tối ưu, gọn, đẹp và nhẹ. Đồng thời cũng phải setup Dockerfile sao cho nhẹ nhất nhưng vẫn chạy được hiệu quả.

## Setup

### Create Docker network

Trước tiên thì mình sẽ cần phải tạo một network cho docker container.

```bash
docker network create test-network
```

### Build & run Docker container

Trong phần này thì mính sẽ tiến hành database dưới dạng là container. Đầu tiên là vào trong thư mục `database`.

```bash
cd database
```

Và build image.

```bash
docker build . -t dbopdb
```

Sau đó thì chỉ cần chạy image này là được.

```bash
docker run -d \
  --name dbopdb \
  -p 3306:3306 \
  --network test-network \
  -e MYSQL_ROOT_USER=root \
  -e MYSQL_ROOT_PASSWORD=letmein12345 \
  -e MYSQL_DATABASE=dbop dbopdb
```

Trong trường hợp muốn lưu lại dữ liệu thì mình sẽ cần làm như sau. Đầu tiên là phải tạo một thư mục mới trong `/var`.

```bash
sudo mkdir -p /var/dbopdb/db
sudo chmod 777 /var/dbopdb/db
```

Sau đó thì mình chạy lệnh.

```bash
docker run -d \
  --name dbopdb -p 3306:3306 \
  --network test-network \
  -v /var/dbopdb/db:/var/lib/mysql \
  -e MYSQL_ROOT_USER=root \
  -e MYSQL_ROOT_PASSWORD=letmein12345 \
  -e MYSQL_DATABASE=dbop dbopdb \
  --default-authentication-plugin=mysql_native_password
```

> Note: nhớ stop và remove container đang chạy.
