<!DOCTYPE html>
<?php
	session_start();
?>
<html lang="en">
<head>
	<meta charset="utf-8">
   	<meta http-equiv="X-UA-Compatible" content="IE=edge">

<link rel="stylesheet" type="text/css"  href="csslogin.css"/>
 
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>  
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script> 
	<script src="http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/md5.js"></script>
	  <script src="//code.jquery.com/jquery-1.8.3.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script> 
	
	 <title> Login </title>
 <script src="login.js" type ="text/javascript"></script> 
</head>

<style type="text/css">

</style>
<?php

	$_SESSION['expire'] = time()+300;
	$_SESSION['openTask']="1";
	if(!isset($_SESSION['username'])){
		// username not set, nothing to do
	}
	else
	{
		if($_SESSION['username']=='user')
			session_destroy();
	}
?>
<body  id="mybody" onload="myfunc()">
	

	 <a href="http://intranet.conti.de/home/welcome" title="Continental Intranet Page">
		<img id ='conti' style='width:200px;height:60px;' src="ces.jpg"> 
	</a>
	
	
	
	<?php
	$browserAgent = $_SERVER['HTTP_USER_AGENT'];
	$pos = strpos($browserAgent,"MSIE");
	if($pos==false)
	{
		?>
		<div style='position:absolute;top:20px;right:20px; width: 500px; height:97%;min-height:730px'>	
			<img style='position:absolute;z-index:1; left:70px;width:350px;height:350px; top:40px;' src ='timetool_new_bigRes1.png'> </img>
			<div class="boxtrans"></div>
		</div>
		<div id = 'checkBrow'><br>For the moment,this site should be open only in <br><b>Internet Explorer</b> !!</div>
		
			
		<style>
			#checkBrow{
				border-radius:6px;
				text-align:center;
				top:30%;
				left:27%;
				font-size: 25px;
				position:absolute;
				background-color: #f45c42;
				width: 550px;
				height: 125px;
				z-index: 2;
				color: black;
			}
		</style>	
		<?php
	}
	else
	{
	?>
	<div style='position:absolute;top:20px;right:20px; width: 500px; height:97%;min-height:730px'>	
		<img style='position:absolute;z-index:1; left:70px;width:350px;height:350px; top:40px;' src ='timetool_new_bigRes1.png'> </img>
		<div class="boxtrans"></div>
		<div id ='noboxtrans'>
			<form onSubmit="return false">
				<div class= "username_text"> Username: </div>
				<input name="username" id="usernameF" type="text" class= "username_field" onclick="hide_show_wrong_password()" > <br>
				
				
				<div class= "password_text"> Password: </div>
				<input name="password" id="passwordF" type="password"  class= "password_field" onclick="hide_show_wrong_password()" oninput="hide_show_wrong_password()"> <br> 
			
				<div id ='wrong_user_pass' class="wrong_password" style="top:540px;left: 130px;position:absolute;color:#ff381e;display:none;"> <b>Wrong username or password !</b></div>  
				<button type="submit" class="button_sign" onclick="login_me()" id='sign_me_in'> <center class="sign_in_text"> Sign In </center> </button>
				<br>
				<br>
				
				<a href="#forget_password" class="forget_pass"> Forgot Password </a>
			</form>
			<p class="version" >
				<a href="http://tmda365u/Quality/TimeTool_V8/index.php?screen_check=done&Width=1920&Height=1080" style="postition:absolute;text-decoration:none; color:white;bottom:0px;" > Previous Version</a> 
			</p>
		</div>
	</div>

	

	
	<div id="loginfailed" onclick="hide_me()" onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		<b>FAILED TO LOGIN.</b> <br><br>
		Retry in <label id = 'timerdown'>5</label>..
	</div>
	<?php
	}
	?>
</body>

</html> 