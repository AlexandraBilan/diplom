<?php
require_once 'function.php';
$db = getConnect();
$user_id = getUserInfo($db);

$oldPass = escape($_POST['pass'], $db);
$pass = escape($_POST['new_pass'], $db);
$pass2 = escape($_POST['new_pass'], $db);

$q = mysqli_query($db, "SELECT pass FROM user WHERE user.id = '$user_id'");
if(mysqli_num_rows($q) == 1)
{
        $info = mysqli_fetch_assoc($q);
		if(!password_verify($oldPass, $info['pass'])) 
        {
			echo json_encode(array('result' => 'Текущий пароль введен не верно.'), JSON_UNESCAPED_UNICODE);
		} 
        else
        {
            if($pass!=$pass2)
            {
                echo json_encode(array('result' => 'Пароли не совпали.'), JSON_UNESCAPED_UNICODE);
            }
            else
            {
            $pass = password_hash($_POST['new_pass'], PASSWORD_DEFAULT);
		    mysqli_query($db, "UPDATE user SET pass = '$pass'
			WHERE user.id = '$user_id'");
            echo json_encode(array('result' => 'Поменяли'), JSON_UNESCAPED_UNICODE);
            }
        }
}

?>