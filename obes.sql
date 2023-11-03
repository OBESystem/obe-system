-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2023 at 06:18 PM
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
('CSE', 1, 'Computer graphics Laboratory', 'CSE-304', 'Lab', '3rd', '1st', '2022', 1, '0'),
('CSE', 2, 'Computer Ethics', 'CSE-203', 'Theory', '2nd', '1st', '2021', 3, '0'),
('CSE', 0, 'Algorithm-II', 'CSE-257', 'Theory', '2nd', '2nd', '2021', 3, '0'),
('CSE', 0, 'Digital Logic Design', 'CSE-253', 'Theory', '2nd', '2nd', '2022', 3, '0'),
('CSE', 0, 'Electrical Circuit Lab', 'CSE-108', 'Lab', '1st', '1st', '2019', 1, '0'),
('CSE', 0, 'C++', 'CSE-105', 'Theory', '1st', '2nd', '2020', 3, '0'),
('CSE', 0, 'Java Lab', 'CSE-259', 'Lab', '2nd', '1st', '2021', 1, '0'),
('CSE', 0, 'Computer Architecture and Organization', 'CSE-307', 'Theory', '3rd', '1st', '2022', 3, '0'),
('CSE', 0, 'Microprocessor Lab', 'CSE-358', 'Lab', '3rd', '2nd', '2022', 1, '0'),
('CSE', 0, 'Computer graphics', 'CSE-303', 'theory', '3rd', '1st', '2020', 3, '0'),
('CSE', 0, 'Computer Network', 'CSE-403', 'Theory', '4th', '1st', '2021', 3, '0');

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
(1, 3, 'Subarna Saha', 'CSE', 'Lecturer', 'subarna@gmail.com', '01675564345', 'subarna1234'),
(2, 4, 'Rubayed', 'CSE', 'Associate Professor', 'rubayed@gmail.com', '01987767666', 'rubayed1234');

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
(3, 'Subarna Saha', 'CSE', 'Lecturer', 'subarna@gmail.com', '01675564345', 'subarna1234', '1'),
(4, 'Rubayed', 'CSE', 'Associate Professor', 'rubayed@gmail.com', '01987767666', 'rubayed1234', '2'),
(5, 'Trisha Sarkar', 'Exam Control Office', 'Employee', 'trisha@gmail.com', '01567777773', 'trisha1234', '3'),
(6, 'Rahim Islam', 'CSE', 'Lecturer', 'rahim@gmail.com', '01999999456', 'rahim1111', '0'),
(7, 'Rai', 'English', 'Lecturer', 'rai1@gmail.com', '01799136578', 'rai123', '0'),
(8, 'Arjun', 'Exam Control Office', 'Employee', 'arjun02@gmail.com', '01842809101', 'arjun101', '0'),
(9, 'Shree', 'Economics', 'Professor', 'shree59@gmail.com', '01715809101', 'shree23', '0'),
(10, 'Sornali', 'Microbiology', 'Professor', 'sornali34@gmail.com', '01789654567', 'sornali18', '0'),
(11, 'Malati', 'Botany', 'Lecturer', 'malati3@gmail.com', '01799234567', 'malati24', '0'),
(12, 'Aditto', 'English', 'Lecturer', 'adi2@gmail.com', '01789654324', 'adi23', '0'),
(13, 'Mahiyat', 'CSE', 'Associate Professor', 'mahiyat@gmail.com', '01768945367', 'mahiyat27', '0'),
(14, 'Setu', 'Zoology', 'Employee', 'setu19@gmail.com', '01345748493', 'setu89', '0'),
(15, 'kygnog', 'CSE', 'oiupom', 'defg@gmail.com', '01999999999', 'ytcbiy', '0');

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
  MODIFY `t_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
