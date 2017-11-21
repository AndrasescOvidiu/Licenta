function logout()
{

	$.post('logout.php', { num:"" }, function(result) { 
		if (result == 1)
			window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
	});
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
function timeout(){
	g_timer = setTimeout(function(){
		$('#popupdivsuccess').hide();
		$('#popupdivsuccessRemove').hide();
		$("#popupdivfail").hide();
		$("#popupdivalready").hide();
	},2500);
}
function hide_me(){
   $('#popupdivsuccess').hide();
   $('#popupdivsuccessRemove').hide();
   $("#popupdivfail").hide();
   $("#popupdivalready").hide();
}
function show_me_more(){	
	if($("#popupdivsuccess").is(":visible"))
	{
		$("#popupdivsuccess").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#popupdivsuccessRemove").is(":visible"))
	{
		$("#popupdivsuccessRemove").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#popupdivalready").is(":visible"))
	{
		$("#popupdivalready").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#popupdivfail").is(":visible"))
	{
		$("#popupdivfail").css("display","blocked");
		clearTimeout(g_timer);
	}
}
$(document).keypress(function(e) {
    if(e.which == 13) {
        save_db();
    }
});
function rehide_me(){
	if($("#popupdivsuccess").is(":visible"))
	{
		timeout();
	}
	if($("#popupdivsuccessRemove").is(":visible"))
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
function afisare_tip_user()
{
	//aici facem pentru super user sau normal user afisarea taburilor
	
		$.post('verificaresuperuser.php', function(result) { 
		/*if(result == 0) 
		{
			$("#TPSU").hide();
		}*/
		
	});
}
function load_info(){
	$.post('script.php', function(result) {
	if(result.search("error")>-1)
	{
		alert("There was a problem when trying to load the info from database !\n Please contact the 'Timetool developers' to fix this problem!");
	}
	else{	
			var table = result.split("@#");
			var usernames = table[0].split("~^");
			var realnames = table[1].split("~^");
			var teams = table[2].split("~^");
			
			
			for(var i =0;i<usernames.length-1;i++)
			{
				$('#users_info').append('<option onclick="assignedT()">'+usernames[i]+" | "+realnames[i]+'</option>');
			}
			for(var i =0;i<teams.length-1;i++)
			{
				$('#teams_info').append('<option>'+teams[i]+'</option>');
			}
	}
	});
}
function assignedT(){
		// arata doar membri echipe
		var userX=$('#users_info').val().split(" | ");

		$.post('load_assigned_team.php', {users:userX[0]}, function(result){ 
			if(result.search("error")>-1)
			{
				alert("There was a problem when trying to load the info from database !\n Please contact the 'Timetool developers' to fix this problem!");
			}
			else{
					$('#removePrev').remove();
					$('#assignedTM').append('<label id="removePrev" >'+result+'</label>');
			}
		});
}
function  load_team_info()
{
	$("#teams_info option").remove();
	$("#users_info option").remove();
	$('#teams_name option').remove();
	$('#team_member option').remove();
	
	$.post('script.php', function(result) { 
	if(result.search("error")>-1)
	{
		alert("There was a problem when trying to load the info from database !\n Please contact the 'Timetool developers' to fix this problem!");
	}
	else{	
		var table = result.split("@#");
		var usernames = table[0].split("~^");
		var realnames = table[1].split("~^");
		var teams = table[2].split("~^");
		for(var i =0;i<teams.length-1;i++)
		{
			$('#teams_name').append('<option>'+teams[i]+'</option>');
		}
		$('#team_member option').remove();
		$.post('loadbyteam.php', {tmbr:$("#teams_name").val()},function(result1) {
		if(result1.search("error")>-1)
			{
				alert("There was a problem when trying to load the info from database !\n Please contact the 'Timetool developers' to fix this problem!");
			}
			else{				
				var useridteam = result1.split("@#");
				var username = useridteam[0].split("~^");
				var realname = useridteam[1].split("~^");
				for(var i =0;i<username.length-1;i++)
				{
					$('#team_member').append('<option>'+username[i]+" | "+realname[i]+'</option>');
				}
			}
		});
	}

		/*
		for(var i =0;i<usernames.length-1;i++)
		{
			$('#team_member').append('<option>'+usernames[i]+" | "+realnames[i]+'</option>');
		}
		*/
		
	});
}
function save_db(){
	//adauga membri in echipa
	
	
	var user=$('#users_info').val().split(" | ");
	var team = $('#teams_info').val();
	if(user[0].trim()=="----- Select User -----")
	{
			$("#popupdivfail").show();
			timeout();
	}
	else
	{
		$.post('save_user_to_team.php', {teams:team,users:user[0]}, function(result) { 
			if(result.search("error")>-1)
				{
					alert("There was a problem when trying to save into database !\n Please contact the 'Timetool developers' to fix this problem!");
				}
				else{
					if(result.trim() == "success")
					{
						$("#popupdivsuccess").show();
						timeout();
						load_info();
						load_team_info();
						$('#removePrev').remove();
						$('#assignedTM').append('<label id="removePrev" >'+team+'</label>');
					}
					else if(result.trim() == "already")
					{
						$("#popupdivalready").show();
						timeout();
						load_info();
						load_team_info();
						$('#removePrev').remove();
						$('#assignedTM').append('<label id="removePrev" >'+team+'</label>');
					}
				}
		});
	}
}
function remove_db(){
	//sterge membri din echipa
	
	
	var user=$('#team_member').val().split(" | ");
	//var team = $('#teams_name').val();
	$.post('remove_user_from_team.php', {users:user[0]}, function(result) {	
		if(result.search("error")>-1)
			{
				alert("There was a problem when trying to remove the info from database !\n Please contact the 'Timetool developers' to fix this problem!");
			}
			else{	
				$("#popupdivsuccessRemove").show();
				timeout();
			}
		 
	});
	
}
function fill_members(){
	$('#team_member option').remove();
	$.post('loadbyteam.php', {tmbr:$("#teams_name").val()},function(result) { 
		var useridteam = result.split("@#");
		var username = useridteam[0].split("~^");
		var realname = useridteam[1].split("~^");
		for(var i =0;i<username.length-1;i++)
		{
			$('#team_member').append('<option>'+username[i]+" | "+realname[i]+'</option>');
		}
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