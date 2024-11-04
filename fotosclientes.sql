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
-- Estructura de tabla para la tabla `fotos_clientes`
--

CREATE TABLE `fotos_clientes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(100) NOT NULL,
    `ruta_imagen` VARCHAR(255) NOT NULL,
    `fecha_subida` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 
-- Volcado de datos para la tabla `fotos_clientes`
--

INSERT INTO `fotos_clientes` (`nombre`, `ruta_imagen`) VALUES ('Juan Pérez', '/uploads/juan_perez_foto.jpg');
INSERT INTO `fotos_clientes` (`nombre`, `ruta_imagen`) VALUES ('María García', '/uploads/maria_garcia_foto.jpg');
INSERT INTO `fotos_clientes` (`nombre`, `ruta_imagen`) VALUES ('Luis Martínez', '/uploads/luis_martinez_foto.jpg');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
