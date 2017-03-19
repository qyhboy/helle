<?php
    set_time_limit(0);
    $action = $_GET['action'];
	$port = $_GET['port'];
        $value = $_GET['version'];



 if ($action=='export') { //导出CSV 
      include("admin/conn2.php");
//find nmaptable
$query0 = "select version from newtime";
$rs=$conn->query($query0);
$a=$rs->fetch();
$kk=0;
        $str = "ip,version,banner\n"; 
        //$str = iconv('utf-8','gb2312',$str);
        $filename = date('Ymd').'.csv'; //设置文件名 
        include('sphinxapi.php'); 
        $sphinx = new SphinxClient(); 
        $sphinx->setServer('127.0.0.1', 9312); 

 if($value!=null){$sphinx->SetMatchMode(SPH_MATCH_PHRASE);}
       
      if($port!=null){$sphinx->SetFilter ("port",array($port));}

 for ($yy=0; $yy<30; $yy++){
 $sphinx->SetLimits(1,2,100);//传递当前页面所需的数据条数的参数
     
        $result = $sphinx->query($value, "version$yy");
        $total=$result['total_found'];
        $pageSize = 100; //每页显示数      
        $totalPage = $total/$pageSize; //总页数


for ($x=0; $x<=$totalPage; $x++) {

                $sphinx->SetLimits($x*$pageSize,$pageSize,$total);//传递当前页面所需的数据条数的参数

               //if($value!=null){$sphinx->SetMatchMode(SPH_MATCH_PHRASE);}
              // if($port!=null){$sphinx->SetFilter ( "port",array($port));} 
        $result = $sphinx->query($value, "version$yy");

$ids=join(',',array_keys($result['matches']));

//which nmap table,and which id
$query = "select * from `$a[0]` where id in($ids)  ";

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
