<!DOCTYPE html>


<html lang="en">

<head> 
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
	<title> Vacation and Sick Permissions </title>
	<link rel="stylesheet" type="text/css" href="vacationsickpermission.css"/>
	
	
	
	<!-- for callendarrr -->  
	
	 <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>  
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>  
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script> 
	<script src = "vacationsickpermission.js"></script>

	
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

<body onload="loadData(),loadRequester(),loadInfo(),loadVacations()" id='bodyId'>
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
				
				<li class="dropdown"> <a href ="/Quality/TimeToolTry/HomePage/WeeklyReports/WeeklyReportsPage.php"> Weekly Report </a> 
					<ul class="dropdown-content" >
						<a href ="/Quality/TimeToolTry/HomePage/WeeklyReports/WeeklyReportsPage.php"> Add Weekly Report </a>
						<a href ="#"> View Monthly Report NOT DONE</a>
					</ul>
				</li>
				<li class="dropdown"> <a href ="#"> Metrics </a> 
					<ul class="dropdown-content" >
						<a href ="#"> Show Metrics </a>
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
							<div class ="first_div" id='firstDiv'>
							<br>
								<span  class ="label_header">Vacation and Sick Permissions</span>   <br>
								<div class="field">
									<br>
									<label>Year: </label>
									<select id="VacationYear">
										
									</select>
								</div>
								<div class="field">
								
									<label>Vacation Type: </label>
									<select id="vacType">
										<option>Regular vacation</option>
										<option>Sick vacation</option>
									</select>
								</div>
								<div class="field">
								
									<label>Requester: </label>
									<text id="requester"></text>
									
									
								</div>
								<div class="field">
								
									<label>Start Date: </label>
									<input  onclick='datePick()' type = 'text' id="datepicker" class='datepicker'  size ='15' oninput='checkStartDate()'> </input>
								</div>
								<div class="field">
								
									<label>End Date: </label>
									<input  onclick='enddatePick()' type = 'text' id="enddatepicker" class='enddatepicker'  size ='15' oninput='checkDate()'> </input>
								</div>
								<div class="field">
								
									<label>Optional info:</label>
									<textarea id="optionalInf"></textarea>
									
								</div>
							
								
								<br>
								
								
										<button class="button_form" type="button" onclick="saveButton()">Save</button>
							</div>
								<div id="notify">
									<label id='labelNotify'>Are you sure?</label>
									<button id="conf" onclick ='confirm()'>Confirm</button>
									<button id="cancel" onclick ='cancel()'> Cancel       </button>
								</div>
								
							<div  class ="middle_div"></div>
							
							<div class = "second_div">
							<br>
								<span  class ="label_header" id="SpanName" ><label style="text-align:center" id="vacationplan">Vacation Plan</label></span><br>
									<div class="field">
									
										<label id="vacData"></label>
										<br><br><br>
				
									</div>
										
									<!--	<button class="button_form" type="button" onclick="delete_db()">Delete</button> -->
							</div>
						
						
					</div>
			</span>
			
		</div><br>
	
</body>

</html>