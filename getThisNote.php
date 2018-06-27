<?php
require_once 'function.php';
$db = getConnect();
$user_id = getUserInfo($db);
$id = $_POST['id'];

$q = mysqli_query($db, "SELECT note.id, body_note, name_tag, date, place, photo FROM note 
LEFT JOIN tag ON tag_id = tag.id 
where note.user_id = '$user_id' AND note.id = '$id';");

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