//portget
$("#portget").click(function(){
	var target2=document.getElementById("searchtext");
	var str=target2.value;
////解析text
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
    
///////////////////////////////////////
    
    
	if(str==''){
		alert("请输入");
	}
	
	else if(name=='version'&&port!=''){
		window.location.href = "portget.php?action=export&port=" +port+"&version="+value;
	}
	else if(name=='version'&&port==''){
		window.location.href = "portget.php?action=export&port=" +port+"&version="+value;
	}
     else if(port!=''){
		window.location.href = "portget.php?action=export&port=" +port+"&version="+value;
     }
     else {
     	alert("您的查询不支持导出");
     }
    // var year = $("#year option:selected").val();
    // var month = $("#month option:selected").val();
    // url = '&year='+year+'&month='+month;
    
})

//fbget
$("#fbget").click(function(){
	var target2=document.getElementById("port");
	var str2=target2.value;
	var target1=document.getElementById("bugname");
	var str1=target1.value;
	if(str2=='' ||str1==''){
		alert("请输入");
	}
	else{
		window.location.href = "fbget.php?action=export&port=" +str2+"&bugname="+str1;
	}
    // var year = $("#year option:selected").val();
    // var month = $("#month option:selected").val();
    // url = '&year='+year+'&month='+month;
    
})
