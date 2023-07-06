-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2023 at 05:45 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db`
--

-- --------------------------------------------------------

--
-- Table structure for table `category_table`
--

CREATE TABLE `category_table` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `category_table`
--

INSERT INTO `category_table` (`category_id`, `category_name`) VALUES
(1, 'Notebook'),
(2, 'mobile phone');

-- --------------------------------------------------------

--
-- Table structure for table `product_table`
--

CREATE TABLE `product_table` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(30) NOT NULL,
  `price` float NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `product_table`
--

INSERT INTO `product_table` (`product_id`, `product_name`, `price`, `category_id`) VALUES
(2, 'ACER NITRO 5', 53000, 1),
(5, 'Asus zenfone AR', 42300, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `user_id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `name` varchar(20) NOT NULL,
  `password` longtext NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`user_id`, `email`, `name`, `password`, `role`) VALUES
(7, 'tony@gmail.com', 'tony', '$2b$10$DwX7qVXU/zXFJq1cDSXA8Ow1odeOSlRrl2CEZ0KgvqufTo1YqaN2m', 'USER'),
(10, 'phatthanaphone@gmail.com', 'phatthanahone', '$2b$10$JFJU9hVE.g8Tg0iU3xR3keiuk6QlhIlG1cMC82Y8oLqlJPCpkNMj6', 'ADMIN'),
(11, 'victor@gmail.com', 'victor', '$2b$10$obhQ6lnnZCs6mKuShU70TObEFtc8HSB7.39c.g0VSXiPyulNU4cT.', 'USER'),
(12, 'victor2@gmail.com', 'victor', '$2b$10$A5NG16WuUd4Q6Bhe.sx9au1MGNgNl.6Ucg62rUqtzfzmRiyDiDIyK', 'USER'),
(13, 'Lucky@gmail.com', 'Lucky', '$2b$10$J9VoJC3lAszyx3X2ZFnWWOdYmvqkvRD/bQXEErR8Q7uTFxkYj7edK', 'USER');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category_table`
--
ALTER TABLE `category_table`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `product_table`
--
ALTER TABLE `product_table`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `product_category_fk` (`category_id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category_table`
--
ALTER TABLE `category_table`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_table`
--
ALTER TABLE `product_table`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_table`
--
ALTER TABLE `product_table`
  ADD CONSTRAINT `product_category_fk` FOREIGN KEY (`category_id`) REFERENCES `category_table` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
