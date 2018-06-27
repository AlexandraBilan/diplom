<?php
require_once 'function.php';
$db = getConnect();
$user_id = getUserInfo($db);

$login = escape($_POST['login'], $db);
$mail = escape($_POST['mail'], $db);
$phone = escape($_POST['phone'], $db);
$user_name = escape($_POST['user_name'], $db);
$user_surname = escape($_POST['user_surname'], $db);

          $query =  mysqli_query($db, "UPDATE user SET
          login   = '$login',
          mail   = '$mail',
          phone   = '$phone',
          user_name   = '$user_name',
          user_surname = '$user_surname'
          WHERE user.id = '$user_id'
			");

//echo json_encode(array('result' => $query));
if(var_dump($query) == true)
{
    echo '0';
}
else
{
    echo '1';
}
?>