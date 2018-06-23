<?php
require_once 'function.php';
$db = getConnect();
$user_id = getUserInfo($db);

$q = mysqli_query($db, "SELECT * FROM user WHERE user.id = '$user_id';");

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