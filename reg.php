<?php
require_once 'function.php';
$db = getConnect();

if(!empty($_SESSION) AND isset($_SESSION['token'])) {
	header('Location: index.php');
}

if(empty($_POST)) {
	render('about');
}
else {
	$mail = escape($_POST['mail'], $db);
	$login = escape($_POST['login'], $db);
	$pass = escape($_POST['pass'], $db);
	$pass2 = escape($_POST['pass2'], $db);

	if($pass == $pass2) {
		$count = mysqli_query($db, "
			SELECT id FROM user
			WHERE mail = '$mail'
		");
        $count2 = mysqli_query($db, "
			SELECT id FROM user
			WHERE login = '$login'
		");
		if(mysqli_num_rows($count) == 0) {
            if(mysqli_num_rows($count2) == 0)
            {
                $pass = password_hash($pass, PASSWORD_DEFAULT);
			mysqli_query($db, "
				INSERT INTO user SET
				login = '$login',
				pass = '$pass',
				mail = '$mail'
			");
			$id = mysqli_insert_id($db);
			$session = $_COOKIE['PHPSESSID'];
			$token = getHash();
			mysqli_query($db, "
				INSERT INTO connect SET
				user_id = $id,
				session = '$session',
				token = '$token'
			");
			$_SESSION['token'] = $token;
			header('Location: index.php');
            }
			else {
			render('about', ['errorText' => 'Такой логин уже используется!!!']);
                
		}
		}
		else {
			render('about', ['errorText' => 'Такой mail уже используется!!!']);
		}
	}
	else {
		render('about', ['errorText' => 'Пароли не совпадают!!!']);
	}
}