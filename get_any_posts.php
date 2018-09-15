<?php
require_once 'function.php';
$db = getConnect();
$user_id = getUserInfo($db);
$table = $_POST['table'];
//var_dump($table);
if($table=='task' || $table=='event')
{
	$defining_the_graph = '';
	
    if($table=='task'){
        $defining_the_graph = 'time';
    }
    elseif($table=='event'){
        $defining_the_graph = 'place';
    }
    $q = mysqli_query($db, 'SELECT '.$table.'.id, name_'.$table.', body_'.$table.', name_regularity, name_priority, name_tag, date, '.$defining_the_graph.', process_id FROM '.$table.' 
LEFT JOIN regularity ON regularity_id = id_regularity
LEFT JOIN priority ON priority_id = id_priority
LEFT JOIN tag ON tag_id = tag.id 
where '.$table.'.user_id = '.$user_id.';');
}
elseif($table=='note')
{
    $q = mysqli_query($db, 'SELECT note.id, body_note, date, photo, place, name_tag FROM note
LEFT JOIN tag ON tag_id = tag.id 
LEFT JOIN user ON note.user_id=user.id
WHERE user.id = '.$user_id.';');
}

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
