<!DOCTYPE html>
<html lang="en">
 
<head> 
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
	<title> Assign Project </title>
	<link rel="stylesheet" type="text/css" href="AssignProject.css"/>
	<script type="text/javascript" src="http://code.jquery.com/jquery.min.js"></script>
	<script type="text/javascript"></script>
	<script src = "AssignProject.js"></script>
	
	<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>  
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>  
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script> 
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
		<div id="popupdivsuccess" onclick="hide_me()" onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
			Project assigned to User succesfully!
		</div>
		<div id="popupdivassigned" onclick="hide_me()" onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
			Project already assigned!
		</div>
					
		<div id="popupdivfail" onclick="hide_me()" onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
			Select an user and a project and then save!
		</div>
		<div class ="first_div">
							<br>
								<span  class ="label_header">Assign Project </span>   <br>
								<div class="field">
								<br>
										<label>User:</label>
										<select id="user" >
										<option>---Select User---</option>
										</select>
										
								</div>
								
								<div class="field">
										<label>Project:</label>
										<select id="project" >
										<option>---Select Project---</option>
										</select>
										
								</div>
								
								<br>
								
										<button class="button_form" type="button" id="save_button" onclick="save_db()">Save</button>
		</div>
		
							<div  class ="middle_div"></div>
							
							<div class = "second_div">
							<br>
								<span id="UserRealName" class ="label_header"><label id="tagRealN">User have assigned next projects:</label></span><br>
								<div id="assignprj" class="field">
								<br>
										<label id="assignedProjects">Assigned Projects:  <br></label>
										
									</div>
								
								</div>
								<br>
		
		
    
	           

</body>
</html>