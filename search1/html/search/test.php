<?php
$address='字母';
if($address==''||preg_match("/^[a-zA-Z\s]+$/",$address)==false){$address="china";}
echo $address;
?>
