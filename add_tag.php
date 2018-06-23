<?php
require_once 'function.php';
$db = getConnect();
$user_id = getUserInfo($db);

if(isset($_POST['tag']) && !empty($_POST['tag']))
{
    $tag = escape($_POST['tag'], $db);
    $id = mysqli_insert_id($db);
    $query =  mysqli_query($db, "INSERT INTO tag SET
          id   = '$id',
          name_tag   = '$tag',
          user_id = '$user_id'
			");
}
?>