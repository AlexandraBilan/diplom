<?php
require_once 'function.php';
$db = getConnect();
$user_id = getUserInfo($db);

if(isset($_POST['body_note']) && !empty($_POST['body_note']))
{
   
    $body_note = escape($_POST['body_note'], $db);
    $path = escape($_POST['path'], $db);
	$date = escape($_POST['date'], $db);
    $place = escape($_POST['place'], $db);
    $tag = escape($_POST['tag'], $db);
    $id = mysqli_insert_id($db);

    $query =  mysqli_query($db, "INSERT INTO note SET
          id   = '$id',
          body_note   = '$body_note',
          date = '$date',
          photo = '$path',
          tag_id = '$tag',
          place = '$place',
          user_id = '$user_id'
			");
}
else
{
    header("HTTP/1.1 400 Bad Request");
    echo "Впишите заголовок";
}
?>


