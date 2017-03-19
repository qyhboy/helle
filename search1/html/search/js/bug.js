

$(function() {
$("#searchport").click(function() {


         var target2=document.getElementById("searchtext");
	 var str=target2.value;
         localStorage.setItem("searchinfo",str);
         window.location.href = "port.html";
})
})
//注销
function down(){
	localStorage.setItem('identify',0);
	
}


//run
$(function() {
    $("#runsubmit").click(function() {
    	var i=0;
    	var target=document.getElementById("runlevel");
    	var level=target.value;
    	var target2=document.getElementById("runnum");
    	var num=target2.value;
        var target3=document.getElementById("port");
	    var str=target3.value;
        var target4=document.getElementById("script");
	    var script=target4.value;
        var target5=document.getElementById("service");
	    var service=target5.value;
        var target6=document.getElementById("address");
	    var address=target6.value;
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
                	//1运行
                         i=1;
                	 $("#run").html("运行！");    
    	$.ajax({
            type: "get",
            url: "isrun.php",
            cache: false,
            data: {'level':level,'num':num,'port':str,'script':script,'service':service,'address':address},
            success: function(data) {   	
             if(data==0){
  $("#isrun").html("good！");

}
              else {
 $("#isrun").html("有程序正在运行！");
}
            }
        })
        return false;
                  
                }
                     //0 bad
                else {
                    $("#run").html("有程序正在运行！");
                }
            }
        })
       
    }
    if (i==0){

    }else{
 $("#isrun").html("bad");
}
   
        
        
    })
})
//delete table
$(function() {
    $("#detable").click(function() {
    	var i=0;
        var target3=document.getElementById("zmapport");
	    var str=target3.value;
     
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
            url: "detable.php",
            cache: false,
            data: {'zmapport':str},
            success: function(data) {   	
             if(data){
  $("#dep").html("删除成功！");

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

//new time 
$(function() {
    $("#newtime").click(function() {
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
            url: "newtime.php",
            cache: false,
            data: {'zmapport':str},
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

//clean
$(function() {
    $("#cleansubmit").click(function() {
        if(localStorage.getItem('identify')!=2){
    	alert("无权限");
        return false;
    }else{
    	$.ajax({
            type: "get",
            url: "clean.php",
            cache: false,
            data: null,
            success: function(data) {   	
                if (data) {
                	//1运行
                      $("#clean").html("success！");    
    	
                  
                }
                     //0 bad
                else {
                    $("#clean").html("wrong！");
                }
            }
        })
       
    }
    
    })
})
//over
$(function() {
    $("#oversubmit").click(function() {
        if(localStorage.getItem('identify')!=2){
    	alert("无权限");
        return false;
    }else{
    	$.ajax({
            type: "get",
            url: "over.php",
            cache: false,
            data: null,
            success: function(data) {   	
                if (data) {
                	//1运行
                      $("#over").html("success！");    
    	
                  
                }
                     //0 bad
                else {
                    $("#over").html("wrong！");
                }
            }
        })
       
    }
    
    })
})



