
//nmap表信息
$(document).ready(function(){
		var str2="ds";
      var curPage = 1; //当前页码   
var total,pageSize,totalPage;   
//获取数据  
 var $li = ""; 
 
    var $listview = document.getElementById("tablelistview");//数据要放的位置
    var $s = document.getElementById("count");//数据要放的位置
        var $tpl_Index_List = function($p_array, $p_items) {//格式化字符串，数据集
       
               $.each($p_items, function(index, item) {          	
           $li = '<tr><td>'+item.name+'</td><td>'+item.total+'</td><td>'+item.date+'</td><td><input type= "button" value="搜索该版本" id="newversion" newversion="'+item.name+'"/></td><td><input type= "button" value="删除该版本" id="deversion" deversion="'+item.name+'"/></td></tr>';         
  
           $p_array.push($li);
                })
   
 

    }

function getData(page){    
$.ajax({   
type: 'POST',   
url: 'tableinfo.php',   
data: {'pageNum':page-1},   
dataType:'json',   

success:function(json){   
//$("#listview ul").empty();   
total = json.total; //总记录数   
pageSize = json.pageSize; //每页显示条数   
curPage = page; //当前页   
totalPage = json.totalPage; //总页数     
var list = json.list;   
  var li_array = [];

            $tpl_Index_List(li_array, list);
           
            $listview.innerHTML=li_array.join('');
           $s.innerHTML="<h3>&nbsp; &nbsp共"+total+" 个版本<br/>&nbsp; &nbsp现在版本:"+json.nowversion+"</h3>";
             //getPageBar();
             
            $(document).ready(function(){
      
     $('#tablelistview').on('click','#newversion',function(){ 
     	
        var debug_1=$(this).attr('newversion');


    if(localStorage.getItem('identify')!=2){
    	alert("无权限");
        return false;
    }else{
    	$.ajax({
            type: "get",
            url: "run.php",
            cache: false,
            data: null,
            success: function(data) {   	
                if (data==0) {
                 
      $.ajax({
            type: "GET",
            url: "newversion.php",
            cache: false,
            data: {'action':'export','name':debug_1},
            success: function(data) {   	
                if (data) {
                	 
                var good=document.getElementById('asd');
                  
                    window.location.reload();
                }
                else {
                    var good=document.getElementById('asd');
                  good.innerHTML="失败";
                    
                }
            }
        })
        return false;
                  
                }
                     //0 bad
                else {
                
  var good=document.getElementById('asd');
                  good.innerHTML="有程序正在运行！";
                }
            }
        })
       
    }
    if (i==0){

    }else{
  var good=document.getElementById('asd');
                  good.innerHTML="失败";
}
   



      
         	
         	
                });


    $('#tablelistview').on('click','#deversion',function(){ 
     	
        var debug_1=$(this).attr('deversion');


    if(localStorage.getItem('identify')!=2){
    	alert("无权限");
        return false;
    }else{
    	$.ajax({
            type: "get",
            url: "run.php",
            cache: false,
            data: null,
            success: function(data) {   	
                if (data==0) {
                 
      $.ajax({
            type: "GET",
            url: "deversion.php",
            cache: false,
            data: {'action':'export','name':debug_1},
            success: function(data) {   	
                if (data) {
                	 
                var good=document.getElementById('asd');
                  
                    window.location.reload();
                }
                else {
                    var good=document.getElementById('asd');
                  good.innerHTML="失败";
                    
                }
            }
        })
        return false;
                  
                }
                     //0 bad
                else {
                
  var good=document.getElementById('asd');
                  good.innerHTML="有程序正在运行！";
                }
            }
        })
       
    }
    if (i==0){

    }else{
  var good=document.getElementById('asd');
                  good.innerHTML="失败";
}
   



      
         	
         	
                });
    });
          
   
},   
complete:function(){ //生成分页条   
//getPageBar();   
 ds();
},   
error:function(){   
//alert("数据加载失败");   
}   
});   
}   
   
//获取分页条   
function ds(){ 
	//页码大于最大页数   
if(curPage>totalPage) curPage=totalPage;   
//页码小于1   
if(curPage<1) curPage=1;   
pageStr = "";   
     
//如果是第一页   
if(curPage==1){   
pageStr += "<li><a>首页</a></li><li><a>上一页</a></li>";   
}else{   
pageStr += "<li><a href='javascript:void(0)' rel='1'>首页</a></li><li><a href='javascript:void(0)' rel='"+(curPage-1)+"'>上一页</a><li>";   
}   
//如果是最后页   
if(curPage>=totalPage){   
pageStr += "<li ><a>"+curPage+"/"+totalPage+"</a></li>"+"<li class='previous disabled'><a>下一页</a></li><li class='previous disabled'><a>尾页</a></li>";   
}else{   
pageStr += "<li ><a>"+curPage+"/"+totalPage+"</a></li>"+"<li><a href='javascript:void(0)' rel='"+(parseInt(curPage)+1)+"'>下一页</a></li><li><a href='javascript:void(0)' rel='"+totalPage+"'>尾页</a></li>";   
}   
var cc=document.getElementById("pagecount");
      cc.innerHTML=pageStr;
}

   
$(function(){   
	
		getData(1);   
		
  $('#pagecount').on('click','a',function(){ 
var rel = $(this).attr("rel");   
if(rel){   
getData(rel);   
}   
});  
	

});   
})

//mysqldump
$(function() {
    $("#mysqldump").click(function() {
    	var i=0;
	    var str='';
     
        if(localStorage.getItem('identify')!=2){
    	alert("无权限");
        return false;
    }else{
    	$.ajax({
            type: "get",
            url: "run.php",
            cache: false,
            data: null,
            success: function(data) {   	
                if (data==0) {
                 
    	$.ajax({
            type: "get",
            url: "mysqldump.php",
            cache: false,
            data: null,
            success: function(data) {   	
             if(data){
  $("#dep").html("成功！");

}
              else {
 $("#dep").html("失败！");
}
            }
        })
        return false;
                  
                }
                     //0 bad
                else {
                    $("#dep").html("有程序正在运行！");
                }
            }
        })
       
    }
    if (i==0){

    }else{
 $("#dep").html("bad");
}
   
        
        
    })
})
