function logout()
{

	$.post('logout.php', { num:"" }, function(result) { 
		if (result == 1)
			window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
	});
}

function timeout(){
	g_timer = setTimeout(function(){
		$('#popupdivsuccess').hide();
		$("#popupdivfail").hide();
		$("#popupdivnomatch").hide();
		$("#popupdivoldpass").hide();
	},2500);
}
function hide_me(){
   $('#popupdivsuccess').hide();
   $("#popupdivfail").hide();
   $("#popupdivnomatch").hide();
   $("#popupdivoldpass").hide();
}
function show_me_more(){	
	if($("#popupdivsuccess").is(":visible"))
	{
		$("#popupdivsuccess").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#popupdivnomatch").is(":visible"))
	{
		$("#popupdivnomatch").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#popupdivfail").is(":visible"))
	{
		$("#popupdivfail").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#popupdivoldpass").is(":visible"))
	{
		$("#popupdivoldpass").css("display","blocked");
		clearTimeout(g_timer);
	}
}
function rehide_me(){
	if($("#popupdivsuccess").is(":visible"))
	{
		timeout();
	}
	if($("#popupdivfail").is(":visible"))
	{
		timeout();
	}
	if($("#popupdivnomatch").is(":visible"))
	{
		timeout();
	}
	if($("#popupdivoldpass").is(":visible"))
	{
		timeout();
	}
}
$(document).keypress(function(e) {
    if(e.which == 13) {
        save_db();
    }
});


function save_db()
{
	if($("#oldpass").val().trim()=="" || $("#oldpass").val().trim().length<5 || $("#newpass").val().trim()=="" || $("#newpass").val().trim().length<5 || $("#confirmpass").val().trim()==""|| $("#confirmpass").val().trim().length<5 )
	{
		if($("#oldpass").val().trim()=="" || $("#oldpass").val().trim().length<5 )
		{
			$("#oldpass").css("background-color","#e2ff61");
		}
		if($("#newpass").val().trim()=="" || $("#newpass").val().trim().length<5 )
		{
			$("#newpass").css("background-color","#e2ff61");
		}
		if($("#confirmpass").val().trim()=="" || $("#confirmpass").val().trim().length<5 )
		{
			$("#confirmpass").css("background-color","#e2ff61");
		}
		$("#popupdivfail").show();
		timeout();
	}
	else{
			if($("#newpass").val()!=$("#confirmpass").val()){
				$("#popupdivnomatch").show();
				timeout();
			}
			else{
				$.post('save_new_pass.php',{OldPass:$("#oldpass").val(),NewPass:$("#newpass").val(),ConfirmPass:$("#confirmpass").val()},function(result){
					if(result.search("error")>-1)
					{
						alert("Problems when trying to update DATABASE !\nPlease contact 'Timetool developers' to fix this problem!");
					}
					else{
							if(result.trim() =="wrongpassword")
							{
								$("#popupdivoldpass").show();
								timeout();
							}
							else if(result.trim() =="nomatch")
							{
								$("#popupdivnomatch").show();
								timeout();
							}
							else if(result.trim() =="toshort")
							{
								$("#popupdivfail").show();
								timeout();
							}
							else if(result.trim() =="success")
							{
								$("#popupdivsuccess").show();
								timeout();
							}
						}
				});
			}
		}
}


function afisare_tip_user()
{
	//aici facem pentru super user sau normal user afisarea taburilor
	
		$.post('verificaresuperuser.php', function(result) { 
	
		if(result == 0) 
		{
		
			$("#Projects").hide();
			$("#Teams").hide();
			$("#changeNorm").hide();
		}
		
	});
}
function clearColor(clicked){
	$(clicked).css("background-color","");
}