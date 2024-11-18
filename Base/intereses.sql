-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-10-2024 a las 03:12:04
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `kawaii_coffee_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `intereses`
--

CREATE TABLE `intereses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `suscriptor_id` INT NOT NULL,
    `interes` VARCHAR(50) NOT NULL,
    FOREIGN KEY (`suscriptor_id`) REFERENCES `suscriptores`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 
-- Volcado de datos para la tabla `intereses`
--

INSERT INTO `intereses` (`suscriptor_id`, `interes`) VALUES
(1, 'descuentos'),
(2, 'eventos'),
(3, 'recetas');

-- 
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `intereses`
--

ALTER TABLE `intereses`
  ADD FOREIGN KEY (`suscriptor_id`) REFERENCES `suscriptores`(`id`) ON DELETE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
