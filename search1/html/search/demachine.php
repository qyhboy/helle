<?php
include("admin/conn2.php");
    $action = $_POST['action'];
	$bugname = $_POST['bugname'];
	  if ($action=='export') {
	  	$sql="delete from dis_machine where id=$bugname";
		  $conn->query($sql);

	echo ("true");

	  }
	?>
