<?php
header("Content-Type: text/html; charset=gb2312");
include("admin/conn2.php");

$i=0;
     $sql = "update machine set isrun=1 where name='sum'";
	if($conn->query($sql)){
$i=1;
}
     
echo ($i);
?>                                        



