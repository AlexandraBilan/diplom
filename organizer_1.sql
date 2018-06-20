-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 20 2018 г., 17:41
-- Версия сервера: 10.1.30-MariaDB
-- Версия PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `organizer`
--

-- --------------------------------------------------------

--
-- Структура таблицы `connect`
--

CREATE TABLE `connect` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `session` varchar(100) COLLATE utf8_bin NOT NULL,
  `token` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `connect`
--

INSERT INTO `connect` (`user_id`, `session`, `token`) VALUES
(9, '2plf0lsa7j4q6ktsu6v7o9cd10', 'om8dcuu9d6mes8cq2qn98012y0uivpat'),
(10, '29khovnhjrouqa9k5bn0a2kuu0', '717xlozjjmp4not64zkh72htprgiznie');

-- --------------------------------------------------------

--
-- Структура таблицы `event`
--

CREATE TABLE `event` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_event` varchar(255) COLLATE utf8_bin NOT NULL,
  `body_event` varchar(255) COLLATE utf8_bin NOT NULL,
  `place` varchar(100) COLLATE utf8_bin NOT NULL,
  `date` date NOT NULL,
  `regularity_id` int(10) UNSIGNED DEFAULT NULL,
  `tag_id` int(10) UNSIGNED DEFAULT NULL,
  `priority_id` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `event`
--

INSERT INTO `event` (`id`, `name_event`, `body_event`, `place`, `date`, `regularity_id`, `tag_id`, `priority_id`, `user_id`) VALUES
(2, 'Первое событие', 'ляля', 'Рио-де-Жанейро', '2018-06-18', 1, 2, 1, 9),
(3, 'Второе', 'Проверка', 'Отель \"Плаза\"', '2018-06-20', 4, 2, 3, 9);

-- --------------------------------------------------------

--
-- Структура таблицы `priority`
--

CREATE TABLE `priority` (
  `id_priority` int(10) UNSIGNED NOT NULL,
  `name_priority` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `priority`
--

INSERT INTO `priority` (`id_priority`, `name_priority`) VALUES
(1, 'Низкий'),
(2, 'Средний'),
(3, 'Высокий');

-- --------------------------------------------------------

--
-- Структура таблицы `regularity`
--

CREATE TABLE `regularity` (
  `id_regularity` int(10) UNSIGNED NOT NULL,
  `name_regularity` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `regularity`
--

INSERT INTO `regularity` (`id_regularity`, `name_regularity`) VALUES
(1, 'одноразово'),
(2, 'каждый день'),
(3, 'каждую неделю'),
(4, 'каждый месяц'),
(5, 'каждый год');

-- --------------------------------------------------------

--
-- Структура таблицы `tag`
--

CREATE TABLE `tag` (
  `id_tag` int(10) UNSIGNED NOT NULL,
  `name_tag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tag`
--

INSERT INTO `tag` (`id_tag`, `name_tag`) VALUES
(1, 'Проверка'),
(2, 'Важно'),
(3, 'Example'),
(4, 'cvcvcvcvc'),
(7, 'пятый инкремент');

-- --------------------------------------------------------

--
-- Структура таблицы `task`
--

CREATE TABLE `task` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_task` varchar(255) NOT NULL,
  `priority_id` int(10) UNSIGNED NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `body_task` varchar(255) DEFAULT NULL,
  `regularity_id` int(10) UNSIGNED NOT NULL,
  `tag_id` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `task`
--

INSERT INTO `task` (`id`, `name_task`, `priority_id`, `date`, `time`, `body_task`, `regularity_id`, `tag_id`, `user_id`) VALUES
(6, 'asass', 1, '2018-06-12', '08:08:00', 'dfdfdfdf', 1, NULL, NULL),
(7, 'asass', 1, '2018-06-12', '08:08:00', 'dfdfdfdf', 1, NULL, NULL),
(9, 'С юзверем', 1, '2018-06-01', '11:11:00', 'Работай!!!!!!!', 1, NULL, 9),
(10, 'Перепровека', 1, '2018-06-13', '12:12:00', 'лалалалала', 1, NULL, 9),
(11, 'С другого юзверя', 3, '2018-06-23', '11:11:00', '', 4, NULL, 10),
(12, 'лрывпоравп', 1, '2018-06-13', '11:11:00', 'рвоарпоа', 1, NULL, 10),
(13, 'Через другой браузер', 1, '2018-06-18', '12:43:00', '', 1, 2, 9),
(14, 'Через другой браузер', 1, '2018-06-18', '12:43:00', '', 1, 2, 9),
(15, 'Низкий приоритет', 1, '2018-06-19', '11:11:00', '', 1, 1, 9),
(16, 'Средний приоритет', 2, '2018-06-19', '11:11:00', '', 1, 1, 9),
(17, 'Высокий приоритет', 3, '2018-06-19', '11:11:00', '', 1, 1, 9),
(18, 'fhfh', 1, '2018-06-21', '11:21:00', '', 1, 1, 9),
(19, 'Проверка на просроченность', 1, '2018-06-20', '11:11:00', 'вчава', 5, 1, 9);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `login` varchar(100) COLLATE utf8_bin NOT NULL,
  `mail` varchar(100) COLLATE utf8_bin NOT NULL,
  `pass` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `login`, `mail`, `pass`) VALUES
(1, 'aaaaa', 'kakak', '$2y$10$1rGqJlmla9kWl/XPi0hqaufP.PjLi31QK5frUbB2bpYr24OFeg4ye'),
(2, 'qqq', 'qqqqq', '$2y$10$BKI.pPpaD/QgUPliaInrUu44RJWZ3AGl6Hc0B39mLJc4ZggX5DHbW'),
(3, '', 'mail', '$2y$10$qiLpbIXEBRkkOOUa9cMZyuywggDBdR/waP/a.4yzyF28LUpvRCnzS'),
(5, 'dsds', 'dsdsd', '$2y$10$pGuw5XtsDWtISY7zdbb9/uHy0EQBHaUhaUdV1oYb/2.RJSAGRpEL.'),
(7, 'aqaq', 'aqaq', '$2y$10$QnLXPtVm/Eogz0bRLgAYl.945J6GZvfLwu423Kpz7gknM2bUkDVra'),
(8, 'aaaaaaaaa', 'mail1', '$2y$10$omX.dqohP1.l8wLY9cEJuuK3GCucB/iUxy9OtXZjg5qvZCZ.wY9Ry'),
(9, 'sandra', 'sandra', '$2y$10$9AORA1CfyZZw6segzj3oZOoFSdFm56uEt/B48BxQwsm0s5o/HIkK2'),
(10, 'bilan', 'bilan', '$2y$10$fK37EIv4XWVGpjRDUJKfbeZfGsTPbEt9HaoaM0cBW5XlMSa3ndCWq'),
(11, 'izual', 'mikhail.betaev@quest.com', '$2y$10$OI0rvvNxd4aNdNFtlohqI.jTeF.oAbqpoSyFOkNBe7ACLhDDyHEy6'),
(12, 'sasha', 'sasha', '$2y$10$XUA4gjF1xjKS2SHzN.ghU.87JzHfR.4D8QCXvfO92hHwleE0fcnRS');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `connect`
--
ALTER TABLE `connect`
  ADD PRIMARY KEY (`user_id`);

--
-- Индексы таблицы `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `regularity_id` (`regularity_id`),
  ADD KEY `tag_id` (`tag_id`),
  ADD KEY `priority_id` (`priority_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `priority`
--
ALTER TABLE `priority`
  ADD PRIMARY KEY (`id_priority`);

--
-- Индексы таблицы `regularity`
--
ALTER TABLE `regularity`
  ADD PRIMARY KEY (`id_regularity`);

--
-- Индексы таблицы `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id_tag`);

--
-- Индексы таблицы `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `priority_id` (`priority_id`),
  ADD KEY `regularity_id` (`regularity_id`),
  ADD KEY `tag_id` (`tag_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `connect`
--
ALTER TABLE `connect`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `event`
--
ALTER TABLE `event`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `priority`
--
ALTER TABLE `priority`
  MODIFY `id_priority` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `regularity`
--
ALTER TABLE `regularity`
  MODIFY `id_regularity` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `tag`
--
ALTER TABLE `tag`
  MODIFY `id_tag` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `task`
--
ALTER TABLE `task`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `connect`
--
ALTER TABLE `connect`
  ADD CONSTRAINT `connect_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `event_ibfk_2` FOREIGN KEY (`regularity_id`) REFERENCES `regularity` (`id_regularity`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `event_ibfk_3` FOREIGN KEY (`priority_id`) REFERENCES `priority` (`id_priority`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `event_ibfk_4` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id_tag`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_ibfk_6` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id_tag`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_ibfk_7` FOREIGN KEY (`priority_id`) REFERENCES `priority` (`id_priority`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_ibfk_8` FOREIGN KEY (`regularity_id`) REFERENCES `regularity` (`id_regularity`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
