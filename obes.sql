-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2023 at 12:36 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `classtests`
--

CREATE TABLE `classtests` (
  `courseCode` varchar(100) NOT NULL,
  `examYear` varchar(100) NOT NULL,
  `ctID` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
('CSE', 6, 'Data Structure', 'CSE-162', 'Theory', '1st', '2nd', '2022', 3, '1'),
('CSE', 5, 'Computer graphics Laboratory', 'CSE-304', 'Lab', '3rd', '1st', '2022', 1, '0'),
('CSE', 2, 'Computer Ethics', 'CSE-203', 'Theory', '2nd', '1st', '2021', 3, '1'),
('CSE', 9, 'Algorithm-II', 'CSE-257', 'Theory', '2nd', '2nd', '2021', 3, '0'),
('CSE', 4, 'Digital Logic Design', 'CSE-253', 'Theory', '2nd', '2nd', '2022', 3, '0'),
('CSE', 0, 'Electrical Circuit Lab', 'CSE-108', 'Lab', '1st', '1st', '2019', 1, '0'),
('CSE', 0, 'C++', 'CSE-105', 'Theory', '1st', '2nd', '2020', 3, '0'),
('CSE', 1, 'Java Lab', 'CSE-259', 'Lab', '2nd', '1st', '2021', 1, '0'),
('CSE', 2, 'Computer Architecture and Organization', 'CSE-307', 'Theory', '3rd', '1st', '2022', 3, '0'),
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
  `password` varchar(100) NOT NULL,
  `noOfAssignedCourses` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`t_id`, `user_id`, `name`, `department`, `designation`, `email`, `phoneNumber`, `password`, `noOfAssignedCourses`) VALUES
(1, 3, 'Dr. Abu Sayed Md. Mostafizur Rahaman', 'CSE', 'Professor', 'asmmr@gmail.com', '01675564345', 'asmmr1234', '2'),
(2, 4, 'Dr. Md. Golam Moazzam', 'CSE', 'Professor', 'gm@gmail.com', '01987767666', 'gm1234', '2'),
(3, 16, 'Anup Majumder', 'CSE', 'Assistant Professor', 'anup@gmail.com', '01725228874', 'anup1234', '1'),
(4, 17, 'Dr. Jugal Krishna Das', 'CSE', 'Professor', 'jkd@gmail.com', '01725228874', 'jkd1234', '1'),
(5, 18, 'Dr. Mohammad Shorif Uddin', 'CSE', 'Professor', 'su@gmail.com', '01725228874', 'su1234', '1'),
(6, 19, 'Dr. Mohammad Zahidur Rahman', 'CSE', 'Professor', 'mzr@gmail.com', '01999999456', 'mzr1234', '2'),
(7, 20, 'Dr. Md. Imdadul Islam', 'CSE', 'Professor', 'ii@gmail.com', '01725228874', 'ii1234', '0'),
(8, 25, 'Bulbul Ahammad', 'CSE', 'Assistant Professor', 'ba@gmail.com', '01725228874', 'ba1234', '0'),
(9, 21, 'Mohammad Ashraful Islam', 'CSE', 'Assistant Professor', 'mai@gmail.com', '01725228874', 'mai1234', '1'),
(10, 23, 'Nadia Afrin Ritu', 'CSE', 'Lecturer', 'nar@gmail.com', '01999999456', 'nar1234', '0'),
(11, 22, 'Md. Masum Bhuiyan', 'CSE', 'Lecturer', 'mb@gmail.com', '01725228874', 'mb1234', '0');

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
(3, 'Dr. Abu Sayed Md. Mostafizur Rahaman', 'CSE', 'Professor', 'asmmr@gmail.com', '01675564345', 'asmmr1234', '1'),
(4, 'Dr. Md. Golam Moazzam', 'CSE', 'Professor', 'gm@gmail.com', '01987767666', 'gm1234', '2'),
(5, 'Abdul Majid', 'Exam Control Office', 'Employee', 'majid@gmail.com', '01567777773', 'majid1234', '3'),
(9, 'Shree', 'Economics', 'Professor', 'shree59@gmail.com', '01715809101', 'shree23', '0'),
(10, 'Sornali', 'Microbiology', 'Professor', 'sornali34@gmail.com', '01789654567', 'sornali18', '0'),
(11, 'Malati', 'Botany', 'Lecturer', 'malati3@gmail.com', '01799234567', 'malati24', '0'),
(16, 'Anup Majumder', 'CSE', 'Assistant Professor', 'anup@gmail.com', '01725228874', 'anup1234', '1'),
(17, 'Dr. Jugal Krishna Das', 'CSE', 'Professor', 'jkd@gmail.com', '01725228874', 'jkd1234', '1'),
(18, 'Dr. Mohammad Shorif Uddin', 'CSE', 'Professor', 'su@gmail.com', '01725228874', 'su1234', '1'),
(19, 'Dr. Mohammad Zahidur Rahman', 'CSE', 'Professor', 'mzr@gmail.com', '01999999456', 'mzr1234', '1'),
(20, 'Dr. Md. Imdadul Islam', 'CSE', 'Professor', 'ii@gmail.com', '01725228874', 'ii1234', '1'),
(21, 'Mohammad Ashraful Islam', 'CSE', 'Assistant Professor', 'mai@gmail.com', '01725228874', 'mai1234', '1'),
(22, 'Md. Masum Bhuiyan', 'CSE', 'Lecturer', 'mb@gmail.com', '01725228874', 'mb1234', '1'),
(23, 'Nadia Afrin Ritu', 'CSE', 'Lecturer', 'nar@gmail.com', '01999999456', 'nar1234', '1'),
(24, 'Samsun Nahar Khandakar', 'CSE', 'Lecturer', 'snk@gmail.com', '01725228874', 'snk1234', '0'),
(25, 'Bulbul Ahammad', 'CSE', 'Assistant Professor', 'ba@gmail.com', '01725228874', 'ba1234', '1');

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
  MODIFY `t_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
