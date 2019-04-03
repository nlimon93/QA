CREATE DATABASE qaProject;
CREATE USER lnsys@localhost IDENTIFIED BY 'rJ!DiC-i9JqfC&6t0Gm8HCfJUUtNs4O^';
GRANT SELECT, INSERT, UPDATE ON qaProject .* TO lnsys@localhost;
CREATE TABLE IF NOT EXISTS accounts (
    id INT(16) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(62) NOT NULL,
	email VARCHAR(62) NOT NULL,
	user_password CHAR(128) NOT NULL
) ENGINE = InnoDB AUTO_INCREMENT DEFAULT CHARSET=utf8;
CREATE TABLE 'login_attempts' (
	user_id INT(11) NOT NULL,
	time VARCHAR(30) NOT NULL
) ENGINE=InnoDB
INSERT INTO accounts(username,email,user_password) VALUES(test_user, test@example.com, 'password');