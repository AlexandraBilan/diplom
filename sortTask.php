<?php
require_once 'function.php';
$db = getConnect();
$user_id = getUserInfo($db);
$send_priority_name = $_POST['send_name'];
$type = $_POST['type'];

$q = mysqli_query($db, 'SELECT task.id, name_task, body_task, name_regularity, name_priority, name_tag, date, time FROM task 
LEFT JOIN regularity ON regularity_id = id_regularity
LEFT JOIN priority ON priority_id = id_priority
LEFT JOIN tag ON tag_id = tag.id 
where user_id = '.$user_id.' AND '.$type.'_id = '.$send_priority_name.';');

$count = mysqli_num_rows($q);
if($count != 0)
{
for($i=0; $i < $count; $i++)
{
    $list[] = mysqli_fetch_assoc($q);
}
echo json_encode($list, JSON_UNESCAPED_UNICODE);
}
else
{
    echo '0';
}
//echo json_encode(array('type' => $type));

?>