//进度条
$(document).ready(function(){ 
	
var name3=document.getElementById("bb");
          var name2=document.getElementById("test");
       //name.innerHTML='<div class="bar" style="width: 10%;"></div> ';
	$.ajax({
            type: "get",
            url: "bar.php",
            cache: false,
            data: null,
            dataType:'json', 
            success: function(data) {   	
                if (data.bar!='0%') {
                      
                	name3.style.width=data.bar;
                  name2.innerHTML="已完成："+data.bar+"---剩余时间："+data.lefttime;
               
                }
                else {
                   // name2.innerHTML='更新失败';

                }
            }
        })
        return false;});

