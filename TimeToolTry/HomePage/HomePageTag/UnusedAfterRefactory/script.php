<?php 
session_start();
//$valori = $_POST["num"];
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
?>
