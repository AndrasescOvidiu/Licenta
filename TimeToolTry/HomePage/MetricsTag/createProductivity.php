<!DOCTYPE HTML>
<html>

<head>  
 <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
 <script src="//code.jquery.com/jquery-1.8.3.js"></script>

	
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>  <!-- pt $("elem").on("click",functie());  // -->
	
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.js"></script> 
<body onload = 'myF()'>
		<div id='chartPie'><br>
			<canvas id="myChart" width="250" height="250" ></canvas>
		</div>
		<input id = 'ranger' style='position:absolute;top:500px;' type='range' min=0 max=300 step=50 onchange='fun()'>
</body>
<script>
function fun(){
	if($("#ranger").val()>100)
	{
		$("#ranger").val(100);
	}
}
function myF(){
	var productivityHours = 46;
	var totalHoursReq = 88;
	$.post("getPieChartInfo.php",{userid:74},function(result){
	
		var table = result.split("@#");
		var projects = table[0].split("~^");
		var hours = table[1].split("~^");
		
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
			else{
				var x1= Math.floor((Math.random() * 240) + 1);
				var x2 = Math.floor((Math.random() * 240) + 1);
				var x3 = Math.floor((Math.random() * 240) + 1);
				colorz+="#"+x1.toString(16)+x2.toString(16)+x3.toString(16);
				highlighz+="#"+((x1+25).toString(16))+((x2+25).toString(16))+((x3+25).toString(16));
			}
			
			var hoursPr = Math.round((hours[i]*100)/totalHoursReq);
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
	
		var ctx = document.getElementById("myChart").getContext("2d");
		var myNewChart = new Chart(ctx).Pie(data);

	});
}
</script>
</html>