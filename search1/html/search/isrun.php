      
<?php

header("Content-Type: text/html; charset=gb2312");
include("admin/conn2.php");
 $level=$_GET['level'];
 $num=$_GET['num'];
 $port=$_GET['port'];
$script0=$_GET['script'];
$service=$_GET['service'];
$address=$_GET['address'];
if($address==''||preg_match("/^[a-zA-Z\s]+$/",$address)==false){$address="china";}
if($script0==''){$script0='http-headers';}
 if($port==''){$port="80,443,23,22,3306,445,110,21,139,25";}
if($num==''){$num=1;}
if($service==''){$service='-sV';}
$sqlport="update scan set port='$port'";
$sqlnum="update scan set times=$num";
$sqladdress="update scan set address='$address'";
 $i=0;

 switch ($level)
{
case 1:
  $sql4 = "update machine set script='nmap --script $script0.nse $service --version-intensity 1 -p %s -randomize-hosts --max-hostgroup 100 -iL %d.txt -oX %d.xml'" ;
  break;  
case 2:
  $sql4 = "update machine set script='nmap --script $script0.nse $service --version-intensity 7 -p %s -randomize-hosts --max-hostgroup 100 -iL %d.txt -oX %d.xml'";
  break;
default:
  $sql4 = "update machine set script='nmap --script $script0.nse $service --version-intensity 9 -p %s -randomize-hosts --max-hostgroup 100 -iL %d.txt -oX %d.xml'";
  
}
    

$sql3 = 'update machine set isrun=1 where name="all"';
$sql5 = 'update dis_machine set isrun=1 where id=1';
$conn->query($sql4);
$conn->query($sql3);
$conn->query($sql5);
$conn->query($sqlnum);
$conn->query($sqlport);
$conn->query($sqladdress);
echo ("0");


 


?>
