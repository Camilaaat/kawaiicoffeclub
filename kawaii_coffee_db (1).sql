-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-11-2024 a las 04:53:52
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
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `asunto` enum('consulta','reserva','sugerencia','otro') NOT NULL,
  `mensaje` text NOT NULL,
  `preferencia_contacto` enum('correo','llamada') NOT NULL,
  `acepto_promociones` tinyint(1) NOT NULL,
  `fecha_contacto` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id`, `nombre`, `email`, `telefono`, `asunto`, `mensaje`, `preferencia_contacto`, `acepto_promociones`, `fecha_contacto`) VALUES
(1, 'Ana Pérez', 'ana.perez@example.com', '555-1234', 'consulta', 'Quisiera saber si tienen café descafeinado disponible.', 'correo', 1, '2024-11-04 01:48:12'),
(2, 'Luis González', 'luis.gonzalez@example.com', '555-5678', 'reserva', 'Me gustaría reservar una mesa para el sábado.', 'llamada', 1, '2024-11-04 01:48:12'),
(3, 'María López', 'maria.lopez@example.com', '555-8765', 'sugerencia', 'Me gustaría sugerir un nuevo sabor de pastel.', 'correo', 0, '2024-11-04 01:48:12'),
(4, 'Carlos Ruiz', 'carlos.ruiz@example.com', '555-4321', 'otro', 'Tengo una pregunta sobre el envío de productos.', 'llamada', 1, '2024-11-04 01:48:12'),
(5, 'Laura Martínez', 'laura.martinez@example.com', '555-9876', 'consulta', '¿Tienen opciones veganas en el menú?', 'correo', 0, '2024-11-04 01:48:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotosclientes`
--

CREATE TABLE `fotosclientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `ruta_imagen` varchar(255) NOT NULL,
  `fecha_subida` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `fotosclientes`
--

INSERT INTO `fotosclientes` (`id`, `nombre`, `ruta_imagen`, `fecha_subida`) VALUES
(1, 'Juan Pérez', '/uploads/juan_perez_foto.jpg', '2024-11-04 02:12:57'),
(2, 'María García', '/uploads/maria_garcia_foto.jpg', '2024-11-04 02:12:57'),
(3, 'Luis Martínez', '/uploads/luis_martinez_foto.jpg', '2024-11-04 02:12:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `intereses`
--

CREATE TABLE `intereses` (
  `id` int(11) NOT NULL,
  `suscriptor_id` int(11) NOT NULL,
  `interes` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `intereses`
--

INSERT INTO `intereses` (`id`, `suscriptor_id`, `interes`) VALUES
(1, 1, 'descuentos'),
(2, 2, 'eventos'),
(3, 3, 'recetas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscriptores`
--

CREATE TABLE `suscriptores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `acepto_promociones` tinyint(1) NOT NULL,
  `acepto_terminos` tinyint(1) NOT NULL,
  `fecha_suscripcion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `suscriptores`
--

INSERT INTO `suscriptores` (`id`, `nombre`, `email`, `fecha_nacimiento`, `acepto_promociones`, `acepto_terminos`, `fecha_suscripcion`) VALUES
(1, 'Juan Pérez', 'juan.perez@example.com', '1990-01-15', 1, 1, '2024-11-04 01:52:30'),
(2, 'María López', 'maria.lopez@example.com', '1985-06-25', 0, 1, '2024-11-04 01:52:30'),
(3, 'Carlos García', 'carlos.garcia@example.com', '1995-12-10', 1, 1, '2024-11-04 01:52:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `tarea` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `tarea`) VALUES
(1, 'Comprar alimentos'),
(2, 'Limpiar salon'),
(3, 'Cerrar caja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `contraseña`) VALUES
(1, 'Juan Pérez', 'juan.perez@example.com', '123456'),
(2, 'María Gómez', 'maria.gomez@example.com', 'mariapass'),
(3, 'Carlos Ramírez', 'carlos.ramirez@example.com', 'carlos123'),
(4, 'Ana Fernández', 'ana.fernandez@example.com', 'ana456'),
(5, 'Luis López', 'luis.lopez@example.com', 'luispass');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `fotosclientes`
--
ALTER TABLE `fotosclientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `intereses`
--
ALTER TABLE `intereses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `suscriptor_id` (`suscriptor_id`);

--
-- Indices de la tabla `suscriptores`
--
ALTER TABLE `suscriptores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `fotosclientes`
--
ALTER TABLE `fotosclientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `intereses`
--
ALTER TABLE `intereses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `suscriptores`
--
ALTER TABLE `suscriptores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `intereses`
--
ALTER TABLE `intereses`
  ADD CONSTRAINT `intereses_ibfk_1` FOREIGN KEY (`suscriptor_id`) REFERENCES `suscriptores` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
