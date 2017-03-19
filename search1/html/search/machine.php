<?php
header("Content-Type: text/html; charset=gb2312");
$name=$_POST['machineinfo'];
$blnLogin=FALSE;
include("admin/conn2.php");
if($name!=null){
	$sql="INSERT INTO dis_machine (id,isrun,state) values ('$name',0,'good')";
	
    $rs=$conn->query($sql);
	 if($rs==1){
	 	$blnLogin=true;
	 }

}
  

	 echo($blnLogin);
?>
