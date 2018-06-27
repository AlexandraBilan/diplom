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
    if(preg_match_all('/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u', $mail))
    {
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
                header('Location: index.php');
                echo "<div class='error'>Этот логин занят. Пожалуйста, придумайте другой!</>";
		}
		}
		else {
			header('Location: index.php');
            echo "<div class='error'>Такой e-mail уже используется.</div>";
		}
	}
	else {
	    header('Location: index.php');
        echo "<div class='error'>Ваши пароли не совпали. Пожалуйста, попробуйте еще раз!</div>";
	}
}
    else
    {
        
        echo "<div class='error'>Ваш e-mail введен некорректно.</div>";
    }
}