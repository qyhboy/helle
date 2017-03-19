//进度条,table

function current(){ 
	
var name3=document.getElementById("bb");
          var name2=document.getElementById("barnum");
var name4=document.getElementById("total");
var name5=document.getElementById("nmapnum");
var name6=document.getElementById("usetime");
       //name.innerHTML='<div class="bar" style="width: 10%;"></div> ';
	$.ajax({
            type: "get",
            url: "bar.php",
            cache: false,
            data: null,
            dataType:'json', 
            success: function(data) {   	
                if (1) {
                      
                	name3.style.width=data.bar;
                  name2.innerHTML="已完成："+data.bar+"---剩余时间："+data.lefttime;
               name4.innerHTML=data.total;
               name5.innerHTML=data.nmapnum;
               name6.innerHTML=data.usetime;
                }
                else {
                   // name2.innerHTML='更新失败';

                }
            }
        })
        return false;}



setInterval(function(){$("#total").html(current)},5000);//jquery自带方法
