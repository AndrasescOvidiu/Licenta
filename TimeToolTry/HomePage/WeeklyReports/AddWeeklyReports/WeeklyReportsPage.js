var needUpdate =0;
var g_timer;
$(document).on('keydown',function(e){

	  var $target = $(e.target||e.srcElement);
	  if(e.keyCode == 8 )
	 {
		 if(!$target.is('textarea,input')  || $target.is('[readonly]'))
			e.preventDefault();
	 }
}); 
function edit_button(){
	$("#achievements").removeAttr('readonly','readonly');
	$("#achievements").css('background-color','white');
	$("#plannedbnd").removeAttr('readonly','readonly');
	$("#plannedbnd").css('background-color','white');
	$("#plannedfnw").removeAttr('readonly','readonly');
	$("#plannedfnw").css('background-color','white');
	$("#problems").removeAttr('readonly','readonly');
	$("#problems").css('background-color','white');
	
}
function testReq(){
	
	var x = $("#achievements").val();
	if(x.length > 254)
	{
		$("#achievements").val(x.substring(0,x.length - 1));
	}
	for(var i=0;i<x.length-1;i++)
	{
		if(x[i] =='~' && x[i+1] == '^' || x[i] =='@' && x[i+1] =='#')
		{
			 $("#achievements").val(x.substring(0,x.length - 1));
		}
	}
	var x = $("#plannedbnd").val();
	if(x.length > 254)
	{
		$("#plannedbnd").val(x.substring(0,x.length - 1));
	}
	for(var i=0;i<x.length-1;i++)
	{
		if(x[i] =='~' && x[i+1] == '^' || x[i] =='@' && x[i+1] =='#')
		{
			 $("#plannedbnd").val(x.substring(0,x.length - 1));
		}
	}
	var x = $("#plannedbnd").val();
	if(x.length > 254)
	{
		$("#plannedbnd").val(x.substring(0,x.length - 1));
	}
	for(var i=0;i<x.length-1;i++)
	{
		if(x[i] =='~' && x[i+1] == '^' || x[i] =='@' && x[i+1] =='#')
		{
			 $("#plannedbnd").val(x.substring(0,x.length - 1));
		}
	}
	var x = $("#plannedfnw").val();
	if(x.length > 254)
	{
		$("#plannedfnw").val(x.substring(0,x.length - 1));
	}
	for(var i=0;i<x.length-1;i++)
	{
		if(x[i] =='~' && x[i+1] == '^' || x[i] =='@' && x[i+1] =='#')
		{
			 $("#plannedfnw").val(x.substring(0,x.length - 1));
		}
	}
	var x = $("#problems").val();
	if(x.length > 254)
	{
		$("#problems").val(x.substring(0,x.length - 1));
	}
	for(var i=0;i<x.length-1;i++)
	{
		if(x[i] =='~' && x[i+1] == '^' || x[i] =='@' && x[i+1] =='#')
		{
			 $("#problems").val(x.substring(0,x.length - 1));
		}
	}
}
function save_button(){
	if($("#achievements").val().trim()=="" || $("#plannedbnd").val().trim()=="" || $("#plannedfnw").val().trim()=="" ||$("#problems").val().trim()=="")
		alert("why empty wal ?");
	else
	{
		if(needUpdate==0){
			$.post("saveTable.php",{ach:$("#achievements").val(),pbnd:$("#plannedbnd").val(),pfnw:$("#plannedfnw").val(),pr:$("#problems").val()},function(result){
				$("#achievements").attr('readonly','readonly');
				$("#achievements").css('background-color','#85bec6');
				$("#plannedbnd").attr('readonly','readonly');
				$("#plannedbnd").css('background-color','#85bec6');
				$("#plannedfnw").attr('readonly','readonly');
				$("#plannedfnw").css('background-color','#85bec6');
				$("#problems").attr('readonly','readonly');
				$("#problems").css('background-color','#85bec6');
			});

		}
		else
		{
			var rightNow = new Date();
			var res = rightNow.toISOString().slice(0,10).replace(/-/g,"-");
			$.post("saveTableUpdate.php",{ach:$("#achievements").val(),pbnd:$("#plannedbnd").val(),pfnw:$("#plannedfnw").val(),pr:$("#problems").val(),date:res},function(result){
				$("#achievements").attr('readonly','readonly');
				$("#achievements").css('background-color','#85bec6');
				$("#plannedbnd").attr('readonly','readonly');
				$("#plannedbnd").css('background-color','#85bec6');
				$("#plannedfnw").attr('readonly','readonly');
				$("#plannedfnw").css('background-color','#85bec6');
				$("#problems").attr('readonly','readonly');
				$("#problems").css('background-color','#85bec6');
			});
			
		}
	}
}
function loadTable(){
	
	$.post('loadTable.php',function(result){
		if(parseInt(result)==1)
		{
			$("#achievements").attr('placeholder','Fill here ..');
				$("#plannedbnd").attr('placeholder','Fill here ..');
				$("#plannedfnw").attr('placeholder','Fill here ..');
				$("#problems").attr('placeholder','Fill here ..');
		}
		else
		{
			var containts = result.split("~^");
			
			var now = new Date(containts[0]);
			var onejan = new Date(now.getFullYear(), 0, 1);
			var currentWeek = Math.ceil( (((now - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
			
			var old = new Date(containts[0]);
			var oldjan = new Date(old.getFullYear(), 0, 1);
			var oldWeek = Math.ceil( (((old - oldjan) / 86400000) + onejan.getDay() + 1) / 7 );
			
			if(oldWeek==currentWeek)
			{
				needUpdate=1;
				$("#achievements").attr('readonly','readonly');
				$("#achievements").css('background-color','#85bec6');
				$("#plannedbnd").attr('readonly','readonly');
				$("#plannedbnd").css('background-color','#85bec6');
				$("#plannedfnw").attr('readonly','readonly');
				$("#plannedfnw").css('background-color','#85bec6');
				$("#problems").attr('readonly','readonly');
				$("#problems").css('background-color','#85bec6');
				
				$("#achievements").text(containts[1]);
				$("#plannedbnd").text(containts[2]);
				$("#plannedfnw").text(containts[3]);
				$("#problems").text(containts[4]);
			}
			else
			{
				$("#achievements").attr('placeholder','Fill here ..');
				$("#plannedbnd").attr('placeholder','Fill here ..');
				$("#plannedfnw").attr('placeholder','Fill here ..');
				$("#problems").attr('placeholder','Fill here ..');
			}
		}
	});	
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
function logout(){
	$.post('logout.php', { num:"" }, function(result) { 
		if (result == 1)
			window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
	});
}
function timeout(){
	g_timer = setTimeout(function(){
		$('#cantchangetasks').hide();
	},2500);
}
function showHiddenDiv(){
	
	if($("#achievements").prop('readonly'))
	{
		$("#cantchangetasks").show();
		timeout();
	}
	
}
function rehide_me(){
	if($("#cantchangetasks").is(":visible"))
	{
		timeout();
	}
}
function show_me_more(){
	if($("#cantchangetasks").is(":visible"))
	{
		$("#cantchangetasks").css("display","blocked");
		clearTimeout(g_timer);
	}
}
function hide_me(){
	$('#cantchangetasks').hide();
}