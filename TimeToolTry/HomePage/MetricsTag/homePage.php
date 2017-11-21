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

	<link rel="stylesheet" href="//code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.8.3.js"></script>

	
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>  <!-- pt $("elem").on("click",functie());  // -->
	
	<script  type="text/javascript" src = "homePage.js"></script>
	  <script src="//code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	  	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.js"></script> 
	  
	<!--<link href="ssi-modal/dist/ssi-modal/styles/ssi-modal.min.css" rel="stylesheet"/>
	<script type="text/javascript"  src="ssi-modal/dist/ssi-modal/js/ssi-modal.min.js"></script>
	 <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.js"></script>  -->
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

<body onload="afisare_tip_user(),loadTable(),setTable(),startTime(),getAllWeeks1()" id="bodyId">
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
		<div id='selectTeam'>
			<div id='selectorTeam'>
				<label style='font-size: 20px;color:orange;'>Select a team: </label><br>
				<select id='teamSelector' onchange = 'team_changed()'>
				</select>
			</div>
			
			<div id='separatorSelect'></div>
			
			<div id='selectorMonth'>
				<label style='font-size: 20px;color:orange;'>Select a month:</label><br>
				<select id='monthSelector' onchange="month_change()">
					<option value = 1>January</option>
					<option value = 2>February</option>
					<option value = 3>March</option>
					<option value = 4>April</option>
					<option value = 5>May</option>
					<option value = 6>June</option>
					<option value = 7>July</option>
					<option value = 8>August</option>
					<option value = 9>September</option>
					<option value = 10>October</option>
					<option value = 11>November</option>
					<option value = 12>December</option>
				</select>
			</div>
		</div>
		
		<div id='diagramAreea'>
		
			<div id='procents'>
				<label id='100label' style='color:#1cf008'>100%</label><br><br><br><br>
				<label id='75label' style='color:#8bd600'>75%</label><br><br><br><br>
				<label id='50label' style='color:#e8e400'>50%</label><br><br><br><br>
				<label id='25label' style='color:#f25b09'>25%</label><br><br><br><br>
				<label id='0label' style='color:#f10909'>0%</label>
			</div>
			
			<div id='inFootDiv'></div>
			<div id ='downDiv'></div>
			<label style='position:absolute;top:-35px;font-size:20px;left:0px;color:#ff6200'>Productivity in procents</label>
		</div>
		
		<hr id='hr100'/>
		<hr id='hr75'/>
		<hr id='hr50'/>
		<hr id='hr25'/>
		
	<div id="showName">
		<label id='nameLabel'>Andrasesc Ovidiu</label>
		<br><label id='procentLabel'>30%</label>
	</div>
	<div id='fullDetailsContainter' style='display:none' >
		<div id='headerContainer'><br>
			<label id='firstLine'>uids2293, <b id='boldLabel'>Andrasesc Ninel Ovidiu</b>, 8h norm(July)</label><br>
			<div id='secondLines'>
				<label id='deliveryLabel'>Delivery Slippage: 3 days</label><br>
				<label id='effortLabel'>Effort Deviation: 9.09%</label><br>
				<label id='reworkLabel'>Rework Percentage: 20%</label><br>
				<label id='reviewLabel'>Review Percentage: 80%</label><br>
			</div>
		</div>
		<label id='infoKeeper' style='display:none'></label>
		<label id='firstTimeKeeper' style='display:none'></label>
		<div id='chartPie'><br>
			<label id='requestedHour'></label>
			<canvas id="myChart" width="250" height="250"></canvas>
			
		</div>
		
		<div id='tasksDiv' ><br>
			<label id='nrTasksLabel'><b>Nr of tasks: 5</b></label><br>
			<label id='openTasksLabel'>Open: 1</label><br>
			<label id='inWorkLabel'>In Work: 2</label><br>
			<label id='postponedLabel'>Postponed: 1</label><br>
			<label id='reviewedLabel'>Reviewed: 0</label><br>
			<label id='closedLabel'>Closed: 0</label><br>
		</div>
		
	</div>

</body>

</html>