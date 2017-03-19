<?php
header("Content-Type: text/html; charset=gb2312");
$name=$_POST['bugname'];
$version=$_POST['bugversion'];
$blnLogin=FALSE;
include("admin/conn2.php");
if($name!=null&$version!=null){
	$sql="INSERT INTO bug (version,name) values ('$version','$name')";
	
    $rs=$conn->query($sql);
	 if($rs==1){
	 	$blnLogin=true;
	 }

}
  

	 echo($blnLogin);
?>
