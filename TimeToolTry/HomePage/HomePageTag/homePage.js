var firstTimeNewTask = 0;
var firstWeeklyReport = 0;
var noOfTasksAdded = 0;
var nextTaskIdOther = 0;
var newChangedEndDate = "";
var i=0,timehour=0;
var overTimeMax = 10;
var checker = 0;
var luni,marti,miercuri,joi,vineri,sambata;
var nextTaskId = 0;
var errorClosedTasks = 0;
var isRework = 0;
var xvar=0;
var g_timer = null;
var now = new Date();
var onejan = new Date(now.getFullYear(), 0, 1);
var currentWeek = Math.ceil( (((now - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
var week = currentWeek;
var weekAndYear ="";
var colorator = 7;
var zeroTasks = 0 ;
function disableF5(e) { if ((e.which || e.keyCode) == 116 ) e.preventDefault(); };
function showInputClock(){
	
	var input = $('#inputClock');
	input.clockpicker({
		min: '08:00 am', 
		max: '15:00 pm',
		autoclose: true
	});
}
function openTodoTasks(){
	$("#todoListDiv").show();
}

function addNewTodo(){
	$("#tableDivTodo").append("<div style='padding:15px 30px 60px 30px' class='rowTodo'><label id='exclamationTodo'>!</label><div style='  display: inline-block;position:absolute;left:60px;width:700px;height:50px;background-color:#f9f1ea;border-width:1px;border-style:solid;border-radius:5px;border-color:#8e4301'>here's  smth</div></div>");
	if($("#tableDivTodo").height()<400)
	{
		$("#tableDivTodo").css("overflow","hidden");
		$("#todoListDiv").css("height",$("#tableDivTodo").height()+150+"px");
	}
	else
	{
		$("#tableDivTodo").css("overflow","auto");
	}
}
function removeNewTodo(){
	$("#tableDivTodo").find('.rowTodo').eq(0).remove();
	if($("#tableDivTodo").height()<400)
	{
		$("#tableDivTodo").css("overflow","hidden");
		$("#todoListDiv").css("height",$("#tableDivTodo").height()+150+"px");
	}
	else
	{
		$("#tableDivTodo").css("overflow","auto");
	}
}
function loadTodo(){
	$.post("loadTodo.php",function(result){
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth()+1;
		var day = today.getDate();
		day = checkTime(day);
		month = checkTime(month);
		var fulldate = year+"-"+month+"-"+day;
		
		var yesterday = new Date(year,month-1,day); 
		
		var prevd = new Date( yesterday.getTime() - ( 86400 * 1000 ));
		var prevYear = prevd.getFullYear();
		var prevMonth = prevd.getMonth()+1;
		var prevDay = prevd.getDate();
		prevMonth = checkTime(prevMonth);
		prevDay = checkTime(prevDay);
		var previousfulldate = prevYear+"-"+prevMonth+"-"+prevDay;
		
		if(result.search("error")>-1)
		{
			alert("There was a problem when it come to load the infos from the DATABASE..\nReload the page and then try again. If the error persist, contact 'Timetool Developers' to fix this issue");
		}
		else
		{
			var table = result.split("@#");
			var taskids = table[0].split("~^");
			var titles = table[1].split("~^");
			var important = table[2].split("~^");
			var hours = table[3].split("~^");
			var dates = table[4].split("~^");
			
			for(var i=0;i<taskids.length-1;i++)
			{
				var labelIdentificator = "<label class='taskidsTodo' style='display:none'>"+taskids[i]+"</label>";
				var spliterHour = hours[i].split(":");
				var hour = spliterHour[0]+":"+spliterHour[1];
				var date = "";
				if(dates[i]==fulldate)
					date+="today";
				else if(dates[i]==previousfulldate)
					date+="yesterday";
				else
					date+= dates[i];
				
				var buttons="<div id='buttonsNewTodo' style='position:absolute;left:580px;'><button onclick='importantTodo(this)' title='Make this task important' style='background-color: #f9f1ea;width:13px;height:43px;padding:0px;margin:0px;text-align:center;border-style: none;border-color: #e0d2c9;border-radius:3px;position:absolute;top:5px;'><label id='exclamationNewTodo'>!</label></button><button onclick='saveTodo(this)' title='Mark as done' style='background-color: #f9f1ea;width:30px;height:auto;padding:0px;border-style: none;border-color: #e0d2c9;border-radius:3px;position:absolute;top:10px;left:30px'><img src='successTodo.png' style='width:30px;height:auto'/></button><button onclick='deleteTodo(this)' title='Delete this task' style='background-color: #f9f1ea;width:20px;height:auto;padding:0px;border-style: none;border-color: #e0d2c9;border-radius:3px;position:absolute;top:15px;left:75px'><img src='deleteTodo.png' style='width:20px;height:auto'/></button></div>";
				var hourLabel ="<label style='position:absolute;left:365px; font-size:20px;top:15px;'> <b>"+hour+"</b>, </label>";
				var dateLabel ="<label style='position:absolute;left:419px; font-size:19px;top:16px;'>"+date+"</label>";
				var title = "<label class='changeTitleLabel' ondblclick='changeLabelToInput(this)' id ='reserved' title ='"+titles[i]+"' style='position:absolute;left:15px;top:15px;font-size:19px'>"+titles[i]+"</label>";
				
				
				var exclamationLabel  ="";
				if(important[i]=="1")
					exclamationLabel +="<label class='exclamationTodo'>!</label>";

				var reserved = $( ".changeTitleLabel" ).last();
				
				if(i==taskids.length-2)  // e ultimul, trebuie adaugat padding jos
				{
					var outerDiv = "<div style='padding:30px 30px 60px 30px;' class='rowTodo'>";
					var innerDiv = "<div class='innerDivTodo' style='  display: inline-block;position:absolute;left:60px;width:700px;height:50px;background-color:#f9f1ea;border-width:1px;border-style:solid;border-radius:5px;border-color:#8e4301'>";
					var closeDiv = "</div>";
					$("#tableDivTodo").append(outerDiv+exclamationLabel+innerDiv+labelIdentificator+title+hourLabel+dateLabel+buttons+closeDiv+closeDiv);
					
					if($(reserved).width()>300)
					{
						$(reserved).css("width","300px"); 
						$(reserved).css("text-overflow","ellipsis"); 
						$(reserved).css("overflow","hidden"); 
						$(reserved).css("white-space","nowrap");  
					}
				}
				else{
					var outerDiv = "<div style='padding:30px;' class='rowTodo'>";
					
					var innerDiv = "<div style='  display: inline-block;position:absolute;left:60px;width:700px;height:50px;background-color:#f9f1ea;border-width:1px;border-style:solid;border-radius:5px;border-color:#8e4301'>";
					var closeDiv = "</div>";
					$("#tableDivTodo").append(outerDiv+exclamationLabel+innerDiv+labelIdentificator+title+hourLabel+dateLabel+buttons+closeDiv+closeDiv);
					
					if($(reserved).width()>300)
					{
						$(reserved).css("width","300px"); 
						$(reserved).css("text-overflow","ellipsis"); 
						$(reserved).css("overflow","hidden"); 
						$(reserved).css("white-space","nowrap");  
					}
				}
			}
			if($("#tableDivTodo").height()<400)
			{
				$("#tableDivTodo").css("overflow","hidden");
				$("#todoListDiv").css("height",$("#tableDivTodo").height()+150+"px");
			}
			else
			{
				$("#tableDivTodo").css("overflow","auto");
			}
		}
	});
}
function saveTodo(clicked){
	var innerdiv = $(clicked).parent("div");
	var outerdiv = $(innerdiv).parent("div");
	
	var taskid = $(outerdiv).find(".taskidsTodo").text();
	var title = ""+$(outerdiv).find(".inputNewTodo").val();
	
	if(title == "undefined")
		alert("nothig to show");
	else{
		
		$.post("saveTodo.php",{tid:taskid,ttl:title},function(result){
			if(result.trim() =="success")
			{
				alert("gud gud");
				
				$(outerdiv).find(".changeTitleLabel").text(title);
				$(outerdiv).find(".changeTitleLabel").attr("title",title);
				$(outerdiv).find(".inputNewTodo").remove();
				var reserved = $(outerdiv).find(".changeTitleLabel");
				if($(reserved).width()>300)
				{
					$(reserved).css("width","300px"); 
					$(reserved).css("text-overflow","ellipsis"); 
					$(reserved).css("overflow","hidden"); 
					$(reserved).css("white-space","nowrap");  
				}
			}
			else if(result.trim() =="errorNotInRange")
			{
				alert("You try to update a todo task that is not valid..Reload the page and try again.If the error persist, contact the 'Timetool Developers' to fix this issue");
			}
			else{
				alert("There was a problem when trying to update database.. Reload the page and try again.If the error persist, contact the 'Timetool Developers' to fix this issue");
			}
		});
	}
}
function importantTodo(clicked)
{
	var innerdiv = $(clicked).parent("div");
	var outerdiv = $(innerdiv).parent("div");
	var outerouter = $(outerdiv).parent("div");
	var important = $(outerouter).find(".exclamationTodo").text();
	if(important.trim()=="!")
	{
		$.post("makeTodoImportant.php",{},function(result){
			alert(result);
		});
		$(outerouter).find(".exclamationTodo").remove();
	}
	else
	{
		$.post("makeTodoImportant.php",{},function(result){
			alert(result);
		});
		$(outerouter).prepend("<label class='exclamationTodo'>!</label>");
	}
	
	
}
function changeLabelToInput(clicked){
	var textIs = ""+$(clicked).parent("div").find(".changeTitleLabel").text();
	var inputTodo = "<input class='inputNewTodo' value='"+textIs+"'></input>";
	$(clicked).parent("div").append(inputTodo);
	document.title ="(1) important task !";
}

$(document).bind("keydown", disableF5);
$.post("setFirstDateEntered.php",function(result){
	if(result.search("error")>-1)
		alert("Hmm, some problems when trying to save the startdate on Database..\nPlease reload the page.");
});
$.post('getsForHomepage.php', {nr:9},function(result) {  
	if(result == 0)
	{
		firstWeeklyReport = 0;
	}
	else
		firstWeeklyReport = 1;
});
$.post('getsForHomepage.php',{nr:6,coll:1}, function(result) { 
	if(result == 0)
	{
		firstTimeNewTask = 0;
	}
	else
		firstTimeNewTask = 1;
});
$(document).on('keydown',function(e){
	
	  var $target = $(e.target||e.srcElement);
	  if(e.keyCode == 8 )
	 {
		 if(!$target.is('textarea,input')  || $target.is('[readonly]'))
			e.preventDefault();
	 }
});
$.post('getsForHomepage.php', {nr:0}, function(result) { 
	nextTaskId = parseInt(result);
});
$.post("getsForHomepage.php",{nr:4,coll:2},function(result){
	nextTaskIdOther= parseInt(result);
});
$.post('getsForHomepage.php', {nr:6,coll:1},function(result) { 
	if(result == 0)
	{
		firstTimeNewTask = 0;
	}
	else
		firstTimeNewTask = 1;
});
$.post('getsForHomepage.php', {nr:9},function(result) { 
	if(parseInt(result) == 0)
	{
		firstWeeklyReport = 0;
	}
	else
		firstWeeklyReport = 1;
});
$.post('getsForHomepage.php',{nr:1},function(result){
	noOfTasksAdded = parseInt(result);
});
$(document).ready(function() {
	
	if(checker == 0){
		
		$(document).on("click",function(e){
			$.post("checksForHomepage.php",{nr:2},function(result){
					if(result == 'error')
					{
							if($("#myTable").css('opacity')=='0.6')
							{
								
								$("#descriptionDetails").hide();
								$("#reestimatedDetails").hide();
								$("#requestDiv").hide();
								$("#OpenDiv").hide();
								$("#weeklyReportDiv").hide();
								$("#reviewDetails").hide();
							}
							
							$("#myTable").css('opacity', '0.6');
							$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
							$("#relogareDiv").find("input,button,textarea,select,a").removeAttr("disabled");
							$("#relogareDiv").show();
							$("#relogareInput").focus();
					}			
			});
		});
	}
	else
		$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
	
	/*var test = 5;
	if(test<=5){
		$("#fucker")css("height",80*test+"px");
		$("#tableDivTodo").css("overflow-y","hidden");
	}
	else
	{
		$("#tableDivTodo").css("overflow-y","auto");
	}
	for(var i=0;i<test;i++)
	{
		$("#tableDivTodo").append("<div style='padding:30px;'><label id='exclamationTodo'>!</label><div style='position:absolute;left:60px;width:700px;height:50px;background-color:#f9f1ea;border-width:1px;border-style:solid;border-radius:5px;border-color:#8e4301'>here's  smth else</div></div>");	
	}
	*/
	
	
});
function timeout(){
	g_timer = setTimeout(function(){
		$('#popupdivsuccess').hide();
		$('#popupdivfail').hide();
		$('#opentaskdeleteerror').hide();
		$('#addhouronclickerror').hide();
		$('#deletewhennotaskareselected').hide();
		$('#savedetailstasks').hide();
		$("#introduceforbidencharacters").hide();
		$("#succesfullydeleted").hide();
		$("#selectcalendardate").hide();
		$("#tasknametoolong").hide();
		$("#notasknameorestimtime").hide();
		$("#statuschangenotallowed").hide();
		$("#clickOnNotEditableEstimation").hide();
		$("#cantaddmoretasks").hide();
		$("#cantdeleteopentasksfromdatabase").hide();
		$("#cantaddtaskondiffweek").hide();
		$("#moveminusweek").hide();
		$("#morehoursonday").hide();
		$("#saveintodatabase").hide();
		$("#youhavenotasks").hide();
		$("#noprojects").hide();
	},2500);
}
function resetColor(clicked){
	setTimeout(function(){
		$(clicked).css("background","");
		$(clicked).find(".edit_button").val("0");
	},2500);
}
function datePick(){
     $(".enddatepicker").datepicker({ minDate: new Date() ,maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),dateFormat: "yy-mm-dd",beforeShowDay: $.datepicker.noWeekends });
}
function oneWeekDatePick(){
	var today = new Date();
	today.setDate(today.getDate() - 1);
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var day = today.getDate();
	var prevday = today.getDate()-1;
	prevday = checkTime(prevday);
	day = checkTime(day);
	
	month = checkTime(month);
	var prev1day = year+"/"+month+"/"+day;
	
	var today = new Date();
	today.setDate(today.getDate() +14);
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var day = today.getDate();
	var prevday = today.getDate()-1;
	prevday = checkTime(prevday);
	day = checkTime(day);
	
	month = checkTime(month);
	var coming7days = year+"/"+month+"/"+day;
	
	 $(".enddatepicker").datepicker({ minDate: new Date(prev1day) ,maxDate: new Date(coming7days),dateFormat: "yy-mm-dd",beforeShowDay: $.datepicker.noWeekends});
}
function instantiateDatePick(){
	$(".enddatepicker").datepicker({minDate: new Date() ,maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),dateFormat: "yy-mm-dd",beforeShowDay: $.datepicker.noWeekends });
	//var t = setTimeout(alert("yoy"), 5000);
}
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
	var month = today.getMonth();
	
	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	var monthName = month[today.getMonth()];
	
	var day = today.getDate();
	var year = today.getFullYear();
	
	day = checkTime(day);
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	
    document.getElementById('date_time').innerHTML =day+"/"+monthName+"/"+year+" " +h + ":" + m + ":" + s;
	

    var t = setTimeout(startTime, 500);
	
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
function getCurrentDay(){
	var today = new Date();
	return today.getDay();
}
function addhour(clicked_id){
	
	var k = clicked_id;
	if($(k).parents("tr").find('.edit_button').val()==0)
	{
		$('#addhouronclickerror').show();
		timeout();
	}
	if($(k).parents("tr").find(".taskIdentificator").text()=="1/" && $(k).parents("tr").find('.edit_button').val()==1)
	{
		$(k).parents("tr").find(".statusClass").val("In work");
	}

					if($(k).parents("td").find('.luni').attr('class')=='luni neededhour' && $(k).parents("tr").find('.edit_button').val()==1)
					{	
				        var table = checkDaySumHours().split("/");
						var spliter = daySumOnOtherForProductiveTasks(new Date()).split("/");
						var todayHours = parseInt(spliter[1]);
						var yesterdayHours = parseInt(spliter[0]);
						//table[0]+=yesterdayHours;
						
	
						if(getCurrentDay()==1)
						{
							var tableHourToday = parseInt(table[0]);
							tableHourToday+=todayHours;
							
							if(tableHourToday>=overTimeMax)
							{
								$("#morehoursonday").show();
								timeout();
							}
							else{
								
								var x = $(k).parents("td").find(".luni").text();
								var z = x.split('/');
								var first = parseInt(z);

								first ++ ;
								if(timehour <=6)
									{if(first <=8)
										$(k).parents("td").find(".luni").text(first+"/"+timehour);
								}
								if(timehour>=7)
								{
									if(first <=12)
									$(k).parents("td").find(".luni").text(first+"/"+timehour);
								}
							}
						}
						else
						if(getCurrentDay()==2)
						{
							var tableHourYesterday = parseInt(table[0]);
							tableHourYesterday+=yesterdayHours;
							
							if(tableHourYesterday>=overTimeMax)
							{
								$("#morehoursonday").show();
								timeout();
							}
							else{
								var x = $(k).parents("td").find(".luni").text();
								var z = x.split('/');
								var first = parseInt(z);
								first ++ ;
								if(timehour <=6)
									{if(first <=8)
										$(k).parents("td").find(".luni").text(first+"/"+timehour);
								}
								if(timehour>=7)
								{
									if(first <=12)
									$(k).parents("td").find(".luni").text(first+"/"+timehour);
								}
							}
						}
						
					}
					if($(k).parents("td").find('.marti').attr('class')=='marti neededhour'&& $(k).parents("tr").find('.edit_button').val()==1)
					{
						var table = checkDaySumHours().split("/");
						var spliter = daySumOnOtherForProductiveTasks(new Date()).split("/");
						var todayHours = parseInt(spliter[1]);
						var yesterdayHours = parseInt(spliter[0]);
						
						
						if(getCurrentDay()==2)
						{
							var tableHourToday = parseInt(table[1]);
							tableHourToday+=todayHours;
							
							if(tableHourToday>=overTimeMax)
							{
								$("#morehoursonday").show();
								timeout();
							}
							else{
								var x = $(k).parents("td").find(".marti").text();
								var z = x.split('/');
								var first = parseInt(z);
								first ++ ;
								if(timehour <=6)
									{if(first <=8)
										$(k).parents("td").find(".marti").text(first+"/"+timehour);
								}
								if(timehour>=7)
								{
									if(first <=12)
									$(k).parents("td").find(".marti").text(first+"/"+timehour);
								}
							}
						}
						else
						if(getCurrentDay()==3)
						{
							var tableHourYesterday = parseInt(table[0]);
							tableHourYesterday+=yesterdayHours;
							
							if(tableHourYesterday>=overTimeMax)
							{
								$("#morehoursonday").show();
								timeout();
							}
							else{
								var x = $(k).parents("td").find(".marti").text();
								var z = x.split('/');
								var first = parseInt(z);
								first ++ ;
								if(timehour <=6)
									{if(first <=8)
										$(k).parents("td").find(".marti").text(first+"/"+timehour);
								}
								if(timehour>=7)
								{
									if(first <=12)
									$(k).parents("td").find(".marti").text(first+"/"+timehour);
								}
							}
						}
						
					}
					if($(k).parents("td").find('.miercuri').attr('class')=='miercuri neededhour' && $(k).parents("tr").find('.edit_button').val()==1)
					{
						
						var table = checkDaySumHours().split("/");
						var spliter = daySumOnOtherForProductiveTasks(new Date()).split("/");
						var todayHours = parseInt(spliter[1]);
						var yesterdayHours = parseInt(spliter[0]);
						
						if(getCurrentDay()==3)
						{
							var tableHourToday = parseInt(table[1]);
							tableHourToday+=todayHours;
							
							if(tableHourToday>=overTimeMax)
							{
								$("#morehoursonday").show();
								timeout();
							}
							else{
								var x = $(k).parents("td").find(".miercuri").text();
								var z = x.split('/');
								var first = parseInt(z);
								first ++ ;
								if(timehour <=6)
									{if(first <=8)
										$(k).parents("td").find(".miercuri").text(first+"/"+timehour);
								}
								if(timehour>=7)
								{
									if(first <=12)
									$(k).parents("td").find(".miercuri").text(first+"/"+timehour);
								}
							}
						}
						else
						if(getCurrentDay()==4)
						{
							var tableHourYesterday= parseInt(table[0]);
							tableHourYesterday+=yesterdayHours;
							
							if(tableHourYesterday>=overTimeMax)
							{
								$("#morehoursonday").show();
								timeout();
							}
							else{
								var x = $(k).parents("td").find(".miercuri").text();
								var z = x.split('/');
								var first = parseInt(z);
								first ++ ;
								if(timehour <=6)
									{if(first <=8)
										$(k).parents("td").find(".miercuri").text(first+"/"+timehour);
								}
								if(timehour>=7)
								{
									if(first <=12)
									$(k).parents("td").find(".miercuri").text(first+"/"+timehour);
								}
							}
						}
						
					}
					if($(k).parents("td").find('.joi').attr('class')=='joi neededhour' && $(k).parents("tr").find('.edit_button').val()==1)
					{
						var table = checkDaySumHours().split("/");
						var spliter = daySumOnOtherForProductiveTasks(new Date()).split("/");
						var todayHours = parseInt(spliter[1]);
						var yesterdayHours = parseInt(spliter[0]);
						
						if(getCurrentDay()==4)
						{
							var tableHourToday = parseInt(table[1]);
							tableHourToday+=todayHours;
							
							if(tableHourToday>=overTimeMax)
							{
								$("#morehoursonday").show();
								timeout();
							}
							else{
								var x = $(k).parents("td").find(".joi").text();
								var z = x.split('/');
								var first = parseInt(z);
								first ++ ;
								if(timehour <=6)
									{if(first <=8)
										$(k).parents("td").find(".joi").text(first+"/"+timehour);
								}
								if(timehour>=7)
								{
									if(first <=12)
									$(k).parents("td").find(".joi").text(first+"/"+timehour);
								}
							}
						}
						else
						if(getCurrentDay()==5)
						{
							var tableHourYesterday = parseInt(table[0]);
							tableHourYesterday+=yesterdayHours;
							
							if(tableHourYesterday>=overTimeMax)
							{
								$("#morehoursonday").show();
								timeout();
							}
							else{
								var x = $(k).parents("td").find(".joi").text();
								var z = x.split('/');
								var first = parseInt(z);
								first ++ ;
								if(timehour <=6)
									{if(first <=8)
										$(k).parents("td").find(".joi").text(first+"/"+timehour);
								}
								if(timehour>=7)
								{
									if(first <=12)
									$(k).parents("td").find(".joi").text(first+"/"+timehour);
								}
							}
						}
						
					}
					if($(k).parents("td").find('.vineri').attr('class')=='vineri neededhour' && $(k).parents("tr").find('.edit_button').val()==1)
					{
						var table = checkDaySumHours().split("/");
						var spliter = daySumOnOtherForProductiveTasks(new Date()).split("/");
						var todayHours = parseInt(spliter[1]);
						var yesterdayHours = parseInt(spliter[0]);
						
						if(getCurrentDay()==5)
						{
							var tableHourToday = parseInt(table[1]);
							tableHourToday+=todayHours;
							
							if(tableHourToday>=overTimeMax)
							{
								$("#morehoursonday").show();
								timeout();
							}
							else{
								var x = $(k).parents("td").find(".vineri").text();
								var z = x.split('/');
								var first = parseInt(z);
								first ++ ;
								if(timehour <=6)
									{if(first <=8)
										$(k).parents("td").find(".vineri").text(first+"/"+timehour);
								}
								if(timehour>=7)
								{
									if(first <=12)
									$(k).parents("td").find(".vineri").text(first+"/"+timehour);
								}
							}
						}
						else
						if(getCurrentDay()==6)
						{
							var tableHourYesterday = parseInt(table[0]);
							tableHourYesterday+=yesterdayHours;
							
							if(tableHourYesterday>=overTimeMax)
							{
								$("#morehoursonday").show();
								timeout();
							}
							else{
								var x = $(k).parents("td").find(".vineri").text();
								var z = x.split('/');
								var first = parseInt(z);
								first ++ ;
								if(timehour <=6)
									{if(first <=8)
										$(k).parents("td").find(".vineri").text(first+"/"+timehour);
								}
								if(timehour>=7)
								{
									if(first <=12)
									$(k).parents("td").find(".vineri").text(first+"/"+timehour);
								}
							}
						}
						
					}
					
					/*if($(k).parents("td").find('.sambata').attr('class')=='sambata neededhour' && $(k).parents("tr").find('.edit_button').val()==1)
					{
						var table = checkDaySumHours().split("/");
						if(table[0]>=overTimeMax || table[1]>=overTimeMax)
						{
							alert("showdiv");
						}
						else{
						var x = $(k).parents("td").find(".sambata").text();
						var z = x.split('/');
						var first = parseInt(z);
						first ++ ;
						if(timehour <=6)
							{if(first <=8)
								$(k).parents("td").find(".sambata").text(first+"/"+timehour);
						}
						if(timehour>=7)
						{
							if(first <=12)
							$(k).parents("td").find(".sambata").text(first+"/"+timehour);
						}
						}
						
					}*/
}
function removehour(clicked_id){
	var k = clicked_id;
	if($(k).parents("tr").find('.edit_button').val()==0)
	{
		$('#addhouronclickerror').show();
		timeout();
	}
					if($(k).parents("td").find('.luni').attr('class')=='luni neededhour' && $(k).parents("tr").find('.edit_button').val()==1)
					{	
						var x = $(k).parents("td").find(".luni").text();
						var z = x.split('/');
						var first = parseInt(z);
						
						first -- ;
						if(first >=0)
						$(k).parents("td").find(".luni").text(first+"/"+timehour);
					}
					if($(k).parents("td").find('.marti').attr('class')=='marti neededhour'&& $(k).parents("tr").find('.edit_button').val()==1)
					{
						var x = $(k).parents("td").find(".marti").text();
						var z = x.split('/');
						var first = parseInt(z);
						first -- ;
						if(first >=0)
						$(k).parents("td").find(".marti").text(first+"/"+timehour);
					}
					if($(k).parents("td").find('.miercuri').attr('class')=='miercuri neededhour' && $(k).parents("tr").find('.edit_button').val()==1)
					{
						var x = $(k).parents("td").find(".miercuri").text();
						var z = x.split('/');
						var first = parseInt(z);
						first -- ;
						if(first >=0)
						$(k).parents("td").find(".miercuri").text(first+"/"+timehour);
					}
					if($(k).parents("td").find('.joi').attr('class')=='joi neededhour' && $(k).parents("tr").find('.edit_button').val()==1)
					{
						
						var x = $(k).parents("td").find(".joi").text();
						var z = x.split('/');
						var first = parseInt(z);
						first -- ;
						if(first >=0)
						$(k).parents("td").find(".joi").text(first+"/"+timehour);
					}
					if($(k).parents("td").find('.vineri').attr('class')=='vineri neededhour' && $(k).parents("tr").find('.edit_button').val()==1)
					{
						
						var x = $(k).parents("td").find(".vineri").text();
						var z = x.split('/');
						var first = parseInt(z);
						first -- ;
						if(first >=0)
						$(k).parents("td").find(".vineri").text(first+"/"+timehour);
					}
					
					if($(k).parents("td").find('.sambata').attr('class')=='sambata neededhour' && $(k).parents("tr").find('.edit_button').val()==1)
					{
						
						var x = $(k).parents("td").find(".sambata").text();
						var z = x.split('/');
						var first = parseInt(z);
						first -- ;
						if(first >=0)
						$(k).parents("td").find(".sambata").text(first+"/"+timehour);
					}

}
function edittask(clicked){
	var btnClicked = clicked;
	if($(btnClicked).val()==0)
	{
		$(btnClicked).parents("tr").css("background-color","#ffbaba");
		$(btnClicked).val("1");
	}
	else
	{
		$(btnClicked).parents("tr").css("background-color","");
		$(btnClicked).val("0");
	}
}
function goTo(){
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
function NewTask(){
	if(week != currentWeek)
	{
		$("#cantaddtaskondiffweek").show();
		timeout();
	}
	else{
		
		if(noOfTasksAdded == 5)
		{
			$("#cantaddmoretasks").show();
			timeout();
		}
		else
		{
			// aici verifici daca ii adaugi "Is Rework For" -verificare proiect asignat, si daca mai ai task pe acel proiect care il ai
			var d1 = getDateOfWeek(week,2017);
			var d2 = getDateOfWeek(week+1,2017);
			var daySelected = checkTime(d1.getDate());
			var monthSelected = checkTime(d1.getMonth()+1);
			var constructor1 = d1.getFullYear()+"-"+monthSelected+"-"+daySelected;
			
			var dateOnWeek = "";
			for(var i = 1;i<=5;i++)
			{
				var dateCreated1 = new Date(constructor1);
				dateCreated1.setDate(dateCreated1.getDate() + i);
				
				var dayForSelected = checkTime(dateCreated1.getDate());
				var monthForSelected = checkTime(dateCreated1.getMonth()+1);
				var constructor2 = dateCreated1.getFullYear()+"-"+monthForSelected+"-"+dayForSelected;
				
				dateOnWeek+=constructor2+"~^";
			}

			$.post("checksForHomepage.php",{nr:1,dW:dateOnWeek},function(resultK){
				var spliter = resultK.split("$%$");
				
				if(resultK=="error")
				{
					alert("Well, this is a big problem! Somehow the database dont work properly.. ");
				}
				else{
					if(spliter[0].trim().length>0)
					{
						isRework = 1;
					}
				}
				var norme = spliter[1].split("~^");
				
				noOfTasksAdded++;
				 // add nr of tasks inserted
				luni=0;
				marti=0;
				miercuri=0;
				joi=0;
				vineri=0;
				sambata = 0;
				var table = document.getElementById("myTable");
				
				nextTaskId=nextTaskId+1;
				$("#labelId").text(nextTaskId);
				var currentDay = getCurrentDay();
									
								
								var labelIdentificatorNewTask = "<label style='display:none' class ='taskIdentificator'>1/</label>";
								
								var taskid = "<td class ='taskID'>"+labelIdentificatorNewTask+nextTaskId+"</td>";
								var projectname = "<td class ='projectName'><select class ='projectNameClass' id ='listaProiecte' ></select</td>";
								
								$.post('getsForHomepage.php', {nr:5},function(result) { 
							
									var projects = result.split("~^");
									if(isRework == 1){
										$('#listaProiecte').append('<option onclick="changeProject(this)" value ='+nextTaskId+'>'+"Is rework for"+'</option>');
										$("#labelInfoFullHolder").text(spliter[0]);
									}
									if(zeroTasks == 1 && projects.length <=1)
									{
										$("#tbodyId tr").eq(0).remove();
									}
									if(projects.length >1){
										var row = table.insertRow(1);
											for(var i=0;i<projects.length-1;i++)
											{
												$('#listaProiecte').append('<option>'+projects[i]+'</option>');
											}
											
											var taskname = "<td class ='taskName'><input type='text' class ='taskNameClass' oninput ='checkTaskName(this)' style='width:130px'></input></td>";
											var addplusbutton = "<button  class='add_hours' onclick='addhour(this)' ><img  src='add_hours.png' style='width:15px; height:15px;' > </img>  </button> ";
											var addminusbutton = "<button   class='remove_hours' onclick='removehour(this)'> <img  src='remove_hours.png' style='width:15px; height:15px;' > </img> </button>";
											
											var today = new Date();
											var year = today.getFullYear();
											var month = today.getMonth()+1;
											var day = today.getDate();
											
											var prevday = today.getDate()-1;
											
											prevday = checkTime(prevday);
											day = checkTime(day);
											
											month = checkTime(month);
											
											var fulldate = year+"-"+month+"-"+day;
											var previousfulldate = year+"-"+month+"-"+prevday;
											var labelcurrentdate = "<label style='display:none' class='currdate'> "+fulldate+" </label>";
											var labelpreviousdate = "<label style='display:none' class ='prevdate'> "+previousfulldate+" </label>";
											
											
											//var dateOverAWeek = Date.parse('next wednesday');
											var firstDay = new Date();
											var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
											var nextWeekMonth = nextWeek.getMonth()+1;
											var nextWeekYear = nextWeek.getFullYear();
											var nextWeekDay = nextWeek.getDate();
											nextWeekMonth = checkTime(nextWeekMonth);
											nextWeekDay = checkTime(nextWeekDay);
											
											var nextWeekFromNow = nextWeekYear+"-"+nextWeekMonth+"-"+nextWeekDay;
										
											if(currentWeek == week)
											{
												if(currentDay == 1)  // azi e luni ,doar luni se modifica
												{
													var stringLuni =  "<td class='luniTDClass'>"+labelcurrentdate+addminusbutton+"<label class='luni neededhour' >"+0+"/"+norme[0]+"</label>"+addplusbutton+" </td>";
													var stringMarti =  "<td class='martiTDClass'><label class='marti neededhour' >"+0+"/"+[1]+"</label> </td>";
													var stringMiercuri = "<td class='miercuriTDClass'><label class='miercuri neededhour' >"+0+"/"+norme[2]+"</label> </td>";
													var stringJoi = " <td class='joiTDClass'><label class='joi neededhour' >"+0+"/"+norme[3]+"</label> </td>";
													var stringVineri =" <td class='vineriTDClass'><label class='vineri neededhour' >"+0+"/"+norme[4]+"</label> </td>";
												}
												if(currentDay == 2) // azi e marti,luni si marti
												{
													var stringLuni =  "<td class='luniTDClass'>"+labelpreviousdate+addminusbutton+"<label class='luni neededhour' >"+0+"/"+norme[0]+"</label>"+addplusbutton+" </td>";
													var stringMarti =  "<td class='martiTDClass'>"+labelcurrentdate+addminusbutton+"<label class='marti neededhour' >"+0+"/"+norme[1]+"</label>"+addplusbutton+"</td>";
													var stringMiercuri = " <td class='miercuriTDClass'><label class='miercuri neededhour' >"+0+"/"+norme[2]+"</label> </td>";
													var stringJoi = " <td class='joiTDClass'><label class='joi neededhour' >"+0+"/"+norme[3]+"</label> </td>";
													var stringVineri =" <td class='vineriTDClass'><label class='vineri neededhour' >"+0+"/"+norme[4]+"</label> </td>";
												}
												if(currentDay == 3) // azi e mier,marti si mie
												{
													
													var stringLuni =  "<td class='luniTDClass'><label class='luni neededhour' >"+0+"/"+norme[0]+"</label> </td>";
													var stringMarti =  "<td class='martiTDClass'>"+labelpreviousdate+addminusbutton+"<label class='marti neededhour' >"+0+"/"+norme[1]+"</label>"+addplusbutton+"</td>";
													var stringMiercuri =  "<td class='miercuriTDClass'>"+labelcurrentdate+addminusbutton+"<label class='miercuri neededhour' >"+0+"/"+norme[2]+"</label>"+addplusbutton+"</td>";
													var stringJoi = " <td class='joiTDClass'><label class='joi neededhour' >"+0+"/"+norme[3]+"</label> </td>";
													var stringVineri =" <td class='vineriTDClass'><label class='vineri neededhour' >"+0+"/"+norme[4]+"</label> </td>";
												}
												if(currentDay == 4) // azi e jo,jo si mie
												{
													var stringLuni =  "<td class='luniTDClass'><label class='luni neededhour' >"+0+"/"+norme[0]+"</label> </td>";
													var stringMarti =  "<td class='martiTDClass'><label class='marti neededhour' >"+0+"/"+norme[1]+"</label></td>";
													var stringMiercuri =  "<td class='miercuriTDClass'>"+labelpreviousdate+addminusbutton+"<label class='miercuri neededhour' >"+0+"/"+norme[2]+"</label>"+addplusbutton+"</td>";
													var stringJoi =  "<td class='joiTDClass'>"+labelcurrentdate+addminusbutton+"<label class='joi neededhour' >"+0+"/"+norme[3]+"</label>"+addplusbutton+"</td>";
													var stringVineri =" <td class='vineriTDClass'><label class='vineri neededhour' >"+0+"/"+norme[4]+"</label> </td>";
												}
												if(currentDay == 5) // azi e vi, vi si jo
												{
													var stringLuni =  "<td class='luniTDClass'><label class='luni neededhour' >"+0+"/"+norme[0]+"</label> </td>";
													var stringMarti =  "<td class='martiTDClass'><label class='marti neededhour' >"+0+"/"+norme[1]+"</label></td>";
													var stringMiercuri = " <td class='miercuriTDClass'><label class='miercuri neededhour' >"+0+"/"+norme[2]+"</label> </td>";
													var stringJoi =  "<td class='joiTDClass'>"+labelpreviousdate+addminusbutton+"<label class='joi neededhour' >"+0+"/"+norme[3]+"</label>"+addplusbutton+"</td>";
													var stringVineri =  "<td class='vineriTDClass'>"+labelcurrentdate+addminusbutton+"<label class='vineri neededhour' >"+0+"/"+norme[4]+"</label>"+addplusbutton+"</td>";
												}
											}
											else{
													var stringLuni =  "<td><label class='luni' >"+0+"/"+norme[0]+"</label> </td>";
													var stringMarti =  "<td><label class='marti' >"+0+"/"+norme[1]+"</label></td>";
													var stringMiercuri = " <td><label class='miercuri' >"+0+"/"+norme[2]+"</label> </td>";
													var stringJoi = " <td><label class='joi' >"+0+"/"+norme[3]+"</label> </td>";
													var stringVineri =" <td><label class='vineri' >"+0+"/"+norme[4]+"</label> </td>";
											}
											var status2 = "<td><select class='statusClass'> <option selected value ='Open' onclick='resetOpenTaskHours(this)'>Open</option> <option value ='In work'>In work</option> <option disabled >Postponed</option><option disabled>Reviewed</option> <option disabled>Closed</option></select></td> ";
											var estimatedhours ="<td class ='estimatedTDClass'><input type = 'text' class='estimatedClass' oninput = 'checkEstimTimeNew(this)' style='width:40px;height:20px;text-align:center; border-style:none;border-radius:2px;background-color:#3aff8a' value = 20></td>";
											
											var enddate = "<td class='enddateTDClass'><input  type = 'text' class='enddatepicker' onclick='datePick()' size ='8' value="+nextWeekFromNow+" style='text-align:center;' oninput='checkDate(this)'> </td>";
											
											var details= "<td class='reviewableTDClass'>Reviewable ? <br><input value = 1 type='radio' name ='reviewableRadio"+nextTaskId+"' checked='checked'>Yes</input><br><input value = 0  type='radio' name ='reviewableRadio"+nextTaskId+"'>No</input> </td>";
											
											var selectButton = "<td> <button class='edit_button' name = 'editbutton' onclick='edittask(this)' value = 1 id ='selectedNewTask'>  <img src ='edit_button.png' style='width:24px;height:24px;'> </button> </td>";
											row.innerHTML= "<tr> "+ taskid+ projectname+ taskname+stringLuni+stringMarti+stringMiercuri+stringJoi+stringVineri+estimatedhours+status2+enddate+details+selectButton+"</tr> ";
											
											//adauga la taskurile noi introduse posibilitatea de a fi adaugate ore
											
											$("#selectedNewTask").parents("tr").css("background-color","#ffbaba");
											$("#selectedNewTask").val("1");							
											if(firstTimeNewTask==0)
											{
													$("#myTable").css('opacity', '0.6');
													$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
													$("#OpenDiv").find("input,button,textarea,select,a").removeAttr("disabled");
													$("#OpenDiv").show();
													firstTimeNewTask = 1;
											}	
											if(table.rows.length <= 3)
											{
												$("#noTaskYet").show();
											}
											else{
												$("#noTaskYet").hide();
												instantiateDatePick();
											}
								}
							else
							{
								
								//$("#tbodyId tr").eq(0).remove();
								$("#noprojects").show();
								timeout();
								$("#tbodyId").empty();
								$("#tbodyId").prepend("<tr><td colspan= 13>You have no tasks for now. You can use <b>'Other activities'</b> to track your time.</td></tr>");
								noOfTasksAdded--;
							
							}
									
						});
			});
		}
	}
		
}
function changeProject(clicker){
	
	$("#myTable").css('opacity', '0.6');
	$("#bodyId").find("input,button,textarea,select,a").attr("disabled","disabled");
	$("#isReworkFor").show();
	$("#isReworkFor").find("input,button,textarea,select,a").removeAttr("disabled");
	//alert($("#listaProiecte").val());
	
	//alert($(clicker).parents("tr").find(".taskID").text());
	$("#taskidKeeperRework").text($(clicker).parents("tr").find(".taskID").text());
	$("#labelInfoRework").hide();
	$("#projectListRework").empty();
	$("#taskIdListRework").empty();
	
	var collector = $("#labelInfoFullHolder").text();
	var spliter = collector.split("@#");
	for(var i = 0;i<spliter.length-1;i++)
	{
		var table = spliter[i].split("~^");
		var project = table[0];
		/*var j = 1;
		alert("project: "+project);
		
		while(j!=table.length-1)
		{
			alert("Taskid:"+table[j]);
			$("#taskIdListRework").append("<option>"+table[j]+"<option>");
			j++;
		}*/
		$("#projectListRework").append("<option onclick='changeProjectForTaskId()'>"+project+"</option>");
	}
	changeProjectForTaskId();
	
	//alert();
}
function changeProjectForTaskId(){
	$("#taskIdListRework").empty();
	//alert($("#projectListRework").val());
	var collector = $("#labelInfoFullHolder").text();
	var spliter = collector.split("@#");
	for(var i = 0;i<spliter.length-1;i++)
	{
		var table = spliter[i].split("~^");
		if(table[0].trim() == $("#projectListRework").val().trim())
		{
			var j = 1;
			while(j!=table.length-1)
			{
				$("#taskIdListRework").append("<option onclick ='changeTaskNameForIsRework()'>"+table[j]+"</option>");
				j++;
			}
		}
	}
	changeTaskNameForIsRework();
}
function saveIsReworkFor(){
	
	 $.each($("tbody tr"), function() {	
	 var clicked = this;
	 
		if($(this).find(".taskID").text()==$("#taskidKeeperRework").text())
		{	
			//setarea de proiect sa fie cu ala
			$(this).find(".projectNameClass").val($("#projectListRework").val().trim());
			$(this).find(".taskNameClass").val($("#onlyNeededLabel").text());
			$("#myTable").css('opacity', '');
			$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
			$("#isReworkFor").hide();
			$(this).find(".taskNameClass").attr("readonly",true);
			$(this).find(".taskNameClass").css("background-color","#9ca5af");
			$(this).find(".taskNameClass").css("color","#0011ff");
			$(this).find(".taskNameClass").css("border-style","none");
			
			
			
			$(this).find(".taskNameClass").css("border-radius","2px");
			//$("#listaProiecte").empty();
			//alert($("#projectListRework").val());
			$(clicked).find(".projectNameClass").empty();
			$(clicked).find(".projectNameClass").append("<option onclick='clickOnDisabledEstim()'>"+$("#projectListRework").val()+"</option>");
			
			
			var keeper=$("#taskidKeeperRework").text().split("/");
			
			var keeperTaskId = $("#onlyNeededLabel").text().split("Is rework for ");
			$(this).find(".taskName").append("<label class='hidden_isreworkfor' style='display:none'>"+keeperTaskId[1]+"</label>");
			$(this).find(".taskNameClass").parents("td").append("<button class='removeIsReworkFor' style='width:100px;border-radius:5px;border-style:none;background-color:#ff6156' onclick='removeIsReworkForButton("+keeper[1]+")' value = keeper[1]>Remove</button>");
			$(this).find(".projectNameClass").val($("#projectListRework").val());
			$(this).find(".projectNameClass").css("background-color","#9ca5af");
			$(this).find(".projectNameClass").css("color","#0011ff");
			$(this).find(".projectNameClass").css("border-style","none");
			$(this).find(".projectNameClass").css("border-radius","2px");
			
		}
	});
}
function removeIsReworkForButton(clicked){
	//$("#listaProiecte").empty();
	 $.each($("tbody tr"), function() {	
	 var reminder = this;
		if($(this).find(".taskID").text().search(parseInt(clicked))>-1)
		{
			$(reminder).find(".projectNameClass").empty();
			
			
			//$(this).find(".projectNameClass").append("<option>cacate</option>");
			//alert($(this).find(".taskID").text());
			$.post('getsForHomepage.php',{nr:5}, function(result) { 
				var projects = result.split("~^");
				if(projects.length >1){
						for(var i=0;i<projects.length-1;i++)
						{
							$(reminder).find(".projectNameClass").append('<option>'+projects[i]+'</option>');
							$(reminder).find(".projectNameClass").css("background-color","white");
							$(reminder).find(".projectNameClass").css("color","black");
							$(reminder).find(".projectNameClass").css("border","1px solid");
							
							$(reminder).find(".taskNameClass").css("border","1px solid");
							$(reminder).find(".taskNameClass").css("background-color","white");
							$(reminder).find(".taskNameClass").css("color","black");
							$(reminder).find(".taskNameClass").val("");
							$(reminder).find(".taskNameClass").removeAttr("readonly");
							
						}
					}
				else
				{
					$(reminder).find(".projectNameClass").append('<option>'+"Unproductive"+'</option>');
					$(reminder).find(".projectNameClass").css("background-color","white");
					$(reminder).find(".projectNameClass").css("color","black");
					$(reminder).find(".projectNameClass").css("border","1px solid");
					
					$(reminder).find(".taskNameClass").css("border","1px solid");
					$(reminder).find(".taskNameClass").css("background-color","white");
					$(reminder).find(".taskNameClass").css("color","black");
					$(reminder).find(".taskNameClass").val("");
					$(reminder).find(".taskNameClass").removeAttr("readonly");
				}
				if(isRework == 1){
					
					$(reminder).find(".projectNameClass").append('<option onclick="changeProject(this)" value ='+clicked+'>'+"Is rework for"+'</option>');
					$("#labelInfoFullHolder").text(resultK);
					$(reminder).find(".projectNameClass").css("background-color","white");
					$(reminder).find(".projectNameClass").css("color","black");
					$(reminder).find(".projectNameClass").css("border","1px solid");
					
					$(reminder).find(".taskNameClass").css("border","1px solid");
					$(reminder).find(".taskNameClass").css("background-color","white");
					$(reminder).find(".taskNameClass").css("color","black");
					$(reminder).find(".taskNameClass").val("");
					$(reminder).find(".taskNameClass").removeAttr("readonly");
				}
				
			});
			$(reminder).find(".removeIsReworkFor").remove();
		}
		
	 });
	  
}
function changeTaskNameForIsRework(){
	var table = $("#taskIdListRework").val().split(" - ");
	$("#onlyNeededLabel").text("Is rework for "+table[0]);
	$("#labelInfoRework").text("Task name will be: Is rework for "+table[0]);
	$("#labelInfoRework").show();
}
function cancelIsReworkFor(){
	$.each($("tbody tr"), function() {	
	 var clicked = this;
		if($(this).find(".taskID").text()== $("#taskidKeeperRework").text())
		{
			$(this).find(".projectNameClass").val($(".projectNameClass option:first").val());
		}
	});

	$("#isReworkFor").hide();
	$("#myTable").css('opacity', '');
	$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
}
function resetOpenTaskHours(clicked){
	var x = $(clicked).parents("tr").find(".currdate");
	var y = $(clicked).parents("tr").find(".prevdate");
	$(x).parents("td").find(".neededhour").text("0/"+timehour);
	$(y).parents("td").find(".neededhour").text("0/"+timehour);
}
function checkEstimTime(clicked){
	var x = $(clicked).val();
	if(!(x > 0 && x <=40))
		$(clicked).val("1");
	else
	{
		$(clicked).val(Math.floor(x));
	//	alert($(clicked).val());
	}
}
function checkEstimTimeNew(clicked){
	var x = $(clicked).val();
	if(!(x > 0 && x <=40))
		$(clicked).val("1");
	else
	{
		$(clicked).val(Math.floor(x));
	}
}
function checkEstimTime(){
	$("#setReestimatedhours").css("background-color","");
	$("#setReestimatedhours").css("text-align","center");
	var x = $("#setReestimatedhours").val();
	if(!(x > 0 && x <=40))
		var x = $("#setReestimatedhours").val("1");
	else
	{
		$("#setReestimatedhours").val(Math.floor(x));
	}
}
function checkTaskName(clicked){
	var x = $(clicked).val();
	if(x.length > 254)
	{
		$(clicked).val(x.substring(0,x.length - 1));
		$("#tasknametoolong").show();
		timeout();
	}
	for(var i=0;i<x.length-1;i++)
	{
		if(x[i] =='~' && x[i+1] == '^' || x[i] =='@' && x[i+1] =='#')
		{
			 $(clicked).val(x.substring(0,x.length - 1));
			$("#introduceforbidencharacters").show();
			timeout();
		}
	}
}
function checkDate(clicked){
	var firstDay = new Date();
	var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
	var nextWeekMonth = nextWeek.getMonth()+1;
	var nextWeekYear = nextWeek.getFullYear();
	var nextWeekDay = nextWeek.getDate();
	nextWeekMonth = checkTime(nextWeekMonth);
	nextWeekDay = checkTime(nextWeekDay);
						
	var nextWeekFromNow = nextWeekYear+"-"+nextWeekMonth+"-"+nextWeekDay;
	
	$(clicked).val(nextWeekFromNow);
	$("#selectcalendardate").show();
	timeout();
}
function getNewChangedDates(){
	return newChangedEndDate;
}
function getDateOfWeek(w, y) {
    var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week

    return new Date(y, 0, d);
}
function loadTable(){
	loadingOtherActivities();
	$.post('getsForHomepage.php', {nr:3},function(result) { 
		if(result!="error"){
			if($("#userIdholder").length)
			{
				var table = result.split("~^");
				timehour = parseInt(table[0]);
				$("#userIdholder").text(table[1]);
			}
			else
			{
				alert("Hmm, it's seems that you can't login.. Please Log Out and then re-Login!");
			}
		}
		else{
			alert("Timetool try to avoid problems, so he will redirect you to Login Page, because your Session expired.");
			window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
		}
	});
	if(week<currentWeek-1)
		$("#forward").css("color","green");
	else
		$("#forward").css("color","gray");
		
	var getcrday = getCurrentDay();
	if(getcrday>=5){
		
		$.post('checksForHomepage.php',{nr:3},function(result){
		
			if(parseInt(result)==1){
				var containts = result.split("~^");
				
				var now = new Date(containts[0]);
				var onejan = new Date(now.getFullYear(), 0, 1);
				var currentWeek = Math.ceil( (((now - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
				
				var old = new Date(containts[0]);
				var oldjan = new Date(old.getFullYear(), 0, 1);
				var oldWeek = Math.ceil( (((old - oldjan) / 86400000) + onejan.getDay() + 1) / 7 );
				
				if(oldWeek!=currentWeek && firstWeeklyReport ==0)
				{
					$("#myTable").css('opacity', '0.6');
					$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
					$("#weeklyReportDiv").find("input,button,textarea,select,a").removeAttr("disabled");
					$("#weeklyReportDiv").show();
					firstWeeklyReport = 1;
				}
			}
		});
	}
	
	var removeButtons = 0;
            //var name = i++;
            //var email = $("#email").val();
          //  var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + name + "</td><td>" + email + "</td></tr>";
		var table = document.getElementById("myTable");
		var rowCount = table.rows.length-1;
		//alert("cevaAA?");
		
		//var today = new Date();
		var d1 = getDateOfWeek(week,2017);
		var d2 = getDateOfWeek(week+1,2017);
		var daySelected = checkTime(d1.getDate());
		var monthSelected = checkTime(d1.getMonth()+1);
		var constructor1 = d1.getFullYear()+"-"+monthSelected+"-"+daySelected;
		
		var dateOnWeek = "";
		for(var i = 1;i<=5;i++)
		{
			var dateCreated1 = new Date(constructor1);
			dateCreated1.setDate(dateCreated1.getDate() + i);
			
			var dayForSelected = checkTime(dateCreated1.getDate());
			var monthForSelected = checkTime(dateCreated1.getMonth()+1);
			var constructor2 = dateCreated1.getFullYear()+"-"+monthForSelected+"-"+dayForSelected;
			
			dateOnWeek+=constructor2+"~^";
		}
		$.post('getsForHomepage.php', {nr:10,weeknr:week,dW:dateOnWeek}, function(result) {
			
			if(parseInt(result.trim()) == 1)
			{
				$("#tbodyId").prepend("<tr><td colspan= 13>You have no tasks for now. You can use <b>'Other activities'</b> to track your time.</td></tr>");
				zeroTasks= 1;
			}
			else{			
				var res = result.split("@#");
				var neededTaskId = res[0];
				var taskid = res[0].split('~^'); 
				var projectid = res[1].split('~^'); 
				var taskname = res[2].split('~^');
				var luni=res[3].split('~^');
				var marti = res[4].split('~^');
				var miercuri =res[5].split('~^');
				var joi =res[6].split('~^');
				var vineri=res[7].split('~^');
				var estimatedhours=res[8].split('~^');
				var reestimatedhours = res[9].split('~^');
				var reesimatedDate = res[10].split('~^');
				var statuss = res[11].split('~^');
				var enddate =res[12].split('~^');
				var descr = res[13].split('~^');
				var norme = res[14].split("~^");

				var currentDay = getCurrentDay();
				
				var labelIdentificatorNewTask = "<label style='display:none' class ='taskIdentificator'>0/</label>";
						
				var firstDay = new Date();
				var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
				var nextWeekMonth = nextWeek.getMonth()+1;
				var nextWeekYear = nextWeek.getFullYear();
				var nextWeekDay = nextWeek.getDate();
				nextWeekMonth = checkTime(nextWeekMonth);
				nextWeekDay = checkTime(nextWeekDay);
				
				
				var nextWeekFromNow = nextWeekYear+"-"+nextWeekMonth+"-"+nextWeekDay;
				
				for(kz=0;kz<taskid.length-1;kz++)
				{	
			
					if(currentWeek != week)
						removeButtons=1;
					if(statuss[kz]!='4' && statuss[kz]!='5')
					{
							var row = table.insertRow(rowCount);
							var taskidTable = "<td class ='taskID'>"+labelIdentificatorNewTask+taskid[kz]+"</td>";
							var projectidTable = "<td class ='projectName'>"+projectid[kz]+"</td>";
							var tasknameTable = "<td class ='taskName'>"+taskname[kz]+"</td>";
							
							var addplusbutton = "<button  class='add_hours' onclick='addhour(this)' ><img  src='add_hours.png' style='width:15px; height:15px;' > </img>  </button> ";
							var addminusbutton = "<button   class='remove_hours' onclick='removehour(this)'> <img  src='remove_hours.png' style='width:15px; height:15px;' > </img> </button>";
							
							var today = new Date();
							var year = today.getFullYear();
							var month = today.getMonth()+1;
							var day = today.getDate();
							var prevday = new Date( today.getTime() - ( 86400 * 1000 )).getDate();
							prevday = checkTime(prevday);
							day = checkTime(day);
							
							month = checkTime(month);

							var fulldate = year+"-"+month+"-"+day;
							var mydate = new Date(year,month-1,day); 
							
							var prevd = new Date( mydate.getTime() - ( 86400 * 1000 ));
							var prevYear = prevd.getFullYear();
							var prevMonth = prevd.getMonth()+1;
							var prevDay = prevd.getDate();
							prevMonth = checkTime(prevMonth);
							prevDay = checkTime(prevDay);
							
							var previousfulldate = prevYear+"-"+prevMonth+"-"+prevDay;
							var labelcurrentdate = "<label style='display:none' class='currdate'> "+fulldate+" </label>";
							var labelpreviousdate = "<label style='display:none' class ='prevdate'> "+previousfulldate+" </label>";
							var stringLuni ="";
							var stringMarti="";
							var stringMiercuri="";
							var stringJoi ="";
							var stringVineri = "";

							if(currentWeek == week)
							{
								
								if(currentDay == 1 && statuss[kz]=="1")  // azi e luni ,doar luni se modifica
								{  	
									stringLuni =  "<td class='luniTDClass'>"+labelcurrentdate+addminusbutton+"<label class='luni neededhour' >"+luni[kz]+"/"+norme[0]+"</label>"+addplusbutton+" </td>";
									stringMarti =  "<td class='martiTDClass'><label class='marti neededhour' >"+marti[kz]+"/"+norme[1]+"</label> </td>";
									stringMiercuri = " <td class='miercuriTDClass'><label class='miercuri neededhour' >"+miercuri[kz]+"/"+norme[2]+"</label> </td>";
									stringJoi = " <td class='joiTDClass'><label class='joi neededhour' >"+joi[kz]+"/"+norme[3]+"</label> </td>";
									stringVineri =" <td class='vineriTDClass'><label class='vineri neededhour' >"+vineri[kz]+"/"+norme[4]+"</label> </td>";
								}
								else if(currentDay == 1){
									stringLuni =  "<td class='luniTDClass'> <label class='luni neededhour' >"+luni[kz]+"/"+norme[0]+"</label> </td>";
									stringMarti =  "<td class='martiTDClass'><label class='marti neededhour' >"+marti[kz]+"/"+norme[1]+"</label></td>";
									stringMiercuri = " <td class='miercuriTDClass'><label class='miercuri neededhour' >"+miercuri[kz]+"/"+norme[2]+"</label> </td>";
									stringJoi =  "<td class='joiTDClass'><label class='joi neededhour' >"+joi[kz]+"/"+norme[3]+"</label></td>";
									stringVineri =  "<td class='vineriTDClass'><label class='vineri neededhour' >"+vineri[kz]+"/"+norme[4]+"</label></td>";
								}
								if(currentDay == 2 && statuss[kz]=="1") // azi e marti,luni si marti
								{ 
									stringLuni =  "<td class='luniTDClass'>"+labelpreviousdate+addminusbutton+"<label class='luni neededhour' >"+luni[kz]+"/"+norme[0]+"</label>"+addplusbutton+" </td>";
									stringMarti =  "<td class='martiTDClass'>"+labelcurrentdate+addminusbutton+"<label class='marti neededhour' >"+marti[kz]+"/"+norme[1]+"</label>"+addplusbutton+"</td>";
									stringMiercuri = " <td class='miercuriTDClass'><label class='miercuri neededhour' >"+miercuri[kz]+"/"+norme[2]+"</label> </td>";
									stringJoi = " <td class='joiTDClass'><label class='joi neededhour' >"+joi[kz]+"/"+norme[3]+"</label> </td>";
									stringVineri =" <td class='vineriTDClass'><label class='vineri neededhour' >"+vineri[kz]+"/"+norme[4]+"</label> </td>";
								}
								else if(currentDay == 2){
									stringLuni =  "<td class='luniTDClass'><label class='luni neededhour' >"+luni[kz]+"/"+norme[0]+"</label> </td>";
									stringMarti =  "<td class='martiTDClass'><label class='marti neededhour' >"+marti[kz]+"/"+norme[1]+"</label></td>";
									stringMiercuri = " <td class='miercuriTDClass'><label class='miercuri neededhour' >"+miercuri[kz]+"/"+norme[2]+"</label> </td>";
									stringJoi =  "<td class='joiTDClass'><label class='joi neededhour' >"+joi[kz]+"/"+norme[3]+"</label></td>";
									stringVineri =  "<td class='vineriTDClass'><label class='vineri neededhour' >"+vineri[kz]+"/"+norme[4]+"</label></td>";
								}
								if(currentDay == 3 && statuss[kz]=="1") // azi e mier,marti si mie
								{
									stringLuni =  "<td class='luniTDClass'><label class='luni neededhour' >"+luni[kz]+"/"+norme[0]+"</label> </td>";
									stringMarti =  "<td class='martiTDClass'>"+labelpreviousdate+addminusbutton+"<label class='marti neededhour' >"+marti[kz]+"/"+norme[1]+"</label>"+addplusbutton+"</td>";
									stringMiercuri =  "<td class='miercuriTDClass'>"+labelcurrentdate+addminusbutton+"<label class='miercuri neededhour' >"+miercuri[kz]+"/"+norme[2]+"</label>"+addplusbutton+"</td>";
									stringJoi = " <td class='joiTDClass'><label class='joi neededhour' >"+joi[kz]+"/"+norme[3]+"</label> </td>";
									stringVineri =" <td class='vineriTDClass'><label class='vineri neededhour' >"+vineri[kz]+"/"+norme[4]+"</label> </td>";
								}
								else if(currentDay == 3){
									stringLuni =  "<td class='luniTDClass'><label class='luni neededhour' >"+luni[kz]+"/"+norme[0]+"</label> </td>";
									stringMarti =  "<td class='martiTDClass'><label class='marti neededhour' >"+marti[kz]+"/"+norme[1]+"</label></td>";
									stringMiercuri = " <td class='miercuriTDClass'><label class='miercuri neededhour' >"+miercuri[kz]+"/"+norme[2]+"</label> </td>";
									stringJoi =  "<td class='joiTDClass'><label class='joi neededhour' >"+joi[kz]+"/"+norme[3]+"</label></td>";
									stringVineri =  "<td class='vineriTDClass'><label class='vineri neededhour' >"+vineri[kz]+"/"+norme[4]+"</label></td>";
								}
								if(currentDay == 4 && statuss[kz]=="1") // azi e jo,jo si mie
								{
									stringLuni =  "<td class='luniTDClass'><label class='luni neededhour' >"+luni[kz]+"/"+norme[0]+"</label> </td>";
									stringMarti =  "<td class='martiTDClass'><label class='marti neededhour' >"+marti[kz]+"/"+norme[1]+"</label></td>";
									stringMiercuri =  "<td class='miercuriTDClass'>"+labelpreviousdate+addminusbutton+"<label class='miercuri neededhour' >"+miercuri[kz]+"/"+norme[2]+"</label>"+addplusbutton+"</td>";
									stringJoi =  "<td class='joiTDClass'>"+labelcurrentdate+addminusbutton+"<label class='joi neededhour' >"+joi[kz]+"/"+norme[3]+"</label>"+addplusbutton+"</td>";
									stringVineri =" <td class='vineriTDClass'><label class='vineri neededhour' >"+vineri[kz]+"/"+norme[4]+"</label> </td>";
								}
								else if(currentDay == 4){
									stringLuni =  "<td class='luniTDClass'><label class='luni neededhour' >"+luni[kz]+"/"+norme[0]+"</label> </td>";
									stringMarti =  "<td class='martiTDClass'><label class='marti neededhour' >"+marti[kz]+"/"+norme[1]+"</label></td>";
									stringMiercuri = " <td class='miercuriTDClass'><label class='miercuri neededhour' >"+miercuri[kz]+"/"+norme[2]+"</label> </td>";
									stringJoi =  "<td class='joiTDClass'><label class='joi neededhour' >"+joi[kz]+"/"+norme[3]+"</label></td>";
									stringVineri =  "<td class='vineriTDClass'><label class='vineri neededhour' >"+vineri[kz]+"/"+norme[4]+"</label></td>";
								}
								if(currentDay == 5 && statuss[kz]=="1") // azi e vi, vi si jo
								{
									stringLuni =  "<td class='luniTDClass'><label class='luni neededhour' >"+luni[kz]+"/"+norme[0]+"</label> </td>";
									stringMarti =  "<td class='martiTDClass'><label class='marti neededhour' >"+marti[kz]+"/"+norme[1]+"</label></td>";
									stringMiercuri = " <td class='miercuriTDClass'><label class='miercuri neededhour' >"+miercuri[kz]+"/"+norme[2]+"</label> </td>";
									stringJoi =  "<td class='joiTDClass'>"+labelpreviousdate+addminusbutton+"<label class='joi neededhour' >"+joi[kz]+"/"+norme[3]+"</label>"+addplusbutton+"</td>";
									stringVineri =  "<td class='vineriTDClass'>"+labelcurrentdate+addminusbutton+"<label class='vineri neededhour' >"+vineri[kz]+"/"+norme[4]+"</label>"+addplusbutton+"</td>";
								}
								else if(currentDay == 5){
									stringLuni =  "<td class='luniTDClass'><label class='luni neededhour' >"+luni[kz]+"/"+norme[0]+"</label> </td>";
									stringMarti =  "<td class='martiTDClass'><label class='marti neededhour' >"+marti[kz]+"/"+norme[1]+"</label></td>";
									stringMiercuri = " <td class='miercuriTDClass'><label class='miercuri neededhour' >"+miercuri[kz]+"/"+norme[2]+"</label> </td>";
									stringJoi =  "<td class='joiTDClass'>"+labelpreviousdate+"<label class='joi neededhour' >"+joi[kz]+"/"+norme[3]+"</label></td>";
									stringVineri =  "<td class='vineriTDClass'>"+labelcurrentdate+"<label class='vineri neededhour' >"+vineri[kz]+"/"+norme[4]+"</label></td>";
								}
							}
							else{
									stringLuni =  "<td class='luniTDClass'><label class='luni neededhour' >"+luni[kz]+"/"+norme[0]+"</label> </td>";
									stringMarti =  "<td class='martiTDClass'><label class='marti neededhour' >"+marti[kz]+"/"+norme[1]+"</label></td>";
									stringMiercuri = " <td class='miercuriTDClass'><label class='miercuri neededhour' >"+miercuri[kz]+"/"+norme[2]+"</label> </td>";
									stringJoi = " <td class='joiTDClass'><label class='joi neededhour' >"+joi[kz]+"/"+norme[3]+"</label> </td>";
									stringVineri =" <td class='vineriTDClass'><label class='vineri neededhour' >"+vineri[kz]+"/"+norme[4]+"</label> </td>";
							}
							var estimatedHoursTable="";
							var enddateTable ="";
							
							if(reestimatedhours[kz]=="")
								reestimatedhours[kz] =0;
							
							if(statuss[kz] == '0'){
								var status2 = "<td class ='statusTDClass'><select class='statusClass'> <option selected class='op' >Open</option> <option onclick='inWorkChangeStatus(this)'>In work</option> <option disabled>Postponed</option><option disabled>Reviewed</option> <option disabled>Closed</option></select></td> ";
								if(reestimatedhours[kz] !=0){
										estimatedHoursTable ="<td class ='estimatedTDClass'><label class='labelestimClass' ><input class ='estimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value="+estimatedhours[kz]+" onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'> | <input class='reestimatedClass' value="+reestimatedhours[kz]+" style='width:20px;text-align:center; border-style:none;border-radius:2px;background-color:#3aff8a' oninput = 'checkEstimTime(this)' onclick='showReestimationDiv(this)' readonly='readonly'></label></td>";
								}
								else{
									estimatedHoursTable ="<td class ='estimatedTDClass'><label class='labelestimClass' ><input class ='estimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value="+estimatedhours[kz]+" onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'> | <input class ='reestimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value="+reestimatedhours[kz]+" onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'></label></td>";
								}
							}
							else
								if(statuss[kz] == '1'){
									var status2 = "<td class ='statusTDClass'><select class='statusClass'> <option disabled >Open</option> <option selected='selected'  class='iw' >In work</option></label> <option onclick='postponedChangeStatus(this)'>Postponed</option><option onclick='reviewedChangeStatus(this)'>Reviewed</option> <option onclick='closeChangeStatus(this)'>Closed</option></select></td> ";
								if(reestimatedhours[kz] !=0){
									if(reesimatedDate[kz]==fulldate)
										estimatedHoursTable ="<td class ='estimatedTDClass'><label class='labelestimClass' ><input class ='estimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value="+estimatedhours[kz]+" onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'> | <input class ='reestimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value="+reestimatedhours[kz]+" onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'></label></td>";
									else
										estimatedHoursTable ="<td class ='estimatedTDClass'><label class='labelestimClass' ><input class ='estimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value="+estimatedhours[kz]+" onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'> | <input class='reestimatedClass' value=49 style='width:20px;text-align:center; border-style:none;border-radius:2px;background-color:#3aff8a' oninput = 'checkEstimTime(this)' onclick='showReestimationDiv(this)' readonly='readonly'></label></td>";
								}
								else{
									estimatedHoursTable ="<td class ='estimatedTDClass'><label class='labelestimClass' ><input class ='estimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value="+estimatedhours[kz]+" onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'> | <input class='reestimatedClass' value=0 style='width:20px;text-align:center; border-style:none;border-radius:2px;background-color:#3aff8a' oninput = 'checkEstimTime(this)' onclick='showReestimationDiv(this)' readonly='readonly'></label></td>";
								}
							}
							else
								if(statuss[kz] == '2')
								{
									var status2 = "<td class ='statusTDClass'><select class='statusClass'> <option disabled>Open</option> <option onclick='inWorkChangeStatusFromPostponed(this)'>In work</option> <option selected class='pp' >Postponed</option><option disabled>Reviewed</option> <option disabled>Closed</option></select></td> ";
									estimatedHoursTable ="<td class ='estimatedTDClass'><label class='labelestimClass' ><input class ='estimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value="+estimatedhours[kz]+" onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'> | <input class ='reestimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value=0 onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'></label></td>";
								}
							else
								if(statuss[kz] == '3')
								{
									
									var status2 = "<td class ='statusTDClass'><select class='statusClass'> <option disabled >Open</option> <option disabled >In work</option> <option disabled>Postponed</option><option selected >Reviewed</option> <option onclick='closeChangeStatusFromReview(this)'>Closed</option></select></td> ";
									estimatedHoursTable ="<td class ='estimatedTDClass'><label class='labelestimClass' ><input  class ='estimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value="+estimatedhours[kz]+" onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'> | <input class ='reestimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;color:#0011ff;' value=0 onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'></label></td>";
								}
							else
								if(statuss[kz] == '4')
								{
									var status2 = "<td class ='statusTDClass'><select class='statusClass'> <option disabled >Open</option> <option disabled >In work</option> <option disabled>Postponed</option><option disabled>Reviewed</option> <option selected onclick='closeChangeStatus(this)'>Closed</option></select></td> ";
									estimatedHoursTable ="<td class ='estimatedTDClass'><label class='labelestimClass' ><input  class ='estimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value="+estimatedhours[kz]+" onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'> | <input class ='reestimatedClass' style='width:20px;text-align:center;' value=0 readonly='readonly'></label></td>";
								}
							else
								var status2 = "<td class ='statusTDClass'><select class='statusClass'> <option disabled >Open</option> <option disabled>In work</option> <option disabled>Postponed</option><option disabled>Reviewed</option> <option>Closed</option></select></td> ";
							
							enddateTable = "<td class='enddateTDClass'><label class='enddateClass' style='color:#000000'>"+enddate[kz]+" </label></td>";
							var detailsTable= "<td><ul class ='table_details_dropdown'><li><a href='javascript:void()' style='text-decoration: none; margin:0 auto;' onclick='detailsEdit(this)'>Description</a><li class='hidden_details'>"+descr[kz]+"</li></li></ul></td>";
							var deleteButtonTable = "<td> <button class='edit_button' name = 'editbutton' onclick='edittask(this)' value = 0>  <img src ='edit_button.png' style='width:24px;height:24px;'> </button> </td>";

							row.innerHTML= "<tr> "+ taskidTable+ projectidTable+ tasknameTable+stringLuni+stringMarti+stringMiercuri+stringJoi+stringVineri+estimatedHoursTable+status2+enddateTable+detailsTable+deleteButtonTable+"</tr> ";
							
							if(table.rows.length <= 3)
							{
								$("#noTaskYet").show();
							}
							else
								$("#noTaskYet").hide();
					}
					
				}
			}
			enddateOvercomed();
			if(removeButtons == 1)
			{
				$("#myTable").find("input,button,textarea,select,a").attr("disabled", "disabled");
				$("#search").removeAttr("disabled", "disabled");
			}
			else
				$("#search").removeAttr("disabled", "disabled");
			
		});
		instantiateDatePick();
		
		
}
function clickOnDisabledEstim(){
	
	$("#clickOnNotEditableEstimation").show();
	timeout();
}
function clickOnDisabledEstimNoShow(){
	$("#clickOnNotEditableEstimation").show();
	timeout();
}
function showReestimationDiv(clicked){
	var tasklabel = $(clicked).parents("tr").find(".taskID").text();
	var taskidlabel = tasklabel.split("/");
	$("#taskIdForReestimated").text(taskidlabel[1]);
	$("#myTable").css('opacity', '0.6');
	//$("#myTable").find("input,button,textarea,select,a").attr("disabled", "disabled");
	$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
	//$("#reestimatedDetails").css("z-index","1");
	$("#reestimatedDetails").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#reestimatedDetails").show();
	$("#textareaReestimated").val($(clicked).parents("td").find(".hidden_reestim").text());
	if(!$(clicked).parents("td").find(".reestimatedClass").val()=="0")
	{
		$("#setReestimatedhours").val($(clicked).parents("td").find(".reestimatedClass").val());
		if($("#setReestimatedhours").val()=="0")
			$("#setReestimatedhours").val(1);
	}
}
function enddateOvercomed(){
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var day = today.getDate();
	day = checkTime(day);
	month = checkTime(month);
	var currentDate = ""+year+"-"+month+"-"+day;

	$.each($("tbody tr"), function() {	
		var clicked = this;
		if($(this).find(".enddateClass").text().trim()!="")
		{	
			var enddate = $(this).find(".enddateClass").text();
			
			var diff =  Math.floor(( Date.parse(enddate) - Date.parse(currentDate) ) / 86400000); 
			if(diff<0)
			{
				$(this).find(".enddateClass").css("color","#ff0000");
				$(this).find(".enddateClass").css("font-weight","bold");
			}
			else
			if(diff==0)
			{
				$.post('getsForHomepage.php', {nr:6,coll:2},function(result) { 
					if(result == 1)
					{
						$("#deliverTasksDiv").show();
					}
				});
				
				$(this).find(".enddateClass").css("color","#28c619");
				$(this).find(".enddateClass").css("text-shadow","1px 1px black");
				$(this).find(".enddateClass").css("font-weight","bold");
				$(this).css("background-color","#70ffc5");	
			}
			else
			if(diff<3)
			{
				$(this).find(".enddateClass").css("color","#ffd400");
				$(this).find(".enddateClass").css("text-shadow","1px 1px #ff4c00");
				$(this).find(".enddateClass").css("font-weight","bold");
			}
		}
	});
}
function reviewedChangeStatus(clicked){
	
	$("#myTable").css('opacity', '0.6');
	$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
	$("#requestDiv").find("input,button,textarea,select,a").removeAttr("disabled");
	
	if($(clicked).parents("tr").find(".table_review_dropdown").text()=="")
	{
		$("#componentRequestDiv").text("Reviewed?");
		$("#componentRequestDiv").css("color","#0076ff");
		$("#componentRequestDiv").css("left","34.5%");
		$("#requestDiv").show();
		$("#saveChange").unbind().click(function(){
			$("#myTable").css('opacity', '');
			$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
			
			$("#requestDiv").hide();
			$("#reviewDetails").hide();
			var tasklabel = $(clicked).parents("tr").find(".taskID").text();
			var taskidlabel = tasklabel.split("/");
			$("#taskIdForReview").text(taskidlabel[1]);
			if($("#reviewDetails").is(':visible') && $("#taskIdForReview").text() == taskidlabel[1])
			{
				//alert("ceaa");
				$("#reviewDetails").hide();
			}
			else
			{
				$("#reviewDetails").show();
				$("#myTable").css('opacity', '0.6');
				$("#bodyId").find("input,button,textarea,select,a").attr("disabled","disabled");
				$("#reviewDetails").find("input,button,textarea,select,a").removeAttr("disabled");
			}

			$("#textareaDescription").val($(clicked).parents("tr").find(".hidden_review").text());
			//
			//MNU MERGE CUM TREBUIE. cand salvez se sterge ce e curent si se pierd datele, trebuie facuta o salvare
			//
			//alert(taskidlabel[1]);
			//alert($("#taskIdForReview").val());
			if($(clicked).parents("td").find(".hidden_review").text()=="")
				$("#textareaReview").val("Review made by: ");
			$("#reviewDetails").show();
			
			
			var item;
			var x = $(clicked).parents("td");
			item = x;
			var preEstim = $(item).parents("tr").find(".estimatedClass").val();
			$(item).parents("tr").find(".labelestimClass").remove();
			$(x).find(".statusClass").remove(".statusClass");
			$(item).parents("tr").find(".add_hours").remove();
			$(item).parents("tr").find(".remove_hours").remove();
			//$(item).append("<select class='statusClass' onclick='show_postponed_status_info()'> <option disabled>Open</option> <option disabled>In work</option> <option disabled>Postponed</option><option selected>Reviewed</option> <option disabled>Closed</option></select>");
			$(item).append("<ul class ='table_review_dropdown'><li><a href='javascript:void()' style='text-decoration: none; margin:0 auto;'><select class='statusClass' onclick='show_postponed_status_info()'> <option disabled>Open</option> <option disabled>In work</option> <option disabled>Postponed</option><option selected onclick='reviewedChangeStatus(this)'>Reviewed</option> <option disabled>Closed</option></select></a><li class='hidden_review'></li></li></ul>");
			$(item).parents("tr").find(".estimatedTDClass").append("<label class='labelestimClass' ><input class ='estimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'> | <input class ='reestimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value=0 onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'></label>");
			$(item).parents("tr").find(".estimatedClass").val(preEstim);
		});
		 $('#cancelChange').unbind().on('click', function() {
			$("#myTable").css('opacity', '');
			$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
            $("#requestDiv").hide();
			$(clicked).parents("td").find(".statusClass").val("In work").change();
        });
	}
	else
	{
		$("#reviewDetails").hide();
			var tasklabel = $(clicked).parents("tr").find(".taskID").text();
			var taskidlabel = tasklabel.split("/");
			$("#taskIdForReview").text(taskidlabel[1]);
			if($("#reviewDetails").is(':visible') && $("#taskIdForReview").text() == taskidlabel[1])
			{
				//alert("ceaa");
				
				$("#reviewDetails").hide();
			}
			else
			{
				$("#reviewDetails").show();
				$("#myTable").css('opacity', '0.6');
				$("#bodyId").find("input,button,textarea,select,a").attr("disabled","disabled");
				$("#reviewDetails").find("input,button,textarea,select,a").removeAttr("disabled");
			}

			$("#textareaDescription").val($(clicked).parents("tr").find(".hidden_review").text());
			if($(clicked).parents("td").find(".hidden_review").text()=="")
				$("#textareaReview").val("Review made by: ");
			$("#reviewDetails").show();
			
			
			var item;
			var x = $(clicked).parents("td");
			item = x;
			$(x).find(".statusClass").remove(".statusClass");
			$(item).parents("tr").find(".add_hours").remove();
			$(item).parents("tr").find(".remove_hours").remove();
			$(item).append("<ul class ='table_review_dropdown'><li><a href='javascript:void()' style='text-decoration: none; margin:0 auto;'><select class='statusClass' onclick='show_postponed_status_info()'> <option disabled>Open</option> <option disabled>In work</option> <option disabled>Postponed</option><option selected onclick='reviewedChangeStatus(this)'>Reviewed</option> <option disabled>Closed</option></select></a><li class='hidden_review'></li></li></ul>");
	}
	
}
function postponedChangeStatus(clicked){
	//var name = $(clicked).parents("td").find(".iw").text();
	//alert(name);
		$("#componentRequestDiv").text("Postponed?");
		$("#componentRequestDiv").css("color","#ff6e00");
		$("#componentRequestDiv").css("left","34%");
		$("#requestDiv").show();
	$("#myTable").css('opacity', '0.6');
	$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
	$("#requestDiv").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#saveChange").unbind().on('click',function(){
		
		$("#requestDiv").hide();
		//alert($(clicked).parents("td").find(".statusClass").val());
		
		var item;
		var x = $(clicked).parents("td");
		item = x;
		$(x).find(".statusClass").remove(".statusClass");
		
		$(item).parents("tr").find(".add_hours").remove();
		$(item).parents("tr").find(".remove_hours").remove();
		var preEstim = $(item).parents("tr").find(".estimatedClass").val();
		//<td class ='estimatedTDClass'><label class='labelestimClass' ><input class ='estimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value="+estimatedhours[kz]+" onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'> | <input class ='reestimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value=0 onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'></label></td>"
		$(item).parents("tr").find(".labelestimClass").remove();
		$(item).append("<select class='statusClass' onclick='show_postponed_status_info()'> <option disabled>Open</option> <option disabled>In work</option> <option selected>Postponed</option><option disabled>Reviewed</option> <option disabled>Closed</option></select>");
		$(item).parents("tr").find(".estimatedTDClass").append("<label class='labelestimClass' ><input class ='estimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'> | <input class ='reestimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value=0 onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'></label>");
		$(item).parents("tr").find(".estimatedClass").val(preEstim);
		$("#myTable").css('opacity', '');
		$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
		
		$('#saveintodatabase').show();
		timeout();
	});
	$('#cancelChange').unbind().on('click',function(){
		$("#requestDiv").hide();
		$("#myTable").css('opacity', '');
		$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
		$(clicked).parents("td").find(".statusClass").val("In work").change();
	});
}
function closeChangeStatus(clicked){
	$("#myTable").css('opacity', '0.6');
	$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
		$("#componentRequestDiv").text("Closed?");
		$("#componentRequestDiv").css("color","#7d8b9b");
		$("#componentRequestDiv").css("left","38%");
		$("#requestDiv").show();
	$("#requestDiv").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#saveChange").unbind().on('click',function(){
		$("#requestDiv").hide();
		var item;
		var x = $(clicked).parents("td");
		item = x;
		var preEstim = $(item).parents("tr").find(".estimatedClass").val();
		$(item).parents("tr").find(".labelestimClass").remove();
		$(item).parents("tr").find(".add_hours").remove();
		$(item).parents("tr").find(".remove_hours").remove();
		$(x).find(".statusClass").remove(".statusClass");
		$(item).append("<select class='statusClass' onclick='show_postponed_status_info()'> <option disabled>Open</option> <option disabled>In work</option> <option disabled>Postponed</option><option disabled>Reviewed</option> <option selected>Closed</option></select>");
		$(item).parents("tr").find(".estimatedTDClass").append("<label class='labelestimClass' ><input class ='estimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'> | <input class ='reestimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value=0 onclick ='clickOnDisabledEstimNoShow()' readonly='readonly'></label>");
		$(item).parents("tr").find(".estimatedClass").val(preEstim);
		$("#myTable").css('opacity', '');
		$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
		
		$('#saveintodatabase').show();
		timeout();
	});
	$("#cancelChange").unbind().on('click',function(){
		$("#requestDiv").hide();
		$("#myTable").css('opacity', '');
		$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
		$(clicked).parents("td").find(".statusClass").val("In work").change();
	});
}
function closeChangeStatusFromReview(clicked){
	$("#myTable").css('opacity', '0.6');
	$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
		$("#componentRequestDiv").text("Closed?");
		$("#componentRequestDiv").css("color","#7d8b9b");
		$("#componentRequestDiv").css("left","38%");
		$("#requestDiv").show();
	$("#requestDiv").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#saveChange").unbind().on('click',function(){
		$("#requestDiv").hide();
		var item;
		var x = $(clicked).parents("td");
		item = x;
		$(item).parents("tr").find(".add_hours").remove();
		$(item).parents("tr").find(".remove_hours").remove();
		$(x).find(".statusClass").remove(".statusClass");
		$(item).append("<select class='statusClass' onclick='show_postponed_status_info()'> <option disabled>Open</option> <option disabled>In work</option> <option disabled>Postponed</option><option disabled>Reviewed</option> <option selected>Closed</option></select>");
		$("#myTable").css('opacity', '');
		$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
	});
	$("#cancelChange").unbind().on('click',function(){
		$("#requestDiv").hide();
		$("#myTable").css('opacity', '');
		$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
		$(clicked).parents("td").find(".statusClass").val("Reviewed").change();
	});
}
function show_postponed_status_info(){
	$("#statuschangenotallowed").show();
	timeout();
}
function inWorkChangeStatus(clicked){
	$(clicked).parents("tr").css("background-color","#ffbaba");
	$(clicked).parents("tr").find('.edit_button').val(1);
	var currentDay = getCurrentDay();

	var estReestTime="<input class='reestimatedEstimatedClass' value = 10 style='width:20px;text-align:center; border-style:none;border-radius:2px;background-color:#3aff8a' oninput='checkEstimTimeNew(this)' /> | <input style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value=0 onclick ='clickOnDisabledEstim()' readonly='readonly'>";
	var addplusbutton = "<button class='add_hours' onclick='addhour(this)'><img  src='add_hours.png' style='width:15px; height:15px;' ></img></button>";
	var addminusbutton = "<button class='remove_hours' onclick='removehour(this)'><img src='remove_hours.png' style='width:15px; height:15px;'></img></button>";

	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var day = today.getDate();
	var prevday = today.getDate()-1;
						
	prevday = checkTime(prevday);
	day = checkTime(day);
						
	month = checkTime(month);
						//currentDay = 5;
	var fulldate = year+"-"+month+"-"+day;
	var previousfulldate = year+"-"+month+"-"+prevday;
	var labelcurrentdate = "<label style='display:none' class='currdate'> "+fulldate+" </label>";
	var labelpreviousdate = "<label style='display:none' class ='prevdate'> "+previousfulldate+" </label>";
	
		var firstDay = new Date();
		var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
		var nextWeekMonth = nextWeek.getMonth()+1;
		var nextWeekYear = nextWeek.getFullYear();
		var nextWeekDay = nextWeek.getDate();
		nextWeekMonth = checkTime(nextWeekMonth);
		nextWeekDay = checkTime(nextWeekDay);
		var nextWeekFromNow = nextWeekYear+"-"+nextWeekMonth+"-"+nextWeekDay;
		
		var x = $(clicked).parents("tr").find(".reestimatedClass");
		var h= $(clicked).parents("tr").find(".estimatedClass");
		var y = $(clicked).parents("tr").find(".enddateClass");
		var z = $(clicked).parents("tr").find(".enddatepicker");
		var l = $(clicked).parents("tr").find(".labelestimClass");
		
		$(x).remove(".reestimatedClass");
		$(h).remove(".estimatedClass");
		$(y).remove(".enddateClass");
		$(z).remove(".enddatepicker");
		$(l).remove(".labelestimClass");
		
		
		
		//<select class='statusClass' > <option disabled>Open</option> <option selected>In work</option> <option onclick='postponedChangeStatus(this)'>Postponed</option><option>Reviewed</option> <option>Closed</option></select>
		//alert($(clicked).parents("tr").find(".estimatedClass").attr('class'));
		$(clicked).parents("tr").find(".estimatedTDClass").append(estReestTime);
		$(clicked).parents("tr").find(".estimatedClass").val(10);
		
		$(clicked).parents("tr").find(".enddateTDClass").append("<input  type = 'text' class='enddatepicker' onclick='datePick()' size ='8' style='text-align:center;' oninput = 'checkDate(this)'>");
		$(clicked).parents("tr").find(".enddatepicker").val(nextWeekFromNow);
		//alert($(clicked).parents("tr").find(".estimatedClass").attr('class'));
		var item;
		var a = $(clicked).parents("td");
		item = a;
		$(a).find(".statusClass").remove(".statusClass");
		
		if(currentDay == 1){
			var classNamePrev = "";
			var classNameCurr = ".luniTDClass";
		}
		if(currentDay == 2){
			var classNamePrev = ".luniTDClass";
			var classNameCurr = ".martiTDClass";
		}
		if(currentDay == 3){
			var classNamePrev = ".martiTDClass";
			var classNameCurr = ".miercuriTDClass";
		}
		if(currentDay == 4){
			var classNamePrev = ".miercuriTDClass";
			var classNameCurr = ".joiTDClass";
		}
		if(currentDay == 5){
			var classNamePrev = ".joiTDClass";
			var classNameCurr = ".vineriTDClass";
		}
		$(item).parents("tr").find(classNamePrev).prepend(labelpreviousdate+addminusbutton);
		$(item).parents("tr").find(classNamePrev).append(addplusbutton);
		$(item).parents("tr").find(classNameCurr).prepend(labelcurrentdate+addminusbutton);
		$(item).parents("tr").find(classNameCurr).append(addplusbutton);
		//$(item).parents("tr").find(".remove_hours").remove();
		
		$(item).append("<select class='statusClass' onclick='show_postponed_status_info()'> <option disabled>Open</option> <option selected>In work</option> <option disabled>Postponed</option><option disabled>Reviewed</option> <option disabled>Closed</option></select>");
	instantiateDatePick();
}
function inWorkChangeStatusFromPostponed(clicked){
	
	$("#myTable").css('opacity', '0.6');
	$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
		$("#componentRequestDiv").text("In Work?");
		$("#componentRequestDiv").css("color","#00a548");
		$("#componentRequestDiv").css("left","36%");
		$("#requestDiv").show();
	$("#requestDiv").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#saveChange").unbind().on('click',function(){
		$(clicked).parents("tr").css("background-color","#ffbaba");
		$(clicked).parents("tr").find('.edit_button').val(1);
		$("#requestDiv").hide();
		$("#myTable").css('opacity', '');
		$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
		var currentDay = getCurrentDay();

		var estReestTime="<input class='reestimatedEstimatedClass' value = 10 style='width:20px;text-align:center; border-style:none;border-radius:2px;background-color:#3aff8a' oninput='checkEstimTimeNew(this)' /> | <input style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value=0 onclick ='clickOnDisabledEstim()' readonly='readonly'>";
		var addplusbutton = "<button class='add_hours' onclick='addhour(this)'><img  src='add_hours.png' style='width:15px; height:15px;' ></img></button>";
		var addminusbutton = "<button class='remove_hours' onclick='removehour(this)'><img src='remove_hours.png' style='width:15px; height:15px;'></img></button>";

		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth()+1;
		var day = today.getDate();
		var prevday = today.getDate()-1;
							
		prevday = checkTime(prevday);
		day = checkTime(day);
							
		month = checkTime(month);
							//currentDay = 5;
		var fulldate = year+"-"+month+"-"+day;
		var previousfulldate = year+"-"+month+"-"+prevday;
		var labelcurrentdate = "<label style='display:none' class='currdate'> "+fulldate+" </label>";
		var labelpreviousdate = "<label style='display:none' class ='prevdate'> "+previousfulldate+" </label>";
		
		var firstDay = new Date();
		var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
		var nextWeekMonth = nextWeek.getMonth()+1;
		var nextWeekYear = nextWeek.getFullYear();
		var nextWeekDay = nextWeek.getDate();
		nextWeekMonth = checkTime(nextWeekMonth);
		nextWeekDay = checkTime(nextWeekDay);
		var nextWeekFromNow = nextWeekYear+"-"+nextWeekMonth+"-"+nextWeekDay;
		
		var x = $(clicked).parents("tr").find(".reestimatedClass");
		var h= $(clicked).parents("tr").find(".estimatedClass");
		var y = $(clicked).parents("tr").find(".enddateClass");
		var z = $(clicked).parents("tr").find(".enddatepicker");
		var l = $(clicked).parents("tr").find(".labelestimClass");
		
		$(x).remove(".reestimatedClass");
		$(h).remove(".estimatedClass");
		$(y).remove(".enddateClass");
		$(z).remove(".enddatepicker");
		$(l).remove(".labelestimClass");
		
		
		
		//<select class='statusClass' > <option disabled>Open</option> <option selected>In work</option> <option onclick='postponedChangeStatus(this)'>Postponed</option><option>Reviewed</option> <option>Closed</option></select>
		//alert($(clicked).parents("tr").find(".estimatedClass").attr('class'));
		$(clicked).parents("tr").find(".estimatedTDClass").append(estReestTime);
		$(clicked).parents("tr").find(".estimatedClass").val(10);
		
		$(clicked).parents("tr").find(".enddateTDClass").append("<input  type = 'text' class='enddatepicker' onclick='datePick()' size ='8' style='text-align:center;' oninput = 'checkDate(this)'>");
		$(clicked).parents("tr").find(".enddatepicker").val(nextWeekFromNow);
		//alert($(clicked).parents("tr").find(".estimatedClass").attr('class'));
		var item;
		var a = $(clicked).parents("td");
		item = a;
		$(a).find(".statusClass").remove(".statusClass");
		
		if(currentDay == 1){
			var classNamePrev = "";
			var classNameCurr = ".luniTDClass";
		}
		if(currentDay == 2){
			var classNamePrev = ".luniTDClass";
			var classNameCurr = ".martiTDClass";
		}
		if(currentDay == 3){
			var classNamePrev = ".martiTDClass";
			var classNameCurr = ".miercuriTDClass";
		}
		if(currentDay == 4){
			var classNamePrev = ".miercuriTDClass";
			var classNameCurr = ".joiTDClass";
		}
		if(currentDay == 5){
			var classNamePrev = ".joiTDClass";
			var classNameCurr = ".vineriTDClass";
		}
		$(item).parents("tr").find(classNamePrev).prepend(labelpreviousdate+addminusbutton);
		$(item).parents("tr").find(classNamePrev).append(addplusbutton);
		$(item).parents("tr").find(classNameCurr).prepend(labelcurrentdate+addminusbutton);
		$(item).parents("tr").find(classNameCurr).append(addplusbutton);
		//$(item).parents("tr").find(".remove_hours").remove();
		
		$(item).append("<select class='statusClass' onclick='show_postponed_status_info()'> <option disabled>Open</option> <option selected>In work</option> <option disabled>Postponed</option><option disabled>Reviewed</option> <option disabled>Closed</option></select>");
		instantiateDatePick();
		
		$('#saveintodatabase').show();
		timeout();
	});
	
	$("#cancelChange").unbind().on('click',function(){
		$("#requestDiv").hide();
		$("#myTable").css('opacity', '');
		$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
		$(clicked).parents("td").find(".statusClass").val("Postponed").change();
	});
}
function detailsEdit(clicked){
	var tasklabel = $(clicked).parents("tr").find(".taskID").text();
	var taskidlabel = tasklabel.split("/");
	if($("#descriptionDetails").is(':visible') && $("#taskIdForDescription").text() == taskidlabel[1])
		$("#descriptionDetails").hide();
	else
		$("#descriptionDetails").show();
	
	$("#myTable").css('opacity', '0.6');
	//$("#myTable").find("input,button,textarea,select,a").attr("disabled", "disabled");
	$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
	//$("#reestimatedDetails").css("z-index","1");
	$("#descriptionDetails").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#descriptionDetails").show();
	
	$("#textareaDescription").val($(clicked).parents("tr").find(".hidden_details").text());
	$("#taskIdForDescription").text(taskidlabel[1]);
}
function detailsEditOther(clicked){
	var tasklabel = $(clicked).parents("tr").find(".taskidOtherLabel").text();
	$("#myTable").css('opacity', '0.6');
	$("#otherActivityDiv").css('background-color','#a39b96');
	$("#otherActivTable").css('background-color','#efefef');
	$("#otherActivTable").css('opacity', '0.6');
	
	$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
	$("#descriptionDetails").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#descriptionDetails").show();
	
	$("#textareaDescription").val($(clicked).parents("tr").find(".hidden_details").text());
	$("#taskIdForDescription").text(tasklabel);
}
function saveChanges(){
	//verifica inainte de salvare daca poate sa faca scheme si dupa restu
	$.post("checksForHomepage.php",{nr:2},function(result){
				//alert(result);
					if(result == 'error')
					{
						checker = 1;
							if($("#myTable").css('opacity')=='0.6')
							{
								$("#descriptionDetails").hide();
								$("#reestimatedDetails").hide();
								$("#requestDiv").hide();
								$("#OpenDiv").hide();
								$("#weeklyReportDiv").hide();
								$("#reviewDetails").hide();
							}
							$("#myTable").css('opacity', '0.6');
							$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
							$("#relogareDiv").find("input,button,textarea,select,a").removeAttr("disabled");
							$("#relogareDiv").show();
					}	
					else
					{
						if(zeroTasks == 1)
						{
							$("#youhavenotasks").show();
							timeout();
						}
						else{
							var hoursModifier = 0;
							var taskIdNewTask="";
							var projectNameNewTask ="";
							var taskNameNewTask ="";
							var previousDateNewTask ="";
							var currentDateNewTask = "";
							var previousHoursNewTask ="";
							var currentHoursNewTask ="";
							var estimatedHoursNewTask = "";
							var statusNewTask = "";
							var enddateNewTask ="";
							var reviewableNewTask = "";
							var isReworkForNewTask = "";
							
							var taskIdProblems = 0;
							var alreadyInserted = 0;
							
							var taskIdExisted="";
							var previousDateExisted ="";
							var currentDateExisted = "";
							var previousHoursExisted ="";
							var currentHoursExisted ="";
							var estimatedHoursExisted = "";
							var reestimatedHoursExisted = "";
							var reestimatedReasonExisted = "";
							var reviewMakerExisted = "";
							var statusExisted = "";
							var enddateExisted ="";
							
							var correcter = gethoursFullDay().split("/");
							if(overTimeMax < parseInt(correcter[0]) || overTimeMax < parseInt(correcter[1]))
							{							
								$("#modifiedhourssave").show();
								hoursModifier = 1;
							}
							var totalTester = 0;
							var needUpdate = 0;
							$("table tbody").find('.taskID').each(function(){
								var table = $(this).text().split('/');
								if(table[0] =="1" ){
									alreadyInserted = 1;
									if(!$(this).parents("tr").find(".taskNameClass").val().trim().length >0){
										totalTester = 1;
										$("#notasknameorestimtime").show();
										timeout();
									}
									if(!$(this).parents("tr").find(".estimatedClass").val().trim().length >0){
										totalTester = 1;
									}
									if(totalTester == 1)
									{
										taskIdProblems = 1;
										totalTester = 0;
										$(this).css("background-color","#f4ee42");
									}
									else{
										$(this).css("background-color","");
										taskIdNewTask +=table[1]+"~^";
										projectNameNewTask+=$(this).parents("tr").find(".projectNameClass").val()+"~^";
										taskNameNewTask+=$(this).parents("tr").find(".taskNameClass").val().trim()+"~^";
										previousDateNewTask+=$(this).parents("tr").find(".prevdate").text()+"~^";
										currentDateNewTask+=$(this).parents("tr").find(".currdate").text()+"~^";
										
										var prDate = $(this).parents("tr").find(".prevdate");
										var crDate = $(this).parents("tr").find(".currdate");
										
										previousHoursSpliter = $(prDate).parents("td").find(".neededhour").text().split("/");
										currentHoursSpliter = $(crDate).parents("td").find(".neededhour").text().split("/");
										if(hoursModifier == 1)
										{
											previousHoursNewTask+="0"+"~^";
											currentHoursSpliter+="0"+"~^";
										}
										else
										{
											previousHoursNewTask+= previousHoursSpliter[0]+"~^";
											currentHoursNewTask+=currentHoursSpliter[0]+"~^";
										}

										estimatedHoursNewTask+= $(this).parents("tr").find(".estimatedClass").val()+"~^";
									
										
										statusNewTask+= $(this).parents("tr").find(".statusClass").val()+"~^";
										
										
										var x = $(this).parents("tr").find(".reviewableTDClass");
										var creator = "reviewableRadio"+table[1];
										
										reviewableNewTask+=$(x).find("input[name="+creator+"]:checked").val()+"~^";
										enddateNewTask+= $(this).parents("tr").find(".enddatepicker").val()+"~^";
										//aici la is rework for
										if($(this).parents("tr").find(".hidden_isreworkfor").text()!="")
											isReworkForNewTask+=$(this).parents("tr").find(".hidden_isreworkfor").text()+"~^";
										else
											isReworkForNewTask+="0~^";
									
										
									}
								}
								else{  // aici la update 
									needUpdate = 1;
									$(this).parents("tr").css("background","#58dee8");
									resetColor($(this).parents("tr"));
									//alert($(this).parents("tr").find(".statusClass").val());

									taskIdExisted +=table[1]+"~^";
									previousDateExisted+=$(this).parents("tr").find(".prevdate").text()+"~^";
									
									currentDateExisted+=$(this).parents("tr").find(".currdate").text()+"~^";
											
									var prDate = $(this).parents("tr").find(".prevdate");
									var crDate = $(this).parents("tr").find(".currdate");
											
									previousHoursSpliter = $(prDate).parents("td").find(".neededhour").text().split("/");
									currentHoursSpliter = $(crDate).parents("td").find(".neededhour").text().split("/");
		
									if(hoursModifier == 1)
									{
										previousHoursExisted+="0"+"~^";
										currentHoursExisted+="0"+"~^";
									}
									else
									{
										previousHoursExisted+= previousHoursSpliter[0]+"~^";
										currentHoursExisted+=currentHoursSpliter[0]+"~^";
									}
											
									estimatedHoursExisted+= $(this).parents("tr").find(".reestimatedEstimatedClass").val()+"~^";
									reestimatedHoursExisted+=$(this).parents("tr").find(".reestimatedReestimClass").val()+"~^";
									reestimatedReasonExisted+=$(this).parents("tr").find(".hidden_reestim").text()+"~^";
									statusExisted+= $(this).parents("tr").find(".statusClass").val()+"~^";
									enddateExisted+= $(this).parents("tr").find(".enddatepicker").val()+"~^";
									reviewMakerExisted+= $(this).parents("tr").find(".hidden_review").text()+"~^";
								}
							});
							if(taskIdProblems == 0 && alreadyInserted == 1)
							{ // success
								$("#popupdivsuccess").show();
								timeout();
								
								$("table tbody").find('.taskID').each(function(){
								//	alert($(this).text());
									var table = $(this).text().split('/');
									var projects = projectNameNewTask.split("~^");
									var taskN = taskNameNewTask.split("~^");
									var estim = estimatedHoursNewTask.split("~^");
									var endd = enddateNewTask.split("~^");
									
									var insertTasks = taskIdNewTask.split("~^");
									for(var i=0;i<insertTasks.length;i++)
									{
										if(table[1] == insertTasks[i])
										{
											$(this).parents("tr").find(".projectNameClass").remove();
											$(this).parents("tr").find(".projectName").text(projects[i]);
											
											$(this).parents("tr").find(".taskNameClass").remove();
											$(this).parents("tr").find(".taskName").text(taskN[i]);
											
											$(this).parents("tr").find(".estimatedClass").remove();
											$(this).parents("tr").find(".estimatedTDClass").append("<label class ='estimatedClass'> "+estim[i]+"<label>");
											
											$(this).parents("tr").find(".enddatepicker").remove();
											$(this).parents("tr").find(".enddateTDClass").append("<label class='enddateClass'>"+endd[i]+"</label>");
											
											$(this).find(".taskIdentificator").text("0");
											$(this).parents("tr").css("background","#32db7f");
											resetColor($(this).parents("tr"));
										}
									}
								});
								setTimeout(function(){
										$("#myTable tbody").empty();
										$("#myTable").append("	<tbody id='tbodyId'><tr id='noTaskYet'><td colspan='13'> No task yet.. </td> </tr></tbody>");
										loadTable();
										$("#myTable").append('<tr id="last_tr" cellspacing ="100px"><td class="search"><input oninput="goTo()"type="text" id="search" placeholder="Type to search..." /></td>	<td colspan="8" class="padding_class" > <p id="date_time"> Date: .. </p > </td><td colspan="4"> 235/260 Productive Hours </td></tr>');
									},500);
							//	alert(taskIdNewTask+" \n"+projectNameNewTask+" \n"+taskNameNewTask+" \n"+previousDateNewTask+" \n"+currentDateNewTask+" \n"+previousHoursNewTask+" \n"+currentHoursNewTask+" \n"+estimatedHoursNewTask+" \n"+statusNewTask+" \n"+enddateNewTask);
								$.post('savesForHomepage.php', {nr:2, tID:taskIdNewTask,pN:projectNameNewTask,tN:taskNameNewTask ,prD:previousDateNewTask ,crD: currentDateNewTask,prH:previousHoursNewTask ,crH: currentHoursNewTask,eT: estimatedHoursNewTask, sts: statusNewTask, rwD:reviewableNewTask,eD: enddateNewTask,isRew:isReworkForNewTask}, function(result) { 
									//alert(result);
									if(result.search("error")>-1)
										alert("THERE WAS A BIG PROBLEM WITH THE INSERTING INTO DATABASE !\nPlease contact 'The Timetool SW Developers' to fix this problem!\nThis can generate more problems !");

								});
								$.post('getsForHomepage.php',{nr:2,ch:noOfTasksAdded},function(result){
										
								});
								alreadyInserted = 0;
							}
							if(needUpdate!=0)
							{
								//alert(taskIdExisted+" \n"+previousDateExisted+" \n"+currentDateExisted+" \n"+previousHoursExisted+" \n"+currentHoursExisted+" \n"+estimatedHoursExisted+" \n"+reestimatedHoursExisted+" \n"+statusExisted+" \n"+enddateExisted);
								//alert(currentDateExisted+" "+currentHoursExisted);
								//alert(previousDateExisted+" "+previousHoursExisted);

								
								if(alreadyInserted == 0) // HERE TO MAKE AN UPDATE
								{
									$.post('savesForHomepage.php', { nr:0,tID:taskIdExisted,prD:previousDateExisted,prH: previousHoursExisted,crD:currentDateExisted,crH: currentHoursExisted,eT:estimatedHoursExisted,reT:reestimatedHoursExisted,reReason:reestimatedReasonExisted,revM:reviewMakerExisted,sts:statusExisted,eD:enddateExisted }, function(result) { 
										if(result!="")
										{
											if(result.search("error")>-1){
												alert("THERE WAS A BIG PROBLEM WITH THE INSERTING INTO DATABASE! Not all the information were saved!\nPlease contact 'The Timetool SW Developers' to fix this problem!\nThis can generate more problems !");
											}
											else
											{
												var spliterTable = result.split("~^");
												if(spliterTable.length>1)
												{
													var colector = "";
													for(var i=0;i<spliterTable.length-1;i++)
													{
														if(i!=spliterTable.length-2)
														{
															colector+=spliterTable[i]+", ";
														}
														else
														{
															colector+=spliterTable[i];
														}
													}
													$("#myTable").css('opacity', '0.6');
													$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
													
													$("#errorTaskIdFromReviewedToClose").text(colector);
													$("#errorFromReviewedToClose").show();
													$("#errorFromReviewedToClose").find("input,button,textarea,select,a").removeAttr("disabled","disabled");
													$("#errorTaskIdFromReviewedToClose").css("color","#8af902");
													//alert(colector);
													//alert("There are some tasks that can not be saved into DB !");
												}
												
											}
									
										}
									setTimeout(function(){
										
										$("#myTable  tbody").empty();
										$("#myTable").append("	<tbody id='tbodyId'><tr id='noTaskYet'><td colspan='13'> No task yet.. </td> </tr></tbody>");
										loadTable();
										$("#myTable").append('<tr id="last_tr" cellspacing ="100px"><td class="search"><input oninput="goTo()"type="text" id="search" placeholder="Type to search..." /></td>	<td colspan="8" class="padding_class" > <p id="date_time"> Date: .. </p > </td><td colspan="4"> 235/260 Productive Hours </td></tr>');
									},500);
								});
								}
								else{
									$.post('savesForHomepage.php', { nr:0,tID:taskIdExisted,prD:previousDateExisted,prH: previousHoursExisted,crD:currentDateExisted,crH: currentHoursExisted,eT:estimatedHoursExisted,reT:reestimatedHoursExisted,reReason:reestimatedReasonExisted,revM:reviewMakerExisted,sts:statusExisted,eD:enddateExisted }, function(result) { 
										if(result!="")
										{
											if(result.search("error")>-1){
												alert("THERE WAS A BIG PROBLEM WITH THE INSERTING INTO DATABASE! Not all the information were saved!\nPlease contact 'SW Developers' to fix this problem!\nThis can generate more problems !");
											}
											else
											{
												var spliterTable = result.split("~^");
												if(spliterTable.length>1)
												{
													var colector = "";
													for(var i=0;i<spliterTable.length-1;i++)
													{
														if(i!=spliterTable.length-2)
														{
															colector+=spliterTable[i]+", ";
														}
														else
														{
															colector+=spliterTable[i];
														}
													}
													$("#myTable").css('opacity', '0.6');
													$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
													
													$("#errorTaskIdFromReviewedToClose").text(colector);
													$("#errorFromReviewedToClose").show();
													$("#errorFromReviewedToClose").find("input,button,textarea,select,a").removeAttr("disabled","disabled");
													$("#errorTaskIdFromReviewedToClose").css("color","#8af902");
												//	alert(colector);
													//alert("There are some tasks that can not be saved into DB !");
												}
												
											}
									
										}
									});
									$("#notasknameorestimtime").show();
									timeout();
								}
							}
						}
					}
			});
}
function checkDaySumHours(){
	var currentDay = getCurrentDay();
	var firstHours = 0;
	var secondHours = 0;
	$("table tbody").find('.taskID').each(function(){
		
		if(currentDay == 1)
		{
			var luniTag = "luniTDClass";
			var k = $(this).parents("tr").find(".luniTDClass");
			var table = $(k).find("label:visible").text().split("/");
			firstHours += parseInt(table[0]);

		}
		if(currentDay == 2)
		{
			var k = $(this).parents("tr").find(".luniTDClass");
			var h = $(this).parents("tr").find(".martiTDClass");
			
			var table2 = $(h).find("label:visible").text().split("/");
			var table = $(k).find("label:visible").text().split("/");
			secondHours+= parseInt(table2[0]);
			firstHours += parseInt(table[0]);
			
		}
		if(currentDay == 3)
		{
			var k = $(this).parents("tr").find(".martiTDClass");
			var h = $(this).parents("tr").find(".miercuriTDClass");
			
			var table2 = $(h).find("label:visible").text().split("/");
			var table = $(k).find("label:visible").text().split("/");
			secondHours+= parseInt(table2[0]);
			firstHours += parseInt(table[0]);
		}
		if(currentDay == 4)
		{
			var k = $(this).parents("tr").find(".miercuriTDClass");
			var h = $(this).parents("tr").find(".joiTDClass");
			
			var table2 = $(h).find("label:visible").text().split("/");
			var table = $(k).find("label:visible").text().split("/");
			secondHours+= parseInt(table2[0]);
			firstHours += parseInt(table[0]);
		}
		if(currentDay == 5)
		{
			var k = $(this).parents("tr").find(".joiTDClass");
			var h = $(this).parents("tr").find(".vineriTDClass");
			
			var table2 = $(h).find("label:visible").text().split("/");
			var table = $(k).find("label:visible").text().split("/");
			secondHours+= parseInt(table2[0]);
			firstHours += parseInt(table[0]);
		}	
	});
	return ""+firstHours+"/"+secondHours;
}
function checkDaySumHoursOtherActivities(){
	$("#otherActivTable #otherTbodyTable").find('.taskidOther').each(function(){
			alert($(this).parents("tr").find(".hoursOtherLabel").text()+" hours on "+$(this).parents("tr").find(".enddateOtherLabel").text());
	});
}
function delete_rows(){
	
			var ok =0;
			var ok2 = 0;
			var notaskselected = 0;
			$("table tbody").find('button[name="editbutton"]').each(function(){
				if($(this).val()==1 ){
					notaskselected = 1;
				}
			});
			if(notaskselected == 0)
			{
				$('#deletewhennotaskareselected').show();
				timeout();	
			}
            $("table tbody").find('button[name="editbutton"]').each(function(){
            	if($(this).val()==1 ){
					var testerId = $(this).parents("tr").find(".taskID").text().split("/");
					//var abc = $(this).parents("tr").find(".statusClass").val();
					if($(this).parents("tr").find(".statusClass").val()=="Open" && testerId[0] ==1)
					{
						$(this).parents("tr").remove();
						nextTaskId-- ;
						ok2 = 1;
						noOfTasksAdded--;
					}
					else
						if($(this).parents("tr").find(".statusClass").val()=="Open" && testerId[0] !=1)
					{
						ok=1;
					}
					else
					{
						ok=1;
					}
				}
            });
			
			if(ok == 1)
			{
				$('#opentaskdeleteerror').show();
				timeout();
			}
			if(ok !=1 && ok2 == 1)
			{
				$("#succesfullydeleted").show();
				timeout();
			}
			var table = document.getElementById("myTable");
			
			if(table.rows.length ==  3)
			{
				$("#noTaskYet").show();
			}
}
function logout(){
	$.post('logout.php', { num:"" }, function(result) { 
		if (result == 1)
			window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
	});
}
function all_tasks(){
	window.location.href = "http://tmda365u/Quality/TimeToolTry/Ovidiu/HomePage/Alltask/AllTask.php";
}
function minusweek(){
	
	if(week>0){
		week -- ;
	zeroTasks = 0;
	$("#myTable").find("input,button,textarea,select,a").attr("disabled", "disabled");
	$("#myTable tbody").empty();
	$("#myTable").append("<tbody id='tbodyId'><tr id='noTaskYet'><td colspan='13'> No task yet.. </td> </tr></tbody>");
	loadTable();
	
	$("#tbodyId").append('<tr id="last_tr" cellspacing ="100px"><td class="search"><input oninput="goTo()"type="text" id="search" placeholder="Type to search..." /></td>	<td colspan="8" class="padding_class" > <p id="date_time"> Date: .. </p > </td><td colspan="4"> 235/260 Productive Hours </td></tr>');
	$("#myTable").find("input,button,textarea,select,a").attr("disabled", "disabled");
	$("#forward").css("color","green");	
	}
	else
	{
		$("#moveminusweek").show();
		timeout();
	}
}
function currentweek(){
	week = currentWeek;
	$("#myTable tbody").empty();
	$("#myTable").append("	<tbody id='tbodyId'><tr id='noTaskYet'><td colspan='13'> No task yet.. </td> </tr></tbody>");
	loadTable();
	$("#myTable").append('<tr id="last_tr" cellspacing ="100px"><td class="search"><input oninput="goTo()"type="text" id="search" placeholder="Type to search..." /></td>	<td colspan="8" class="padding_class" > <p id="date_time"> Date: .. </p > </td><td colspan="4"> 235/260 Productive Hours </td></tr>');
}
function plusweek(){
	
	if(week<currentWeek){
		week ++ ;
		//$("#forward").css("color","green");
		$("#myTable").find("input,button,textarea,select,a").attr("disabled", "disabled");
		$("#myTable tbody").empty();
		$("#myTable").append("	<tbody id='tbodyId'><tr id='noTaskYet'><td colspan='13'> No task yet.. </td> </tr></tbody>");
		loadTable();
		$("#myTable").append('<tr id="last_tr" cellspacing ="100px"><td class="search"><input oninput="goTo()"type="text" id="search" placeholder="Type to search..." /></td>	<td colspan="8" class="padding_class" > <p id="date_time"> Date: .. </p > </td><td colspan="4"> 235/260 Productive Hours </td></tr>');
		$("#myTable").find("input,button,textarea,select,a").attr("disabled", "disabled");
		
	}
	else
	{
		$("#forward").css("color","gray");
	}
	
}
function hide_me(){
   $("#deliverTasksDiv").hide();
   $('#deletewhennotaskareselected').hide();
   $('#popupdivsuccess').hide();
   $('#popupdivfail').hide();
   $('#opentaskdeleteerror').hide();
   $('#addhouronclickerror').hide();
   $("#savedetailstasks").hide();
   $("#introduceforbidencharacters").hide();
   $("#succesfullydeleted").hide();
   $("#tasknametoolong").hide();
   $("#notasknameorestimtime").hide();
   $("#statuschangenotallowed").hide();
   $("#clickOnNotEditableEstimation").hide();
   $("#cantaddmoretasks").hide();
   $("#cantaddtaskondiffweek").hide();
   $("#moveminusweek").hide();
   $("#morehoursonday").hide();
   $('#saveintodatabase').hide();
   $("#modifiedhourssave").hide();
}
function cancelDescr(){
	if($("#otherActivityDiv").is(':visible')){
		$("#otherActivTable").css('opacity', '');
		$("#otherActivityDiv").css('background-color','');
		$("#otherActivTable").css('background-color','');
		$("#otherActivityDiv").find("input,button,textarea,select,a").removeAttr("disabled");
		$("#descriptionDetails").hide();
	}
	else
	{
		$("#myTable").css('opacity', '');
		$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
		$("#descriptionDetails").hide();
	}
}
function cancelReview(){
	$("#myTable").css('opacity', '');
	$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#reviewDetails").hide();
}
function cancelReestimated(){
	$("#myTable").css('opacity', '');
	$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#reestimatedDetails").hide();
}
function saveReestimated(){
	
	if($("#setReestimatedhours").val()=="")
	{
		$("#setReestimatedhours").val("20");
		$("#setReestimatedhours").css("background-color","#f26f78");
	}
	else
	{
		$("#reestimatedDetails").hide();
		$("#myTable").css('opacity', '');
		$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
	}
	$("table tbody").find('.taskID').each(function(){
		var spliter = $(this).text().split("/");
			if($("#taskIdForReestimated").text() == spliter[1])
				clicked = $(this);
    });
	var preEstim = $(clicked).parents("tr").find(".estimatedClass").val();
	var x = $(clicked).parents("tr").find(".labelestimClass");
	$(x).remove();
	
	//alert(textareaReestimated.val());
	
	$(clicked).parents("tr").find(".estimatedTDClass").append("<label class = 'labelestimClass' ><ul class ='table_reestim_dropdown'><li><a href='javascript:void()' style='text-decoration: none; margin:0 auto;'><input class ='estimatedClass' style='width:20px;text-align:center;  border-style: none;border-radius:2px;background-color:#9ca5af;color:#0011ff;' value=-10 onclick ='clickOnDisabledEstim()' readonly='readonly'> | <input class='reestimatedReestimClass' value = 0 style='width:20px;text-align:center; border-style:none;border-radius:2px;background-color:#3aff8a' oninput = 'checkEstimTime(this)' onclick='showReestimationDiv(this)' readonly='readonly'></label><li class='hidden_reestim'>someth</li></li></ul></label>");
	$(clicked).parents("tr").find(".estimatedClass").val(preEstim);
	$(clicked).parents("tr").find(".reestimatedReestimClass").val($("#setReestimatedhours").val());
	$(clicked).parents("tr").find(".hidden_reestim").text($("#textareaReestimated").val());

	$('#saveintodatabase').show();
		timeout();
	//<ul class ='table_details_dropdown'><li class='hidden_details'> "+descr[kz]+"</li></ul>
	//$(clicked).parents("tr").find(".reestimatedClass").val($("#setReestimatedhours").val());
	//alert($("#setReestimatedhours").val());
}
function saveDescr(){
	if($("#otherActivityDiv").is(':visible')){
		$("#otherActivTable").css('opacity', '');
		$("#otherActivityDiv").css('background-color','');
		$("#otherActivTable").css('background-color','');
		$("#otherActivityDiv").find("input,button,textarea,select,a").removeAttr("disabled");
		$("#descriptionDetails").hide();
		
		var taskidOther = parseInt($("#taskIdForDescription").text());
		var description = $("#textareaDescription").val();
		
		$.post("savesForHomepage.php",{nr:1,coll:2,taskid:taskidOther,descr:description},function(result){
			if(result.search("error")>-1)
				alert("THERE WAS A BIG PROBLEM WITH THE INSERTING INTO DATABASE !\nPlease contact 'The Timetool SW Developers' to fix this problem!\nThis can generate more problems !");
			else{
				
				$("#otherActivTable tbody").find('.taskidOther').each(function(){
						if($("#taskIdForDescription").text() == $(this).text())
							clicked = $(this);
				});
				$(clicked).parents("tr").find(".hidden_details").text(description);
			}
		});
	}
	else
	{
		$("#descriptionDetails").hide();
		var textareaText = $("#textareaDescription").val();
		//alert($("#taskIdForDescription").text());
		var clicked;
		$("table tbody").find('.taskID').each(function(){
			var spliter = $(this).text().split("/");
				if($("#taskIdForDescription").text() == spliter[1])
					clicked = $(this);
		});
		$(clicked).parents("tr").find(".hidden_details").text(textareaText);
		var spliterTask = $(clicked).parents("tr").find(".taskID").text().split("/");
		var description = $(clicked).parents("tr").find(".hidden_details").text();
		
		$.post("savesForHomepage.php",{nr:1,coll:1,taskid:parseInt(spliterTask[1]),descr:description},function(result){
			if(result.search("error")>-1)
				alert("THERE WAS A BIG PROBLEM WITH THE INSERTING INTO DATABASE !\nPlease contact 'The Timetool SW Developers' to fix this problem!\nThis can generate more problems !");
			else{
				//alert(result);
				$('#savedetailstasks').show();
				timeout();
			}
		});

		$("#myTable").css('opacity', '');
		$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
		$("#descriptionDetails").hide();
		
		
	}
}
function openOk(){
	if($('#checkboxId').is(':checked'))
	{
		$.post('getsForHomepage.php', {nr:7},function(result) { 
		});
	}
	$("#OpenDiv").hide();
	$("#myTable").css('opacity', '');
	$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled", "disabled");
}
function gotookWeeklyReport(){
	$.post('getsForHomepage.php',{nr:8}, function(result) { 
		firstWeeklyReport=1;
	});
	$("#weeklyReportDiv").hide();
	$("#myTable").css('opacity', '');
	$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled", "disabled");
}
function saveReview(){
	$("#reviewDetails").hide();
	var textareaText = $("#textareaReview").val();
	var clicked;
	$("table tbody").find('.taskID').each(function(){
		var spliter = $(this).text().split("/");
			if($("#taskIdForReview").text() == spliter[1])
				clicked = $(this);
    });
	
	$(clicked).parents("tr").find(".hidden_review").text(textareaText);
	
	$('#saveintodatabase').show();
	timeout();
	$("#myTable").css('opacity', '');
	$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#reviewDetails").hide();
}
function hoverTaskFromDescription(){
	if($("#otherActivityDiv").is(':visible')){
		var clicked;
		$("#otherActivTable tbody").find('.taskidOther').each(function(){
				if($("#taskIdForDescription").text() == $(this).text())
					clicked = $(this);
				
		});
		$(clicked).parents("tr").find(".taskidOther").css("background-color","#00ccff");
	}
	else
	{
		var clicked;
		$("#myTable tbody").find('.taskID').each(function(){
			var spliter = $(this).text().split("/");
				if($("#taskIdForDescription").text() == spliter[1])
					clicked = $(this);
		});
		var btnClicked = clicked;
		$(btnClicked).parents("tr").find(".taskID").css("background-color","#00ccff");
	}
}
function hoverTaskFromReestimated(){
	var clicked;
	$("table tbody").find('.taskID').each(function(){
		var spliter = $(this).text().split("/");
			if($("#taskIdForReestimated").text() == spliter[1])
				clicked = $(this);
    });
	var btnClicked = clicked;
	$(btnClicked).parents("tr").find(".taskID").css("background-color","#00ccff");
}
function hoverTaskFromReviewn(){
	var clicked;
	$("table tbody").find('.taskID').each(function(){
		var spliter = $(this).text().split("/");
			if($("#taskIdForReview").text() == spliter[1])
				clicked = $(this);
    });
	var btnClicked = clicked;
	$(btnClicked).parents("tr").find(".taskID").css("background-color","#00ccff");
}
function noHoverTaskFromReview(){
	var clicked;
	$("table tbody").find('.taskID').each(function(){
		var spliter = $(this).text().split("/");
			if($("#taskIdForReview").text() == spliter[1])
				clicked = $(this);
    });
	var btnClicked = clicked;
	$(btnClicked).parents("tr").find(".taskID").css("background-color","");
	
}
function noHoverTaskFromDescription2(){
	if($("#otherActivityDiv").is(':visible')){
		var clicked;
		$("#otherActivTable tbody").find('.taskidOther').each(function(){
				if($("#taskIdForDescription").text() == $(this).text())
					clicked = $(this);
		});
		$(clicked).parents("tr").find(".taskidOther").css("background-color","");
	}
	else{
		var clicked;
		$("table tbody").find('.taskID').each(function(){
			var spliter = $(this).text().split("/");
				if($("#taskIdForDescription").text() == spliter[1])
					clicked = $(this);
		});
		var btnClicked = clicked;
		$(btnClicked).parents("tr").find(".taskID").css("background-color","");
	}
}
function noHoverTaskFromReestimated(){
	var clicked;
	$("table tbody").find('.taskID').each(function(){
		var spliter = $(this).text().split("/");
			if($("#taskIdForReestimated").text() == spliter[1])
				clicked = $(this);
    });
	var btnClicked = clicked;
	$(btnClicked).parents("tr").find(".taskID").css("background-color","");
}
function show_me_more(){
	if($("#deletewhennotaskareselected").is(":visible"))
	{
		$("#deletewhennotaskareselected").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#cantaddtaskondiffweek").is(":visible"))
	{
		$("#cantaddtaskondiffweek").css("display","blocked");
		clearTimeout(g_timer);
	}
	
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
	if($("#opentaskdeleteerror").is(":visible"))
	{
		$("#opentaskdeleteerror").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#addhouronclickerror").is(":visible"))
	{
		$("#addhouronclickerror").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#savedetailstasks").is(":visible"))
	{
		$("#savedetailstasks").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#succesfullydeleted").is(":visible"))
	{
		$("#succesfullydeleted").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#introduceforbidencharacters").is(":visible"))
	{
		$("#introduceforbidencharacters").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#tasknametoolong").is(":visible"))
	{
		$("#tasknametoolong").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#notasknameorestimtime").is(":visible"))
	{
		$("#notasknameorestimtime").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#statuschangenotallowed").is(":visible"))
	{
		$("#statuschangenotallowed").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#clickOnNotEditableEstimation").is(":visible"))
	{
		$("#clickOnNotEditableEstimation").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#cantaddmoretasks").is(":visible"))
	{
		$("#cantaddmoretasks").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#moveminusweek").is(":visible"))
	{
		$("#moveminusweek").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#morehoursonday").is(":visible"))
	{
		$("#morehoursonday").css("display","blocked");
		clearTimeout(g_timer);
	}	
	if($("#saveintodatabase").is(":visible"))
	{
		$("#saveintodatabase").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#youhavenotasks").is(":visible"))
	{
		$("#youhavenotasks").css("display","blocked");
		clearTimeout(g_timer);
	}
	if($("#noprojects").is(":visible"))
	{
		$("#noprojects").css("display","blocked");
		clearTimeout(g_timer);
	}
	
}
function rehide_me(){
	if($("#cantaddtaskondiffweek").is(":visible"))
	{
		timeout();
	}	
	if($("#moveminusweek").is(":visible"))
	{
		timeout();
	}
	if($("#deletewhennotaskareselected").is(":visible"))
	{
		timeout();
	}
	if($("#popupdivsuccess").is(":visible"))
	{
		timeout();
	}
	if($("#popupdivfail").is(":visible"))
	{
		timeout();
	}
	if($("#opentaskdeleteerror").is(":visible"))
	{
		timeout();
	}
	if($("#addhouronclickerror").is(":visible"))
	{
		timeout();
	}
	if($("#savedetailstasks").is(":visible"))
	{
		timeout();
	}
	if($("#succesfullydeleted").is(":visible"))
	{
		timeout();
	}
	if($("#introduceforbidencharacters").is(":visible"))
	{
		timeout();
	}
	if($("#tasknametoolong").is(":visible"))
	{
		timeout();
	}
	if($("#notasknameorestimtime").is(":visible"))
	{
		timeout();
	}
	if($("#statuschangenotallowed").is(":visible"))
	{
		timeout();
	}
	if($("#clickOnNotEditableEstimation").is(":visible"))
	{
		timeout();
	}
	if($("#cantaddmoretasks").is(":visible"))
	{
		timeout();
	}
	if($("#morehoursonday").is(":visible"))
	{
		timeout();
	}
	if($("#saveintodatabase").is(":visible"))
	{
		timeout();
	}
	if($("#youhavenotasks").is(":visible"))
	{
		timeout();
	}
	if($("#noprojects").is(":visible"))
	{
		timeout();
	}
}
function afisare_tip_user(){
	//aici facem pentru super user sau normal user afisarea taburilor
	
		$.post('getsForHomepage.php', {nr:11},function(result) { 
	
		if(result == 0) 
		{
			$("#Projects").hide();
			$("#Teams").hide();
			$("#changeNorm").hide();
		}
	});
}
function checkPassword(){
	
	if($("#relogareInput").val()=="")
	{
		$("#relogareInput").css("background-color","#fc4646");
		$("#relogareInput").css("border","1px solid #ffffff");
	}
	else{

		$.post("checksForHomepage.php",{nr:0,pw:$("#relogareInput").val(),usr:parseInt($("#userIdholder").text())},function(result)
		{
			if(result != 1){
				alert("Well..you'll need to re-Login");
				window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
			}
			else
			{
				$("#myTable").css('opacity', '');
				$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
				$("#relogareDiv").hide();
				checker = 1;
				
			}
		});
	}
	//$("#relogareInput").val("");
}
function enterK(){
	if(event.keyCode == 13){
		checkPassword();
	}
}
function inputPassword(){
	$("#relogareInput").css("background-color","white");
	$("#relogareInput").css("border","0px solid #ffffff");
}
function exitSession(){
	window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
}
function hoverReviewableLabel(){
	var clicked;
	$("table tbody").find('.taskID').each(function(){
		var spliter = $(this).text().split("/");
			if($("#labelId").text() == spliter[1])
				clicked = $(this);
    });
	var btnClicked = clicked;
	$(btnClicked).parents("tr").find(".taskID").css("background-color","#00ccff");
}
function nohoverReviewableLabel(){
	var clicked;
	$("table tbody").find('.taskID').each(function(){
		var spliter = $(this).text().split("/");
			if($("#labelId").text() == spliter[1])
				clicked = $(this);
    });
	var btnClicked = clicked;
	$(btnClicked).parents("tr").find(".taskID").css("background-color","");
}
function gotItFromReviewToClosed(){
	$("#myTable").css('opacity', '');
	$("#errorFromReviewedToClose").hide();
	$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled","disabled");
}
// new updates about other activities 
function gethoursFullDay(){
	// iau pe cele 2 zile datele, si orele si pe others si pe homepage
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var day = today.getDate();
	var prevday = new Date( today.getTime() - ( 86400 * 1000 )).getDate();
	prevday = checkTime(prevday);
	day = checkTime(day);
	
	month = checkTime(month);
	var fulldate = year+"-"+month+"-"+day;
	var mydate = new Date(year,month-1,day); 
	
	var prevd = new Date( mydate.getTime() - ( 86400 * 1000 ));
	var prevYear = prevd.getFullYear();
	var prevMonth = prevd.getMonth()+1;
	var prevDay = prevd.getDate();
	prevMonth = checkTime(prevMonth);
	prevDay = checkTime(prevDay);
	var previousfulldate = prevYear+"-"+prevMonth+"-"+prevDay;
	
	var table = daySumOnOtherForProductiveTasks(new Date(fulldate)).split("/");
	var table2 = checkDaySumHours().split("/");
	var yesterdayHours = parseInt(table[0])+parseInt(table2[0]);
	
	var todayHours = parseInt(table[1])+parseInt(table2[1]);
	return yesterdayHours+"/"+todayHours
}
function checkDateHomepageDay(){
	
}
function loadingOtherActivities(){
	$.post("getsForHomepage.php",{nr:4,coll:1},function(result){
		//var table = "145679~^1234567@#Meeting~^Unproductive@#Fazit Training~^Darts playing@#210~^90@#2017-08-17~^2017-08-16@#Description~^Description@#";
		var spliter = result.split("@#");
		var taskid = spliter[0].split("~^");
		var projectName = spliter[1].split("~^");
		var taskName = spliter[2].split("~^");
		var hoursSpend = spliter[3].split("~^");
		var enddate = spliter[4].split("~^");
		var details = spliter[5].split("~^");
		var collecter = "";
		
		$("#otherActivTable #otherTbodyTable").find('.taskidOther').each(function(){
			collecter+=$(this).text()+"~^";
		});
		for(var i=0;i<taskid.length-1;i++)
		{
			
			if(spliter[0].search(collecter)>-1){
				var taskidRow = "<td class='taskidOther'><label class='taskidOtherLabel'>"+taskid[i]+"</label></td>";
				var projectRow = "<td class='projectOther'><label class='projectOthersLabel'>"+projectName[i]+"</label></td>";
				var tasknameRow = "<td class='tasknameOther'><label class='tasknameOthersLabel'>"+taskName[i]+"</label></td>";
				var hoursSpendRow="";
				var hoursKeeper = parseInt(hoursSpend[i]);
				if(hoursKeeper/60<10)
				{
					if(hoursKeeper%60==0)
						hoursSpendRow+= "<td class ='hoursOther'><label class='hoursOtherLabel'>0"+(hoursKeeper/60-hoursKeeper/60*10%10/10)+":00 hours</label></td>";  
					else
						hoursSpendRow+= "<td class ='hoursOther'><label class='hoursOtherLabel'>0"+(hoursKeeper/60-hoursKeeper/60*10%10/10)+":30 hours</label></td>";
				}
				else
				{
					if(hoursKeeper%60==0)
						hoursSpendRow+= "<td class ='hoursOther'><label class='hoursOtherLabel'>"+(hoursKeeper/60-hoursKeeper/60*10%10/10)+":00 hours</label></td>";
					else
						hoursSpendRow+= "<td class ='hoursOther'><label class='hoursOtherLabel'>"+(hoursKeeper/60-hoursKeeper/60*10%10/10)+":30 hours</label></td>";
				} 
				var enddateRow ="<td class ='enddateOther'><label class='enddateOtherLabel'>"+enddate[i]+"</label></td>";
				var detailsRow = "<td class='detailsOther'><ul class ='table_details_dropdown'><li><a href='javascript:void()' style='text-decoration: none; margin:0 auto;' onclick='detailsEditOther(this)'>Description</a><li class='hidden_details'>"+details[i]+"</li></li></ul></td>";
				var buttonEdit = "<td class='editOther'><button class='otherActivitiesActionButtons' onclick = 'editRowOther(this)'>Edit</button></td>";
				$("#otherActivTable").append("<tr>"+taskidRow+projectRow+tasknameRow+hoursSpendRow+enddateRow+detailsRow+buttonEdit+"</tr>");
			}
		}
	});
}
function addOtherActivity(){
	//checkDaySumHoursOtherActivities();
	$("body").css("overflow","hidden");
	$("#otherActivityDiv").show();
	$("#myTable").css('opacity', '0.6');
	$("#bodyId").find("input,button,textarea,select,a").attr("disabled","disabled");
	$("#otherActivityDiv").find("input,button,textarea,select,a").removeAttr("disabled");
	
	//preluare date din DB
	$.post("getsForHomepage.php",{nr:4,coll:1},function(result){
		//var table = "145679~^1234567@#Meeting~^Unproductive@#Fazit Training~^Darts playing@#210~^90@#2017-08-17~^2017-08-16@#Description~^Description@#";
		var spliter = result.split("@#");
		var taskid = spliter[0].split("~^");
		var projectName = spliter[1].split("~^");
		var taskName = spliter[2].split("~^");
		var hoursSpend = spliter[3].split("~^");
		var enddate = spliter[4].split("~^");
		var details = spliter[5].split("~^");
		//var details = spliter[5].split("~^");
		var collecter = "";
		
		$("#otherActivTable #otherTbodyTable").find('.taskidOther').each(function(){
			collecter+=$(this).text()+"~^";
		});
		for(var i=0;i<taskid.length-1;i++)
		{
			
			if(spliter[0].search(collecter)>-1){
				var taskidRow = "<td class='taskidOther'><label class='taskidOtherLabel'>"+taskid[i]+"</label></td>";
				var projectRow = "<td class='projectOther'><label class='projectOthersLabel'>"+projectName[i]+"</label></td>";
				var tasknameRow = "<td class='tasknameOther'><label class='tasknameOthersLabel'>"+taskName[i]+"</label></td>";
				var hoursSpendRow="";
				var hoursKeeper = parseInt(hoursSpend[i]);
				if(hoursKeeper/60<10)
				{
					if(hoursKeeper%60==0)
						hoursSpendRow+= "<td class ='hoursOther'><label class='hoursOtherLabel'>0"+(hoursKeeper/60-hoursKeeper/60*10%10/10)+":00 hours</label></td>";  
					else
						hoursSpendRow+= "<td class ='hoursOther'><label class='hoursOtherLabel'>0"+(hoursKeeper/60-hoursKeeper/60*10%10/10)+":30 hours</label></td>";
				}
				else
				{
					if(hoursKeeper%60==0)
						hoursSpendRow+= "<td class ='hoursOther'><label class='hoursOtherLabel'>"+(hoursKeeper/60-hoursKeeper/60*10%10/10)+":00 hours</label></td>";
					else
						hoursSpendRow+= "<td class ='hoursOther'><label class='hoursOtherLabel'>"+(hoursKeeper/60-hoursKeeper/60*10%10/10)+":30 hours</label></td>";
				} 
				var enddateRow ="<td class ='enddateOther'><label class='enddateOtherLabel'>"+enddate[i]+"</label></td>";
				var detailsRow = "<td class='detailsOther'><ul class ='table_details_dropdown'><li><a href='javascript:void()' style='text-decoration: none; margin:0 auto;' onclick='detailsEditOther(this)'>Description</a><li class='hidden_details'>"+details[i]+"</li></li></ul></td>";
				var buttonEdit = "<td class='editOther'><button class='otherActivitiesActionButtons' onclick = 'editRowOther(this)'>Edit</button></td>";
				$("#otherActivTable").append("<tr>"+taskidRow+projectRow+tasknameRow+hoursSpendRow+enddateRow+detailsRow+buttonEdit+"</tr>");
			}
		}
	});
}
function add_other_activity(){
		nextTaskIdOther++;
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth()+1;
		var day = today.getDate();
		var prevday = today.getDate()-1;
		prevday = checkTime(prevday);
		day = checkTime(day);
		month = checkTime(month);
		var fulldate = year+"-"+month+"-"+day;
		var taskidRow = "<td class='taskidOther'><button class='otherActivitiesActionButtons3' onclick = 'deleteRowOthers(this)'>Delete</button><label class='taskidOtherLabel'>"+nextTaskIdOther+"</label></td>";
		var table ="Meeting~^Training~^Review~^Unproductive~^Teambuilding";
		var projects = table.split("~^");
		var projectRow = "<td class='projectOther'><select class='projectOtherSelect'>";
		for(var i=0;i<projects.length;i++)
			projectRow+="<option>"+projects[i]+"</option>";
		projectRow+="</select></td>";
		var tasknameRow = "<td class='tasknameOther'><input class='tasknameOtherInput'  oninput='clearColorInputOther(this)' placeholder='Title..'/></td>";
		var hoursRow = "<td class ='hoursOther'><input type='range' class='ranger' style='width:200px;height:10px;padding:0px' min=0 max=720 value=0 step=30 onchange='updateHourIncreaserSave(this)'/><label class='hoursLabel'>00:00 hours</label></td>";
		var enddateRow = "<td class='enddateOther'><input  type = 'text' class='enddatepicker' onclick='oneWeekDatePick()' size ='8' value="+fulldate+" style='text-align:center;' oninput='checkDate(this)'> </td>";
		var detailsRow = "<td class='detailsOther'><ul class ='table_details_dropdown'><li><a href='javascript:void()' style='text-decoration: none; margin:0 auto;'>Description</a><li class='hidden_details'>Save the task and then add a description</li></li></ul></td>";
		var buttonSave = "<td class='editOther'><button class='otherActivitiesActionButtons2' onclick ='saveRowOther(this)'>Save</button></td>";
		$("#otherActivTable").prepend("<tr>"+taskidRow+projectRow+tasknameRow+hoursRow+enddateRow+detailsRow+buttonSave+"</tr>");
		oneWeekDatePick();
}
function clearColorInputOther(clicked){
	$(clicked).parents("tr").find(".tasknameOtherInput").css("background-color","");
}
function saveRowOther(clicked){
	if($(clicked).parents("tr").find(".projectOthersLabel").text()!="")
	{ 
		var taskid = parseInt($(clicked).parents("tr").find(".taskidOtherLabel").text());
		var hourCreator = $(clicked).parents("tr").find(".hoursOtherLabel").text().split(":");
		var hoursModifier = 0;
		var correcter = gethoursFullDay().split("/");
		if(overTimeMax < parseInt(correcter[0]) || overTimeMax < parseInt(correcter[1]))
		{							
			$("#modifiedhourssave").show();
			hoursModifier = 1;
		}
		var hoursKeeper = parseInt(hourCreator[0]);
		if(hourCreator[1] == "30 hours")
			hoursKeeper = hoursKeeper*60+30;
		else
			hoursKeeper = hoursKeeper*60;
		if(hoursModifier==1)
		{
			hoursKeeper = 0;
			$(clicked).parents("tr").find(".hoursOtherLabel").text("00:00 hours");
			
		}
		var data = $(clicked).parents("tr").find(".enddateOtherLabel").text();
		decolorGivenDate(data);
		$.post("savesForHomepage.php",{nr:3,coll:2,tid:taskid,h:hoursKeeper},function(result){
				if(result.search("error")>-1)
					alert("Some problems ocurred when trying to save into DATABASE.\nReload the page and see if it working. If the error persist contact TimeTool Developers");
				else
				{
					$(clicked).parents("tr").find(".taskidOther").css("background-color","cyan");
					$(clicked).parents("tr").find(".ranger").remove();
					$(clicked).parents("tr").find(".editOther").append("<button class='otherActivitiesActionButtons' onclick='editRowOther(this)'>Edit</button>");
					$(clicked).parents("tr").find(".otherActivitiesActionButtons2").remove();
				}
		});
	}
	else
	{
		if($(clicked).parents("tr").find(".tasknameOtherInput").val().trim().length <=1)
		{
			$(clicked).parents("tr").find(".tasknameOtherInput").css("background-color","yellow");
		}
		else
		{
			var hoursModifier = 0;
			var correcter = gethoursFullDay().split("/");
			if(overTimeMax < parseInt(correcter[0]) || overTimeMax < parseInt(correcter[1]))
			{							
				$("#modifiedhourssave").show();
				hoursModifier = 1;
			}
			
			var data = $(clicked).parents("tr").find(".enddatepicker").val();
			decolorGivenDate(data);
			var hourCreator = $(clicked).parents("tr").find(".hoursLabel").text().split(":");
			var hoursKeeper = parseInt(hourCreator[0]);
			if(hourCreator[1] == "30 hours")
				hoursKeeper = hoursKeeper*60+30;
			else
				hoursKeeper = hoursKeeper*60;
		
			var project = $(clicked).parents("tr").find(".projectOtherSelect").val();
			var taskname = $(clicked).parents("tr").find(".tasknameOtherInput").val();
			var hours = hoursKeeper;
			if(hoursModifier == 1)
			{
				hours=0;
				
			}
			var enddate = $(clicked).parents("tr").find(".enddatepicker").val();
			
			
			// adaugare informatii in DB
			$.post("savesForHomepage.php",{nr:3,coll:1,pr:project,tn:taskname,h:hours,ed:enddate},function(result){
				if(result.search("error")>-1)
					alert("Some problems ocurred when trying to save into DATABASE.\nReload the page and see if it working. If the error persist contact TimeTool Developers");
				else
				{
					$(clicked).parents("tr").find(".taskidOther").css("background-color","#59f442");
					$(clicked).parents("tr").find(".otherActivitiesActionButtons3").remove();
					$(clicked).parents("tr").find(".projectOther").append("<label class='projectOthersLabel'>"+$(clicked).parents("tr").find(".projectOtherSelect").val()+"</label>");
					$(clicked).parents("tr").find(".projectOtherSelect").remove();
					$(clicked).parents("tr").find(".tasknameOther").append("<label class='tasknameOthersLabel'>"+$(clicked).parents("tr").find(".tasknameOtherInput").val()+"</label>");
					$(clicked).parents("tr").find(".tasknameOtherInput").remove();
					$(clicked).parents("tr").find(".ranger").remove();
					$(clicked).parents("tr").find(".hoursOther").append("<label class='hoursOtherLabel'>"+$(clicked).parents("tr").find(".hoursLabel").text()+"</label>");
					$(clicked).parents("tr").find(".hoursLabel").remove();
					$(clicked).parents("tr").find(".enddateOther").append("<label class='enddateOtherLabel'>"+$(clicked).parents("tr").find(".tasknameOtherInput").val()+"</label>");
					$(clicked).parents("tr").find(".enddateOtherLabel").remove();
					$(clicked).parents("tr").find(".enddateOther").append("<label class='enddateOtherLabel'>"+$(clicked).parents("tr").find(".enddatepicker").val()+"</label>");
					$(clicked).parents("tr").find(".enddatepicker").remove();
					$(clicked).parents("tr").find(".table_details_dropdown").remove();
					$(clicked).parents("tr").find(".detailsOther").append("<ul class ='table_details_dropdown'><li><a href='javascript:void()' style='text-decoration: none; margin:0 auto;' onclick='detailsEditOther(this)'>Description</a><li class='hidden_details'>No description yet</li></li></ul>");
					$(clicked).parents("tr").find(".editOther").append("<button class='otherActivitiesActionButtons' onclick = 'editRowOther(this)'>Edit</button>");
					$(clicked).parents("tr").find(".otherActivitiesActionButtons2").remove();	
					
					}
			});
		}
	}
}
function editRowOther(clicked){
	$(clicked).parents("tr").find(".hoursOtherLabel").remove();
	$(clicked).parents("tr").find(".ranger").remove();
	$(clicked).parents("tr").find(".hoursLabel").remove();
	$(clicked).parents("tr").find(".hoursOther").append("<input type='range' class='ranger' style='width:200px;height:10px;padding:0px' min=0 max=720 value=0 step=30 onchange='updateHourIncreaser(this)'/><label class='hoursOtherLabel'>00:00 hours</label>");
	$(clicked).parents("tr").find(".editOther").append("<button class='otherActivitiesActionButtons2' onclick='saveRowOther(this)'>Save</button>");
	$(clicked).parents("tr").find(".otherActivitiesActionButtons").remove();
	//$(clicked).parents("tr").find(".editOther").append("<button class='otherActivitiesActionButtons2'>Save</button>");	
}
function daySumOther(collecter){
	var totalHours = 0;
	
	//gettin today date, check if collecter is yesterday or today
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var day = today.getDate();
	var prevday = today.getDate()-1;
	prevday = checkTime(prevday);
	day = checkTime(day);
	month = checkTime(month);
	var todayDate = year+"-"+month+"-"+day;
	var yesterdayDate = year+"-"+month+"-"+prevday;
	//alert(todayDate+" "+yesterdayDate);
	if(collecter == todayDate){
		
		var spliter = checkDaySumHours().split("/");
		if(getCurrentDay()==1) // first day, nu exista ca e luni, asa ca luam spliter[0]
		{
			totalHours = parseInt(spliter[0])*60;
		}
		else
			totalHours = parseInt(spliter[1])*60;
	}
	if(collecter == yesterdayDate){
		var spliter = checkDaySumHours().split("/");
		if(getCurrentDay()==1){
			totalHours = 0;
		}
		else
			totalHours = parseInt(spliter[0])*60;
	}
	var data = collecter.toString();
	//alert(data);
	var ok = 0;
	
	$("#otherActivTable #otherTbodyTable").find('.taskidOther').each(function(){
		//alert($(this).text());
		//alert($(this).parents("tr").find(".enddateOtherLabel").text());
		if($(this).parents("tr").find(".enddatepicker").val())
		{
			if(data == $(this).parents("tr").find(".enddatepicker").val())
			{
				var hourCreator = $(this).parents("tr").find(".hoursLabel").text().split(":");
				var hoursKeeper = parseInt(hourCreator[0]);
				if(hourCreator[1] == "30 hours")
					hoursKeeper = hoursKeeper*60+30;
				else
					hoursKeeper = hoursKeeper*60;
				totalHours+=hoursKeeper;
		
			}
		}
		else
		if(data == $(this).parents("tr").find(".enddateOtherLabel").text())
		{
			var hourCreator = $(this).parents("tr").find(".hoursOtherLabel").text().split(":");
			var hoursKeeper = parseInt(hourCreator[0]);
			if(hourCreator[1] == "30 hours")
				hoursKeeper = hoursKeeper*60+30;
			else
				hoursKeeper = hoursKeeper*60;
			totalHours+=hoursKeeper;
			
		}
	});
	return 600-totalHours;
		
}
function deleteRowOthers(clicked){
	nextTaskIdOther--;
	var taker = $(clicked).parents("tr");
	$(taker).remove();
}
function close_other_activity(){
	$("#otherActivityDiv").hide();
	$("#myTable").css('opacity', '');
	$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
	$("body").css("overflow","");
}
function updateHourIncreaser(clicked){
	//alert($(clicked).parents("tr").find(".taskidOtherLabel").text());
	var picker = parseInt($(clicked).val());
	if(picker%60==30)
	{
		if(picker/60<1)
		{
			$(clicked).parents("td").find(".hoursOtherLabel").text("00:30 hours");
		}
		else
		{
			if(parseInt(picker/60)<10)
			{
				if(parseInt(picker/60)==1)
					$(clicked).parents("td").find(".hoursOtherLabel").text("0"+parseInt(picker/60)+":30 hours");
				else
					$(clicked).parents("td").find(".hoursOtherLabel").text("0"+parseInt(picker/60)+":30 hours");
			}
			else
			{
				$(clicked).parents("td").find(".hoursOtherLabel").text(parseInt(picker/60)+":30 hours");
			}
		}
	}
	else
	{
		if(parseInt(picker/60)<10)
		{
			if(parseInt(picker/60)==1)
					$(clicked).parents("td").find(".hoursOtherLabel").text("0"+parseInt(picker/60)+":00 hours");
				else
					$(clicked).parents("td").find(".hoursOtherLabel").text("0"+parseInt(picker/60)+":00 hours");
		}
		else
		{
			$(clicked).parents("td").find(".hoursOtherLabel").text(parseInt(picker/60)+":00 hours");
		}
	}
	var data = $(clicked).parents("tr").find(".enddateOtherLabel").text();
	decolorGivenDate(data);
	var totalHours=  daySumOther(data);
	if(totalHours<0)
	{
		var hourCreator = $(clicked).parents("td").find(".hoursOtherLabel").text().split(":");
				var hoursKeeper = parseInt(hourCreator[0]);
				if(hourCreator[1] == "30 hours")
					hoursKeeper = hoursKeeper*60+30;
				else
					hoursKeeper = hoursKeeper*60;
				
				hoursKeeper+=totalHours;
				var picker = hoursKeeper;
				if(picker%60==30)
				{
					if(picker/60<1)
					{
						$(clicked).parents("td").find(".hoursOtherLabel").text("00:30 hours");
					}
					else
					{
						if(parseInt(picker/60)<10)
						{
							if(parseInt(picker/60)==1)
								$(clicked).parents("td").find(".hoursOtherLabel").text("0"+parseInt(picker/60)+":30 hours");
							else
								$(clicked).parents("td").find(".hoursOtherLabel").text("0"+parseInt(picker/60)+":30 hours");
						}
						else
						{
							$(clicked).parents("td").find(".hoursOtherLabel").text(parseInt(picker/60)+":30 hours");
						}
					}
				}
				else
				{
					if(parseInt(picker/60)<10)
					{
						if(parseInt(picker/60)==1)
								$(clicked).parents("td").find(".hoursOtherLabel").text("0"+parseInt(picker/60)+":00 hours");
							else
								$(clicked).parents("td").find(".hoursOtherLabel").text("0"+parseInt(picker/60)+":00 hours");
					}
					else
					{
						$(clicked).parents("td").find(".hoursOtherLabel").text(parseInt(picker/60)+":00 hours");
					}
				}
				$(clicked).parents("td").find(".ranger").val(hoursKeeper);
				colorator++;
				if(colorator==8)
					colorator = 0;
				colorGivenDate(data);
	}

}
function decolorGivenDate(data){

	$("#otherActivTable #otherTbodyTable").find('.taskidOther').each(function(){
		if($(this).parents("tr").find(".enddatepicker").val())
		{
			$(this).parents("tr").find(".hoursLabel").css("color","");
		}
		else
		if(data == $(this).parents("tr").find(".enddateOtherLabel").text())
		{
			$(this).parents("tr").find(".hoursOtherLabel").css("color","");
		}
	});
}
function colorGivenDate(data){
	var colorTable=["#ff0909","#3f58ff","#d23fff","#ff3fa8","#ff6e00","#01b209","#1fe6f4","#7700ff"];
	$("#otherActivTable #otherTbodyTable").find('.taskidOther').each(function(){
		if($(this).parents("tr").find(".enddatepicker").val())
		{
			if(data == $(this).parents("tr").find(".enddatepicker").val())
				$(this).parents("tr").find(".hoursLabel").css("color",colorTable[colorator]);
		}
		else
		if(data == $(this).parents("tr").find(".enddateOtherLabel").text())
		{
			$(this).parents("tr").find(".hoursOtherLabel").css("color",colorTable[colorator]);
		}
	});
}
function updateHourIncreaserSave(clicked){
	//alert($(clicked).parents("tr").find(".taskidOtherLabel").text());
	var selectedDate = $(clicked).parents("tr").find(".enddatepicker").val();
	var diffRow = $(clicked).parents("tr").find(".enddatepicker");
	var picker = parseInt($(clicked).val());
	if(picker%60==30)
	{
		if(picker/60<1)
		{
				$(clicked).parents("td").find(".hoursLabel").text("00:30 hours");
				
		}
		else
		{
			if(parseInt(picker/60)<10)
			{
				if(parseInt(picker/60)==1)
					$(clicked).parents("td").find(".hoursLabel").text("0"+parseInt(picker/60)+":30 hours");
				else
					$(clicked).parents("td").find(".hoursLabel").text("0"+parseInt(picker/60)+":30 hours");
			}
			else
			{
				$(clicked).parents("td").find(".hoursLabel").text(parseInt(picker/60)+":30 hours");
			}
		}
	}
	else
	{
		if(parseInt(picker/60)<10)
		{
			if(parseInt(picker/60)==1)
					$(clicked).parents("td").find(".hoursLabel").text("0"+parseInt(picker/60)+":00 hours");
				else
					$(clicked).parents("td").find(".hoursLabel").text("0"+parseInt(picker/60)+":00 hours");
		}
		else
		{
			$(clicked).parents("td").find(".hoursLabel").text(parseInt(picker/60)+":00 hours");
		}
	}
	var data = $(clicked).parents("tr").find(".enddatepicker").val();
	decolorGivenDate(data);
	var totalHours=  daySumOther(data);
	if(totalHours<0)
	{
		var hourCreator = $(clicked).parents("td").find(".hoursLabel").text().split(":");
				//alert($(this).parents("tr").find(".hoursLabel").text());
				var hoursKeeper = parseInt(hourCreator[0]);
				if(hourCreator[1] == "30 hours")
					hoursKeeper = hoursKeeper*60+30;
				else
					hoursKeeper = hoursKeeper*60;
				
				hoursKeeper+=totalHours;
				var picker = hoursKeeper;
				if(picker%60==30)
				{
					if(picker/60<1)
					{
							$(clicked).parents("td").find(".hoursLabel").text("00:30 hours");
							
					}
					else
					{
						if(parseInt(picker/60)<10)
						{
							if(parseInt(picker/60)==1)
								$(clicked).parents("td").find(".hoursLabel").text("0"+parseInt(picker/60)+":30 hours");
							else
								$(clicked).parents("td").find(".hoursLabel").text("0"+parseInt(picker/60)+":30 hours");
						}
						else
						{
							$(clicked).parents("td").find(".hoursLabel").text(parseInt(picker/60)+":30 hours");
						}
					}
				}
				else
				{
					if(parseInt(picker/60)<10)
					{
						if(parseInt(picker/60)==1)
								$(clicked).parents("td").find(".hoursLabel").text("0"+parseInt(picker/60)+":00 hours");
							else
								$(clicked).parents("td").find(".hoursLabel").text("0"+parseInt(picker/60)+":00 hours");
					}
					else
					{
						$(clicked).parents("td").find(".hoursLabel").text(parseInt(picker/60)+":00 hours");
					}
				}
				$(clicked).parents("td").find(".ranger").val(hoursKeeper);
				colorator++;
				if(colorator==8)
					colorator = 0;
				colorGivenDate(data);
				
	}
}
function daySumOnOtherForProductiveTasks(clicked){
	//gettin today date, check if collecter is yesterday or today
	var today = clicked;
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var day = today.getDate();
	var prevday = today.getDate()-1;
	prevday = checkTime(prevday);
	day = checkTime(day);
	month = checkTime(month);
	var todayDate = year+"-"+month+"-"+day;
	var yesterdayDate = year+"-"+month+"-"+prevday;

	var data = ""+todayDate;
	//alert(data);
	var todayHours = 0;
	var yesterdayHours = 0;
	
	$("#otherActivTable #otherTbodyTable").find('.taskidOther').each(function(){
	
		if($(this).parents("tr").find(".enddatepicker").val())
		{
			if(data == $(this).parents("tr").find(".enddatepicker").val())
			{
				var hourCreator = $(this).parents("tr").find(".hoursLabel").text().split(":");
				var hoursKeeper = parseInt(hourCreator[0]);
				if(hourCreator[1] == "30 hours")
					hoursKeeper = hoursKeeper*60+30;
				else
					hoursKeeper = hoursKeeper*60;
				todayHours+=hoursKeeper;
		
			}
		}
		else
		if(data == $(this).parents("tr").find(".enddateOtherLabel").text())
		{
			var hourCreator = $(this).parents("tr").find(".hoursOtherLabel").text().split(":");
			var hoursKeeper = parseInt(hourCreator[0]);
			if(hourCreator[1] == "30 hours")
				hoursKeeper = hoursKeeper*60+30;
			else
				hoursKeeper = hoursKeeper*60;
			todayHours+=hoursKeeper;
			
		}
	});
	//for yesterday
	var data = ""+yesterdayDate;
	$("#otherActivTable #otherTbodyTable").find('.taskidOther').each(function(){
		if($(this).parents("tr").find(".enddatepicker").val())
		{
			if(data == $(this).parents("tr").find(".enddatepicker").val())
			{
				var hourCreator = $(this).parents("tr").find(".hoursLabel").text().split(":");
				var hoursKeeper = parseInt(hourCreator[0]);
				if(hourCreator[1] == "30 hours")
					hoursKeeper = hoursKeeper*60+30;
				else
					hoursKeeper = hoursKeeper*60;
				yesterdayHours+=hoursKeeper;
		
			}
		}
		else
		if(data == $(this).parents("tr").find(".enddateOtherLabel").text())
		{
			var hourCreator = $(this).parents("tr").find(".hoursOtherLabel").text().split(":");
			var hoursKeeper = parseInt(hourCreator[0]);
			if(hourCreator[1] == "30 hours")
				hoursKeeper = hoursKeeper*60+30;
			else
				hoursKeeper = hoursKeeper*60;
			yesterdayHours+=hoursKeeper;
		}
	});
	return Math.floor(yesterdayHours/60)+"/"+Math.floor(todayHours/60);
}
