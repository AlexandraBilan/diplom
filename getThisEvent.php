<?php
require_once 'function.php';
$db = getConnect();
$user_id = getUserInfo($db);
$id = $_POST['id'];

$q = mysqli_query($db, "SELECT event.id, name_event, body_event, name_regularity, name_priority, name_tag, date, place, process_id FROM event 
LEFT JOIN regularity ON regularity_id = id_regularity
LEFT JOIN priority ON priority_id = id_priority
LEFT JOIN tag ON tag_id = tag.id 
where event.user_id = '$user_id' AND event.id = '$id';");

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
?>