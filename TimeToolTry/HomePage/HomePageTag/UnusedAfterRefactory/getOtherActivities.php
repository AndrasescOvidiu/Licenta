<?php
session_start();
$userId = $_SESSION['userID'];
$nr = $_POST['nr'];
include ("conexiune.php");

if($nr == 1){ //preluare date taskuri
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
if($nr == 2) // preluare nexttaskid
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
?>
