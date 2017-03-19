<?php


try{
	$conn= new PDO("mysql:host=localhost;dbname=nmap","root","qiu123456");
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$conn->exec('set names utf8');
}
catch(exception $e){
	
}
    
     

?>                                        


