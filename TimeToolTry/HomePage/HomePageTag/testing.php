<!DOCTYPE html>


<html lang="en">

<head> 
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
	<title> Home </title>
	<link rel="stylesheet" type="text/css" href="homePage.css"/>
	
	
	<!-- for callendarrr -->  

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/clockpicker/0.0.7/jquery-clockpicker.css">
  <script src="//code.jquery.com/jquery-1.8.3.js"></script>

	
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>  <!-- pt $("elem").on("click",functie());  // -->
	
	<script  type="text/javascript" src = "homePage.js"></script>
	  <script type="text/javascript"  src="https://cdnjs.cloudflare.com/ajax/libs/clockpicker/0.0.7/bootstrap-clockpicker.js"></script>
	<!--<link href="ssi-modal/dist/ssi-modal/styles/ssi-modal.min.css" rel="stylesheet"/>
	<script type="text/javascript"  src="ssi-modal/dist/ssi-modal/js/ssi-modal.min.js"></script> -->
	
<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
 
<link rel="stylesheet" type="text/css" href="dist/bootstrap-clockpicker.min.css">
	
</head>

<body> 
<div class="bec" style='position:absolute; top:300px; left:300px;'>
    <input id="input-a" value="" data-default="20:48">
</div>
<script>
	var input = $('#input-a');
	input.clockpicker({
		min: '08:00 am', 
		max: '15:00 pm',
		autoclose: true
	});

	// Manual operations
	$('#button-a').click(function(e){
		// Have to stop propagation here
		e.stopPropagation();
		input.clockpicker('show')
				.clockpicker('toggleView', 'minutes');
	});
	$('#button-b').click(function(e){
		// Have to stop propagation here
		e.stopPropagation();
		input.clockpicker('show')
				.clockpicker('toggleView', 'hours');
	});
</script>
</body>
<html>