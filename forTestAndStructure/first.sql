-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS,
  UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
  FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE,
  SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema first
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema first
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `first` DEFAULT CHARACTER SET utf8;
USE `first`;
-- -----------------------------------------------------
-- Table `first`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `first`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nickname` VARCHAR(255) NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(64) NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL,
  `Authorization` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
);
-- -----------------------------------------------------
-- Table `first`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `first`.`category` (
  `category_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`category_id`)
);
-- -----------------------------------------------------
-- Table `first`.`timestamps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `first`.`timestamps` (
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL
);
-- -----------------------------------------------------
-- Table `first`.`request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `first`.`request` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `updatedAt` TIMESTAMP NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `methodType` VARCHAR(45) NULL,
  `url` VARCHAR(254) NULL,
  PRIMARY KEY (`id`)
);
-- -----------------------------------------------------
-- Table `first`.`history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `first`.`history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL,
  `type` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  `request_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_history_user` FOREIGN KEY (`user_id`) REFERENCES `first`.`user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_history_request` FOREIGN KEY (`request_id`) REFERENCES `first`.`request` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
/* forward engineering 버그? history1 인덱스 부분 삭제.
 INDEX `fk_history1_user_idx` (`user_id` ASC) VISIBLE,
 INDEX `fk_history1_request_idx` (`request_id` ASC) VISIBLE,
 */