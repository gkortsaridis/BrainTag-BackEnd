-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 19, 2017 at 02:47 PM
-- Server version: 5.7.17-0ubuntu0.16.04.2
-- PHP Version: 7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `braintag`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Username`, `Password`, `Email`, `Score`) VALUES
(1, 'gkortsaridis', 'yokoo8332', 'gkortsaridis@gmail.com', 19);

-- --------------------------------------------------------

--
-- Table structure for table `wrong_answers`
--

CREATE TABLE `wrong_answers` (
  `CC` int(11) NOT NULL,
  `CD` int(11) NOT NULL,
  `DT` int(11) NOT NULL,
  `EX` int(11) NOT NULL,
  `FW` int(11) NOT NULL,
  `IN_` int(11) NOT NULL,
  `JJ` int(11) NOT NULL,
  `JJR` int(11) NOT NULL,
  `JJS` int(11) NOT NULL,
  `LS` int(11) NOT NULL,
  `MD` int(11) NOT NULL,
  `NN` int(11) NOT NULL,
  `NNS` int(11) NOT NULL,
  `NNP` int(11) NOT NULL,
  `NNPS` int(11) NOT NULL,
  `PDT` int(11) NOT NULL,
  `POS` int(11) NOT NULL,
  `PRP` int(11) NOT NULL,
  `PRP_` int(11) NOT NULL,
  `RB` int(11) NOT NULL,
  `RBR` int(11) NOT NULL,
  `RBS` int(11) NOT NULL,
  `RP` int(11) NOT NULL,
  `SYM` int(11) NOT NULL,
  `TO_` int(11) NOT NULL,
  `UH` int(11) NOT NULL,
  `VB` int(11) NOT NULL,
  `VBD` int(11) NOT NULL,
  `VBG` int(11) NOT NULL,
  `VBN` int(11) NOT NULL,
  `VBP` int(11) NOT NULL,
  `VBZ` int(11) NOT NULL,
  `WDT` int(11) NOT NULL,
  `WP` int(11) NOT NULL,
  `WP_` int(11) NOT NULL,
  `WRB` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wrong_answers`
--

INSERT INTO `wrong_answers` (`CC`, `CD`, `DT`, `EX`, `FW`, `IN_`, `JJ`, `JJR`, `JJS`, `LS`, `MD`, `NN`, `NNS`, `NNP`, `NNPS`, `PDT`, `POS`, `PRP`, `PRP_`, `RB`, `RBR`, `RBS`, `RP`, `SYM`, `TO_`, `UH`, `VB`, `VBD`, `VBG`, `VBN`, `VBP`, `VBZ`, `WDT`, `WP`, `WP_`, `WRB`) VALUES
(10, 5, 29, 0, 0, 29, 8, 1, 0, 0, 4, 39, 12, 2, 0, 0, 4, 7, 0, 3, 0, 0, 0, 0, 8, 0, 12, 2, 9, 4, 5, 9, 1, 1, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
