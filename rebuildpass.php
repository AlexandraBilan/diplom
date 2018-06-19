<?php
require_once 'function.php';
$db = getConnect();

if(isset($_GET['mail'])) {
	$mail = escape($_GET['mail'], $db);
	$info = mysqli_query($db, "
		SELECT id FROM user
		WHERE mail = '$mail'
	");
	if(mysqli_num_rows($info) == 1) {
		$code = getHash(16);
		mysqli_query($db, "
			UPDATE user SET code = '$code'
			WHERE mail = '$mail'
		");
     $text_message = ('http://localhost/book_shop/rebuildpass.php?code=' . $code);
   mail($mail, $text_message);
//		file_put_contents($mail . '.txt',

	}
	else {
		render('about', [
			'errorText' => 'Нет пользователя с таким логином'
		]);
	}
}
else if(!isset($_GET['code'])) {
	render('startrebuild');
}
else if(isset($_GET['code']) && !isset($_POST['pass'])) {
	$code = escape($_GET['code'], $db);
	$info = mysqli_query($db, "
		SELECT id FROM user
		WHERE code = '$code'
	");
	if(mysqli_num_rows($info) == 1) {
		$id = mysqli_fetch_assoc($info);
		render('newpass', ['id' => $id['id']]);
	}
	else {
		render('startrebuild', [
			'errorText' => 'код не действителен'
		]);
	}
}
else if(isset($_POST['pass'])) {
	if($_POST['pass'] == $_POST['pass2']) {
		$id = (int)$_POST['id'];
		$pass = password_hash($_POST['pass'], PASSWORD_DEFAULT);
		mysqli_query($db, "
			UPDATE users SET pass = '$pass'
			WHERE id = $id
		");
		header('Location: index.php');
	}
	else {
		render('newpass', [
			'errorText' => 'пароли не одинаковые'
			]);
	}
}
