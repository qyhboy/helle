      
<?php

header("Content-Type: text/html; charset=gb2312");
include("admin/conn2.php");

   
$sql = "update machine set isrun=0";
$sql1 = "update machine set bar=0";
$sql2 = "update machine set lefttime=''";
$sql3 = "update dis_machine set isrun=0";

	if($conn->query($sql)){
$conn->query($sql1);
$conn->query($sql2);
$conn->query($sql3);
echo "1";
}
else {
echo "0";
}

?>
