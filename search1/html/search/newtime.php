<?php

header("Content-Type: text/html; charset=gb2312");
include("admin/conn2.php");

$query = "SELECT CONCAT( 'drop table ', table_name ) AS mutiply_delete_sql FROM information_schema.tables WHERE table_name LIKE 'zmap%'";

foreach ($conn->query($query) as $row) {
       
$conn->query($row['mutiply_delete_sql']);
   
 }
  $sql1='update machine set isrun=1 where name="all"';
		$conn->query($sql1);
$sql2="update newtime set isrun=1";
$conn->query($sql2);
$conn='';
echo 1;
?>
