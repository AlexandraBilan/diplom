<?php
require_once 'function.php';
$db = getConnect();
$q = mysqli_query($db, 'SELECT name_tag FROM tag;');
$count = mysqli_num_rows($q);
for($i=0; $i < $count; $i++)
{
    $list[] = mysqli_fetch_row($q);
}
echo json_encode($list, JSON_UNESCAPED_UNICODE);
?>