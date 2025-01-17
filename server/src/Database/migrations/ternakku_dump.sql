-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: ternakku
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cows`
--

DROP TABLE IF EXISTS `cows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cows` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `gender` enum('M','F') NOT NULL,
  `birth_date` date NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `type` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `is_bought` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cows`
--

LOCK TABLES `cows` WRITE;
/*!40000 ALTER TABLE `cows` DISABLE KEYS */;
INSERT INTO `cows` VALUES (22,'Zelda Scott',0,'M','2024-12-28',20.00,'Ut sed iure est volu',NULL,1,'2024-12-19 17:21:20');
/*!40000 ALTER TABLE `cows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` timestamp NOT NULL,
  `end_date` timestamp NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (3,'Festival Peternakan','2024-12-15 19:00:00','2024-12-15 08:00:00','Festival peternakan di laksanakan di batam center','2024-12-13 14:49:35'),(4,'Meeting Stakeholder','2024-12-19 12:00:00','2024-12-21 00:00:00','Metting dengan stakeholder','2024-12-13 16:46:27'),(11,'Meeting Pemerintah','2024-12-30 12:00:00','2025-01-03 12:00:00','','2024-12-18 07:27:25');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `deadline` date NOT NULL,
  `category` varchar(255) NOT NULL,
  `priority` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `details` text,
  `reminder_date` date NOT NULL,
  `worker_id` bigint unsigned NOT NULL,
  `cow_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_tasks_workers` (`worker_id`),
  KEY `fk_tasks_cows` (`cow_id`),
  CONSTRAINT `fk_tasks_cows` FOREIGN KEY (`cow_id`) REFERENCES `cows` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tasks_workers` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_categories`
--

DROP TABLE IF EXISTS `transaction_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_transaction_categories_user` (`user_id`),
  CONSTRAINT `fk_transaction_categories_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_categories`
--

LOCK TABLES `transaction_categories` WRITE;
/*!40000 ALTER TABLE `transaction_categories` DISABLE KEYS */;
INSERT INTO `transaction_categories` VALUES (14,38,'Pakan','2024-12-21 10:43:26','2024-12-21 10:43:26'),(15,39,' Pakan','2025-01-08 05:54:31','2025-01-08 05:54:31'),(16,39,'Bangunan','2025-01-08 06:31:44','2025-01-08 06:31:44');
/*!40000 ALTER TABLE `transaction_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` bigint unsigned DEFAULT NULL,
  `amount` bigint NOT NULL,
  `type` tinyint(1) NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_transactions_transaction_categories` (`category`),
  KEY `fk_transactions_user` (`user_id`),
  CONSTRAINT `fk_transactions_transaction_categories` FOREIGN KEY (`category`) REFERENCES `transaction_categories` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_transactions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=887 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (884,38,'Noel Sears',14,222222,2,'Quis adipisci fuga ','2024-12-21 10:52:01','2024-12-28'),(886,39,'Dominique Charles',16,1000000,2,'Aperiam ipsum obcaec','2025-01-08 06:31:52','2025-01-21');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profiles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_user_profiles_users` (`user_id`),
  CONSTRAINT `fk_user_profiles_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profiles`
--

LOCK TABLES `user_profiles` WRITE;
/*!40000 ALTER TABLE `user_profiles` DISABLE KEYS */;
INSERT INTO `user_profiles` VALUES (3,36,'+1 (541) 513-8394',NULL,'2024-11-26 08:47:26'),(4,37,'08213344222',NULL,'2024-12-15 14:16:56'),(5,38,'081122334455',NULL,'2024-12-15 18:50:16'),(6,39,'08213344222',NULL,'2024-12-21 09:48:15');
/*!40000 ALTER TABLE `user_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (36,'Miranda Hewitt','zihuxa@mailinator.com','$2b$13$hYYgusQ8QTuWLMS2.by/se5nCU21o.1XZXb0IRTzA953wf7aObHS2','2024-11-26 08:47:26',NULL),(37,'budi1123','bud1wer222@gmail.com','$2b$13$GTq8BU7PvSHdhWlle6V2Oud3DKGlb/0aoHIf1TrrfVTbGvb6f0/BG','2024-12-15 14:16:56',NULL),(38,'Nero Gonzales Edit Phone','admin123@gmail.com','$2b$13$0e.S1xPjhEL3egdjNTaWb.K6EP8zE0ShZbkmNJA2/asW63Dya0tyq','2024-12-15 18:50:16','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTczNDc3NDgzNSwiZXhwIjoxNzM0ODYxMjM1fQ.1S9ucu6-xJ-L6TiccqtufU7hJccdCSUkOGwfGKfyiZo'),(39,'admin','admin3@gmail.com','$2b$13$fcEEIyPPNnso/jzb.tB9bOdeRSzFvHLp8QtLeASVUFdRC4VLQJ65W','2024-12-21 09:48:15','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImlhdCI6MTczNzEwMjIxMiwiZXhwIjoxNzM3MTg4NjEyfQ.ymtouyASkaS9r-f8BhFq53nMDc0J0-rIXNhGQYZW0HI');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workers`
--

DROP TABLE IF EXISTS `workers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` enum('M','F') NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_workers_users` (`user_id`),
  CONSTRAINT `fk_workers_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workers`
--

LOCK TABLES `workers` WRITE;
/*!40000 ALTER TABLE `workers` DISABLE KEYS */;
INSERT INTO `workers` VALUES (17,36,'Yolanda Walker','M','321456789','gahu@mailinator.com',1,'2024-12-16 06:53:47'),(18,37,'Shay Mathis','F','75512312312313','fobo@mailinator.com',1,'2024-12-16 06:53:59'),(19,38,'Ray Ortiz','M','541','kequza@mailinator.com',1,'2024-12-16 06:54:07'),(20,37,'Zoe Rogers','F','401','muhus@mailinator.com',1,'2024-12-16 06:54:12'),(21,39,'Colt Wise repos','M','3531231231321','vysuseme@mailinator.com',0,'2024-12-16 06:54:17'),(22,38,'Nina Roach','F','26','xyderyd@mailinator.com',1,'2024-12-19 17:31:29'),(23,36,'Zephania Swanson','F','1942131','sowuhone@mailinator.com',1,'2024-12-19 17:31:47');
/*!40000 ALTER TABLE `workers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-17  8:46:52
