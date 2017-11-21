<!DOCTYPE html>


<html lang="en">

<head> 
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
	<title> Home </title>
	<link rel="stylesheet" type="text/css" href="WeeklyReportsPage.css"/>
	
	
	<!-- for callendarrr -->  

	<link rel="stylesheet" href="//code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.8.3.js"></script>

	
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>  <!-- pt $("elem").on("click",functie());  // -->
	
	<script  type="text/javascript" src = "WeeklyReportsPage.js"></script>
	  <script src="//code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
	<!--<link href="ssi-modal/dist/ssi-modal/styles/ssi-modal.min.css" rel="stylesheet"/>
	<script type="text/javascript"  src="ssi-modal/dist/ssi-modal/js/ssi-modal.min.js"></script> -->
	
</head>

<?php
	$_SESSION['openTask']=1;
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

<body onload="afisare_tip_user(),loadTable()" id="bodyId">
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
		<button id="editButton" onclick ='edit_button()'> Edit </button>
	
		
		<table id="myTable">
			<thead>
				<tr  >
					<th>Achievements </th> <th> Planned but not done </th> <th> Planned for next week </th> <th> Problems </th>
				</tr>
			</thead>
			<tbody id="tbodyId">
			  <tr >
				<td > <textarea name="textarea" id='achievements' style="width:350px;height:200px;resize:none;overflow:hidden" class='textareaTable' oninput='testReq()' onclick='showHiddenDiv()'></textarea> </td>
				<td>   <textarea name="textarea" id='plannedbnd' style="width:350px;height:200px;resize:none;overflow:hidden" class='textareaTable' oninput='testReq()' onclick='showHiddenDiv()'></textarea></td>
				<td>   <textarea name="textarea" id='plannedfnw' style="width:350px;height:200px;resize:none;overflow:hidden" class='textareaTable' oninput='testReq()' onclick='showHiddenDiv()'></textarea></td>
				<td>   <textarea name="textarea" id='problems' style="width:350px;height:200px;resize:none;overflow:hidden" class='textareaTable' oninput='testReq()' onclick='showHiddenDiv()'></textarea></td>
			  </tr>
			</tbody>
		</table>	
	<button id= "saveChanges" onclick ='save_button()'> Save </button>
	<div id='cantchangetasks' onclick ='hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		Use <b>Edit</b> to make changes and then <b>Save</b>
	</div>
</body>

</html>