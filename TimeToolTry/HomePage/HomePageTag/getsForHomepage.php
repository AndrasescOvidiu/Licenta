<?php
session_start();
$nr = $_POST['nr'];

if($nr == 0) // get next new id
{
	$userId = $_SESSION['userID'];
	include ("conexiune.php");

	$sql = "Select COUNT(1) from UserTasks where userid =  $userId;";
	$result=mysql_query($sql) or die("error");
	$row=mysql_fetch_array($result);

	if($row[0]==0){ // e USER NOU, nu are nici un task !
			$sql1 = "Select TaskIdLow from UserTasksLimit where userid = $userId";
			$result1=mysql_query($sql1) or die("error");
			$row1=mysql_fetch_array($result1);
			echo $row1[0];
	} 
	else {
		$sql2 = "Select MAX(TaskID) from UserTasks where userid = $userId;";
		$result2=mysql_query($sql2) or die("error");
		$row2=mysql_fetch_array($result2);
		echo $row2[0];
	}
}
if($nr == 1) // get no of tasks inserted
{
	echo $_SESSION['nrOfTasks'];
}
if($nr == 2) // get no of tasks inserted change
{
	$_SESSION['nrOfTasks'] = $_POST['ch'];
}
if($nr == 3) // get norma 
{
	$userId = $_SESSION['userID'];
	include ("conexiune.php");

	$data=date("Y-m-d");

	$sql = "Select Hours from Norme where UserID= ".$userId." and StartNorma=(select max(StartNorma) from Norme where UserID=$userId and StartNorma<='$data')";
	$result=mysql_query($sql) or die("error");
	$row=mysql_fetch_array($result);

	echo $row[0]."~^".$userId;
}
if($nr == 4) // get other activities 
{
	$userId = $_SESSION['userID'];
	$coll = $_POST['coll'];
	include ("conexiune.php");

	if($coll == 1){ //preluare date taskuri
		$data=date('Y-m-d', strtotime('-2 days'));
		$taskid = "";
		$project = "";
		$taskName = "";
		$hours = "";
		$enddate = "";
		$details = "";

		$sql = "Select * from UserTasksOtherActivities where UserID= ".$userId." and Enddate>='$data' order by taskid DESC";
		$result=mysql_query($sql) or die("error");
		while($row=mysql_fetch_array($result))
		{
			$taskid.=$row[0]."~^";
			$project.=$row[2]."~^";
			$taskName.=$row[3]."~^";
			$hours.=$row[4]."~^";
			$enddate.=$row[5]."~^";
			$newTaskId =$row[0];
			
			$sqlDescription = "select taskid,description from TasksDescriptionOtherActivity where taskid = $newTaskId";
			$resultDescription = mysql_query($sqlDescription) or die("error");
			$rowDescription = mysql_fetch_array($resultDescription);
			if($rowDescription[0])
			{
				$details.=$rowDescription[1]."~^";
			}
			else
			{
				$details.="No description yet"."~^";
			}
		}

		echo $taskid."@#".$project."@#".$taskName."@#".$hours."@#".$enddate."@#".$details;
	}
	else
	if($coll == 2) // preluare nexttaskid
	{
		$sql = "Select max(taskid) from UserTasksOtherActivities where UserID= ".$userId.";";
		$result=mysql_query($sql) or die("error");
		$row = mysql_fetch_array($result);
		if($row[0] == 0)
		{
			$sql2 = "Select TaskIdLow from UserTasksLimit where userid = ".$userId.";";
			$result2=mysql_query($sql2) or die("error");
			$row2= mysql_fetch_array($result2);
			echo $row2[0];
		}
		else
			echo $row[0];
		
	}
}
if($nr == 5) // get projects by user id
{
	$userId = $_SESSION['userID'];

	include("conexiune.php");
	$sql ="select * from UserProjects where userid = $userId";
	$result=mysql_query($sql) or die("error");
	$ok = 0;
	$projects = "";
	while($row = mysql_fetch_array($result))
	{
		$ok = 1;
		$sql1 = "Select ProjectName from Projects where ProjectID = $row[1] AND Status = 1";
		$result1=mysql_query($sql1) or die("error");
		$row1 = mysql_fetch_array($result1);
		if($row1 !="")
			$projects = $projects.$row1[0]."~^";
	}
	if($ok == 0) // nu e asignat la nici un proiect
	{
		echo "Unproductive";
	}
	else{ 
		echo $projects;
		
	}
}
if($nr == 6) // get session elements
{
	if($_POST['coll']==1){
		$opTask = $_SESSION['openTask'];
		echo $opTask;
	}
	else
		if($_POST['coll']==2){
			if($_SESSION['enddateToday']=="0")
			{
				echo 1;
			}
			else
				echo 2;
			$_SESSION['enddateToday']="1";
			
		}
}
if($nr == 7)  // get session elements change 
{
	$_SESSION['openTask'] = "1";
	echo $_SESSION['openTask'];
}
if($nr == 8) // get weekly reports change
{
	$_SESSION['weeklyReport'] = "1";
	echo $_SESSION['weeklyReport'];
}
if($nr == 9) // ge weekly reports session
{
	$opTask = $_SESSION['weeklyReport'];
	echo $opTask;
}
if($nr == 10) // loadtable script 
{
	$userId = $_SESSION['userID'];
	$weekNr = $_POST["weeknr"];
	$dateOfWeek = explode("~^",$_POST['dW']);

	include("conexiune.php");



	$week = date('W');
	$year = date('Y');		 
	$sql = "SELECT vwALLTasksByWeekDay.TaskID, vwALLTasksByWeekDay.Project, vwALLTasksByWeekDay.TaskName, vwALLTasksByWeekDay.Monday, vwALLTasksByWeekDay.Tuesday, vwALLTasksByWeekDay.Wednesday,vwALLTasksByWeekDay.Thursday, Friday, vwALLTasksByWeekDay.EstimatedHours, vwALLTasksByWeekDay.Status, vwALLTasksByWeekDay.EndDate FROM (select @week1:=$weekNr, @user1:=$userId, @year1:=2017) parm, vwALLTasksByWeekDay ORDER BY vwALLTasksByWeekDay.TaskID ";
	//$sql="SELECT * FROM vwTasksByWeekDay where UserId = 12";
	//SELECT vwALLTasksByWeekDay.* FROM (select @week1:=35 w, @user1:=13, @year1:=2015) parm, vwALLTasksByWeekDay
	//SELECT TaskID, Project, TaskName, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Status, EndDate, ReviewExplanation  FROM (select @week1:=35 w, @user1:=13, @year1:=2015) parm, vwALLTasksByWeekDay
	$result=mysql_query($sql) or die("error");

	$taskid = "";
	$projectid = "";
	$taskname = "";
	$luni="";
	$marti = "";
	$miercuri ="";
	$joi ="";
	$vineri="";
	$estimatedHours="";
	$reestimatedHours ="";
	$reestimatedDate ="";
	$statuss = "";
	$enddate ="";
	$descr = "";
	$newEnddate="";
	$norme = "";
	for($i=0;$i<5;$i++)
	{
		$sqlNorme = "select hours from Norme where startnorma = (select max(startnorma) from Norme where startnorma <='$dateOfWeek[$i]' and userid = $userId) and userid = $userId";
		$resultNorme = mysql_query($sqlNorme) or die("error");
		$rowNorme = mysql_fetch_array($resultNorme);
		$norme.=$rowNorme[0]."~^";
	}
	while ($row=mysql_fetch_array($result))
	{	
		$taskid = $taskid.$row['TaskID']."~^";	
		$projectid = $projectid.$row['Project']."~^";
		$taskname = $taskname.$row['TaskName']."~^";	
		
		$luni = $luni.$row['Monday']."~^";
		$marti = $marti.$row['Tuesday']."~^";
		$miercuri = $miercuri.$row['Wednesday']."~^";
		$joi = $joi.$row['Thursday']."~^";
		$vineri = $vineri.$row['Friday']."~^";
		$estimatedHours = $estimatedHours.$row['EstimatedHours']."~^";
		if($row['Status'] == 'Open')
			$statuss = $statuss.'0'."~^";	
		else
			if($row['Status'] == 'In Work')
			$statuss = $statuss.'1'."~^";
		else
			if($row['Status'] == 'Postponed')
			$statuss = $statuss.'2'."~^";	
		else
			if($row['Status'] == 'Reviewed')
			$statuss = $statuss.'3'."~^";	
		else
			if($row['Status'] == 'Closed')
			$statuss = $statuss.'4'."~^";	
		else
			$statuss = $statuss.'5'."~^";	
		
		$newTaskId = $row['TaskID'];
		
		$sqlDescription = "select taskid,description from TasksDescription where taskid = $newTaskId";
		$resultDescription = mysql_query($sqlDescription) or die("error");
		$rowDescription = mysql_fetch_array($resultDescription);
		if($rowDescription[0])
		{
			$descr.=$rowDescription[1]."~^";
		}
		else
		{
			$descr.="No description yet"."~^";
		}
			
		$sqlSelect = "Select taskId from UserTaskEndDateChanges where taskid= $newTaskId";
		$resultSelect = mysql_query($sqlSelect) or die("error");
		$rowSelect = mysql_fetch_array($resultSelect);
		if($rowSelect=="")
		{
			$sqlSelectNewDate = "Select EnddaterequiredByProject from UserTasks where taskid= $newTaskId";
			$resultSelectNewDate = mysql_query($sqlSelectNewDate) or die("error");
			$rowSelectNewDate = mysql_fetch_array($resultSelectNewDate);
			$newEnddate.=$rowSelectNewDate[0]."~^";
		}
		else
		{
			$sqlSelectNewDate = "Select NewEndDate from UserTaskEndDateChanges where taskid= $newTaskId";
			$resultSelectNewDate = mysql_query($sqlSelectNewDate) or die("error");
			$rowSelectNewDate = mysql_fetch_array($resultSelectNewDate);
			$newEnddate.=$rowSelectNewDate[0]."~^";
		}
		
		// reestimatedHours
		$sqlSelect = "Select Max(Newhours),DateOfChange from UserTaskReestimations where taskid= $newTaskId and DateOfChange = (select Max(DateOfChange) from UserTaskReestimations where taskid = $newTaskId)";
		$resultSelect = mysql_query($sqlSelect) or die("error");
		$rowSelect = mysql_fetch_array($resultSelect);
		if($rowSelect!="")
		{
			$reestimatedHours .=$rowSelect[0]."~^";
			$reestimatedDate .=$rowSelect[1]."~^";
		}
		else
		{
			$reestimatedDate .=" ~^";
			$reestimatedHours .="0~^";
		}
	}
	if($taskid == "")
		echo 1;
	else{
		echo $taskid."@#".$projectid."@#".$taskname."@#".$luni."@#".$marti."@#".$miercuri."@#".$joi."@#".$vineri."@#".$estimatedHours."@#".$reestimatedHours."@#".$reestimatedDate."@#".$statuss."@#".$newEnddate."@#".$descr."@#".$norme;
	}
}
if($nr == 11) // verificare superuser
{
	$superU = $_SESSION['superU'];
	echo $superU;
}

?>