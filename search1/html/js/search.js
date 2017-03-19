document.onkeydown=function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
           
             if(e && e.keyCode==13){ // enter 键

                   document.getElementById('portbutton').click();
            }
}

$(document).ready(function(){
            var input=localStorage.getItem("searchinfo");
            var target2=document.getElementById("porttext");
            target2.value=input;
	var str= target2.value;
	//localStorage.setItem("port",str2);
	//解析输入
	var name='';
	var value='';
	var port='';
	  var str0= str.split(' ');
	  
	if(str0[0]!=null) {
		var str1= str0[0].split(':');
		if(str1[0]=="ip"){name='ip';value=str1[1]}
	  if(str1[0]=="port"){ port=str1[1];}
	 if(str1[0]=="version"){name='version';value=str1[1]; }
	 if(str1[0]=="http"){name='http';value=str1[1]; }
	}
    if(str0[1]!=null) {
    	var str2= str0[1].split(':');
    	if(str2[0]=="ip"){name='ip';value=str2[1]}
	  if(str2[0]=="port"){ port=str2[1];}
	 if(str2[0]=="version"){name='version';value=str2[1]; }
	 if(str2[0]=="http"){name='http';value=str2[1]; }
    }
	
	//////////////////////////////////////////////////////////////////////////
	
      var curPage = 1; //当前页码   
var total,pageSize,totalPage;   
//获取数据  
 var $li = ""; 
    var $webSite = rttophtml5mobi.website;
 
    var $listview = document.getElementById("listview");//数据要放的位置
    var $s = document.getElementById("count");//数据要放的位置
        var $tpl_Index_List = function($p_array, $p_items) {//格式化字符串，数据集
       
               $.each($p_items, function(index, item) {                   
            $li = '<div id="ipbanner"><a href="port.html" data-ajax="false" tip="'+item.ip+'"><h3>'+item.ip+'</h3></a>'; 
           $li+='<hr><div id="ipport"> <h4 ><a href="#">'+item.os+'</a></h4>';
           $li+='<div class="hostname"></div> <address ><a id="country" href="#"> '+item.address+' </a><a id="city" href="#"></a> </address>';
           $li+='<i>'+item.version+'</i><p>'+item.other+'</p><p>'+item.state+','+item.states+'</p><div ><time >'+item.date+'</time></div></div>';
           $li+='<div id="banner"><header><i><a href="#">'+item.port+'---</a></i><i><a href="#">'+item.name+'</a></i></header>';
           $li+='<pre class="expand">'+item.http+'</pre></div></div>';
           $p_array.push($li);                  
                })
   
 

    }

function getData(page){    
$.ajax({   
type: 'POST',   
url: 'sphinx2.php',   
cache: false,
data: {'pageNum':page-1,'port1':port,'name':name,'value':value},   
dataType:'json',   

success:function(json){   
//$("#listview ul").empty();   
total = json.total; //总记录数   
pageSize = json.pageSize; //每页显示条数   
curPage = page; //当前页   
totalPage = json.totalPage; //总页数   
var li = "";   
var list = json.list;   
  var li_array = [];

            $tpl_Index_List(li_array, list);
           
            $listview.innerHTML=li_array.join('');
            $s.innerHTML="&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;为您找到相关结果约："+total+" 个----用时："+json.gettime;
             //getPageBar();
             ds();
             $(document).ready(function(){
         $('#listview').on('click','a',function(){ 
            
              var searchinfo="ip:"+$(this).attr("tip");
               localStorage.setItem("searchinfo",searchinfo);
        });
    });
          
   
},   
complete:function(){ //生成分页条   
//getPageBar();   
 
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
pageStr += "<li><a href='#' rel='1'>首页</a></li><li><a href='#' rel='"+(curPage-1)+"'>上一页</a><li>";   
}   
//如果是最后页   
if(curPage>=totalPage){   
pageStr += "<li ><a>"+curPage+"/"+totalPage+"</a></li>"+"<li class='previous disabled'><a>下一页</a></li><li class='previous disabled'><a>尾页</a></li>";   
}else{   
pageStr += "<li ><a>"+curPage+"/"+totalPage+"</a></li>"+"<li><a href='#' rel='"+(parseInt(curPage)+1)+"'>下一页</a></li><li><a href='#' rel='"+totalPage+"'>尾页</a></li>";   
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
//端口ip查找
$(function() {
$("#portbutton").click(function() {
		var target2=document.getElementById("porttext");
	var str=target2.value;
        localStorage.setItem("searchinfo",str);
	//localStorage.setItem("port",str2);
	//解析输入
	var name='';
	var value='';
	var port='';
	  var str0= str.split(' ');
	  
	if(str0[0]!=null) {
		var str1= str0[0].split(':');
		if(str1[0]=="ip"){name='ip';value=str1[1]}
	  if(str1[0]=="port"){ port=str1[1];}
	 if(str1[0]=="version"){name='version';value=str1[1]; }
	 if(str1[0]=="http"){name='http';value=str1[1]; }
	}
    if(str0[1]!=null) {
    	var str2= str0[1].split(':');
    	if(str2[0]=="ip"){name='ip';value=str2[1]}
	  if(str2[0]=="port"){ port=str2[1];}
	 if(str2[0]=="version"){name='version';value=str2[1]; }
	 if(str2[0]=="http"){name='http';value=str2[1]; }
    }
	
	//////////////////////////////////////////////////////////////////////////
	
      var curPage = 1; //当前页码   
var total,pageSize,totalPage;   
//获取数据  
 var $li = ""; 
    var $webSite = rttophtml5mobi.website;
 
    var $listview = document.getElementById("listview");//数据要放的位置
    var $s = document.getElementById("count");//数据要放的位置
        var $tpl_Index_List = function($p_array, $p_items) {//格式化字符串，数据集
       
               $.each($p_items, function(index, item) {                   
            $li = '<div id="ipbanner"><a href="port.html" data-ajax="false" tip="'+item.ip+'"><h3>'+item.ip+'</h3></a>'; 
           $li+='<hr><div id="ipport"> <h4 ><a href="#">'+item.os+'</a></h4>';
           $li+='<div class="hostname"></div> <address ><a id="country" href="#"> '+item.address+' </a><a id="city" href="#"></a> </address>';
           $li+='<i>'+item.version+'</i><p>'+item.other+'</p><p>'+item.state+','+item.states+'</p><div ><time >'+item.date+'</time></div></div>';
           $li+='<div id="banner"><header><i><a href="#">'+item.port+'---</a></i><i><a href="#">'+item.name+'</a></i></header>';
           $li+='<pre class="expand">'+item.http+'</pre></div></div>';
           $p_array.push($li);                  
                })
   
 

    }

function getData(page){    
$.ajax({   
type: 'POST',   
url: 'sphinx2.php',   
cache: false,
data: {'pageNum':page-1,'port1':port,'name':name,'value':value},   
dataType:'json',   

success:function(json){   
//$("#listview ul").empty();   
total = json.total; //总记录数   
pageSize = json.pageSize; //每页显示条数   
curPage = page; //当前页   
totalPage = json.totalPage; //总页数   
var li = "";   
var list = json.list;   
  var li_array = [];

            $tpl_Index_List(li_array, list);
           
            $listview.innerHTML=li_array.join('');
           $s.innerHTML="&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;为您找到相关结果约："+total+" 个----用时："+json.gettime;
             ds();
             $(document).ready(function(){
         $('#listview').on('click','a',function(){ 
              var searchinfo="ip:"+$(this).attr("tip");
               localStorage.setItem("searchinfo",searchinfo);
             
               
        });
    });
          
   
},   
complete:function(){ //生成分页条   
//getPageBar();   
 
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
pageStr += "<li><a href='#' rel='1'>首页</a></li><li><a href='#' rel='"+(curPage-1)+"'>上一页</a><li>";   
}   
//如果是最后页   
if(curPage>=totalPage){   
pageStr += "<li ><a>"+curPage+"/"+totalPage+"</a></li>"+"<li class='previous disabled'><a>下一页</a></li><li class='previous disabled'><a>尾页</a></li>";   
}else{   
pageStr += "<li ><a>"+curPage+"/"+totalPage+"</a></li>"+"<li><a href='#' rel='"+(parseInt(curPage)+1)+"'>下一页</a></li><li><a href='#' rel='"+totalPage+"'>尾页</a></li>";   
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
})


