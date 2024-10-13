-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 01 août 2024 à 00:12
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `alarmsystem`
--

-- --------------------------------------------------------

--
-- Structure de la table `alarmstatus`
--

CREATE TABLE `alarmstatus` (
  `id` int(11) NOT NULL,
  `statut` tinyint(1) DEFAULT NULL,
  `z1` tinyint(1) DEFAULT NULL,
  `z2` tinyint(1) DEFAULT NULL,
  `z3` tinyint(1) DEFAULT NULL,
  `z4` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `alarmstatus`
--

INSERT INTO `alarmstatus` (`id`, `statut`, `z1`, `z2`, `z3`, `z4`) VALUES
(1, 1, 0, 0, 0, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `alarmstatus`
--
ALTER TABLE `alarmstatus`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `alarmstatus`
--
ALTER TABLE `alarmstatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
