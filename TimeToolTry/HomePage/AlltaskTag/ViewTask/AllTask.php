<!DOCTYPE html>
<html lang="en">

<head> 
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
	<title> AllTask </title>
	<link rel="stylesheet" type="text/css" href="AllTask.css"/>
	<script type="text/javascript" src="http://code.jquery.com/jquery.min.js"></script>
	<script type="text/javascript"></script>
	<script src = "AllTask.js"></script>
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
<body onload="afisare_tip_user(),loadTable()">
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

		<div class="container">
  
			  <form>
				
				<label class="radio-inline">
				  <input onclick="validate()" id="Open" class="filterB" type="checkbox" name="Open">Open
				</label>
				<label class="radio-inline">
				  <input onclick="validate()" id="InWork" class="filterB" type="checkbox" name="InWork">In Work
				</label>
				<label class="radio-inline">
				  <input onclick="validate()" id="Postponed" class="filterB"  type="checkbox" name="Postponed">Postponed
				 <label class="radio-inline">
				  <input onclick="validate()" id="Reviewed" class="filterB" type="checkbox" name="Reviewed">Reviewed
				</label>
				<label class="radio-inline">
				  <input onclick="validate()" id="Closed" class="filterB" type="checkbox" name="Closed">Closed
				</label>
				</label>
			  </form>
		</div>
        <table id="myTable" >
			<thead >
				<tr  >
					<th >Task ID </th> <th> Task Name </th> <th> Project </th> <th>Status</th> <th> End date </th> <th> Details </th> 
				</tr>
			</thead>
			<tbody>
			  <tr id="noTaskYet">
				<td colspan="5"> No task yet.. </td>
			  </tr>
			<tbody>
			<tr id="last_tr" cellspacing ="100px">
						<!--	<td class="search"><input oninput="goTo()"type="text" id="search" placeholder="Type to search..." /></td>-->	
					<td colspan="6" class="padding_class" > <p id="date_time"> Date: .. </p > </td>
					<!--<td colspan="4"> 235/260 Productive Hours </td>-->
				</tr>	
		</table>	
		
    
	           
  <script>
    $("#search").keyup(function(){
        _this = this;
        // Show only matching TR, hide rest of them
        $.find($("#table tbody tr"), function() {
            if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
               $(this).hide();
            else
               $(this).show();                
        });
    }); 
	</script>
</body>
</html>