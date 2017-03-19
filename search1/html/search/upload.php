<?php
    if(!empty($_FILES)){
        if($_FILES["file"]["error"] == 0){
            move_uploaded_file($_FILES["file"]["tmp_name"],"/home/qq/search/".$_FILES["file"]["name"]);
            echo $_FILES['file']['name'].' upload success'; 

        }
    }
?>
