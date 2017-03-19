//登录2为管理员
document.onkeydown=function(event) {
 if (event.keyCode == 13) {
     event.cancelBubble = true;
     event.returnValue = false;
         document.getElementById('loginsub').click();
   }
}
$(function() {
	
    $("#loginsub").click(function() {
         var name=document.getElementById("divTip");
var loginname1=document.getElementById("loginname");
loginname=loginname1.value;
var loginpass1=document.getElementById("loginpass");
loginpass=loginpass1.value;
        $.ajax({
            type: "GET",
            url: "login.php",
            cache: false,
            data: {'Name':loginname,'Pass':loginpass},
            success: function(data) {   	
                if (data==1 ) {
               name.innerHTML="操作提示，登录成功！";
                    localStorage.setItem('identify',1);
                self.location='search.html';
                }
                else if(data==2){
                	  localStorage.setItem('identify',2);
                	     self.location='search.html';
                }
                else {
                     name.innerHTML="用户名或密码错误！";
                       loginname1.value="";
loginpass1.value="";
                }
            }
        })
        return false;
    })
})
$(document).ready(function(){ 
         
   var $lst_Detail_List = function() {
  if(localStorage.getItem('identify')==1){
		 window.location.href = "search.html";
	}
	else if(localStorage.getItem('identify')==2){
		 window.location.href = "search.html";
	}
         else{
       
         }
         
         
      
    }
    $lst_Detail_List();

});
