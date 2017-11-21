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
	<link rel="stylesheet" href="//code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.8.3.js"></script>

	
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>  <!-- pt $("elem").on("click",functie());  // -->
	
	<script  type="text/javascript" src = "homePage.js"></script>
	  <script src="//code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
	<!--<link href="ssi-modal/dist/ssi-modal/styles/ssi-modal.min.css" rel="stylesheet"/>
	<script type="text/javascript"  src="ssi-modal/dist/ssi-modal/js/ssi-modal.min.js"></script> --> 
	<!-- for clock picker -->
	
	 <script type="text/javascript"  src="https://cdnjs.cloudflare.com/ajax/libs/clockpicker/0.0.7/bootstrap-clockpicker.js"></script>
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

<body onload="afisare_tip_user(),startTime(),loadTable()" id="bodyId">
	<label id='userIdholder' style='display:none'>-1</label>
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
		
		<div id='imgTimetool' style='position:absolute;top:50px;left:43.5%;text-align:center;margin:0px'> 
			<img src ='timetool_logo.png'>
			<div id="week_div">
				<button class ="select_week" id="backward" onclick="minusweek()"><b> << </b></button>
				<button class ="select_week" id="currentweek" onclick="currentweek()"><b>Current week</b></button>
				<button class ="select_week" id ="forward" onclick="plusweek()" > <b> >> </b></button>
			</div>
		</div>
		</div>
		<br><br><br><br><br><br>
		<div>
		
		
		

		<button  onclick="NewTask()" type="button" id="add_new_task"> <img src="add_new_task.png" id="img_add_new_task"> </button>
		<button onclick='addOtherActivity()' id='add_other_activity'> Other activities </button> 
	
		
		<table id="myTable">
			<thead>
				<tr  >
					<th>Task ID </th> <th> Project </th> <th> Task Name </th> <th class="zile"> Mo</th> <th class="zile"> Tu </th> <th class="zile"> We </th><th class="zile">Th </th> <th class="zile">Fr </th> <th class="zile">Est.|Re-est. time</th> <th> Status </th> <th> End date </th> <th> Details </th> <th class="del_edit_spacing">Select</th >
				</tr>
			</thead>
			<tbody id="tbodyId">
			  <tr id="noTaskYet">
				<td colspan="13"> No task yet.. </td>
			  </tr>
			</tbody>
			<tr id="last_tr" cellspacing ="100px">
							<td class="search"><input oninput="goTo()"type="text" id="search" placeholder="Type to search..." /></td>	
					<td colspan="8" class="padding_class" > <p id="date_time"> Date: .. </p > </td>
					<td colspan="4"> <label id='todoLabelHomepage' title='Personal tasks to do..'> <font size="5" color="#ffff00" style='text-shadow:-1px -1px 0 #ff0000, 1px -1px 0 #ff0000, -1px 1px 0 #ff0000,1px 1px 0 #ff0000;'><b>3</b></font> personal important task to do, <font size="5" color="#00d0ff" style='text-shadow:-1px -1px 0 #0000ff, 1px -1px 0 #0000ff, -1px 1px 0 #0000ff,1px 1px 0 #0000ff;'>0</font> other</label><button id='openTodoButton' title='Open todo tasks' onclick='loadTodo()'> <img src='doneList.png' style='width:50px'/></button> </td>
			</tr>	
		</table>	
		
		<div id='otherActivityDiv'>
		<label style='position:absolute; top:10px; left:40%;font-size:26px;'> <b>Other Activities</b> </label>
			<button id='addNewOtherActivity' onclick ='add_other_activity()'> <img src="addOtherActivity.png" style='position:relative;left:-2px;top:2px;width:15px;height:15px;'> Add other activity </button>
			<div id= 'otherActivityContainer'>
			<table id='otherActivTable' >
				<thead>
					<tr>
						<th>Task ID</th> <th> Project </th> <th> Task Name </th> <th> Hours spend </th> <th>Date</th> <th> Details </th> <th>Action</th >
					</tr>
				</thead>
				<tbody id='otherTbodyTable'>
				</tbody>
			</table>
			</div>
			<button id='addNewOtherActivity' onclick ='close_other_activity()' style='position:absolute; left:760px; top:40px; width:80px; '> <img src="close.png" style='position:relative;left:-2px;top:2px;width:15px;height:15px;'> Close </button>
			<div style='height:30px;'></div>
		</div>
		<div class="under_table_div">
			<button input="button" id= "save_changes" onclick="saveChanges()"><img src ="save_button.png" style="width: 15px;height: 15px; border-radius: 10px; padding: 0px; margin:0px;"> </img> Save Changes</button>
			<br>
			<br>
			<button type="button" class="delete-row" id="delete_row" onclick="delete_rows()" ><img src = "remove_button.png" style="width: 17px;height: 17px; border-radius: 10px; padding: 0px; margin:0px;"> </img>Delete Row</button>
		</div><br>
	
	<div id="descriptionDetails">
		<label id="labelDescription">Description for</label><br>
		<label id="taskIdForDescription" onmouseover="hoverTaskFromDescription()" onmouseleave ="noHoverTaskFromDescription2()"><center><b>Error</b></center></label>
		<textarea id="textareaDescription" ></textarea><br>
		<button id="cancelDescription" onclick="cancelDescr()">Cancel</button> 
		<button id="saveDescription" onclick="saveDescr()">Save</button> 
	</div>
	
	
	<div id="reviewDetails">
		<label id="labelReview">Review for</label><br>
		<label id="taskIdForReview" onmouseover="hoverTaskFromReviewn()" onmouseleave ="noHoverTaskFromReview()"><b>Error</b></label>
		<textarea id="textareaReview" ></textarea><br>
		<button id="cancelReview" onclick="cancelReview()">Cancel</button> 
		<button id="saveReview" onclick="saveReview()">Save</button>
	</div>
	<!-- modifiesssssssssssssssssss 
	<!-- modifiesssssssssssssssssss -->
	<!-- modifiesssssssssssssssssss -->
	<div id='todoListDiv' >
		<label id='todoTitle'> <font color="red">5</font> tasks to do</label>
		<button id='buttonCloseTodo' onclick='removeNewTodo()' ><img src='closeTodo.png' style='width:20px;height:auto;margin:0px;'/></button>
		
		<label id='undertodoTitle'><font color="red">1</font> important, <font color="blue">4</font> other</label>
		<button id='buttonAddTodo' onclick='addNewTodo()'><img src='addTodo.png' style='display:fixed;width:60px;height:auto;margin:0px;'></button>
		<div id='tableDivTodo'>
			<div style='padding:15px 0px 30px 0px;' class='rowTodo'>
				<label class='exclamationTodo'>!</label>
				<div style='  display: inline-block;position:absolute;left:60px;width:700px;height:50px;background-color:#f9f1ea;border-width:1px;border-style:solid;border-radius:5px;border-color:#8e4301'>
					<input class='inputNewTodo' placeholder='Title here..'></input>
					<div id="inputClockNewTodo" style='position:absolute; left:360px;top:15px;'>
						<input id="inputClock" onclick ='showInputClock()' value="14:00" data-default="14:00">
					</div>
					<div id='inputDateNewTodo' style='position:absolute; left:430px;top:15px;'>
						<input  type = 'text' id='enddatepickerNewTodo' onclick='datePick()' size ='8' value="2017-01-01" style='text-align:center;' oninput='checkDate(this)'>
					</div>
					<div id='buttonsNewTodo' style='position:absolute;left:580px;'>
						<button title='Make this task important' style='background-color: #f9f1ea;width:13px;height:43px;padding:0px;margin:0px;text-align:center;border-style: none;border-color: #e0d2c9;border-radius:3px;position:absolute;top:4px;'><label id='exclamationNewTodo'>!</label></button>
						<button title='Mark as done' style='background-color: #f9f1ea;width:30px;height:auto;padding:0px;border-style: none;border-color: #e0d2c9;border-radius:3px;position:absolute;top:9px;left:30px'><img src='successTodo.png' style='width:30px;height:auto'/></button>
						<button title='Delete this task' style='background-color: #f9f1ea;width:20px;height:auto;padding:0px;border-style: none;border-color: #e0d2c9;border-radius:3px;position:absolute;top:13px;left:75px'><img src='deleteTodo.png' style='width:20px;height:auto'/></button>
					</div>
				</div>
			</div>
		
			<div style='padding:30px;' class='rowTodo'>
				<label class='exclamationTodo'>!</label>
				<div style='  display: inline-block;position:absolute;left:60px;width:700px;height:50px;background-color:#f9f1ea;border-width:1px;border-style:solid;border-radius:5px;border-color:#8e4301'>
					<label class='changeTitleLabel' title ="I should buy some medicine like for today cuz itz good,nothig else to do then" style='position:absolute;left:15px;top:15px;font-size:19px'>tansmtos sa das dsmma dsalskeis swpwu</label>
					<label style='position:absolute;left:365px; font-size:20px;top:15px;'> <b>14:30</b>, </label>
					<label style='position:absolute;left:419px; font-size:19px;top:16px;'>yesterday</label>
					
					<div id='buttonsNewTodo' style='position:absolute;left:580px;'>
						<button title='Make this task important' style='background-color: #f9f1ea;width:13px;height:43px;padding:0px;margin:0px;text-align:center;border-style: none;border-color: #e0d2c9;border-radius:3px;position:absolute;top:4px;'><label id='exclamationNewTodo'>!</label></button>
						<button title='Mark as done' style='background-color: #f9f1ea;width:30px;height:auto;padding:0px;border-style: none;border-color: #e0d2c9;border-radius:3px;position:absolute;top:9px;left:30px'><img src='successTodo.png' style='width:30px;height:auto'/></button>
						<button title='Delete this task' style='background-color: #f9f1ea;width:20px;height:auto;padding:0px;border-style: none;border-color: #e0d2c9;border-radius:3px;position:absolute;top:13px;left:75px'><img src='deleteTodo.png' style='width:20px;height:auto'/></button>
					</div>
					
				</div>
			</div>
			
			<div style='padding:30px 30px 60px 30px;' class='rowTodo'>
				<label class='exclamationTodo'>!</label>
				<div style='display: inline-block;position:absolute;left:60px;width:700px;height:50px;background-color:#f9f1ea;border-width:1px;border-style:solid;border-radius:5px;border-color:#8e4301'>
					<label class='changeTitleLabel' style='background-color:red'>how to be lazy</label>
				</div>
			</div>
		</div>
	</div>
	<!-- modifiesssssssssssssssssss 
	<!-- modifiesssssssssssssssssss -->
	<!-- modifiesssssssssssssssssss -->
	<div id="popupdivsuccess" onclick="hide_me()" onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		Data saved!
	</div>
	<div id="popupdivfail" onclick="hide_me()" onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		Error!
	</div>
	<div id="opentaskdeleteerror" onclick="hide_me()" onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		Only <b>Open</b> tasks can be deleted<br>
		which are not saved into database!
	</div>
	<div id="addhouronclickerror" onclick ="hide_me()" onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		Select the tasks you want to add hours!
	</div>
	<div id="deletewhennotaskareselected" onclick ="hide_me()" onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		Select the <b>tasks</b> you want to delete!
	</div>
	<div id="savedetailstasks" onclick ="hide_me()" onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		Description <b>saved</b>!
	</div>
	<div id='introduceforbidencharacters' onclick ='hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		You <font color ="yellow">CAN'T</font> use the group of characters <br> @# or ~^ !!
	</div>
	<div id='succesfullydeleted' onclick = 'hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		Tasks deleted !
	</div>
	<div id ='selectcalendardate' onclick = 'hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		Select date <b>only</b> by using CALENDAR !
	</div>
	<div id = 'tasknametoolong' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		You reach the maximum length !
	</div>
	<div id='notasknameorestimtime' onclick ='hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		Fill <b>all</b> the fields and then save!
	</div>
	<div id='statuschangenotallowed' onclick ='hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		You <b>CAN'T</b> change this Status until you don't save!
	</div>
	<div id='clickOnNotEditableEstimation' onclick ='hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		You <b>CAN'T</b> change this field!
	</div>
	<div id='cantaddmoretasks' onclick ='hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
			You <b>CAN'T</b> add more tasks !
	</div>
	<div id='cantdeleteopentasksfromdatabase' onclick ='hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		You <b>CAN'T</b> delete tasks from database!
	</div>
	<div id='cantaddtaskondiffweek' onclick ='hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		You <b>CAN'T</b> add a task on a different week !
	</div>
	<div id='moveminusweek' onclick ='hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		You reached the start of the year..
	</div>
	<div id='morehoursonday' onclick ='hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		You <b>CAN'T</b> have the sum of hours on a day <b>greater</b> then <b>10</b>. 
	</div>
	<div id='saveintodatabase' onclick ='hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		Use <b>Save Changes</b> in order to save into database!
	</div>
	<div id='deliverTasksDiv' onclick ='hide_me()'>
		You have some tasks to deliver today.
	</div>
	<div id='youhavenotasks' onclick ='hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		You have <b>no</b> tasks to save.
	</div>
	<div id='noprojects' onclick ='hide_me()' onmouseover ="show_me_more()" onmouseleave = "rehide_me()">
		You have <b>no</b> projects for now. Request a project.
	</div>
	<div id='modifiedhourssave' onclick ='hide_me()'>
		You modified the hours <b>incorrectly</b> or more hours were inserted</b>!<br> <b>0</b> will be inserted as hours in database !
	</div>
	<div id="reestimatedDetails">
		<label id="labelReestimated">Re-estimated details for</label><br>
		<label id="taskIdForReestimated" onmouseover="hoverTaskFromReestimated()" onmouseleave ="noHoverTaskFromReestimated()"><b>Ereror</b></label>
		<input id="setReestimatedhours" placeholder='Re-estim. hours..' oninput='checkEstimTime()'>
		<textarea id="textareaReestimated" placeholder="Re-estim. reason.." ></textarea><br>
		<button id="cancelReestimated" onclick="cancelReestimated()">Cancel</button> 
		<button id="saveReestimated" onclick="saveReestimated()">Save</button>
	</div>
	<div id="requestDiv"> 
		<label id="titleRequestDiv">Move the task into</label><br>
		<label id="componentRequestDiv">Postponed?</label>
		<button id="cancelChange" class ='cancelClass' onclick="cancelChange()">No</button> 
		<button id="saveChange" class ='cancelClass'>Yes</button>
	</div>
	
	<div id="OpenDiv"> 
		<label id="componentOpenDiv">Saving an <font color ='#8af902'><b>OPEN</b></font> task into database will result in the imposibility of changing the <font color ='#07fcd7'><b>taskname</font >/<font color ='#07fcd7'>project</b></font >! 
		<br>You <b>CAN'T</b> delete the task after save!</label>
		<input type='checkbox'id='checkboxId' onclick ='checkboxClickforOpen()'/><label id='dontShowMeThis'>Don't show me this</label>
		<button id="okOpen" onclick="openOk()">Got it!</button>
	</div>
	
	<div id="weeklyReportDiv"> 
		<label id="componentweeklyReportDiv">You <b><font color ='#8af902'>DO NOT</font></b> have a Weekly Report. 
		<br>Click <b><a href = '/Quality/TimeToolTry/HomePage/WeeklyReports/WeeklyReportsPage.php'>here</a></b> to add one.</label>
		<button id="okWeeklyReportOpen" onclick="gotookWeeklyReport()">Got it!</button>
	</div>
	<div onkeypress="enterK()" id='relogareDiv'>
		<label id='relogareLabel'>Your session expired. Enter your <b> password</b></label>
		<input type='password' id='relogareInput' onclick='inputPassword()' oninput='inputPassword()'></input>
		<button id='relogareCheck'   onclick ='checkPassword()' >Check</button>
		<button id='relogareExit' onclick ='exitSession()'>Exit</button>
		
	</div>
	
	<div id='errorFromReviewedToClose' >
		<label id="labelErrorFromReviewedToClose">The following tasks need to be <b><font color ='#3930ba'>Reviewed</font></b> before Closing</label>
		<br><label id='errorTaskIdFromReviewedToClose'><b><font color ='#8af902'>Hmm, maybe error</font></b></label>
		<button id="okFromReviewedToClose" onclick = "gotItFromReviewToClosed()">Got it!</button>
	</div>
	
	<div id ='isReworkFor'>
		<label id='selectProjectLabel'>Select project:<select id='projectListRework'><option>Error Error Error</option><option>Error Error</option></select></label>
		<label id='selectTaskIdLabel'>Select taskId:<select id='taskIdListRework'><option>Error</option></select></label>
		<label id = 'labelInfoRework'> The task name will be "Is rework for number" </label>
		<label id='onlyNeededLabel'></label>
		<label id='labelInfoFullHolder' style='display:none'></label>
		<label id='taskidKeeperRework' style='display:none'></label>
		<button id='saveIsRework' onclick = 'saveIsReworkFor()'>Save</button>
		<button id='cancelIsRework' onclick = 'cancelIsReworkFor()'>Cancel</button>
	</div>
</body>

</html>