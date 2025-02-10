-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 18, 2024 at 08:36 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `buy_list`
--

CREATE TABLE `buy_list` (
  `buy_list_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name_product` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `total_countbuy` int(11) NOT NULL,
  `image` varchar(355) NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `check_express` tinyint(4) NOT NULL,
  `contact` varchar(45) NOT NULL,
  `status_express` varchar(45) NOT NULL,
  `image_slip` varchar(355) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `exchang_list`
--

CREATE TABLE `exchang_list` (
  `id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name_product` varchar(45) NOT NULL,
  `price_for_exchang` float DEFAULT NULL,
  `total_countexchang` int(11) NOT NULL,
  `image` varchar(355) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `check_express` tinyint(4) NOT NULL,
  `contact` varchar(45) NOT NULL,
  `status_express` varchar(45) NOT NULL,
  `total_item` int(11) NOT NULL,
  `image_slip` varchar(355) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `exchang_list`
--

INSERT INTO `exchang_list` (`id`, `buyer_id`, `seller_id`, `product_id`, `name_product`, `price_for_exchang`, `total_countexchang`, `image`, `date`, `check_express`, `contact`, `status_express`, `total_item`, `image_slip`) VALUES
(13, 1, 4, 26, 'ถ้วย', 500, 1, 'a1.jpeg', '2024-06-13 22:42:57', 0, '0639233319', 'จัดส่งสำเร็จเรียบร้อยแล้ว', 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `images_for_exchang`
--

CREATE TABLE `images_for_exchang` (
  `id` int(11) NOT NULL,
  `exchang_list_id` int(11) NOT NULL,
  `image` varchar(355) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images_for_exchang`
--

INSERT INTO `images_for_exchang` (`id`, `exchang_list_id`, `image`) VALUES
(41, 13, '04a0f15ff1c707006603331b3d1a54b6.jpeg'),
(42, 13, '7a68a2e802b7f8f90be4ff631ad1e779.jpeg'),
(43, 13, '71dc8f8a7d29b84bac6d3ba4e4bbc9f5.jpeg'),
(44, 13, '4822df63a1e52d7ec1ded2767bbb56a4.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name_product` varchar(45) NOT NULL,
  `price` float DEFAULT NULL,
  `des` varchar(255) DEFAULT '-',
  `total_product` int(11) NOT NULL,
  `check_product` tinyint(4) NOT NULL,
  `users_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category` tinyint(4) NOT NULL,
  `approve` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name_product`, `price`, `des`, `total_product`, `check_product`, `users_id`, `date`, `category`, `approve`) VALUES
(25, 'ครก', 129, 'ครกไม้โบราณสีธรรมชาติ ขนาด 5 นิ้ว กว้าง 5 นิ้ว สูง 5นิ้ว ใช้ในครัวเรือนได้', 9, 0, 4, '2024-05-30 17:54:16', 1, 1),
(26, 'ถ้วย', 699, 'วัสดุ: ทองและเงิน\nกระบวนการ: แกะสลัก\n', 8, 1, 4, '2024-05-30 18:30:20', 3, 0),
(27, 'ขวดน้ำอัดลมโบราณ', 90, 'ขวดน้ำอัดลม โบราณ ของเก่าหายาก ของสะสม ของแท้ทุกขวด \n-ทุกขาดผ่านการตรวจสอบ ไม่มีแก้วบิ้น\n-มีรอยถลอกบ้างตามกาลเวลา และคราบน้ำ บางขวดอยู่ในสมัยสงครามโลกครั้งที่ 2 เลยครับ', 20, 0, 1, '2024-05-30 19:56:45', 2, 1),
(28, 'เป็ดเงินโบราณ', 7999, 'เป็ดเงินโบราณใส่ของมีค่า\nเป็ดเงินผสมนิเคิลงานช่างเขมร', 10, 1, 1, '2024-05-31 15:29:10', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image` varchar(355) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image`) VALUES
(9, 26, 'a1.jpeg'),
(10, 26, 'a3.jpeg'),
(11, 26, 'a2.jpeg'),
(15, 25, 'e1.jpeg'),
(16, 25, 'e2.jpeg'),
(17, 27, 'b1.jpeg'),
(18, 27, 'b2.jpeg'),
(19, 28, 'c1.jpeg'),
(20, 28, 'c2.jpeg'),
(21, 28, 'c3.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `report` text NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id`, `report`, `user_id`) VALUES
(1, 'ของปลอม', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `telephone` varchar(45) DEFAULT '-',
  `address` varchar(355) DEFAULT '-',
  `password` varchar(45) NOT NULL,
  `sold` int(11) NOT NULL DEFAULT '0',
  `exchanged` int(11) NOT NULL DEFAULT '0',
  `mybuy` int(11) NOT NULL DEFAULT '0',
  `mysell` int(11) NOT NULL DEFAULT '0',
  `myexchang` int(11) NOT NULL DEFAULT '0',
  `myoffer` int(11) NOT NULL DEFAULT '0',
  `report_count` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `email`, `username`, `telephone`, `address`, `password`, `sold`, `exchanged`, `mybuy`, `mysell`, `myexchang`, `myoffer`, `report_count`) VALUES
(1, 'thatchai', 'khaosamang', 'thatchaikhaosamang@gmail.com', 'homeza204', '0639233319', '150 พระราม2 48 เขตบางขุนเทียน แสมดำ กรุงเทพมหานคร 10150', '1111', 22, 22, 0, 0, 1, 0, 0),
(4, 'test', '01', 'test01@gmail.com', 'test01', '0123456789', 'เลขที่ 6 ถนนราชมรรคาใน อำเภอเมือง จังหวัดนครปฐม 73000', '1111test01', 25, 7, 0, 0, 0, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buy_list`
--
ALTER TABLE `buy_list`
  ADD PRIMARY KEY (`buy_list_id`);

--
-- Indexes for table `exchang_list`
--
ALTER TABLE `exchang_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images_for_exchang`
--
ALTER TABLE `images_for_exchang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_images_for_exchang_exchang_list_idx` (`exchang_list_id`) USING BTREE;

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_users_idx` (`users_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_images_ibfk_1` (`product_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buy_list`
--
ALTER TABLE `buy_list`
  MODIFY `buy_list_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exchang_list`
--
ALTER TABLE `exchang_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `images_for_exchang`
--
ALTER TABLE `images_for_exchang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `images_for_exchang`
--
ALTER TABLE `images_for_exchang`
  ADD CONSTRAINT `fk_images_for_exchang_exchang_list` FOREIGN KEY (`exchang_list_id`) REFERENCES `exchang_list` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
