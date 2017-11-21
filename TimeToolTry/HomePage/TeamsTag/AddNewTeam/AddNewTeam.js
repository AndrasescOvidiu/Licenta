function timeout(){
	g_timer = setTimeout(function(){
		$('#popupdivsuccess').hide();
		$("#popupdivfail").hide();
		$("popupdivalready").hide();
	},2500);
}
$(document).click(function() {
	$.post("checkSession.php",function(result){
		
	});
	
	$.post('verificaresuperuser.php', {nr:11},function(result) { 
		if(result == 0) 
		{
			if(!$("#Projects").is("visible") || !$("#Teams").is("visible") || !$("#changeNorm").is("visible"))
			{
				alert("You shouldn't be here, NO ADMIN RIGHTS for you! If it's a problem,and you're an ADMIN, please report to 'Timetool Developers' to fix this. \nNow you'll be redirected to login page.");
				window.location("/Quality/TimeToolTry/LoginPage/login.php");
			}
		}
	});
});
function hide_me(){
   $('#popupdivsuccess').hide();
   $("#popupdivfail").hide();
   $("popupdivalready").hide();
}
function show_me_more(){	
	if($("#popupdivsuccess").is(":visible"))
	{
		$("#popupdivsuccess").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#popupdivfail").is(":visible"))
	{
		$("#popupdivfail").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#popupdivalready").is(":visible"))
	{
		$("#popupdivalready").css("display","blocked");
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
	if($("#popupdivalready").is(":visible"))
	{
		timeout();
	}
}
$(document).keypress(function(e) {
    if(e.which == 13) {
        save_db();
    }
});
function load_info(){
	$.post('script.php', function(result) { 
	if(result.search("error")>-1)
	{
		alert("THERE WAS A BIG PROBLEM WHEN IT COMES TO LOAD THE NAMES FROM DATABASE!\nPlease contact 'The Timetool SW Developers' to fix this problem!");
	}
	else{
		var abcd = result.split("@#");
			var rl = abcd[2].split("~^");
		
			for(var i=0;i<rl.length-1;i++)
			{
				//alert("Hardware Engineering".length);
				$('#leadername').append('<option>'+rl[i]+'</option>');
			}
	}
	});
}
function save_db(){
	if($('#teamName').val().trim().length>1)
	{
		$.post('save_new_team.php',{ rlname:$('#leadername').find(":selected").text() , TName:$('#teamName').val()}, function(result) { 
			if(result.search("error")>-1)
			{
				alert("THERE WAS A BIG PROBLEM WHEN IT COMES TO SAVE INTO DATABASE!\nPlease contact 'The Timetool SW Developers' to fix this problem!");
			}
			else{
				if(result.trim()="success")
				{
					$("#popupdivsuccess").show();
					timeout();
				}
				else if(result.trim()=="already")
				{
					$("#popupdivalready").show();
					timeout();
				}
			}
		});
	}
	else{
		$("#popupdivfail").show();
		timeout();
	}
}
function logout()
{

	$.post('logout.php', { num:"" }, function(result) { 
		if (result == 1)
			window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
	});
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
