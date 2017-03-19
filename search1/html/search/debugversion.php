<?php
include("admin/conn2.php");
    $action = $_GET['action'];
	$bugname = $_GET['bugname'];
	$bugversion = $_GET['bugversion'];
	  if ($action=='export') {
	  	
	  	$sql="delete from bug where name='$bugname' and version='$bugversion'";
		  $rs=$conn->query($sql);
    while($row=$rs->fetch()){
    	//echo($row[1]);
    }
if($row[2]==0){
	$sql2="select count(*) from bug where name='$bugname'";
	$rs2=$conn->query($sql2);
$a=$rs2->fetch();
$cout=$a[0];
if($cout>0){echo ("1");}
	else if($cout==0){echo("2");}
}
else{
	echo("0");
}
	  }
	?>