<?php
$username=$_GET['Name'];
$userpwd=$_GET['Pass'];
$blnLogin=0;
 $conn= new PDO("mysql:host=localhost;dbname=nmap","root","qiu123456");
	
	$conn->exec('set names utf8');

 	$sql="select * from person where mail='".$username."'";
	$rs=$conn->query($sql);
        $info=$rs->fetch();
 

     if($info==TRUE)
       {
     
         if($info['password']==$userpwd)
            {
            	if($info['education']==0){
            		session_start();
	$_SESSION['name'] = $info['username'];
   
	$blnLogin=1;
            	}
            	if($info['education']==1){
            		 session_start();
	$_SESSION['name'] = $info['username'];
   
	$blnLogin=2;
            	}	  
            }
         
	   }

 
 	
  
 
echo($blnLogin);

?>



