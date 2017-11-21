function logout(){

	$.post('logout.php', { num:"" }, function(result) { 
		if (result == 1)
			window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
	});
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

function timeout(){
	g_timer = setTimeout(function(){
		$('#popupdivsuccess').hide();
		$("#popupdivfail").hide();
	},2500);
}
function hide_me(){
   $('#popupdivsuccess').hide();
   $("#popupdivfail").hide();
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
}
function load_info(){
	var today = new Date();
	var azi = today.getDate();
	var n = "";
	if(azi <10)
		n="0"+azi;
	else
		n= azi;
	azi = n;
	var luna = today.getMonth()+1;
	var n2 = "";
	if(luna < 10)
		n2 = "0"+luna;
	else
		n2 = luna;
	luna = n2;
	var year = today.getFullYear();

	datePick();
	$("#datePicker").val(year+"-"+luna+"-"+azi);
	$.post('script.php', function(result) { 
		var table = result.split("@#");
		var usernames = table[1].split("~^");
		var realnames = table[2].split("~^");
		for(var i =0;i<usernames.length-1;i++)
		{
			$('#users_info').append('<option onclick="load_name()">'+usernames[i]+" | "+realnames[i]+'</option>');
		}
		$('#feedback').text("Select an User in order to change norm");
	}); 
}
function load_name(){
	var name=$("#users_info option:selected").text().split(" | ");
	$.post('get_Norm.php',{nameID:name[0]},function(result){
	
		var x=result.split(" ");
		$('#DateAndNorm').remove();
		$('#currentN').append('<label id="DateAndNorm">'+x[2]+'h/day started from '+x[1]+'</label>');
		var norms=x[3].split("~^");
		//alert(norms[1]+" "+norms[2]+" "+norms[3])
		
		$(".rank").remove();
		if(norms[1]!=undefined)
		{
			var rank1=norms[1].split("$%");
			//alert(rank1[0]+" "+rank1[1]);
			$('#N1').append('<label class="rank">'+rank1[1]+'h/day started from '+rank1[0]+'</label>');
			
		}
		
		if(norms[2]!=undefined)
		{
			var rank2=norms[2].split("$%");
		//	alert(rank2[0]+" "+rank2[1]);
			$('#N2').append('<label class="rank">'+rank2[1]+'h/day started from '+rank2[0]+'</label>');
			
		}	
		if(norms[3]!=undefined)
		{
			var rank3=norms[3].split("$%");
		//	alert(rank3[0]+" "+rank3[1]);
			$('#N3').append('<label class="rank">'+rank3[1]+'h/day started from '+rank3[0]+'</label>');
		}
		
		/*
		
		$('#N3').append('<label class="rank">'+rank[0]+'h/day started from '+x[1]+'</label>');
		$('#N2').append('<label class="rank">'+x[2]+'h/day started from '+x[1]+'</label>');
		$('#N1').append('<label class="rank">'+x[2]+'h/day started from '+x[1]+'</label>');*/
	});
	
	
	//alert($("#feedback").text());
	
	$('#feedback').remove();
	$('#SpanName').append('<label id="feedback">Change Norm for '+name[1]+'</label>');
	
	
}
function save_db(){
	//alert($("#users_info option:selected").val());
	var name=$("#users_info option:selected").text().split(" | ");
	if($("#users_info option:selected").val()=="--- Select an user ---"){
		$("#popupdivfail").show();
		timeout();
	}
	else{
		if($("#newnorm").val()==8 || $("#newnorm").val()==6 || $("#newnorm").val()==4)
			$.post('get_Norm.php',{nameID:name[0]},function(result){
				
				var x=result.split(" ");
				
				
					$.post('save_new_norm.php',{NewNorm:$("#newnorm").val(), namID:name[0], DateGet:$("#datePicker").val()},function(result){
						if(result.search("error")>-1)
						{
							alert("There was a problem when trying to add the norm into Database..Page will now be reloaded.");
							window.location.reload();
						}
						else
						{
							$("#popupdivsuccess").show();
							load_name();
							timeout();
						}
						
					});
				
			});
		else alert("Nu se poate adauga o norma diferita de 8,6 sau 4 ore!")
		}
}
function datePick(){
	 $(".enddatepicker").datepicker({ minDate: new Date() ,maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),dateFormat: "yy-mm-dd",beforeShowDay: $.datepicker.noWeekends });
}
function afisare_tip_user(){
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
	
	$("#datePicker").val(nextWeekFromNow);
	
}