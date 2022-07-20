-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.11-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for remi_db
DROP DATABASE IF EXISTS `remi_db`;
CREATE DATABASE IF NOT EXISTS `remi_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `remi_db`;

-- Dumping structure for table remi_db.share_movie
DROP TABLE IF EXISTS `share_movie`;
CREATE TABLE IF NOT EXISTS `share_movie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `url` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Dumping data for table remi_db.share_movie: ~0 rows (approximately)
DELETE FROM `share_movie`;
/*!40000 ALTER TABLE `share_movie` DISABLE KEYS */;
INSERT INTO `share_movie` (`id`, `user_id`, `url`) VALUES
	(1, 2, 'https://www.youtube.com/watch?v=oofSnsGkops'),
	(2, 1, 'https://www.youtube.com/watch?v=qlOH-4_LrvE'),
	(4, 1, 'https://www.youtube.com/watch?v=bn8QPRYWAdk');
/*!40000 ALTER TABLE `share_movie` ENABLE KEYS */;

-- Dumping structure for table remi_db.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table remi_db.user: ~0 rows (approximately)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `user_name`, `password`, `refresh_token`) VALUES
	(1, 'aaa', '$2b$10$s/rX.vbYG.FIQw5uNg4tH.VCC2R/w7lK7vafPtKxE8d2C7NKIzUdK', ''),
	(2, 'bbb', '$2b$10$Guc79EvSPlnCbR1o6RtlceIGWtqiLsEozE2P5Nv7IbQSFz43znoGC', ''),
	(5, 'ccc', '$2b$10$OJ9nhXj9P6J45HDlG2CcE.p2X70BMdZrNKE8ZLODQh57iOJqqwO/q', '');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
