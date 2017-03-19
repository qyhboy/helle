<?php
    set_time_limit(0);
    $action = $_GET['action'];
	$port = $_GET['port'];
        $version = $_GET['version'];
        $http = $_GET['http'];
	//$port ='80';
   
    if ($action=='export') { //导出CSV 
      include("admin/conn2.php");
        $str = "ip,version,banner\n"; 
        //$str = iconv('utf-8','gb2312',$str);
        $filename = date('Ymd').'.csv'; //设置文件名 
        export_csv($filename,$str); //导出 
        $str = ""; 
		$j=0;
     if($version!=null&&$port!=null){
		$query = "select * from nmap where port=$port and version='$version'";
	}
       else if($http!=null&&$port!=null){
		$query = "select * from nmap where port=$port and http='$http'";
	}
	else if($version!=null){
		$query = "select * from nmap where version='$version'";
	}
       else if($http!=null){
		$query = "select * from nmap where http='$http'";
	}
     else if($port!=null){
		$query = "select * from nmap where port=$port";
     }
            
			$conn->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);

$result=$conn->prepare($query);     // prepare()方法准备查询语句
  $result->execute();
   
   while ($row = $result->fetch(PDO::FETCH_ASSOC)){

            	
                $name = iconv('utf-8','gb2312',$row['ip']); //中文转码 
                $gender = iconv('utf-8','gb2312',$row['version']); 
				 $banner = str_replace("\n",'', $row['http']);               
                $str .= $name.",".$gender.",".$banner."\n"; //用引文逗号分开 
                $j+=1;
				if($j>1000){
					export_csv($filename,$str);
					$str = "";
					$j=0;
				}
            } 
        export_csv($filename,$str); //导出 
        //export_csv($filename,$str);
    } 

    function export_csv($filename,$data) { 
        header("Content-type:text/csv"); 
        header("Content-Disposition:attachment;filename=".$filename); 
        header('Cache-Control:must-revalidate,post-check=0,pre-check=0'); 
        header('Expires:0'); 
        header('Pragma:public'); 
        echo $data; 
        //exit;
        
    } 
?>
