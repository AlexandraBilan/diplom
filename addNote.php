<?php
require_once 'function.php';
//$db = getConnect();
//$user_id = getUserInfo($db);
    $photo = $_FILES['file'];
    $path = "css/img/".$photo["name"];
    move_uploaded_file($photo["tmp_name"], $path);
    echo $path;
?>


