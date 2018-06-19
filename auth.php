<?php
require "function.php";
$db = getConnect();

if(!empty($_SESSION) AND isset($_SESSION['token'])) {
	header('Location: index.php');
}

if(empty($_POST)) {
	render('about');
}
else {
	$mail = escape($_POST['mail-auth'], $db);
	$pass = escape($_POST['pass-auth'], $db);

	$count = mysqli_query($db, '
		SELECT id, pass FROM user
		WHERE mail = "' . $mail . '";
	');
	if(mysqli_num_rows($count) == 0) {
		render('about', ['text' => 'Такого пользователя не существует']);
	}
	else if(mysqli_num_rows($count) == 1) {
		$info = mysqli_fetch_assoc($count);
		if(!password_verify($pass, $info['pass'])) {
			render('about', ['text' => 'Неверный пароль!']);
		} 
		else {
			$session = $_COOKIE['PHPSESSID'];
			$token = getHash();
			mysqli_query($db,'
				DELETE FROM connect 
				WHERE user_id = ' . $info['id'] . ';
			');
			mysqli_query($db,'
				INSERT INTO connect SET
				user_id = ' . $info['id'] . ',
				session = "' . $session . '",
				token = "' . $token . '";
			');
			$_SESSION['token'] = $token;
			header('Location: index.php');
		}
	}
}