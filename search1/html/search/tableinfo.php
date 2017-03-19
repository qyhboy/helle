<?php

header("Content-Type: text/html; charset=gb2312");

$page = intval($_POST['pageNum']);   

include("admin/conn2.php");
$sql1="SELECT count(id) FROM nmap_tableinfo";
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
//version show
$sql="select version from newtime";
	$rs=$conn->query($sql);
$a=$rs->fetch();
$arr['nowversion'] =$a[0];

//nmaptableinfo 
$query = "select * from nmap_tableinfo limit $startPage,$pageSize";

foreach ($conn->query($query) as $row) {
$pieces = explode(" ", $row['name']); 
	$sql="select max(id) from $pieces[0]";
	$rs=$conn->query($sql);
$a=$rs->fetch();

       $arr['list'][] = array(   
'name' => $row['name'],   
'date' => $row['date'],    
'total'=> $a[0],
); 
    
 }

$jsonStr = json_encode($arr);     
echo ($jsonStr);     
  
   

?>
