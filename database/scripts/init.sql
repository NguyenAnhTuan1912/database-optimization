-- Create database
CREATE DATABASE IF NOT EXISTS dbop
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE dbop;

-- Create tables
CREATE TABLE IF NOT EXISTS AuditLog (
  `id` INT AUTO_INCREMENT,
  `recordId` INT NOT NULL,
  `userId` INT NOT NULL,
  `tableName` VARCHAR(100) NOT NULL,
  `actionType` VARCHAR(32) NOT NULL,
  `message` TEXT NOT NULL,
  `ipAddress` VARCHAR(45),
  `sessionId` VARCHAR(100),
  `actionTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`)
);

-- Create main tables
CREATE TABLE IF NOT EXISTS Roles (
  `id` TINYINT NOT NULL,
  `value` VARCHAR(16) NOT NULL,
  `label` VARCHAR(32) NOT NULL,

  -- Audit fields
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` TIMESTAMP DEFAULT NULL,

  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS Users (
  `id` INT AUTO_INCREMENT NOT NULL,
  `roleId` TINYINT NOT NULL,
  `username` VARCHAR(32) NOT NULL,
  `email` VARCHAR(256) UNIQUE NOT NULL,
  `userHash` VARCHAR(60) NOT NULL,

  -- Nullable fields
  `fullName` VARCHAR(64) DEFAULT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `birthDate` DATE DEFAULT NULL,
  `bio` VARCHAR(255) DEFAULT NULL,

  -- Audit fields
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` TIMESTAMP DEFAULT NULL,

  PRIMARY KEY (`id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Quotes (
  `id` INT AUTO_INCREMENT NOT NULL,
  `userId` INT NOT NULL,
  `title` VARCHAR(64) NOT NULL,
  `description` VARCHAR(512) NOT NULL,

  -- Audit fields
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` TIMESTAMP DEFAULT NULL,

  PRIMARY KEY (`id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Add contraints
ALTER TABLE Users
ADD CONSTRAINT fk_users_role
FOREIGN KEY (`roleId`) REFERENCES Roles(`id`);

ALTER TABLE Quotes
ADD CONSTRAINT fk_quotes_user
FOREIGN KEY (`userId`) REFERENCES Users(`id`);