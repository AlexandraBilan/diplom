<?php
require_once 'function.php';
$db = getConnect();
$table = $_POST['table'];
$id = $_POST['id'];

$q = mysqli_query($db, 'DELETE FROM '.$table.' WHERE '.$table.'.id = '.$id.';');

echo json_encode(array('result' => $q));

?>