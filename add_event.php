<?php
require_once 'function.php';
$db = getConnect();
$user_id = getUserInfo($db);

if(isset($_POST['event_name']) && !empty($_POST['event_name']))
{
        if(isset($_POST['date']) && !empty($_POST['date']))
        {
    $event_name = escape($_POST['event_name'], $db);
	$event_body = escape($_POST['event_body'], $db);
    $priority = escape($_POST['priority'], $db);
    $tag = escape($_POST['tag'], $db);
    $regularity = escape($_POST['regularity'], $db);
    $date = escape($_POST['date'], $db);
    $place = escape($_POST['place'], $db);
    $id = mysqli_insert_id($db);
                
          $query =  mysqli_query($db, "INSERT INTO event SET
          id   = '$id',
          name_event   = '$event_name',
          body_event   = '$event_body',
          tag_id   = '$tag',
          priority_id   = '$priority',
          regularity_id = '$regularity',
          date = '$date',
          place = '$place',
          user_id = '$user_id'
			");
        }
    else{ header("HTTP/1.1 400 Bad Request");
    echo "Впишите дату";}
}
else
{
    header("HTTP/1.1 400 Bad Request");
    echo "Впишите заголовок";
}
?>