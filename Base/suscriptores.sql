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
-- Estructura de tabla para la tabla `suscriptores`
--

CREATE TABLE `suscriptores` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `fecha_nacimiento` DATE NOT NULL,
    `acepto_promociones` BOOLEAN NOT NULL,
    `acepto_terminos` BOOLEAN NOT NULL,
    `fecha_suscripcion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 
-- Volcado de datos para la tabla `suscriptores`
--

INSERT INTO `suscriptores` (`nombre`, `email`, `fecha_nacimiento`, `acepto_promociones`, `acepto_terminos`) VALUES
('Juan Pérez', 'juan.perez@example.com', '1990-01-15', TRUE, TRUE),
('María López', 'maria.lopez@example.com', '1985-06-25', FALSE, TRUE),
('Carlos García', 'carlos.garcia@example.com', '1995-12-10', TRUE, TRUE);

-- 
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `suscriptores`
--

ALTER TABLE `suscriptores`
  ADD UNIQUE KEY `email` (`email`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
