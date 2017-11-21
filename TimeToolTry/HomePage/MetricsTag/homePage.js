var today = new Date();
var timehour=8;
var selectedMonth = today.getMonth()+1;
var requestedHours;
var currentDaysSoFar;
var doneHours = 0;
var monthChanger = 0;
var totalDaysMonth = 0;
var firstTimer = 0;

$(document).click(function() {
	$.post("checkSession.php",function(result){

			//alert(result);
			//window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
	});
});
$.post('getNorma.php', function(result) { 
	timehour = parseInt(result+"   ");
	
});
function afisare_tip_user(){
	//aici facem pentru super user sau normal user afisarea taburilor
	
		$.post('verificaresuperuser.php', {nr:11},function(result) { 
		if(result == 0) 
		{
			$("#Projects").hide();
			$("#Teams").hide();
			$("#changeNorm").hide();
		}
	});
}
function daysInMonth(month,year){
    return new Date(year, month, 0).getDate();
}
function month_change(){
	$("#fullDetailsContainter").hide();
	$("#diagramAreea").find(".hidden_label").each(function(result){
		$(this).parent("div").remove();
	});
	monthChanger = $("#monthSelector").val();

	if(monthChanger!=today.getMonth()+1){
		totalDaysMonth = daysInMonth(monthChanger,today.getFullYear());
	}
	else
		totalDaysMonth = today.getDate();
	
	$.post("getTeamUsers.php",{tn:$("#teamSelector").val(),nrd:totalDaysMonth,month:monthChanger,year:today.getFullYear()},function(result){
	
		
		var spliter = result.split("@#");
		var realNames = spliter[0].split("~^");
		
		//$usersNames."@#".$totalResultHours."@#".$norme."@#".$totalDeliverySplippage."@#".$totalEffortDeviation."@#".$totalReworkPercentage."@#".$totalReviewPercentage."@#".$totalClosedTasks."@#".$totalIwTasks."@#".$totalPpTasks."@#".$totalRwTasks."@#".$totalClosedTasks;                                     
		var totalHours = spliter[1].split("~^");
		var norme = spliter[2].split("~^");
		var totalDeliverySplippage = spliter[3].split("~^");
		var totalEffortDeviation = spliter[4].split("~^");
		var totalReworkPercentage = spliter[5].split("~^");
		var totalReviewPercentage = spliter[6].split("~^");
		var totalOpenTasks = spliter[7].split("~^");
		var totalIwTasks = spliter[8].split("~^");
		var totalPpTasks = spliter[9].split("~^");
		var totalRwTasks = spliter[10].split("~^");
		var totalClosedTasks = spliter[11].split("~^");
		var uids = spliter[12].split("~^");
		var userIds = spliter[13].split("~^");
		var totalDoneHours = spliter[14].split("~^");
		var totalRequestedHours = spliter[15].split("~^");
		
		var nrOfMemb = realNames.length-1;
		var spacier = 30;
		if(nrOfMemb > 20)
			var widthdiagr = nrOfMemb*52;
		else
			var widthdiagr = nrOfMemb*52;
		$("#hr100").css("width",widthdiagr);
		$("#hr75").css("width",widthdiagr);
		$("#hr50").css("width",widthdiagr);
		$("#hr25").css("width",widthdiagr);
		$("#downDiv").css("width",widthdiagr);
		for(var i=0;i<nrOfMemb;i++)
		{																																																																				
			var color ="";
				var productivitate = 0;
			if(totalHours[i] == 0)
				productivitate=1;
			else
				productivitate = totalHours[i];
			
			var generaredHeight = Math.floor(productivitate*298/100);
			
			if(productivitate <25)
				color ="#f10909";
			else if(productivitate < 50)
				color ="#f25b09";
			else if(productivitate < 75)
				color ="#e8e400";
			else if(productivitate < 100)
				color ="#8bd600";
			else if(productivitate >= 100)
				color ="#1cf008";
			
			if(generaredHeight>=320)
			{
				generaredHeight = 320;
				color = "#00ffbb";
			}
			$("#diagramAreea").append("<div id='first"+i+"' onmouseover='myfunc(this,"+productivitate+")' onmouseleave='myfunc2(this,"+productivitate+")' onclick='showDetails(this)'><label class='hidden_container' style='display:none'>"+uids[i]+"~!@#"+realNames[i]+"~!@#"
			+totalHours[i]+"~!@#"+norme[i]+"~!@#"+totalDeliverySplippage[i]+"~!@#"+totalEffortDeviation[i]+"~!@#"+totalReworkPercentage[i]+"~!@#"+totalReviewPercentage[i]+"~!@#"+
			totalOpenTasks[i]+"~!@#"+totalIwTasks[i]+"~!@#"+totalPpTasks[i]+"~!@#"+totalRwTasks[i]+"~!@#"+totalClosedTasks[i]+"~!@#"+userIds[i]+"~!@#"+totalDoneHours[i]+"~!@#"+totalRequestedHours[i]+"</label><label class = 'hidden_label' style='display:none'>"+realNames[i]+"</label></div>");
			var counter = "#first"+i;
			
			$("#myChart").remove();
			$("#requestedHour").remove();

			$(counter).css("background-color",color);
			$(counter).css("position","absolute");
			$(counter).css("bottom","-318px");
			$(counter).css("left",spacier+"px");
			$(counter).css("width","20px");
			$(counter).css("height",generaredHeight);
			spacier+=50;
		}
		
	});
}
function showDetails(clicked){
	$("#myChart").remove();
	$("#requestedHour").remove();
	
	$("#fullDetailsContainter").show();
	//alert($(clicked).find(".hidden_container").text());
	var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
	var table = $(clicked).find(".hidden_container").text().split("~!@#");
	var totalH = table[2];

	$("#firstLine").empty();
	$("#firstLine").append(""+table[0]+", <b>"+table[1]+"</b>, "+table[3]+"h norm ("+months[parseInt($("#monthSelector").val()-1)]+")");
	$("#deliveryLabel").text("Delivery slippage: "+table[4]+" days");
	$("#effortLabel").text("Effort deviation: "+table[5]+"%");
	$("#reworkLabel").text("Rework percentage: "+table[6]+"%");
	$("#reviewLabel").text("Review percentage: "+table[7]+"%");
	
	// adding chartpie
	
	$("#infoKeeper").text(table[13]);
	
	var productivityHours = table[14];
	var totalHoursReq = table[15];
	
	if(firstTimer == 0 || $("#diagramAreea").text().trim()!="")
	{
		firstTimer=1;
		$("#firstTimeKeeper").text(table[0]+"@#"+table[1]+"@#"+table[2]+"@#"+table[3]+"@#"+table[4]+"@#"+table[5]+"@#"+table[6]+"@#"+table[7]+"@#"+table[8]+"@#"+table[9]+"@#"+table[10]+"@#"+table[11]+"@#"+table[12]+"@#"+table[13]+"@#"+table[14]+"@#"+table[15]);
	}
	$("#chartPie").append("<canvas id='myChart' width='250' height='250' ></canvas>");
	$("#chartPie").append("<label id='requestedHour'>"+totalHoursReq+" Hours requested</label>");
	
	if(monthChanger!=today.getMonth()+1){
		totalDaysMonth = daysInMonth(monthChanger,today.getFullYear());
	}
	else
		totalDaysMonth = today.getDate();
	
	monthChanger = $("#monthSelector").val();
	
	$.post("getPieChartInfo.php",{userid:table[13],days:totalDaysMonth,month:monthChanger,year:today.getFullYear()},function(result){
		var collecter = result.split("@#");
		var projects = collecter[0].split("~^");
		var hours = collecter[1].split("~^");
		
		var data = [];
		var unjustifiedTime = totalHoursReq;
		unjustifiedTime-=productivityHours;
		for(var i=0;i<projects.length-1;i++){
			var colorz ="";
			var highlighz = "";

			if(projects[i].toUpperCase().trim()=="MEETING")
			{
				colorz+="#3febff";
				highlighz+="#8af0fc";
			}
			else if(projects[i].toUpperCase().trim()=="REVIEW")
			{
				colorz+="#225cf9";
				highlighz+="#5580f4";
			}
			else if(projects[i].toUpperCase().trim()=="TEAMBUILDING")
			{
				colorz+="#de3bf7";
				highlighz+="#e96ffc";
			}
			else if(projects[i].toUpperCase().trim()=="UNPRODUCTIVE")
			{
				colorz+="#fc911e";
				highlighz+="#f9a54a";
			}
			else if(projects[i].toUpperCase().trim()=="TRAINING")
			{
				colorz+="#f7e04f";
				highlighz+="#ffee8c";
			}
			else{
				alert("You have an unjustified project..");
				var x1= Math.floor((Math.random() * 240) + 1);
				var x2 = Math.floor((Math.random() * 240) + 1);
				var x3 = Math.floor((Math.random() * 240) + 1);
				colorz+="#"+x1.toString(16)+x2.toString(16)+x3.toString(16);
				highlighz+="#"+((x1+25).toString(16))+((x2+25).toString(16))+((x3+25).toString(16));
			}
			
			var hoursPr = hours[i];
			unjustifiedTime-=hoursPr;
			
			var holder = {value: hoursPr,color:colorz,highlight: highlighz,label: projects[i]};
			data.push(holder);
		}
		if(unjustifiedTime>0)
		{
			var holder = {value: unjustifiedTime,color:'#e5e6e8',highlight: '#f2f3f4',label:"Unjustified"};
			data.unshift(holder);
		}
		var holder = {value: productivityHours,color:'#19ff38',highlight: '#5eff74',label: "Productive"};
			data.push(holder);
		var noAnimation = {
			animation : false, 
		}
		var ctx = document.getElementById("myChart").getContext("2d");
		var myNewChart = new Chart(ctx).Pie(data,noAnimation);
		data.length = 0;
	});

	
	$("#nrTasksLabel").empty();
	$("#nrTasksLabel").append("<b>Nr of tasks: "+(parseInt(table[8])+parseInt(table[9])+parseInt(table[10])+parseInt(table[11])+parseInt(table[12]))+"<b>");
	$("#openTasksLabel").text("Open: "+table[8]);
	$("#inWorkLabel").text("In work: "+table[9]);
	$("#postponedLabel").text("Postponed: "+table[10]);
	$("#reviewedLabel").text("Reviewed: "+table[11]);
	$("#closedLabel").text("Closed: "+table[12]);
	
}
function team_changed(){
	$("#fullDetailsContainter").hide();
	$("#diagramAreea").find(".hidden_label").each(function(result){
		$(this).parent("div").remove();
	});
	//var today = new Date();
	//alert($("#teamSelector").val());
	
	monthChanger = $("#monthSelector").val();

	if(monthChanger!=today.getMonth()+1){
		totalDaysMonth = daysInMonth(monthChanger,today.getFullYear());
	}
	else
		totalDaysMonth = today.getDate();
	
	$.post("getTeamUsers.php",{tn:$("#teamSelector").val(),nrd:totalDaysMonth,month:monthChanger,year:today.getFullYear()},function(result){
		var spliter = result.split("@#");
		var realNames = spliter[0].split("~^");
		//alert(result);
		//$usersNames."@#".$totalResultHours."@#".$norme."@#".$totalDeliverySplippage."@#".$totalEffortDeviation."@#".$totalReworkPercentage."@#".$totalReviewPercentage."@#".$totalClosedTasks."@#".$totalIwTasks."@#".$totalPpTasks."@#".$totalRwTasks."@#".$totalClosedTasks;                                     
		var totalHours = spliter[1].split("~^");
		var norme = spliter[2].split("~^");
		var totalDeliverySplippage = spliter[3].split("~^");
		var totalEffortDeviation = spliter[4].split("~^");
		var totalReworkPercentage = spliter[5].split("~^");
		var totalReviewPercentage = spliter[6].split("~^");
		var totalOpenTasks = spliter[7].split("~^");
		var totalIwTasks = spliter[8].split("~^");
		var totalPpTasks = spliter[9].split("~^");
		var totalRwTasks = spliter[10].split("~^");
		var totalClosedTasks = spliter[11].split("~^");
		var uids = spliter[12].split("~^");
		var userIds = spliter[13].split("~^");
		var totalDoneHours = spliter[14].split("~^");
		var totalRequestedHours = spliter[15].split("~^");
		//alert(uids[7]+" "+totalOpenTasks[7]+" "+totalIwTasks[7]+" "+totalPpTasks[7]+" "+totalRwTasks[7]+" "+totalClosedTasks[7]);
		//alert(totalClosedTasks[8]);
		
		var nrOfMemb = realNames.length-1;
		var spacier = 30;
		if(nrOfMemb > 20)
			var widthdiagr = nrOfMemb*52;
		else
			var widthdiagr = nrOfMemb*52;
		$("#hr100").css("width",widthdiagr);
		$("#hr75").css("width",widthdiagr);
		$("#hr50").css("width",widthdiagr);
		$("#hr25").css("width",widthdiagr);
		$("#downDiv").css("width",widthdiagr);
		
		for(var i=0;i<nrOfMemb;i++)
		{																																																																				
			var color ="";
				var productivitate = 0;
			if(totalHours[i] == 0)
				productivitate=1;
			else
				productivitate = totalHours[i];
			
			var generaredHeight = Math.floor(productivitate*298/100);
			
			if(productivitate <25)
				color ="#f10909";
			else if(productivitate < 50)
				color ="#f25b09";
			else if(productivitate < 75)
				color ="#e8e400";
			else if(productivitate < 100)
				color ="#8bd600";
			else if(productivitate >= 100)
				color ="#1cf008";
			
			if(generaredHeight>=320)
			{
				generaredHeight = 320;
				color = "#00ffbb";
			}
			$("#diagramAreea").append("<div id='first"+i+"' onmouseover='myfunc(this,"+productivitate+")' onmouseleave='myfunc2(this,"+productivitate+")' onclick='showDetails(this)'><label class='hidden_container' style='display:none'>"+uids[i]+"~!@#"+realNames[i]+"~!@#"
			+totalHours[i]+"~!@#"+norme[i]+"~!@#"+totalDeliverySplippage[i]+"~!@#"+totalEffortDeviation[i]+"~!@#"+totalReworkPercentage[i]+"~!@#"+totalReviewPercentage[i]+"~!@#"+
			totalOpenTasks[i]+"~!@#"+totalIwTasks[i]+"~!@#"+totalPpTasks[i]+"~!@#"+totalRwTasks[i]+"~!@#"+totalClosedTasks[i]+"~!@#"+userIds[i]+"~!@#"+totalDoneHours[i]+"~!@#"+totalRequestedHours[i]+"</label><label class = 'hidden_label' style='display:none'>"+realNames[i]+"</label></div>");
			var counter = "#first"+i;
			
			$(counter).css("background-color",color);
			$(counter).css("position","absolute");
			$(counter).css("bottom","-318px");
			$(counter).css("left",spacier+"px");
			$(counter).css("width","20px");
			$(counter).css("height",generaredHeight);
			spacier+=50;
		}
		
	});
}
function loadTable(){
	monthChanger = today.getMonth()+1;
	$("#monthSelector").val(today.getMonth()+1);
	
	if(monthChanger!=today.getMonth()+1){
		totalDaysMonth = daysInMonth(monthChanger,today.getFullYear());
	}
	else
		totalDaysMonth = today.getDate();
	
	$.post("getTeams.php",function(result){
		var table = result.split("~^");
		for(var i = 0 ;i<table.length-1;i++)
			$("#teamSelector").append("<option>"+table[i]+"</option>");
		
		// assignare totala la inceput
		$.post("getTeamUsers.php",{tn:$("#teamSelector").val(),nrd:totalDaysMonth,month:monthChanger,year:today.getFullYear()},function(result){
		var spliter = result.split("@#");
		var realNames = spliter[0].split("~^");
		
		//$usersNames."@#".$totalResultHours."@#".$norme."@#".$totalDeliverySplippage."@#".$totalEffortDeviation."@#".$totalReworkPercentage."@#".$totalReviewPercentage."@#".$totalClosedTasks."@#".$totalIwTasks."@#".$totalPpTasks."@#".$totalRwTasks."@#".$totalClosedTasks;                                     
		var totalHours = spliter[1].split("~^");
		var norme = spliter[2].split("~^");
		var totalDeliverySplippage = spliter[3].split("~^");
		var totalEffortDeviation = spliter[4].split("~^");
		var totalReworkPercentage = spliter[5].split("~^");
		var totalReviewPercentage = spliter[6].split("~^");
		var totalOpenTasks = spliter[7].split("~^");
		var totalIwTasks = spliter[8].split("~^");
		var totalPpTasks = spliter[9].split("~^");
		var totalRwTasks = spliter[10].split("~^");
		var totalClosedTasks = spliter[11].split("~^");
		var uids = spliter[12].split("~^");
		var userIds = spliter[13].split("~^");
		var totalDoneHours = spliter[14].split("~^");
		var totalRequestedHours = spliter[15].split("~^");
		
		//alert(totalClosedTasks[8]);
		
		var nrOfMemb = realNames.length-1;
		var spacier = 30;
		if(nrOfMemb > 20)
			var widthdiagr = nrOfMemb*52;
		else
			var widthdiagr = nrOfMemb*52;
		$("#hr100").css("width",widthdiagr);
		$("#hr75").css("width",widthdiagr);
		$("#hr50").css("width",widthdiagr);
		$("#hr25").css("width",widthdiagr);
		$("#downDiv").css("width",widthdiagr);
		
		for(var i=0;i<nrOfMemb;i++)
		{																																																																				
			var color ="";
				var productivitate = 0;
			if(totalHours[i] == 0)
				productivitate=1;
			else
				productivitate = totalHours[i];
			
			var generaredHeight = Math.floor(productivitate*298/100);
			
			if(productivitate <25)
				color ="#f10909";
			else if(productivitate < 50)
				color ="#f25b09";
			else if(productivitate < 75)
				color ="#e8e400";
			else if(productivitate < 100)
				color ="#8bd600";
			else if(productivitate >= 100)
				color ="#1cf008";
			
			if(generaredHeight>=320)
			{
				generaredHeight = 320;
				color = "#00ffbb";
			}
			$("#diagramAreea").append("<div id='first"+i+"' onmouseover='myfunc(this,"+productivitate+")' onmouseleave='myfunc2(this,"+productivitate+")' onclick='showDetails(this)'><label class='hidden_container' style='display:none'>"+uids[i]+"~!@#"+realNames[i]+"~!@#"
			+totalHours[i]+"~!@#"+norme[i]+"~!@#"+totalDeliverySplippage[i]+"~!@#"+totalEffortDeviation[i]+"~!@#"+totalReworkPercentage[i]+"~!@#"+totalReviewPercentage[i]+"~!@#"+
			totalOpenTasks[i]+"~!@#"+totalIwTasks[i]+"~!@#"+totalPpTasks[i]+"~!@#"+totalRwTasks[i]+"~!@#"+totalClosedTasks[i]+"~!@#"+userIds[i]+"~!@#"+totalDoneHours[i]+"~!@#"+totalRequestedHours[i]+"</label><label class = 'hidden_label' style='display:none'>"+realNames[i]+"</label></div>");
			var counter = "#first"+i;
			$(counter).css("background-color",color);
			$(counter).css("position","absolute");
			$(counter).css("bottom","-318px");
			$(counter).css("left",spacier+"px");
			$(counter).css("width","20px");
			$(counter).css("height",generaredHeight);
			spacier+=50;
		}
		
	});
	});
}
function myfunc(param,productivitate){
	var generaredHeight = Math.floor(productivitate*298/100);
		
		if(productivitate <25)
			color ="#bc0000";
		else if(productivitate < 50)
			color ="#c14400";
		else if(productivitate < 75)
			color ="#c5d300";
		else if(productivitate < 100)
			color ="#7bbc01";
		else if(productivitate >= 100)
			color ="#11cc00";
		
		if(generaredHeight>=320)
		{
			generaredHeight = 320;
			color = "#00d69d";
		}
	$(param).css("background-color",color);
	
	$("#nameLabel").text($(param).find(".hidden_label").text());
	//alert($(param).find(".hidden_container").text());
	if($("#nameLabel").text().length>20)
	{
		$("#showName").css("height", "60px");
	}
	else
	{
		$("#showName").css("height", "50px");
	}
	if(productivitate == 1)
		$("#procentLabel").text("0%");
	else
		$("#procentLabel").text(Math.floor(productivitate)+"%");
	
	$("#showName").show();
	$("#showName").css("top",(event.clientY + document.body.scrollLeft)+"px");
	$("#showName").css("left",(event.clientX + document.body.scrollLeft)+"px");
	$("#showName").css("background-color","#a8a8a8");
	
}
function myfunc2(param,productivitate){
	var color = "";
	//alert(productivitate);
	var generaredHeight = Math.floor(productivitate*298/100);
	if(productivitate <25)
			color ="#f10909";
		else if(productivitate < 50)
			color ="#f25b09";
		else if(productivitate < 75)
			color ="#e8e400";
		else if(productivitate < 100)
			color ="#8bd600";
		else if(productivitate >= 100)
			color ="#1cf008";
		if(generaredHeight>=320)
		{
			generaredHeight = 320;
			color = "#00ffbb";
		}
	$(param).css("background-color",color);
	$("#showName").hide();
}
