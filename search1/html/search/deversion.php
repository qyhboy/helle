<?php
include("admin/conn2.php");
    $action = $_GET['action'];
	$name = $_GET['name'];
	  if ($action=='export') {
               $sql1='update machine set isrun=1 where name="all"';
		$conn->query($sql1);
	  	$sql="update newtime set isrun=4,deversion='$name'";
		$conn->query($sql);
	  $conn=null;
echo 1;
	  }
	?>
