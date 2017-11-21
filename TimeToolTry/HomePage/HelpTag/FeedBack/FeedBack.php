<!DOCTYPE html>


<html lang="en">

<head> 
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
	<title> Feed Back </title>
	<link rel="stylesheet" type="text/css" href="FeedBack.css"/>
	
	
	
	<!-- for callendarrr -->  
	
	 <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>  
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>  
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script> 
	<script src = "FeedBack.js"></script>
	
	
	<!--------------------------------------------------------------------------------------------------------------------------------------->
	 

</head>

<?php
	
	session_start();
	$x = $_SESSION['username'];
	
	if(!isset($_SESSION['username'])){
		header ("Location: http://tmda365u/Quality/TimeToolTry/LoginPage/login.php");
		exit;
	}
	else
	{
		//echo "<script> alert($x); </script>";	
		$_SESSION['username']='user';
	}
?>

<body onload="afisare_tip_user(),load_info()">
	<ul id="navigation">
			
				<li class="dropdown"> <a href ="/Quality/TimeToolTry/HomePage/HomePageTag/homePage.php"> Home </a> </li>
				
				<li class="dropdown"> <a href ="/Quality/TimeToolTry/HomePage/AlltaskTag/ViewTask/AllTask.php"> Tasks </a> 
					<ul class="dropdown-content">
						<a href ="/Quality/TimeToolTry/HomePage/AlltaskTag/ViewTask/AllTask.php">View Tasks</a>
						<a href ="/Quality/TimeToolTry/HomePage/AlltaskTag/LeavingPermissions/AddLeavingPermission.php">Add Leaving permission</a>
					
					</ul>
				</li>
					
				</li>
				<li class="dropdown" id="Projects"> <a href ="/Quality/TimeToolTry/HomePage/ProjectTag/AssignProject/AssignProject.php">Projects </a>
					<ul class="dropdown-content">
						<a href ="/Quality/TimeToolTry/HomePage/ProjectTag/AssignProject/AssignProject.php" id="Projects"> Assign Project </a>
						<a href ="/Quality/TimeToolTry/HomePage/ProjectTag/AddModiffyProject/AddModiffyProject.php" id="AddProj"> Add/Modiffy Project </a>
					
					</ul>
				</li>
				<li class="dropdown" id="Teams" > <a href ="/Quality/TimeToolTry/HomePage/TeamsTag/AssignTeam/Teams.php">Teams </a>
					<ul class="dropdown-content">
						<a href ="/Quality/TimeToolTry/HomePage/TeamsTag/AssignTeam/Teams.php" id="Teams"> Assign Team </a>
						<a href ="/Quality/TimeToolTry/HomePage/TeamsTag/NewUser/NewUser.php"> Add User </a>
						<a href ="/Quality/TimeToolTry/HomePage/TeamsTag/AddNewTeam/AddNewTeam.php"> Add New Team </a>
						
					</ul>
				</li>
				
				<li class="dropdown"> <a href ="/Quality/TimeToolTry/HomePage/WeeklyReports/AddWeeklyReports/WeeklyReportsPage.php"> Weekly Report </a> 
					<ul class="dropdown-content" >
						<a href ="/Quality/TimeToolTry/HomePage/WeeklyReports/AddWeeklyReports/WeeklyReportsPage.php"> Add Weekly Report </a>
						<a href ="/Quality/TimeToolTry/HomePage/WeeklyReports/ViewMonthlyReport/homePage.php"> View Monthly Report</a>
					</ul>
				</li>
				<li class="dropdown"> <a href ="/Quality/TimeToolTry/HomePage/MetricsTag/homePage.php"> Metrics </a> 
					<ul class="dropdown-content" >
						<a href ="/Quality/TimeToolTry/HomePage/MetricsTag/homePage.php"> Show Metrics </a>
					</ul>
				</li>	
				<li id="changeNorm"> <a href ="/Quality/TimeToolTry/HomePage/ChangeNormTag/ChangeNorm.php"> Change Norm </a> </li>
				<li class="dropdown"> <a href ="#"> Help </a> 
					<ul class="dropdown-content" >
						
						<a href ="/Quality/TimeToolTry/HomePage/HelpTag/FeedBack/FeedBack.php"> Feedback </a>		
						<a href ="/Quality/TimeToolTry/HomePage/HelpTag/ChangePass/changePass.php"> Change Password </a>	
						
					</ul>	
				</li>
				
			 <ul id="log_out_layout"> <li > <a href = "#" onclick="logout()"> Log Out </a> </li> </ul>
		</ul>	
		
		
				<span style="float: left;">
							<div class ="first_div">
							<br>
								<span class ="label_header">Feedback</span>   <br>
								<div class="field">
		
									<br>
									<br>
									<label id="reqNumber">Request Number: </label>
									
									<br>
									<br>
									<label>Priority:</label>
									<select id="Prior">
									<option>Low</option>
									<option>Medium</option>
									<option>High</option>
									</select>
									<br>
									<br>
									<label>Type of request:</label>
									<select id="TypeReq">
									<option>Problem</option>
									<option>Change</option>
									</select>
									<br>
									<br>
									<label>Subject title:</label>
									<input id="STitle" type="text"></input>
									<br>
									<br>
									<label>Description:</label>
									<textarea id="Descr" rows="4" cols="50"></textarea>
									<br>
									<br>
									<label id="userName" >Aplicant: </label>
									<br>
									<br>
									<label id="currentDate" >Date of creation: </label>
									<br>
									<br>
									<label id="versionTT" value="9">TimeTool Version: V9.0</label>
									<br>
									<br>
									<label>Comment:</label>
									<textarea id="commB" rows="4" cols="50"></textarea>
								</div>
								
								<br>
								<br>
										<button class="button_form" type="button" onclick="save_db()">Save</button>
										<button class="button_cancel" type="button" onclick="cancel_hm()">Cancel</button>
							
					</div>
					
			</span>
			<div id="notify">
									<label id='labelNotify'>Are you sure?</label>
									<button id="conf" onclick ='confirm()'>Confirm</button>
									<button id="cancel" onclick ='cancel()'> Cancel       </button>
			</div>
		<br>
	
</body>

</html>