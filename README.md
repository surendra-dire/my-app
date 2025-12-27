#REACT_APP_API_BASE_URL=http://44.222.206.186:8080/api

Installation:
============
#!/usr/bin/env bash

set -e  # stop if any command fails

echo "Updating system..."
sudo apt update
sudo apt upgrade -y

echo "Installing common packages..."
sudo apt install -y \
  openjdk-17-jdk \
  maven \
  nodejs \
  npm \
  mysql-server\
  nginx

echo "Starting and enabling MySQL..."
sudo systemctl start mysql
sudo systemctl enable mysql

echo "Setup complete ✅"


Database:  
=======  

CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'apppassword';  
GRANT ALL PRIVILEGES ON appdb.* TO 'appuser'@'localhost';  
FLUSH PRIVILEGES;

CREATE DATABASE appdb;  
USE appdb;  

CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL
);  

INSERT INTO users (username, password, name) VALUES ('123', '123', 'Surendra');


Backend:
=======

mvn clean install  
mvn spring-boot:run  

curl -X POST http://localhost:8080/api/register   -H "Content-Type: application/json"   -d '{"username":"111","password":"111","name":"Surendra"}'  


Front-end:
=======
frontend-react/.env  
REACT_APP_API_URL=/api   

npm clean install   
nom spring-boot:run  

Nginx :
=====

sudo mkdir -p /var/www/react  
sudo rm -rf /var/www/react/*  
sudo cp -r build/* /var/www/react/  

sudo chown -R www-data:www-data /var/www/react  

sudo vi /etc/nginx/sites-enabled/default  

server {
    listen 80;
    server_name _;

    root /var/www/react;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

sudo nginx -t  
sudo systemctl restart nginx  
sudo systemctl reload nginx  
