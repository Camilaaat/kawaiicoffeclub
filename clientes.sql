-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-10-2024 a las 03:12:04
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
-- Base de datos: `kawaii_coffee_db`
-- --------------------------------------------------------

-- Estructura de tabla para la tabla `clientes`

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `preferencia_contacto` enum('Correo', 'Telefono') NOT NULL,
  `acepta_promociones` enum('Si', 'No') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcado de datos para la tabla `clientes`

INSERT INTO `clientes` (`id_cliente`, `nombre_completo`, `correo_electronico`, `telefono`, `preferencia_contacto`, `acepta_promociones`) VALUES
(1, 'Juan Perez', 'juan.perez@example.com', '555-1234', 'Correo', 'Si'),
(2, 'Maria Gomez', 'maria.gomez@example.com', '555-5678', 'Telefono', 'No');

-- Índices para la tabla `clientes`

ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

-- AUTO_INCREMENT para la tabla `clientes`

ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
