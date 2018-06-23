<?php
session_start();

function render($page, $data=[]) {
	extract($data);
	$page.= '.html';
	if(file_exists('templates/'.$page)) {
		include_once 'templates/'.$page;
	}
}

function getConnect() {
	$db = mysqli_connect('localhost', 'root', '', 'organizer');
	mysqli_set_charset($db, 'utf8');
	return $db;
}

function escape($text, $db) {
	return mysqli_real_escape_string($db, $text);
}

function getHash($size = 32) {
	$str = 'abcdefghijklmnopqrstuvwxyz1234567890';
	$hash = '';
	for($i=0; $i<$size; $i++) {
		$hash.= $str[rand(0, 35)];
	}
	return $hash;
}

function checkUser($db) {
	if(!empty($_SESSION) AND isset($_SESSION['token'])) {
		$session = $_COOKIE['PHPSESSID'];
		$token = $_SESSION['token'];

		$info = mysqli_query($db, "
			SELECT * FROM connect
			LEFT JOIN user ON user.id = user_id
			WHERE session = '$session'
		");
        
		if(mysqli_num_rows($info) == 1) {
			$user = mysqli_fetch_assoc($info);
			if($user['token'] != $token) {
				mysqli_query($db, "
					DELETE FROM connect
					WHERE session = '$session'
				");
				unset($_SESSION['token']);
				$user = false;
			}
		}
		else {
			unset($_SESSION['token']);
			$user = false;
		}

	}
	else {
		$user = false;
	}
	return $user;
}

function getUserInfo($db)
{
    $session = $_COOKIE['PHPSESSID'];
    $q = mysqli_query($db, "
			SELECT user.id FROM connect
			LEFT JOIN user ON user.id = user_id
			WHERE session = '$session'");
    $userInfo = mysqli_fetch_row($q);
    $user_id = $userInfo[0];
    return $user_id;
}