function timeout(){
	g_timer = setTimeout(function(){
		$('#popupdivsuccess').hide();
		$("#popupdivfail").hide();
		$("#selectcalendardate").hide();
		$("#selectcalendardate").hide();
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
   $("#selectcalendardate").hide();
   $("#popupdivalready").hide();
}
function show_me_more(){	
	if($("#popupdivsuccess").is(":visible"))
	{
		$("#popupdivsuccess").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#selectcalendardate").is(":visible"))
	{
		$("#selectcalendardate").css("display","blocked");
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
	if($("#selectcalendardate").is(":visible"))
	{
		timeout();
	}
}
$(document).keypress(function(e) {
    if(e.which == 13) {
        save_db();
    }
});
function save_db(){
	if($('#usrname').val()==null || $('#usrname').val()=='' || $('#rlname').val()==null || $('#rlname').val()=='' || $('#norma').val()==null || $('#norma').val()=='' || $("#datepicker").val()==null || $("#datepicker").val()=='')
	{
		$("#popupdivfail").show();
		timeout();
		
		if($('#usrname').val().trim()=="")
		{
			$("#usrname").css("background-color","#fff463");
		}
		if($('#rlname').val().trim()=="")
		{
			$("#rlname").css("background-color","#fff463");
		}
	}
	else 
		if($('#norma').val()==4 || $('#norma').val()==6 || $('#norma').val()==8)
		{	$.post('save_new_user.php',{usname:$('#usrname').val(), rlname:$('#rlname').val() , Turs:$('#tipuser').find(":selected").text(), IdTeam:$('#teams').find(":selected").text(),Norm:$('#norma').val(),Dt:$("#datepicker").val()}, function(result) { 
				if(result.search("error")>-1)
				{
					alert("There was a BIG problem when trying to save into DATABASE! \nPlease contact the 'Timetool Developers' to fix this problem!");
				}
				else{
					if(result.trim()=="done")
					{
						$("#popupdivsuccess").show();
						timeout();	
						$("#usrname").val("");
						$("#rlname").val("");						
					}
					else
						if(result.trim()=="already")
						{
							$("#popupdivalready").show();
							timeout();	
						}
				}
			});
		}
		else alert("Nu se poate adauga o norma diferita de 8,6 sau 4 ore!");
}
function load_info(){
	$.post('script.php', function(result) { 
	if(result.search("error")>-1){
		alert("Problems when trying to get the teams from database! \nPlease contact the 'Timetool Developers' to fix this problem!");
	}
	else{
		var abcd = result.split("@#");
		var team = abcd[2].split("~^");
	
		for(var i=0;i<team.length-1;i++)
		{
			//alert("Hardware Engineering".length);
			$('#teams').append('<option>'+team[i]+'</option>');
		}
	}
	});
}
function datePick(){
        $(".enddatepicker").datepicker({ minDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) ,maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),dateFormat: "yy-mm-dd",beforeShowDay: $.datepicker.noWeekends });
}
function loaddata()
{
	$(".enddatepicker").datepicker({ minDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) ,maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),dateFormat: "yy-mm-dd",beforeShowDay: $.datepicker.noWeekends });
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
		$.post('verificaresuperuser.php', function(result) { 
	
		if(result == 0) 
		{		
			$("#Projects").hide();
			$("#Teams").hide();
			$("#changeNorm").hide();
		}
	});
}
function checkDate(){
	var firstDay = new Date();
	var year = firstDay.getFullYear();
	var taker = firstDay.getMonth()+1;
	var dater = firstDay.getDate(); 
	var month ="";
	var day="";
	if(taker <10)
		month ="0"+taker;
	else
		month =""+taker;
	if(dater<10)
		day = "0"+dater;
	else
		day =""+dater;	
	$("#datepicker").val(year+"-"+month+"-"+day);
	$("#selectcalendardate").show();
	timeout();
}
function fillDate(){
	var firstDay = new Date();
	var year = firstDay.getFullYear();
	var taker = firstDay.getMonth()+1;
	var dater = firstDay.getDate(); 
	var month ="";
	var day="";
	if(taker <10)
		month ="0"+taker;
	else
		month =""+taker;
	if(dater<10)
		day = "0"+dater;
	else
		day =""+dater;	
	$("#datepicker").val(year+"-"+month+"-"+day);
}
function clearColor(clicker){
	$(clicker).css("background-color","");
}
