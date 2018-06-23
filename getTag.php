<?php
require_once 'function.php';
$db = getConnect();
$user_id = getUserInfo($db);

$q = mysqli_query($db, 'SELECT tag.id, name_tag, tag.user_id FROM tag
LEFT JOIN user ON tag.user_id=user.id
WHERE user.id = '.$user_id.';');

$count = mysqli_num_rows($q);
for($i=0; $i < $count; $i++)
{
    $list[] = mysqli_fetch_assoc($q);
}

echo json_encode($list, JSON_UNESCAPED_UNICODE);
?>