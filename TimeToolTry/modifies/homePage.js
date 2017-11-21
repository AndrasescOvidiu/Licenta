var today = new Date();
var timehour=8;
var selectedMonth = today.getMonth()+1;
var requestedHours;
var currentDaysSoFar;
var doneHours = 0;
$(document).click(function() {
	$.post("checkSession.php",function(result){

			//alert(result);
			//window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
	});
});
$.post('getNorma.php', function(result) { 
	timehour = parseInt(result+"   ");
	
});
function loadTable(){
	$("#selectMonth").append("<option value = 1>January</option> <option value = 2>February</option> <option value = 3>March</option><option value = 4>April</option> <option value = 5>May</option> <option value = 6>June</option><option value = 7>July</option><option value = 8>August</option><option value = 9>September</option><option value = 10>Octomber</option><option value = 11>November</option><option value = 12>December</option>");
	$("#selectMonth").val(selectedMonth);
}
function changeFunction(){
	$('#selectMonth').unbind().on('change', function() {
		selectedMonth = parseInt($("#selectMonth").val());
		//alert(selectedMonth);
		$("#tbodyId1").empty();
		setTable();
	});
}
function setTable(){
	doneHours = 0;
	$("#showDetailed").text("Show details");
	$("#myTable2").hide();
	var today = new Date();
	var daysInMonth = new Date(today.getFullYear(),selectedMonth,0).getDate();
	if(selectedMonth!=today.getMonth()+1)
		currentDaysSoFar = new Date(today.getFullYear(),selectedMonth,0).getDate();
	else
		currentDaysSoFar = new Date(today.getFullYear(),selectedMonth,today.getDate()).getDate();
	

	var limitlow = 0;
	var limithigh = 0;
	
	$.post("getTaskLimits.php",function(result){
		var tableRes = result.split("~^");
		limitlow = tableRes[0];
		limithigh = tableRes[1];
	
	$.post("getWorkingHours.php",{ll:limitlow,lh:limithigh,days:daysInMonth,month:selectedMonth,year:today.getFullYear()},function(result){
		var getHours = result.split("~^");
	
		var table = document.getElementById("myTable");
		var rowCount = table.rows.length-1;
		var row = table.insertRow(rowCount);
		
		
		var firstLine = "<tr><th width='10%'>Days</th>";
		var secondLine ="<tr width='20%'><td>Total hours</td>";
		for(var i = 1;i<=daysInMonth;i++)
		{
			var ok = 0;
			
			var newDate = new Date(today.getFullYear(),selectedMonth-1,i);
			var newDate2=new Date();
			if(getHours[i-1]==-1)
			{	
				if(newDate.getDay()!=6 && newDate.getDay()!=0)
				{
					currentDaysSoFar--;
				}
			}
			else{
				doneHours += parseInt(getHours[i-1]);
			}
			
		if(i== newDate2.getDate() && selectedMonth == today.getMonth()+1){
			ok =1;
		}
			if(newDate.getDay()==0)
			{ 
				if(i<=today.getDate() && selectedMonth == today.getMonth()+1)
				{
					currentDaysSoFar--;
				}
				
				else
					if(selectedMonth != today.getMonth()+1)
					{
						currentDaysSoFar--;
					}
					if(i<10)
					{
						firstLine+="<th style='background-color: #b7b7b7'>0"+i+"</th>";
					}
					else
					{
						firstLine+="<th style='background-color: #b7b7b7'>"+i+"</th>";
					}
				
				if(getHours[i-1]>0)
				{
					
					if(ok==1)
						secondLine+="<td style='background-color: red'><b style='color: #ff9000'>"+getHours[i-1]+"</b></td>";
					else
						secondLine+="<td style='background-color: red'>"+getHours[i-1]+"</td>";
				}
				else
				{
					if(ok==1)
						secondLine+="<td style='background-color: #b7b7b7'><b style='color: #ff9000'>-</b></td>";
					else
						secondLine+="<td style='background-color: #b7b7b7'>-</td>";
				}
				
			}
			else if(newDate.getDay()==6){
				if(i<=today.getDate() && selectedMonth == today.getMonth()+1)
				{	
					currentDaysSoFar--;
				}
				else
					if(selectedMonth != today.getMonth()+1)
					{	
						currentDaysSoFar--;
					}
					if(i<10)
						firstLine+="<th style='background-color: #b7b7b7'>0"+i+"</th>";
					else
						firstLine+="<th style='background-color: #b7b7b7'>"+i+"</th>";
				if(getHours[i-1]>0)
				{
					
					if(ok==1)
						secondLine+="<td style='background-color: #b7b7b7'><b style='color: #ff9000'>"+getHours[i-1]+"</b></td>";
					else
						secondLine+="<td style='background-color: #b7b7b7'>"+getHours[i-1]+"</td>";
				}
				else
				{
					
					if(ok==1)
						secondLine+="<td style='background-color: #b7b7b7'><b style='color: #ff9000'>-</b></td>";
					else
						secondLine+="<td style='background-color: #b7b7b7'>-</td>";
				}
				
			}
			else
			{
				if(i<10)
					firstLine+="<th >0"+i+"</th>";
				else
					firstLine+="<th >"+i+"</th>";
				if(getHours[i-1]==-1)
				{
					if(ok ==1)
						secondLine+="<td style='background-color:#fcd7a4'><b style='color: #ff9000'>"+timehour+"</b></td>";
					else
						secondLine+="<td style='background-color:#fcd7a4'>"+timehour+"</td>";
				}
					
				else
				{
					if(ok ==1)
						secondLine+="<td style='background-color:#41ffbf'><b>"+getHours[i-1]+"</b></td>";
					else
						secondLine+="<td>"+getHours[i-1]+"</td>";
				}
			}
		}
	
		requestedHours = currentDaysSoFar*timehour;
		
		row.innerHTML = firstLine+"</tr>";
		$('#tbodyId1').append(secondLine);
		var requestText ="";
		if(selectedMonth!=today.getMonth()+1)
			requestText = "Requested hours in this month: ";
		else
			requestText = "Requested hours by far: ";
		if(requestedHours>doneHours)
			$('#tbodyId1').append("<tr style='background-color:#51a7ba'><td colspan = 8>"+requestText+requestedHours+"</td> <td colspan ="+(daysInMonth-8-10+1)+">Overtime: <font color='red'><b>"+(doneHours-requestedHours)+"</b></font></td><td colspan = 10>Done hours: "+doneHours+"</td></tr>");
		else
			$('#tbodyId1').append("<tr style='background-color:#51a7ba'><td colspan = 8>"+requestText+requestedHours+"</td> <td colspan ="+(daysInMonth-8-10+1)+">Overtime: <font color='#00ff55'><b>"+(doneHours-requestedHours)+"</b></font></td><td colspan = 10>Done hours: "+doneHours+"</td></tr>");
	if($("#lineBar").is(":visible")){
		show_details();
	}
	});
	
	
});
	
}
function show_details(){
	load_second_table();
	//alert(requestedHours+" "+currentDaysSoFar+" "+doneHours);
	var productiveProcent = doneHours*100/requestedHours;
	//alert(productiveProcent);
	if(productiveProcent>=100)
	{
		var productiveLine = 300*Math.ceil(100)/100;
		
	}
	else
		var productiveLine = 300*Math.ceil(productiveProcent)/100;
	$("#procentLabel").text(Math.ceil(productiveProcent)+"%");
	$("#lineBar").css("width",productiveLine);
	
	if(productiveProcent<40)
	{
		$("#procentLabel").css("color","red");
		$("#textLabel").css("color","red");
		$("#lineBar").css("background-color","#73b700");
		$("#lineBar").css("box-shadow","inset 120px 0px 120px -50px #a80000");
	}
	if(productiveProcent<80 && productiveProcent>=40)
	{
		$("#procentLabel").css("color","yellow");
		$("#textLabel").css("color","yellow");
		$("#lineBar").css("background-color","yellow");
		$("#lineBar").css("box-shadow","inset 120px 0px 120px -50px #73b700");
	}
	else
	if(productiveProcent>=80){
		$("#procentLabel").css("color","#09f99a");
		$("#textLabel").css("color","#09f99a");
		$("#lineBar").css("background-color","#00b76e");
		$("#lineBar").css("box-shadow","inset 120px 0px 120px -50px #156b49");
	}
	
	
	$("#progressBar").show();

	if($("#showDetailed").text()=="Hide details")
	{
		$("#myTable2").hide();
		$("#showDetailed").text("Show details");
	}
	else{
		$("#myTable2").show();
		$("#showDetailed").text("Hide details");
	}
}
function load_second_table(){
	$("#tbodyId2").empty();
	
	var today = new Date();
	
	
	var daysInMonth = new Date(today.getFullYear(),selectedMonth,0).getDate();
	
	if(selectedMonth!=today.getMonth()+1)
		currentDaysSoFar = new Date(today.getFullYear(),selectedMonth,0).getDate();
	else
		currentDaysSoFar = new Date(today.getFullYear(),selectedMonth,today.getDate()).getDate();
	
	$.post("getDetailedTaskForAMonth.php",{days:daysInMonth,month:selectedMonth,year:today.getFullYear()},function(result){
		
		var getHours = result.split("~^");
	
		var table = document.getElementById("myTable2");
		var rowCount = table.rows.length-1;
		var row = table.insertRow(rowCount);
		
		
		var firstLine = "<tr><th width='6%'>TaskId</th><th width='10%'>Project Name</th></tr>";
		var intermediar ="";
		
		for(var j = 1;j<=daysInMonth;j++)
		{
			
				if(j<10)
					firstLine+="<th>0"+j+"</th>";
				else
					firstLine+="<th>"+j+"</th>";
		}
		
		row.innerHTML =firstLine;
		
		var table = result.split("@#");
		var taskid = table[0].split("~^");
		var projectName = table[1].split("~^");
		var taskName = table[2].split("~^");
		var donehours = table[3].split("#@%~!");
		
		if(taskid <=1)
			$('#tbodyId2').append("<td colspan="+daysInMonth+">There are no tasks added in this period</td>");
		else{
		
			for(var i = 0;i<donehours.length-1;i++)
			{	
				intermediar ="";
				//alert(taskid[i]+projectName[i]+taskName[i]+donehours[i]);
				var days = donehours[i].split("~^");
				
				intermediar+="<tr><td>"+taskid[i]+"</td><td>"+projectName[i]+"</td><td>"+taskName[i]+"</td>";

				for(var j = 1;j<days.length-1;j++)
				{
					var newDate = new Date(today.getFullYear(),selectedMonth-1,j+1);
					if(newDate.getDay()== 0)
					{
						intermediar+="<td style='background-color:#b7b7b7'>"+days[j]+"</td>";
					}
					else if(newDate.getDay()==6)
					{
						intermediar+="<td style='background-color:#b7b7b7'>"+days[j]+"</td>";
					}
					else
					{
						intermediar+="<td>"+days[j]+"</td>";
					}
				}
				$('#tbodyId2').append(intermediar+"</tr>");
			}
		}
		

	});
}