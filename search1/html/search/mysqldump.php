<?php

header("Content-Type: text/html; charset=gb2312");
include("admin/conn2.php");

  $sql1='update machine set isrun=1 where name="all"';
		$conn->query($sql1);
$sql2="update newtime set isrun=3";
$conn->query($sql2);
$conn='';
echo 1;
?>
