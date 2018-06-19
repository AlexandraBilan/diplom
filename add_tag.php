<?php
require_once 'function.php';
$db = getConnect();
if(isset($_POST['tag']) && !empty($_POST['tag']))
{
    $tag = escape($_POST['tag'], $db);
    $id = mysqli_insert_id($db);
     $query =  mysqli_query($db, "INSERT INTO tag SET
          id_tag   = '$id',
          name_tag   = '$tag'
			");
}
//
//$q = mysqli_query($db, 'SELECT name_tag FROM tag;');
//$count = mysqli_num_rows($q);
//for($i=0; $i < $count; $i++)
//{
//    $list[] = mysqli_fetch_assoc($q);
//}
//echo json_encode($list, JSON_UNESCAPED_UNICODE);

?>