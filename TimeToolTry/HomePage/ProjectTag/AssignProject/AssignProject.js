function timeout(){
	g_timer = setTimeout(function(){
		$('#popupdivsuccess').hide();
		$("#popupdivfail").hide();
		$("#popupdivassigned").hide();
	},2500);
}
$(document).click(function() {
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
   $("#popupdivassigned").hide();
   
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
	if($("#popupdivassigned").is(":visible"))
	{
		$("#popupdivassigned").css("display","blocked");
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
	if($("#popupdivassigned").is(":visible"))
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
			alert("THERE WAS A BIG PROBLEM WHEN IT COMES TO LOAD THE USERS FROM DATABASE!\nPlease contact 'The Timetool SW Developers' to fix this problem!");
		}
	else{		
		var table = result.split("@#");
		var usernames = table[0].split("~^");
		var realnames = table[1].split("~^");
		var project = table[2].split("~^");
		for(var i =0;i<usernames.length-1;i++)
		{
			$('#user').append('<option onclick="load_projects()">'+usernames[i]+" | "+realnames[i]+'</option>');
		}
		for(var i =0;i<project.length-1;i++)
		{
			$('#project').append('<option>'+project[i]+'</option>');
		}
	}
	});
	
	
}
function load_projects(){
	var user=$('#user').val().split(" | ");
	
	$('#assignedProjects').remove();
	
	$('#assignprj').append('<label id="assignedProjects">Assigned Projects:  <br></label>');
	
	$.post('load_projects.php',{users:user[0]},function(result){
		if(result.search("error")>-1)
		{
			alert("THERE WAS A BIG PROBLEM WHEN IT COMES TO LOAD THE PROJECTS FROM DATABASE!\nPlease contact 'The Timetool SW Developers' to fix this problem!");
		}
		else{
			$('#tagRealN').remove();
			$('#UserRealName').append('<label id="tagRealN">'+user[1]+' have assigned next projects:</label>');
			projects=result.split('#$');
			
			for(i=1;i<projects.length;i++)
			{
				$('#assignedProjects').append('<label id="projectsN"><br>'+projects[i]+'</label>');
			}
		}

	});
}
function save_db(){
	
	var user=$('#user').val().split(" | ");
	var project = $('#project').val();
	if(user[0].trim()!="---Select User---" && project.trim()!="---Select Project---")
	{				
		$.post('save_project_for_user.php', {proj:project,users:user[0]}, function(result) { 
			if(result.search("error")>-1)
			{
				alert("THERE WAS A BIG PROBLEM WHEN IT COMES TO SAVE INTO DATABASE!\nPlease contact 'The Timetool SW Developers' to fix this problem!");
			}
			else{
				if(result.trim()=="success")
				{
					$("#popupdivsuccess").show();
					timeout();
					load_projects();
				}
				else
				if(result.trim()=="already")
				{
					$("#popupdivassigned").show();
					timeout();
					load_projects();
				}
			}
		});
	}
	else
	{
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

