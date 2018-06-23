<?php
require_once 'function.php';
$db = getConnect();
$table = $_POST['table'];
$id = $_POST['id'];

$q = mysqli_query($db, 'UPDATE '.$table.' SET process_id = 2 WHERE task.id = '.$id.' ');

echo json_encode(array('result' => $q));
?>