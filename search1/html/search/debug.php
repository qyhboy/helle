<?php
include("admin/conn2.php");
    $action = $_GET['action'];
	$bugname = $_GET['bugname'];
	  if ($action=='export') {
	  	$sql="delete from bug where name='$bugname'";
		  $rs=$conn->query($sql);
  echo ("true");
	  }
	?>
