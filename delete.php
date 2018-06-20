<?php
require_once 'function.php';
$db = getConnect();
$table = $_POST['table'];
$id = $_POST['id'];

$q = mysqli_query($db, "DELETE FROM '$table' WHERE task.id = '$id';");


header("HTTP/1.1 200 Ok");

?>