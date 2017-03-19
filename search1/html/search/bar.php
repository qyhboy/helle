

<?php
header("Content-Type: text/html; charset=gb2312");
include("admin/conn2.php");


$sql = 'SELECT * FROM machine where name="tt"';
 foreach ($conn->query($sql) as $row) {
       $arr['bar'] = $row['bar']."%"; 
	 $arr['lefttime'] = $row['lefttime'];  
    
 }
$sql2 = 'SELECT * FROM scan where id=1';
 foreach ($conn->query($sql2) as $row) {
       $arr['total'] = $row['total']; 
	 $arr['nmapnum'] = $row['nmapnum'];  
$arr['usetime'] = $row['usetime'];  
    
 }

$jsonStr = json_encode($arr);     
echo ($jsonStr);     
?>                                        



