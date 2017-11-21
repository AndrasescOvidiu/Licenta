<?php
session_start();
$userId = $_SESSION['userID'];
include ("conexiune.php");
$nr = $_POST['nr'];


if($nr == 1){ // savin
	$project = $_POST['pr'];
	$taskname = $_POST['tn'];
	$hours = $_POST['h'];
	$enddate = $_POST['ed'];
	
	$sqlTid = "select max(taskid) from UserTasksOtherActivities where userid = $userId";
	$resultTid = mysql_query($sqlTid) or die("error");
	$rowTid = mysql_fetch_array($resultTid);
	if($rowTid[0] == 0)
	{
		$sql2 = "Select TaskIdLow from UserTasksLimit where userid = ".$userId.";";
		$result2=mysql_query($sql2) or die("error");
		$row2= mysql_fetch_array($result2);
		$taskid = $row2[0];
	}
	else
		$taskid = $rowTid[0]+1;

	$sql = "Insert into UserTasksOtherActivities(TaskID,UserID,ProjectName,TaskName,HoursSpend,Enddate) values($taskid,$userId,'$project','$taskname',$hours,'$enddate')";
	$result = mysql_query($sql) or die("error");
	$row = mysql_fetch_array($result);
	echo $row[0];
}
else
if($nr == 2) // update hour
{
	$hours = $_POST['h'];
	$taskid = $_POST['tid'];
	
	$sql = "Update UserTasksOtherActivities set hoursspend = $hours where taskid = $taskid";
	$result = mysql_query($sql) or die("error");
	$row = mysql_fetch_array($result);
	echo $row[0];
}
?>