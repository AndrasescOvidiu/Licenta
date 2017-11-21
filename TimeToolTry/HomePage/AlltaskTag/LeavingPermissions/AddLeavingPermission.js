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
		$("#errorP1").hide();
	},2500);
}
function hide_me(){
   $('#popupdivsuccess').hide();
   $("#popupdivfail").hide();
   $("#errorP1").hide();
}
function show_me_more(){	
	if($("#popupdivsuccess").is(":visible"))
	{
		$("#popupdivsuccess").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#errorP1").is(":visible"))
	{
		$("#errorP1").css("display","blocked");
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
	if($("#errorP1").is(":visible"))
	{
		timeout();
	}
}
$(document).keypress(function(e) {
    if(e.which == 13) {
       getinfo();
    }
});
function datePick(){
        $("#datepicker").datepicker({ dateFormat: "yy-mm-dd" });
		
}
function loaddata()
{
	 $(".enddatepicker").datepicker({ minDate: new Date() ,maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),dateFormat: "yy-mm-dd",beforeShowDay: $.datepicker.noWeekends });
}
function getinfo()
{
	if($('#datepicker').val()!="")
	{
		$.post('save_lp.php',{data:$('#datepicker').val(), ore:$('#Hours_info').val(), dc:$('#reasson').val()},function(result){
			
			if(result.search("error")>-1)
			{
				alert("There was an error when trying to save into database. The page will now reload!");
				window.location.reload();
			}
			else
			{
				$("#popupdivsuccess").show();
				$("#permInfo").empty();
				$("#totHLP").empty();
				$("#overtime").empty();
				$("#totHtR").empty();
				getLPdata();
				
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
function getLPdata()
{
	var var1;
	var var2;
	var totHR=0;
	var nrHour = 0;
	$.post('getLeavingPerm.php',function(result){
		info=result.split('$#');
		dataLP=info[1].split('~^');
		oraLP=info[2].split('~^');
		
		for(i=0;i<dataLP.length-1;i++)
		{
			$('#permInfo').append('<label> Leaving permission for date : '+dataLP[i]+' for </label> <label>'+oraLP[i]+' Hours</label>	<br>');
			nrHour= nrHour + parseInt(oraLP[i]);
		}
		if(nrHour==0)
			$('#totHLP').append('<label style="color:green">Total hours from leaving permission: '+nrHour+' hours');
		else 
			$('#totHLP').append('<label style="color:red">Total hours from leaving permission: '+nrHour+' hours');
		var1=nrHour;
		$.post('script.php',function(result1){
			if(result1.trim() == "P1")
			{
				$("#errorP1").show();
				timeout();
			}else{
				var2=parseInt(result1);
				$('#overtime').append('<label>Your total overtime :'+parseInt(result1)+' hours </label>');
				if(var2>=var1)
				{
					$('#totHtR').append('<label style="color:green">Total hours to recover : 0 hours </label>');
				}
				else if(var2<var1)
				{
					totHR=var1-var2;
					$('#totHtR').append('<label style="color:red">Total hours to recover : '+totHR+' hours </label>');
				}
			}
		});
		
	});
	
	$.post('reloadLPerm.php',function(res){
		//alert(res);
	});
	
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
function checkDate(){
	var firstDay = new Date();
	var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
	var nextWeekMonth = nextWeek.getMonth()+1;
	var nextWeekYear = nextWeek.getFullYear();
	var nextWeekDay = nextWeek.getDate();
	nextWeekMonth = checkTime(nextWeekMonth);
	nextWeekDay = checkTime(nextWeekDay);
						
	var nextWeekFromNow = nextWeekYear+"-"+nextWeekMonth+"-"+nextWeekDay;
	
	$('#datepicker').val(nextWeekFromNow);
	//$("#selectcalendardate").show();
	//timeout();
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