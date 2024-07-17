-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2024 at 06:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `faculty_dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `curriculum`
--

CREATE TABLE `curriculum` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `subject1` varchar(255) DEFAULT NULL,
  `subject2` varchar(255) DEFAULT NULL,
  `subject3` varchar(255) DEFAULT NULL,
  `subject4` varchar(255) DEFAULT NULL,
  `subject5` varchar(255) DEFAULT NULL,
  `subject6` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `curriculum`
--

INSERT INTO `curriculum` (`id`, `year`, `semester`, `subject1`, `subject2`, `subject3`, `subject4`, `subject5`, `subject6`) VALUES
(8, 1, 1, 'Maths1', 'English', 'BE', 'DLD', 'C_Programming', 'ES'),
(9, 1, 2, 'Maths2', 'Physics', 'Chemistry', 'EEE', 'ED', 'HVPE'),
(10, 2, 1, 'DSA', 'Java_Programming', 'CO', 'DC', 'DMS', 'DTPI'),
(11, 2, 2, 'PSQT', 'MPI', 'OS', 'CN', 'CG', 'FLAT'),
(12, 3, 1, 'CP', 'CD', 'DBMS', 'DAA', 'ADS', 'AI'),
(13, 3, 2, 'ML', 'NNDL', 'OOSE', 'WT', 'CNS', 'IRE'),
(14, 4, 1, 'DATA_ANALYTICS', 'Management_Principles', 'PE', 'OE', '', ''),
(15, 4, 2, 'OPEN_ELECTIVE', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `faculties`
--

CREATE TABLE `faculties` (
  `facultyId` varchar(10) NOT NULL,
  `facultyName` varchar(20) NOT NULL,
  `facultyYear` int(2) NOT NULL,
  `facultySemester` int(2) NOT NULL,
  `facultySubject` varchar(40) NOT NULL,
  `Section` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculties`
--

INSERT INTO `faculties` (`facultyId`, `facultyName`, `facultyYear`, `facultySemester`, `facultySubject`, `Section`) VALUES
('1234', 'Seetha', 1, 1, 'C_Programming', 'B'),
('1236', 'Ramya', 4, 1, 'DATA_ANALYTICS', 'A'),
('1240', 'Swarna', 3, 2, 'NNDL', 'A'),
('1241', 'suraj', 1, 1, 'C_Programming', 'A'),
('1242', 'swetha', 1, 1, 'C_Programming', 'C'),
('1243', 'tarun', 1, 1, 'C_Programming', 'D');

-- --------------------------------------------------------

--
-- Table structure for table `question_papers`
--

CREATE TABLE `question_papers` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `mid1_paper1` varchar(255) DEFAULT NULL,
  `mid1_paper2` varchar(255) DEFAULT NULL,
  `mid1_paper3` varchar(255) DEFAULT NULL,
  `mid2_paper1` varchar(255) DEFAULT NULL,
  `mid2_paper2` varchar(255) DEFAULT NULL,
  `mid2_paper3` varchar(255) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `selected_paper_1` varchar(255) DEFAULT NULL,
  `hod_selected_1` tinyint(1) DEFAULT 0,
  `selected_paper_2` varchar(255) DEFAULT NULL,
  `hod_selected_2` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question_papers`
--

INSERT INTO `question_papers` (`id`, `year`, `semester`, `mid1_paper1`, `mid1_paper2`, `mid1_paper3`, `mid2_paper1`, `mid2_paper2`, `mid2_paper3`, `subject`, `selected_paper_1`, `hod_selected_1`, `selected_paper_2`, `hod_selected_2`) VALUES
(36, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'Maths1', NULL, 0, NULL, 0),
(37, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'English', NULL, 0, NULL, 0),
(38, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'BE', NULL, 0, NULL, 0),
(39, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'DLD', NULL, 0, NULL, 0),
(40, 1, 1, 'public\\uploads\\questionPapers-1712931481994.jpg', 'public\\uploads\\questionPapers-1712931507357.jpg', 'public\\uploads\\questionPapers-1712931531827.jpeg', NULL, NULL, NULL, 'C_Programming', 'public\\uploads\\questionPapers-1712931531827.jpeg', 3, NULL, 0),
(41, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, 0, NULL, 0),
(42, 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'Maths2', NULL, 0, NULL, 0),
(43, 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'Physics', NULL, 0, NULL, 0),
(44, 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'Chemistry', NULL, 0, NULL, 0),
(45, 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'EEE', NULL, 0, NULL, 0),
(46, 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'ED', NULL, 0, NULL, 0),
(47, 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'HVPE', NULL, 0, NULL, 0),
(48, 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'DSA', NULL, 0, NULL, 0),
(49, 2, 1, 'public\\uploads\\questionPapers-1712984094855.png', NULL, NULL, NULL, NULL, NULL, 'Java_Programming', NULL, 0, NULL, 0),
(50, 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'CO', NULL, 0, NULL, 0),
(51, 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'DC', NULL, 0, NULL, 0),
(52, 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'DMS', NULL, 0, NULL, 0),
(53, 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'DTPI', NULL, 0, NULL, 0),
(54, 2, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'PSQT', NULL, 0, NULL, 0),
(55, 2, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'MPI', NULL, 0, NULL, 0),
(56, 2, 2, NULL, NULL, NULL, 'public\\uploads\\questionPapers-1713006413184.png', NULL, NULL, 'OS', NULL, 0, 'public\\uploads\\questionPapers-1713006413184.png', 1),
(57, 2, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'CN', NULL, 0, NULL, 0),
(58, 2, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'CG', NULL, 0, NULL, 0),
(59, 2, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'FLAT', NULL, 0, NULL, 0),
(60, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'CP', NULL, 0, NULL, 0),
(61, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'CD', NULL, 0, NULL, 0),
(62, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'DBMS', NULL, 0, NULL, 0),
(63, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'DAA', NULL, 0, NULL, 0),
(64, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'ADS', NULL, 0, NULL, 0),
(65, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'AI', NULL, 0, NULL, 0),
(66, 3, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'ML', NULL, 0, NULL, 0),
(67, 3, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'NNDL', NULL, 0, NULL, 0),
(68, 3, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'OOSE', NULL, 0, NULL, 0),
(69, 3, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'WT', NULL, 0, NULL, 0),
(70, 3, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'CNS', NULL, 0, NULL, 0),
(71, 3, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'IRE', NULL, 0, NULL, 0),
(72, 4, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'DATA_ANALYTICS', NULL, 0, NULL, 0),
(73, 4, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'Management_Principles', NULL, 0, NULL, 0),
(74, 4, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'PE', NULL, 0, NULL, 0),
(75, 4, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'OE', NULL, 0, NULL, 0),
(76, 4, 1, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, 0),
(77, 4, 1, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, 0),
(78, 4, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'OPEN_ELECTIVE', NULL, 0, NULL, 0),
(79, 4, 2, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, 0),
(80, 4, 2, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, 0),
(81, 4, 2, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, 0),
(82, 4, 2, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, 0),
(83, 4, 2, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `Id` varchar(10) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`Id`, `email`, `password`) VALUES
('1234', 'fvvgv@gmail.com', 'frvt'),
('1236', 'ramyasenapati2004@gm', 'ramya04'),
('1240', 'swarna@gmail.com', 'swarna'),
('1241', 'suraj@gmail.com', 'suraj'),
('1242', 'swetha@gmail.com', 'swetha'),
('1243', 'tarun@gmail.com', 'tarun');

-- --------------------------------------------------------

--
-- Table structure for table `year1semester1`
--

CREATE TABLE `year1semester1` (
  `Roll_no` int(11) NOT NULL,
  `Student_name` varchar(255) DEFAULT NULL,
  `Section` char(1) DEFAULT NULL,
  `Maths1_mid1` float DEFAULT NULL,
  `Maths1_mid2` float DEFAULT NULL,
  `English_mid1` float DEFAULT NULL,
  `English_mid2` float DEFAULT NULL,
  `BE_mid1` float DEFAULT NULL,
  `BE_mid2` float DEFAULT NULL,
  `DLD_mid1` float DEFAULT NULL,
  `DLD_mid2` float DEFAULT NULL,
  `C_Programming_mid1` float DEFAULT NULL,
  `C_Programming_mid2` float DEFAULT NULL,
  `ES_mid1` float DEFAULT NULL,
  `ES_mid2` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year1semester1`
--

INSERT INTO `year1semester1` (`Roll_no`, `Student_name`, `Section`, `Maths1_mid1`, `Maths1_mid2`, `English_mid1`, `English_mid2`, `BE_mid1`, `BE_mid2`, `DLD_mid1`, `DLD_mid2`, `C_Programming_mid1`, `C_Programming_mid2`, `ES_mid1`, `ES_mid2`) VALUES
(1, 'Ram', 'A', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 68, 0, NULL, NULL),
(2, 'Shyam', 'A', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 92, NULL, NULL, NULL),
(21, 'Keshav', 'B', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 95, 100, NULL, NULL),
(22, 'Preethi', 'B', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 98, 84, NULL, NULL),
(41, 'Krish', 'C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 74, NULL, NULL, NULL),
(42, 'Arha', 'C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 74, NULL, NULL, NULL),
(43, 'Joshua', 'C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 31, NULL, NULL, NULL),
(61, 'Abhi', 'D', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 85, 88, NULL, NULL),
(62, 'Jay', 'D', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 58, 76, NULL, NULL),
(63, 'Raghav', 'D', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 100, 96, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `year1semester2`
--

CREATE TABLE `year1semester2` (
  `Roll_no` int(11) NOT NULL,
  `Student_name` varchar(255) DEFAULT NULL,
  `Section` char(1) DEFAULT NULL,
  `Maths2_mid1` float DEFAULT NULL,
  `Maths2_mid2` float DEFAULT NULL,
  `Physics_mid1` float DEFAULT NULL,
  `Physics_mid2` float DEFAULT NULL,
  `Chemistry_mid1` float DEFAULT NULL,
  `Chemistry_mid2` float DEFAULT NULL,
  `EEE_mid1` float DEFAULT NULL,
  `EEE_mid2` float DEFAULT NULL,
  `ED_mid1` float DEFAULT NULL,
  `ED_mid2` float DEFAULT NULL,
  `HVPE_mid1` float DEFAULT NULL,
  `HVPE_mid2` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `year2semester1`
--

CREATE TABLE `year2semester1` (
  `Roll_no` int(11) NOT NULL,
  `Student_name` varchar(255) DEFAULT NULL,
  `Section` char(1) DEFAULT NULL,
  `DSA_mid1` float DEFAULT NULL,
  `DSA_mid2` float DEFAULT NULL,
  `Java_Programming_mid1` float DEFAULT NULL,
  `Java_Programming_mid2` float DEFAULT NULL,
  `CO_mid1` float DEFAULT NULL,
  `CO_mid2` float DEFAULT NULL,
  `DC_mid1` float DEFAULT NULL,
  `DC_mid2` float DEFAULT NULL,
  `DMS_mid1` float DEFAULT NULL,
  `DMS_mid2` float DEFAULT NULL,
  `DTPI_mid1` float DEFAULT NULL,
  `DTPI_mid2` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `year2semester2`
--

CREATE TABLE `year2semester2` (
  `Roll_no` int(11) NOT NULL,
  `Student_name` varchar(255) DEFAULT NULL,
  `Section` char(1) DEFAULT NULL,
  `PSQT_mid1` float DEFAULT NULL,
  `PSQT_mid2` float DEFAULT NULL,
  `MPI_mid1` float DEFAULT NULL,
  `MPI_mid2` float DEFAULT NULL,
  `OS_mid1` float DEFAULT NULL,
  `OS_mid2` float DEFAULT NULL,
  `CN_mid1` float DEFAULT NULL,
  `CN_mid2` float DEFAULT NULL,
  `CG_mid1` float DEFAULT NULL,
  `CG_mid2` float DEFAULT NULL,
  `FLAT_mid1` float DEFAULT NULL,
  `FLAT_mid2` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `year3semester1`
--

CREATE TABLE `year3semester1` (
  `Roll_no` int(11) NOT NULL,
  `Student_name` varchar(255) DEFAULT NULL,
  `Section` char(1) DEFAULT NULL,
  `CP_mid1` float DEFAULT NULL,
  `CP_mid2` float DEFAULT NULL,
  `CD_mid1` float DEFAULT NULL,
  `CD_mid2` float DEFAULT NULL,
  `DBMS_mid1` float DEFAULT NULL,
  `DBMS_mid2` float DEFAULT NULL,
  `DAA_mid1` float DEFAULT NULL,
  `DAA_mid2` float DEFAULT NULL,
  `ADS_mid1` float DEFAULT NULL,
  `ADS_mid2` float DEFAULT NULL,
  `AI_mid1` float DEFAULT NULL,
  `AI_mid2` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year3semester1`
--

INSERT INTO `year3semester1` (`Roll_no`, `Student_name`, `Section`, `CP_mid1`, `CP_mid2`, `CD_mid1`, `CD_mid2`, `DBMS_mid1`, `DBMS_mid2`, `DAA_mid1`, `DAA_mid2`, `ADS_mid1`, `ADS_mid2`, `AI_mid1`, `AI_mid2`) VALUES
(1, 'Ramya', 'A', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Manasa', 'A', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `year3semester2`
--

CREATE TABLE `year3semester2` (
  `Roll_no` int(11) NOT NULL,
  `Student_name` varchar(255) DEFAULT NULL,
  `Section` char(1) DEFAULT NULL,
  `ML_mid1` float DEFAULT NULL,
  `ML_mid2` float DEFAULT NULL,
  `NNDL_mid1` float DEFAULT NULL,
  `NNDL_mid2` float DEFAULT NULL,
  `OOSE_mid1` float DEFAULT NULL,
  `OOSE_mid2` float DEFAULT NULL,
  `WT_mid1` float DEFAULT NULL,
  `WT_mid2` float DEFAULT NULL,
  `CNS_mid1` float DEFAULT NULL,
  `CNS_mid2` float DEFAULT NULL,
  `IRE_mid1` float DEFAULT NULL,
  `IRE_mid2` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year3semester2`
--

INSERT INTO `year3semester2` (`Roll_no`, `Student_name`, `Section`, `ML_mid1`, `ML_mid2`, `NNDL_mid1`, `NNDL_mid2`, `OOSE_mid1`, `OOSE_mid2`, `WT_mid1`, `WT_mid2`, `CNS_mid1`, `CNS_mid2`, `IRE_mid1`, `IRE_mid2`) VALUES
(1, 'Ramya', 'A', NULL, NULL, 95, 98, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Manasa', 'A', NULL, NULL, 96, 96, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `year4semester1`
--

CREATE TABLE `year4semester1` (
  `Roll_no` int(11) NOT NULL,
  `Student_name` varchar(255) DEFAULT NULL,
  `Section` char(1) DEFAULT NULL,
  `DATA_ANALYTICS_mid1` float DEFAULT NULL,
  `DATA_ANALYTICS_mid2` float DEFAULT NULL,
  `Management_Principles_mid1` float DEFAULT NULL,
  `Management_Principles_mid2` float DEFAULT NULL,
  `PE_mid1` float DEFAULT NULL,
  `PE_mid2` float DEFAULT NULL,
  `OE_mid1` float DEFAULT NULL,
  `OE_mid2` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `year4semester2`
--

CREATE TABLE `year4semester2` (
  `Roll_no` int(11) NOT NULL,
  `Student_name` varchar(255) DEFAULT NULL,
  `Section` char(1) DEFAULT NULL,
  `OPEN_ELECTIVE_mid1` float DEFAULT NULL,
  `OPEN_ELECTIVE_mid2` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `curriculum`
--
ALTER TABLE `curriculum`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculties`
--
ALTER TABLE `faculties`
  ADD PRIMARY KEY (`facultyId`);

--
-- Indexes for table `question_papers`
--
ALTER TABLE `question_papers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `year1semester1`
--
ALTER TABLE `year1semester1`
  ADD PRIMARY KEY (`Roll_no`);

--
-- Indexes for table `year1semester2`
--
ALTER TABLE `year1semester2`
  ADD PRIMARY KEY (`Roll_no`);

--
-- Indexes for table `year2semester1`
--
ALTER TABLE `year2semester1`
  ADD PRIMARY KEY (`Roll_no`);

--
-- Indexes for table `year2semester2`
--
ALTER TABLE `year2semester2`
  ADD PRIMARY KEY (`Roll_no`);

--
-- Indexes for table `year3semester1`
--
ALTER TABLE `year3semester1`
  ADD PRIMARY KEY (`Roll_no`);

--
-- Indexes for table `year3semester2`
--
ALTER TABLE `year3semester2`
  ADD PRIMARY KEY (`Roll_no`);

--
-- Indexes for table `year4semester1`
--
ALTER TABLE `year4semester1`
  ADD PRIMARY KEY (`Roll_no`);

--
-- Indexes for table `year4semester2`
--
ALTER TABLE `year4semester2`
  ADD PRIMARY KEY (`Roll_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `curriculum`
--
ALTER TABLE `curriculum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `question_papers`
--
ALTER TABLE `question_papers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `faculties`
--
ALTER TABLE `faculties`
  ADD CONSTRAINT `faculties_ibfk_1` FOREIGN KEY (`facultyId`) REFERENCES `registration` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
