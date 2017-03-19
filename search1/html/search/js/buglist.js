//漏洞信息提交
$(function() {
    $("#bugsub").click(function() {
        var frmData = $("#bugform").serialize();
        var name = document.getElementById("divTip");
        
        $.ajax({
            type: "POST",
            url: "bug.php",
            cache: false,
            data: frmData,
            success: function(data) {   	
                if (data) {
                	window.location.reload();
                  
                }
                else {
                    name.innerHTML="插入失败2！";
                    
                }
            }
        })
        return false;
    })
})

$(document).ready(function(){
	var cc=document.getElementById("pagecount");
      
     var bugname=localStorage.getItem("bugname");
     cc.innerHTML=bugname;
     
     
     var str2="ds";
      var curPage = 1; //当前页码   
var total,pageSize,totalPage;   
//获取数据  
 var $li = ""; 
 
    var $listview = document.getElementById("listview");//数据要放的位置
    var $s = document.getElementById("count");//数据要放的位置
        var $tpl_Index_List = function($p_array, $p_items) {//格式化字符串，数据集
       
               $.each($p_items, function(index, item) {          	
           $li = '<tr><td>漏洞：'+bugname+'</td><td>  <a href="port.html" data-ajax="false" vbug="'+item.version+'">'+item.version+'</a></td><td>'+item.versionnum+'</td><td><input type= "button" value="删除漏洞" id="debugversion" debug="'+item.version+'"/></td></tr>';         

           $p_array.push($li);
                })
   
 

    }

function getData(page){    
$.ajax({   
type: 'POST',   
url: 'buglist.php',   
data: {'pageNum':page-1,'bugname':bugname},   
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
           $s.innerHTML="&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;为您找到相关结果约："+total+" 个";
             //getPageBar();
             
             $(document).ready(function(){
        $('#listview').on('click','a',function(){ 
           var searchinfo="version:"+$(this).attr("vbug");
               localStorage.setItem("searchinfo",searchinfo);//ip:1.209.194.67这样就得到点击的链接的linkId参数了，然后你可以用这个值来做其它的事
               //sessionStorage.setItem("ip","1.209.194.67");
        });
        //delete bug
         $('#listview').on('click','#debugversion',function(){ 
     	
        var debugversion_1=$(this).attr('debug');
        var bugname=localStorage.getItem("bugname");
           $.ajax({
            type: "GET",
            url: "debugversion.php",
            cache: false,
            data: {'action':'export','bugname':bugname,'bugversion':debugversion_1},
            success: function(data) {   	
                if (data==1) {     
                    window.location.reload();
                }
                else if(data==2){
                	
                	window.location.href="buginfo.html";
                }
                else {
                    var good=document.getElementById('asd');
                  good.innerHTML="删除失败"+data;
                    
                }
            }
        })
        return false;
         	
         	
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
