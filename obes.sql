-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2023 at 07:35 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `obes`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE `assignment` (
  `courseCode` varchar(100) NOT NULL,
  `examYear` varchar(100) NOT NULL,
  `agnID` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignment`
--

INSERT INTO `assignment` (`courseCode`, `examYear`, `agnID`, `title`) VALUES
('CSE-162', '2022', '1', ''),
('CSE-162', '2022', '2', ''),
('CSE-304', '2022', '1', '');

-- --------------------------------------------------------

--
-- Table structure for table `classtests`
--

CREATE TABLE `classtests` (
  `courseCode` varchar(100) NOT NULL,
  `examYear` varchar(100) NOT NULL,
  `ctID` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classtests`
--

INSERT INTO `classtests` (`courseCode`, `examYear`, `ctID`) VALUES
('CSE-162', '2022', '1'),
('CSE-162', '2022', '2'),
('CSE-162', '2022', '3'),
('CSE-304', '2022', '1');

-- --------------------------------------------------------

--
-- Table structure for table `coursetable`
--

CREATE TABLE `coursetable` (
  `department` varchar(100) NOT NULL,
  `t_id` int(100) NOT NULL,
  `courseName` varchar(100) NOT NULL,
  `courseCode` varchar(100) NOT NULL,
  `courseType` varchar(100) NOT NULL,
  `year` varchar(100) NOT NULL,
  `semester` varchar(100) NOT NULL,
  `examYear` varchar(100) NOT NULL,
  `credit` int(100) NOT NULL,
  `isCourseFileSubmitted` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coursetable`
--

INSERT INTO `coursetable` (`department`, `t_id`, `courseName`, `courseCode`, `courseType`, `year`, `semester`, `examYear`, `credit`, `isCourseFileSubmitted`) VALUES
('CSE', 1, 'Data Structure', 'CSE-162', 'Theory', '1st', '2nd', '2022', 3, '1'),
('CSE', 1, 'Computer graphics Laboratory', 'CSE-304', 'Lab', '3rd', '1st', '2022', 1, '0');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `t_id` int(100) NOT NULL,
  `user_id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`t_id`, `user_id`, `name`, `department`, `designation`, `email`, `phoneNumber`, `password`) VALUES
(1, 4, 'Rubayed', 'CSE', 'Lecturer', 'abcd@gmail.com', '01987767666', 'abcd1111');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phoneNumber` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userType` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `department`, `designation`, `email`, `phoneNumber`, `password`, `userType`) VALUES
(3, 'Subarna Saha', 'CSE', 'Lecturer', 'subarna@gmail.com', '01675564345', 'aaaa1111', '0'),
(4, 'Rubayed', 'CSE', 'Associate Professor', 'abcd@gmail.com', '01987767666', 'abcd1111', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`t_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `t_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
