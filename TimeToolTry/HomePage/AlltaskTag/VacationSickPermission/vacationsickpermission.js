function logout()
{

	$.post('logout.php', { num:"" }, function(result) { 
		if (result == 1)
			window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
	});
}
function datePick(){
        $("#datepicker").datepicker({ dateFormat: "yy-mm-dd" });
		
}
function enddatePick(){
        $("#enddatepicker").datepicker({ dateFormat: "yy-mm-dd" });
		
}
function loadData(){
	$( "#datepicker" ).datepicker({minDate: new Date() ,maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),dateFormat: "yy-mm-dd" });
	$( "#enddatepicker" ).datepicker({minDate: new Date() ,maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),dateFormat: "yy-mm-dd" });
}
function loadRequester(){
	//face load la numele celui care face requester
	
	$.post("script.php",function(result){
		$("#requester").append(result);
	})
}
function loadInfo(){
	$.post("loadData.php",function(result){
		var x=parseInt(result);
		$("#VacationYear").append('<option>'+x+'</option>')
		$("#VacationYear").append('<option>'+(x+1)+'</option>')
	})
}
function saveButton(){
	
if($("#datepicker").val()==null || $("#datepicker").val()=='' || $("#enddatepicker").val()==null || $("#enddatepicker").val()=='')alert("Please fill the blank spaces")
	else 
		if($("#datepicker").val() > $("#enddatepicker").val())alert("Choose an End-date bigger than Start-date");
	
		
	
		else{
			$("#firstDiv").css("opacity","0.6");
			$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
			$("#notify").show();
			$("#notify").find("input,button,textarea,select,a").removeAttr("disabled");
			
			
			
		}
}
function confirm(){
	// imi da un mesaj de confirmare
	$("#firstDiv").css("opacity","");
	$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#notify").hide();
	if($("#datepicker").val()==null || $("#datepicker").val()=='' || $("#enddatepicker").val()==null || $("#enddatepicker").val()=='')alert("Please fill the blank spaces")
	else 
		if($("#datepicker").val() > $("#enddatepicker").val())alert("Choose an End-date bigger than Start-date");
	
	else	
	$.post("save_vacationsickpermission.php",{yearSend:$("#VacationYear option:selected").val(), vacType:$("#vacType option:selected" ).val(), Sd:$("#datepicker").val(), Ed:$("#enddatepicker").val(), Oinf:$("#optionalInf").val()},function(result){
				alert(result);
			});
}
function cancel(){
	$("#firstDiv").css("opacity","");
	$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#notify").hide();
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
function checkDate(){
	var firstDay = new Date();
	var nextWeek = new Date(firstDay.getTime() + 3 * 24 * 60 * 60 * 1000);
	var nextWeekMonth = nextWeek.getMonth()+1;
	var nextWeekYear = nextWeek.getFullYear();
	var nextWeekDay = nextWeek.getDate();
	nextWeekMonth = checkTime(nextWeekMonth);
	nextWeekDay = checkTime(nextWeekDay);
						
	var nextWeekFromNow = nextWeekYear+"-"+nextWeekMonth+"-"+nextWeekDay;
	
	$("#enddatepicker").val(nextWeekFromNow);
	
}
function checkStartDate(){
	var firstDay = new Date();
	var nextWeek = new Date(firstDay.getTime() + 0 * 24 * 60 * 60 * 1000);
	var nextWeekMonth = nextWeek.getMonth()+1;
	var nextWeekYear = nextWeek.getFullYear();
	var nextWeekDay = nextWeek.getDate();
	nextWeekMonth = checkTime(nextWeekMonth);
	nextWeekDay = checkTime(nextWeekDay);
						
	var nextWeekFromNow = nextWeekYear+"-"+nextWeekMonth+"-"+nextWeekDay;
	
	$("#datepicker").val(nextWeekFromNow);
	
}
function loadVacations(){
	$.post("loadVac.php",function(result){
		var x = result.split("@#");
		var startD = x[0].split("%^");
		var endD = x[1].split("%^");
		var typeR = x[2].split("%^");
		var k="";
		for(i=0;i<startD.length-1;i++)
		{
			
			if(typeR[i]==4)k="Regular Vacation";
			else if(typeR[i]==2)k="Sick Vacation";
		// afiseaza vacantele planificate
			$('#vacData').append('<br><br><label>'+k+" :"+'<br>'+'<br>'+startD[i]+" --> "+endD[i]+'</label>');
			
		}
	});
}