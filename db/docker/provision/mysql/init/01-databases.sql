# create databases
CREATE DATABASE IF NOT EXISTS `UserManagement`;
CREATE DATABASE IF NOT EXISTS `mainphotoupload`;

# create root user and grant rights
CREATE USER 'root' IDENTIFIED BY 'root@123';
GRANT ALL ON *.* TO 'root';
