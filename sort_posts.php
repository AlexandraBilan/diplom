<?php
require_once 'function.php';
$db = getConnect();
$user_id = getUserInfo($db);
$type_id = $_POST['type_id'];
$type = $_POST['type'];
$table = $_POST['table'];
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
where '.$table.'.user_id = '.$user_id.' AND '.$type.'_id = '.$type_id.';');

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
