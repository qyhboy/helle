$(document).ready(function(e) {

    $(this).keydown(function (e){

    if(e.which == "13"){

        var focusActId = document.activeElement.id;

            if(focusActId == 'topSearch'){

                $("#topSearchBtn").click();

            }

        }

    })

});

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

//runscript
$(function() {
    $("#runscript").click(function() {
 var frmData = $("#scriptform").serialize();
    	var i=0;
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
                	 $("#run").html("运行！");    
    	$.ajax({
            type: "post",
            url: "isrunscript.php",
            cache: false,
            data: frmData,
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

//runport
$(function() {
    $("#runport").click(function() {
        var target=document.getElementById("port");
	    var str=target.value;
    	var i=0;
    	var target2=document.getElementById("runportlevel");
    	var level=target2.value;
    	
        if(localStorage.getItem('identify')!=2){
    	alert("无权限");
        return false;
    }
        else{
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
            url: "isrunport.php",
            cache:false,
            data:  {'level':level,'port':str},
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


//run
$(function() {
    $("#runsubmit").click(function() {
    	var i=0;
    	var target=document.getElementById("runlevel");
    	var level=target.value;
    	var target2=document.getElementById("runnum");
    	var num=target2.value;
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
            data: {'level':level,'num':num},
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

//上传文件
$(function() {
    $("#filesubmit1").click(function() {
        var frmData = $("#fileform1").serialize();
        
        $.ajax({
            type: "POST",
            url: "upload.php",
            cache: false,
            data: frmData,
            success: function(data) {   	
                if (data) {
                	 $("#divTip2").html("上传成功！");
                
                  
                }
                else {
                    $("#divTip2").html("上传失败2！"+data);
                }
            }
        })
        return false;
    })
})



