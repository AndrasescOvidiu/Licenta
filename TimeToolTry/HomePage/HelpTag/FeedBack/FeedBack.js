function logout()
{

	$.post('logout.php', { num:"" }, function(result) { 
		if (result == 1)
			window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
	});
}

function load_info()
{
	// face load la unele informatii despre user din BD
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10)
	{
		dd='0'+dd;
	} 
	if(mm<10)
	{
		mm='0'+mm;
	} 
	var today = yyyy+'-'+mm+'-'+dd;
	//alert($('#versionTT').attr('value'));
	$.post('script.php',function(result){
	
	var middle=result.split("$%");

	$('#reqNumber').append('<label id="reqNum">'+middle[0]+'</label>');
	
	$('#userName').append('<label id="aplU">'+middle[1]+'</label>');
	
	$('#currentDate').append('<label id="DtCreat">'+today+'</label>');


	});
	
}
function save_db()
{
	
// verific daca ce trimit nu e null in caz negativ trimitem feedbacku 
	if($('#STitle').val()=='' || $('#STitle').val()==null || $('#Descr').val()=='' || $('#Descr').val()==null)alert("Fill the blank space");
	else
		$.post('save_feedback.php',{ReqN:$('#reqNum').text(),Prior:$('#Prior').val(),TypeR:$('#TypeReq').val(),SubjT:$('#STitle').val(),Descr:$('#Descr').val(),AplUsr:$('#aplU').text(),DateCreat:$('#DtCreat').text(),Vers:$('#versionTT').attr('value'),CommBox:$('#commB').val()},function(result){
			alert(result);
			window.location.reload();
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
// un div de confirmare pentru cancel button
function confirm(){
	$("#firstDiv").css("opacity","");
	$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#notify").hide();
	window.location.assign("/Quality/TimeToolTry/HomePage/HomePageTag/homePage.php");
			
}
function cancel(){
	$("#firstDiv").css("opacity","");
	$("#bodyId").find("input,button,textarea,select,a").removeAttr("disabled");
	$("#notify").hide();
}

function cancel_hm(){
	$("#firstDiv").css("opacity","0.6");
			$("#bodyId").find("input,button,textarea,select,a").attr("disabled", "disabled");
			$("#notify").show();
			$("#notify").find("input,button,textarea,select,a").removeAttr("disabled");
			
}
