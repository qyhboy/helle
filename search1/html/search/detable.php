<?php

header("Content-Type: text/html; charset=gb2312");

 $port='';

include("admin/conn2.php");

if($port==''){
$query = "SELECT CONCAT( 'drop table ', table_name ) AS mutiply_delete_sql FROM information_schema.tables WHERE table_name LIKE 'zmap%'";
$flag=0;
$ii=0;
foreach ($conn->query($query) as $row) {
       if($flag==0){$ii=1;}
$flag=0;
$conn->query($row['mutiply_delete_sql']);
    $flag=1;
 }

if($ii==1)   {echo 0;}
  
  else{echo 1;} 
}


else{

$hello = explode(',',$port);
$flag=0;
$ii=0;
for($index=0;$index<count($hello);$index++)
{
if($flag==0){$ii=1;}
$flag=0;

 $pp=$hello[$index];
$sql="drop table `zmap$pp`";
$conn->query($sql);

$flag=1;
 
}

if($ii==1)   {echo 0;}
  
  else{echo 1;} 
}

?>
