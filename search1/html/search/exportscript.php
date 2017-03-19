<?php
    set_time_limit(0);
    $action = $_GET['action'];
	//$port = '80';
	$bugname=$_GET['bugname'];
  //  $bugname="a";

    if ($action=='export') { //导出CSV 
      include("admin/conn2.php");
	include('sphinxapi.php'); 
$query="select distinct version from script where name ='$bugname'";
foreach ($conn->query($query) as $row) {
     $array[]= $row['version'] ;  
 }
 $str = "ip,version,banner\n"; 
        //$str = iconv('utf-8','gb2312',$str);
        $filename = date('Ymd').'.csv'; //设置文件名 
        export_csv($filename,$str); //导出 
 
             for($i=0;$i<count($array);$i++){  
$value=$array[$i];
        
        $sphinx = new SphinxClient(); 
        $sphinx->setServer('127.0.0.1', 9312); 
       $sphinx->SetLimits(1,2,100);//传递当前页面所需的数据条数的参数
     $sphinx->SetMatchMode(SPH_MATCH_PHRASE);    
        $result = $sphinx->query($value, "*");
        $total=$result['total_found'];
        $pageSize = 100; //每页显示数   
   
        $startPage = $page*$pageSize;   
        $totalPage = ceil($total/$pageSize); //总页数
$conn->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
 for ($x=0; $x<=$totalPage; $x++) {

                $sphinx->SetLimits($x*$pageSize,$pageSize,$total);//传递当前页面所需的数据条数的参数

             $sphinx->SetMatchMode(SPH_MATCH_PHRASE);
        $result = $sphinx->query($value, "*");
$ids=join(',',array_keys($result['matches']));
$query = "select * from `nmap` where id in($ids)  ";
$result=$conn->prepare($query);     // prepare()方法准备查询语句
  $result->execute();

while ($row = $result->fetch(PDO::FETCH_ASSOC)){
                          $name = iconv('utf-8','gb2312',$row['ip']); //中文转码 
                $gender = iconv('utf-8','gb2312',$row['version']); 
				 $banner = str_replace("\n",'', $row['http']);               
                $str .= $name.",".$gender.",".$banner."\n"; //用引文逗号分开 
					
					
				
}

export_csv($filename,$str);
$str = "";
}



  
}  

   

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
