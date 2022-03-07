-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2022 at 05:13 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rolling_glory`
--

-- --------------------------------------------------------

--
-- Table structure for table `gifts`
--

CREATE TABLE `gifts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `stok` int(11) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `poins` int(11) NOT NULL DEFAULT 0,
  `hot_item` int(1) NOT NULL DEFAULT 0,
  `new` int(1) NOT NULL DEFAULT 0,
  `best_seller` int(1) DEFAULT 0,
  `available` int(1) NOT NULL DEFAULT 1,
  `image` text DEFAULT NULL,
  `rating` decimal(4,2) NOT NULL DEFAULT 0.00,
  `user_rating` int(11) NOT NULL DEFAULT 0,
  `user_create` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gifts`
--

INSERT INTO `gifts` (`id`, `name`, `stok`, `description`, `poins`, `hot_item`, `new`, `best_seller`, `available`, `image`, `rating`, `user_rating`, `user_create`, `created_at`, `updated_at`) VALUES
(1, 'SAMSUNG S10 64GB BLACK', 99, '108MP pro-grade camera · 120W Xiaomi HyperCharge 120Hz AMOLED, Dolby Vision® supported · Flagship Qualcomm® Snapdragon™ 888', 130000, 0, 0, 0, 1, NULL, '5.00', 1, 1, '2022-03-07 03:33:35', '2022-03-07 03:33:35'),
(2, 'SAMSUNG S10 64 GB', 0, '108MP pro-grade camera · 120W Xiaomi HyperCharge 120Hz AMOLED, Dolby Vision® supported · Flagship Qualcomm® Snapdragon™ 888', 130000, 0, 0, 0, 1, NULL, '0.00', 0, 1, '2022-03-07 03:43:23', '2022-03-07 03:43:23'),
(3, 'Iphone 12 Pro Max', 0, '108MP pro-grade camera · 120W Xiaomi HyperCharge 120Hz AMOLED, Dolby Vision® supported · Flagship Qualcomm® Snapdragon™ 888', 130000, 0, 0, 0, 1, NULL, '0.00', 0, 1, '2022-03-07 03:43:48', '2022-03-07 03:43:48'),
(4, 'Xiaomi Redmii 4 X', 0, '108MP pro-grade camera · 120W Xiaomi HyperCharge 120Hz AMOLED, Dolby Vision® supported · Flagship Qualcomm® Snapdragon™ 888', 130000, 0, 0, 0, 1, NULL, '0.00', 0, 1, '2022-03-07 03:44:25', '2022-03-07 03:44:25');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `gift_id` int(11) NOT NULL,
  `redeem_detail_id` int(11) NOT NULL,
  `rating` int(2) NOT NULL,
  `user_create` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `gift_id`, `redeem_detail_id`, `rating`, `user_create`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 5, 1, '2022-03-07 03:35:46', '2022-03-07 03:35:46');

-- --------------------------------------------------------

--
-- Table structure for table `redeems`
--

CREATE TABLE `redeems` (
  `id` int(11) NOT NULL,
  `redeem_code` varchar(255) DEFAULT NULL,
  `quantity_total` int(11) NOT NULL,
  `poin_total` int(11) NOT NULL,
  `user_create` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `redeems`
--

INSERT INTO `redeems` (`id`, `redeem_code`, `quantity_total`, `poin_total`, `user_create`, `created_at`, `updated_at`) VALUES
(1, 'A-XX124', 1, 30000, 1, '2022-03-07 03:35:11', '2022-03-07 03:35:11');

-- --------------------------------------------------------

--
-- Table structure for table `redeem_details`
--

CREATE TABLE `redeem_details` (
  `id` int(11) NOT NULL,
  `redeem_id` int(11) NOT NULL,
  `gift_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `poins` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `redeem_details`
--

INSERT INTO `redeem_details` (`id`, `redeem_id`, `gift_id`, `quantity`, `poins`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 10000, '2022-03-07 03:35:11', '2022-03-07 03:35:11');

-- --------------------------------------------------------

--
-- Table structure for table `stock_history`
--

CREATE TABLE `stock_history` (
  `id` int(11) NOT NULL,
  `gift_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `user_create` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stock_history`
--

INSERT INTO `stock_history` (`id`, `gift_id`, `quantity`, `user_create`, `created_at`, `updated_at`) VALUES
(1, 1, 100, NULL, '2022-03-07 03:34:49', '2022-03-07 03:34:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `level` varchar(20) DEFAULT NULL,
  `user_create` int(11) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `address`, `email`, `username`, `password`, `level`, `user_create`, `access_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', NULL, NULL, 'admin', '$2b$10$8GF/qsHNAm0URNZpJ5pve.yyzOtkH2Jyolx.4TOt7071h.m4YYMUm', NULL, NULL, NULL, NULL, '2022-03-07 03:32:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gifts`
--
ALTER TABLE `gifts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_create` (`user_create`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gift_id` (`gift_id`),
  ADD KEY `redeem_id` (`redeem_detail_id`),
  ADD KEY `user_create` (`user_create`);

--
-- Indexes for table `redeems`
--
ALTER TABLE `redeems`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `redeem_details`
--
ALTER TABLE `redeem_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gifts_id` (`gift_id`),
  ADD KEY `redeem_id` (`redeem_id`);

--
-- Indexes for table `stock_history`
--
ALTER TABLE `stock_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gift_id` (`gift_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gifts`
--
ALTER TABLE `gifts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `redeems`
--
ALTER TABLE `redeems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `redeem_details`
--
ALTER TABLE `redeem_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `stock_history`
--
ALTER TABLE `stock_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gifts`
--
ALTER TABLE `gifts`
  ADD CONSTRAINT `gifts_ibfk_1` FOREIGN KEY (`user_create`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`gift_id`) REFERENCES `gifts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`redeem_detail_id`) REFERENCES `redeem_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_3` FOREIGN KEY (`user_create`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `redeem_details`
--
ALTER TABLE `redeem_details`
  ADD CONSTRAINT `redeem_details_ibfk_1` FOREIGN KEY (`redeem_id`) REFERENCES `redeems` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stock_history`
--
ALTER TABLE `stock_history`
  ADD CONSTRAINT `stock_history_ibfk_1` FOREIGN KEY (`gift_id`) REFERENCES `gifts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
