-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2019 at 10:17 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `qaproject`
--
CREATE DATABASE IF NOT EXISTS `qaproject` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `qaproject`;

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(62) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(62) COLLATE utf8_unicode_ci NOT NULL,
  `password` char(126) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `email`, `password`) VALUES
(1, 'test_user', 'test@example.com', 'password'),
(2, 'Matterom', 'Matterom1@gmail.com', 'Testpassword');

-- --------------------------------------------------------

--
-- Table structure for table `login_attempts`
--

DROP TABLE IF EXISTS `login_attempts`;
CREATE TABLE IF NOT EXISTS `login_attempts` (
  `attemptID` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`attemptID`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questionanswers`
--

DROP TABLE IF EXISTS `questionanswers`;
CREATE TABLE IF NOT EXISTS `questionanswers` (
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  `answerPos` set('1','2','3','4','5') COLLATE utf8_unicode_ci NOT NULL,
  `questionID` int(11) NOT NULL,
  `answer` varchar(124) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`answerID`),
  KEY `cascadedelete` (`questionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questionfolders`
--

DROP TABLE IF EXISTS `questionfolders`;
CREATE TABLE IF NOT EXISTS `questionfolders` (
  `folderID` int(11) NOT NULL AUTO_INCREMENT,
  `ownerID` int(11) NOT NULL,
  `folderName` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `folderDescription` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`folderID`),
  KEY `ownerID` (`ownerID`),
  KEY `ownerID_2` (`ownerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questionsetpairing`
--

DROP TABLE IF EXISTS `questionsetpairing`;
CREATE TABLE IF NOT EXISTS `questionsetpairing` (
  `pairingID` int(11) NOT NULL AUTO_INCREMENT,
  `qID` int(11) NOT NULL,
  `qsetID` int(11) NOT NULL,
  PRIMARY KEY (`pairingID`),
  KEY `qID` (`qID`,`qsetID`),
  KEY `qsetID` (`qsetID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questionsets`
--

DROP TABLE IF EXISTS `questionsets`;
CREATE TABLE IF NOT EXISTS `questionsets` (
  `qSetID` int(11) NOT NULL AUTO_INCREMENT,
  `qSetName` varchar(31) COLLATE utf8_unicode_ci NOT NULL,
  `folderID` int(11) NOT NULL,
  PRIMARY KEY (`qSetID`),
  KEY `cascadefolderdelete` (`folderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questiontable`
--

DROP TABLE IF EXISTS `questiontable`;
CREATE TABLE IF NOT EXISTS `questiontable` (
  `questionID` int(11) NOT NULL AUTO_INCREMENT,
  `folderID` int(11) NOT NULL,
  `question` varchar(124) COLLATE utf8_unicode_ci NOT NULL,
  `questionType` enum COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`questionID`),
  KEY `folderID` (`folderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `login_attempts`
--
ALTER TABLE `login_attempts`
  ADD CONSTRAINT `login_attempts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`id`);

--
-- Constraints for table `questionanswers`
--
ALTER TABLE `questionanswers`
  ADD CONSTRAINT `cascadedelete` FOREIGN KEY (`questionID`) REFERENCES `questiontable` (`questionID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questionfolders`
--
ALTER TABLE `questionfolders`
  ADD CONSTRAINT `questionfolders_ibfk_1` FOREIGN KEY (`ownerID`) REFERENCES `accounts` (`id`);

--
-- Constraints for table `questionsetpairing`
--
ALTER TABLE `questionsetpairing`
  ADD CONSTRAINT `questionsetpairing_ibfk_1` FOREIGN KEY (`qID`) REFERENCES `questiontable` (`questionID`),
  ADD CONSTRAINT `questionsetpairing_ibfk_2` FOREIGN KEY (`qsetID`) REFERENCES `questionsets` (`qSetID`);

--
-- Constraints for table `questionsets`
--
ALTER TABLE `questionsets`
  ADD CONSTRAINT `cascadefolderdelete` FOREIGN KEY (`folderID`) REFERENCES `questionfolders` (`folderID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questiontable`
--
ALTER TABLE `questiontable`
  ADD CONSTRAINT `questiontable_ibfk_1` FOREIGN KEY (`folderID`) REFERENCES `questionfolders` (`folderID`) ON DELETE CASCADE;
COMMIT;

INSERT INTO `accounts` (`id`, `username`, `email`, `password`) VALUES
(1, 'test_user', 'test@example.com', 'password');

GRANT USAGE ON *.* TO 'lnsys'@'localhost' IDENTIFIED BY PASSWORD '*571B02166B46C27003D2E30B815657658C800579';
GRANT SELECT, INSERT, UPDATE ON `qaproject`.* TO 'lnsys'@'localhost';

GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO 'quesys'@'localhost' IDENTIFIED BY PASSWORD '*D980CF29D2D015AFC048830684D401BF66FFE09D';