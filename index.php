<?php
require_once 'function.php';
$db = getConnect();
$user = checkUser($db);

//render('about', ['user' => $user]);
if($user){
	render('main', [
		'auth' => true
	]);
    
} else {
	render('about', [
		'auth' => false
	]);
}