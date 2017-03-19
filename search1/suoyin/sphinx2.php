      <?php  
$conn= new PDO("mysql:host=localhost;dbname=nmap","root","qiu123456");
$port=$_POST['port1'];
$name=$_POST['name'];
$value=$_POST['value'];

if($name==null){$name='version';$value='';}
$page = intval($_POST['pageNum']);  


	$conn->exec('set names utf8');
        include('sphinxapi.php'); 
        $sphinx = new SphinxClient(); 
        $sphinx->setServer('127.0.0.1', 9312); 
        $pageSize = 6; //每页显示数   
   
        $startPage = $page*$pageSize;   
 
        $arr['pageSize'] = $pageSize;   
 $sphinx->SetLimits($page*$pageSize,$pageSize);//传递当前页面所需的数据条数的参数

if($value!=null){$sphinx->SetMatchMode(SPH_MATCH_PHRASE);}

$sphinx->SetSortMode(SPH_SORT_EXTENDED,"id desc");
    
       
       
      if($port!=null){$sphinx->SetFilter ( "port",array($port));} 
// $sphinx->SetSortMode(SPH_SORT_ATTR_DESC);
        $result = $sphinx->query($value, "*");
   
$count=$result['total_found'];
 $total = $result['total_found'];
  $arr['gettime'] = $result['time']; 
$arr['total'] = $total;  
 $totalPage = ceil($total/$pageSize); //总页数 
$arr['totalPage'] = $totalPage; 
$ids=join(',',array_keys($result['matches']));
$query = "select * from `nmap` where id in($ids) order by id desc ";
$opts=array(
"before_match"=>"<fond style='font-weight:bold;color:#f00'>",
"after_match"=>" </fond>"
);
foreach ($conn->query($query) as $row) {
$conn2=$sphinx->buildExcerpts($row,"*", $keyword ,$opts);
      $arr['list'][] = array(     
'ip' => $row['ip'],   
'date' => $row['date'],
'name' => $row['name'],
'version' => $row['version'],  
'os'=> $row['os'],
'other'=> $row['other'],
'state' =>  $row['state'],
'http'=>  $row['http'],
'port' => $row['port'],
 'address'=>$row['address'],
); 
    
 }

     $jsonStr = json_encode($arr);     
echo ($jsonStr);  

    ?>
