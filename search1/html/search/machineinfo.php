<?php

header("Content-Type: text/html; charset=gb2312");

$page = intval($_POST['pageNum']);   

include("admin/conn2.php");
$sql1="SELECT count(id) FROM dis_machine";
$rs=$conn->query($sql1);
$a=$rs->fetch();
$count=$a[0];
 $total = $a[0];
   $pageSize = 6; //每页显示数   
   $totalPage = ceil($total/$pageSize); //总页数  
$startPage = $page*$pageSize;   
$arr['total'] = $total;   
$arr['pageSize'] = $pageSize;   
$arr['totalPage'] = $totalPage;   
$query = "select * from dis_machine limit $startPage,$pageSize";

foreach ($conn->query($query) as $row) {
       $arr['list'][] = array(   
'id' => $row['id'],   
 'isrun' => $row['isrun'],   
'state' => $row['state'],   
); 
    
 }

$jsonStr = json_encode($arr);     
echo ($jsonStr);     
  
   

?>
