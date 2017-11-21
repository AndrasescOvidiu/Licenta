function timeout(){
	g_timer = setTimeout(function(){
		$('#popupdivsuccess').hide();
		$('#popupdivsuccessupdate').hide();
		$("#popupdivfail").hide();
	},2500);
}
$(document).click(function() {
	$.post('verificaresuperuser.php', {nr:11},function(result) {
		
		if(result == 0) 
		{
			if($("#Projects").css('display') === 'none' || $("#Teams").css('display') === 'none' || $("#changeNorm").css('display') === 'none')
			{
				alert("You shouldn't be here, NO ADMIN RIGHTS for you! If it's a problem,and you're an ADMIN, please report to 'Timetool Developers' to fix this. \nNow you'll be redirected to login page.");
				window.location("/Quality/TimeToolTry/LoginPage/login.php");
			}
		}
	});
});
function hide_me(){
   $('#popupdivsuccess').hide();
    $('#popupdivsuccessupdate').hide();
	$("#popupdivfail").hide();
}
function show_me_more(){	
	if($("#popupdivsuccess").is(":visible"))
	{
		$("#popupdivsuccess").css("display","blocked");
		
		clearTimeout(g_timer);
	}
	if($("#popupdivsuccessupdate").is(":visible"))
	{
		$("#popupdivsuccessupdate").css("display","blocked");
		
		clearTimeout(g_timer);
	}
	if($("#popupdivfail").is(":visible"))
	{
		$("#popupdivfail").css("display","blocked");
		clearTimeout(g_timer);
	}
}
function rehide_me(){
	if($("#popupdivsuccess").is(":visible"))
	{
		timeout();
	}
	if($("#popupdivsuccessupdate").is(":visible"))
	{
		timeout();
	}
	if($("#popupdivfail").is(":visible"))
	{
		timeout();
	}
}
$(document).keypress(function(e) {
    if(e.which == 13) {
        add_newproj();
    }
});
function load_info()
{
	var table = document.getElementById("myTable");
		var rowCount = table.rows.length;
	//alert("ceva");
	$.post('script.php', function(result) { 
		if(result.search("error")>-1){
			alert("THERE WAS A BIG PROBLEM WHEN IT COMES TO TAKE THE PROJECTS FROM DATABASE!\nPlease contact 'The Timetool SW Developers' to fix this problem!");
		}
		else
		{
			var res = result.split("@#");
			
			var projName = res[0].split('~^');
			
			var stats = res[1].split('~^');
			
			for(kz=0;kz<projName.length-1;kz++)
			{
				var row = table.insertRow(rowCount);
				var ProjectTable = "<td class ='ProjectName'>"+projName[kz]+"</td>";
				
				if(stats[kz]=='Activ')
				{ 		
						var ActiveT = " <input type='radio'   name ="+kz+" checked='checked' class='activ' > Activ<br> ";
						var InactivT = " <input type='radio'   name ="+kz+" class='inactiv'> Inactiv<br> ";
				}
				else if(stats[kz]=='Inactiv')
				{
						var ActiveT = " <input type='radio'  name ="+kz+" class='activ'> Activ<br> ";
						var InactivT = " <input type='radio'   checked='checked' name ="+kz+" class='inactiv'> Inactiv<br> ";
				}
					
				row.innerHTML="<tr>"+ProjectTable+"<td class='statsClass'>"+ActiveT+InactivT+"</td></tr>";
			}
		}
			
	});
}
function goTo()
{
    $("#search").keyup(function(){
        _this = this;
        // Show only matching TR, hide rest of them
        $.each($("tbody tr"), function() {
            if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) == -1)
				{
					$(this).hide();
					$("#last_tr").show();
					$("#search").focus().val($('#search').val());
				}
            else
			{
				$(this).show();  
				if($("#noTaskYet").val()==0)
				{
					$("#noTaskYet").hide();
				}
			}
			
        });
    }); 
}
function save_db(){
var projectN="";
	$("#myTable tbody").find('.ProjectName').each(function(){
		projectN+=$(this).text()+"~^";
	});


	var statss="";
		$("#myTable tbody").find('.ProjectName').each(function(){
			if($(this).parents("tr").find(".inactiv").is(':checked'))
				statss+='2'+'~^';
			else if($(this).parents("tr").find(".activ").is(':checked'))
				statss+='1'+'~^';
				 
		});
	
	$.post('save_project.php', {proj:projectN,stat:statss}, function(result) { 
		if(result.search("error")>-1)
		{
			alert("THERE WAS A BIG PROBLEM WHEN IT COMES UPDATE DATABASE!\nThis can generate more problems!\nPlease contact 'The Timetool SW Developers' to fix this problem!");
		}
		else{
			$("#myTable").empty();
			 load_info();
			$("#popupdivsuccessupdate").show();
			timeout();
		}
	});


}
function add_newproj(){
	if($('#nameP').val().trim().length>1)
	{
		$.post('add_new_project.php', {projN:$('#nameP').val(),stats:$('#statusP').val()}, function(result) { 
			
			if(result.search("error")>-1)
			{
				alert("THERE WAS A BIG PROBLEM WHEN IT COMES UPDATE DATABASE!\nThis can generate more problems!\nPlease contact 'The Timetool SW Developers' to fix this problem!");
			}
			else{
				$("#popupdivsuccess").show();
				timeout();
			}
		});
	}
	else
	{
		$("#popupdivfail").show();
		timeout();
	}
	
}
function checkTaskName(){
	/// verifica daca este vreo combinatie de caractere speciale @# si ~^
	
	var x = $('#nameP').val();
	if(x.length > 254)
	{
		$('#nameP').val(x.substring(0,x.length - 1));
	/*	$("#tasknametoolong").show();
		timeout();*/
	}
	for(var i=0;i<x.length-1;i++)
	{
		if(x[i] =='~' && x[i+1] == '^' || x[i] =='@' && x[i+1] =='#')
		{
			 $('#nameP').val(x.substring(0,x.length - 1));
			/*$("#introduceforbidencharacters").show();
			timeout();*/
		}
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
