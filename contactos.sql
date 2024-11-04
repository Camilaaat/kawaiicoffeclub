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
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `telefono` VARCHAR(20) NOT NULL,
    `asunto` ENUM('consulta', 'reserva', 'sugerencia', 'otro') NOT NULL,
    `mensaje` TEXT NOT NULL,
    `preferencia_contacto` ENUM('correo', 'llamada') NOT NULL,
    `acepto_promociones` BOOLEAN NOT NULL,
    `fecha_contacto` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`nombre`, `email`, `telefono`, `asunto`, `mensaje`, `preferencia_contacto`, `acepto_promociones`) VALUES
('Ana Pérez', 'ana.perez@example.com', '555-1234', 'consulta', 'Quisiera saber si tienen café descafeinado disponible.', 'correo', TRUE),
('Luis González', 'luis.gonzalez@example.com', '555-5678', 'reserva', 'Me gustaría reservar una mesa para el sábado.', 'llamada', TRUE),
('María López', 'maria.lopez@example.com', '555-8765', 'sugerencia', 'Me gustaría sugerir un nuevo sabor de pastel.', 'correo', FALSE),
('Carlos Ruiz', 'carlos.ruiz@example.com', '555-4321', 'otro', 'Tengo una pregunta sobre el envío de productos.', 'llamada', TRUE),
('Laura Martínez', 'laura.martinez@example.com', '555-9876', 'consulta', '¿Tienen opciones veganas en el menú?', 'correo', FALSE);

-- 
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contactos`
--

ALTER TABLE `contactos`
  ADD UNIQUE KEY `email` (`email`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
