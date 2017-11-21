var holding = 0;
var fails = 0;
var timeleft = 5;
function myfunc()
{
	$('#usernameF').focus();
	
}
function loginFailed(x){
	
	
	setTimeout(function c() {
		timeleft -- ;
		$("#timerdown").text(timeleft);
		x--;
		if (x>=0) loginFailed(x);
		else
		{
			
			doneTiming();
		}
	},1000);
		
}
function doneTiming(){
	$("#mybody").find("input,button,textarea,select,a").removeAttr("disabled", "disabled");
	$("#loginfailed").hide();
	
}

function login_me()
{
	var username = document.getElementById("usernameF").value;
	var parola = document.getElementById("passwordF").value;
	//alert (username);alert(parola);
	
	//$passmd5=md5($parola); //cripteaza parola
	
	//alert(user+" "+parola);
	$.post('process.php', { pass:parola,user:username }, function(x) { 
		
		if(x==-1)
		{			
			fails++;
			if(fails>3)
			{
				$("#timerdown").text(5);
				timeleft = 5;
				$("#mybody").find("input,button,textarea,select,a").attr("disabled","disabled");
				$("#loginfailed").show();
				loginFailed(5);
				
			}
			else{
				$('#wrong_user_pass').show();
				if($('#usernameF').val()=="")
					$('#usernameF').focus();
				else
					$('#passwordF').focus();
				
				$('#passwordF').val("");	
			}
		}
		else			
		{
		//	alert(x);
			var linked = "http://tmda365u/Quality/TimeToolTry/HomePage/HomePageTag/homePage.php";
			window.location.href = linked;
		}
	});
} 
function hide_show_wrong_password()
{
	$('#wrong_user_pass').hide();
	
}

//document.getElementById("blur").blur();