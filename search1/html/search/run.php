<?php
header("Content-Type: text/html; charset=gb2312");
include("admin/conn2.php");
 
    $sql = 'SELECT * FROM machine where name="all" ';
	$rs=$conn->query($sql);
    while($row=$rs->fetch()){
    	echo($row[2]);
    }
     
	 //echo("ddd");
?>
