<!DOCTYPE html>


<html lang="en">

<head> 
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
	<title> Teams </title>
	<link rel="stylesheet" type="text/css" href="Teams.css"/>
	
	
	
	<!-- for callendarrr -->  
	
	 <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>  
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>  
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script> 
	<script src = "Teams.js"></script>
	
	
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

<body onload="afisare_tip_user(),load_info(),load_team_info() ">
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
			User <b>added</b> successfully!
		</div>
		<div id="popupdivsuccessRemove" onclick="hide_me()" onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
			User <b>removed</b> successfully!
		</div>
		
		<div id="popupdivfail" onclick="hide_me()" onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
			Select an user and then save!
		</div>
		<div id="popupdivalready" onclick="hide_me()" onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
			User updated successfully
		</div>
		
				<span style="float: left;">
							<div class ="first_div">
							<br>
								<span  class ="label_header">Assign new team for a user</span>   <br>
								<div class="field">
								<br>
										<label>User: </label>
										<select id="users_info" ><option>----- Select User -----</option>
										</select>
									</div>
								<div class="field">
										<label id="assignedTM">Is assigned in team: </label>
										
								</div>
								<div class="field">
										<label>Team: </label>
										<select id="teams_info">
										</select>
								</div>
								<br>
										<button class="button_form" type="button" onclick="save_db()">Save</button>
							</div>
							
						<div  class ="middle_div"></div>
							
							<div class = "second_div">
							<br>
								<span  class ="label_header">Remove user from team</span><br>
								<div class="field">
								<br>
										<label>Team name:  </label>
										<select id="teams_name" onclick ="fill_members()">
										</select>
									</div>
								<div class="field">
										<label>Team member: </label>
										<select id="team_member" >
											
										</select>
								</div>
								<br>
										<button class="button_form" type="button" onclick="remove_db()">Remove</button>
							</div>
					</div>
			</span>
			
		</div><br>
	
</body>

</html>