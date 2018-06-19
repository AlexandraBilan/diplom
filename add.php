<?php
require_once 'function.php';
$db = getConnect();
$user_id = getUserInfo($db);
if(isset($_POST['task_name']) && !empty($_POST['task_name']))
{
        if(isset($_POST['date']) && !empty($_POST['date']))
        {
            if(isset($_POST['time']) && !empty($_POST['time']))
            {
    $task_name = escape($_POST['task_name'], $db);
	$task_body = escape($_POST['task_body'], $db);
    $priority = escape($_POST['priority'], $db);
    $tag = escape($_POST['tag'], $db);
    $regularity = escape($_POST['regularity'], $db);
    $date = escape($_POST['date'], $db);
    $time = escape($_POST['time'], $db);
    $id = mysqli_insert_id($db);
                
          $query =  mysqli_query($db, "INSERT INTO task SET
          id   = '$id',
          name_task   = '$task_name',
          body_task   = '$task_body',
          tag_id   = '$tag',
          priority_id   = '$priority',
          regularity_id = '$regularity',
          date = '$date',
          time = '$time',
          user_id = '$user_id'
			");
                var_dump($query);
            }
            else{header("HTTP/1.1 400 Bad Request");
    echo "Впишите время";}
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