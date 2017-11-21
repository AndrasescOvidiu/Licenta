<?php
session_start();
$userId = $_SESSION['userID'];

$taskId = explode("~^",$_POST['tID']);
$projectName = explode("~^",$_POST['pN']);
$taskName = explode("~^",$_POST['tN']);
$prevDate = explode("~^",$_POST['prD']);
$currDate = explode("~^",$_POST['crD']);
$prevHour = explode("~^",$_POST['prH']);
$currHour = explode("~^",$_POST['crH']);
$estimtime = explode("~^",$_POST['eT']);
$status = explode("~^",$_POST['sts']);
$review = explode("~^",$_POST['rwD']);
$enddate = explode("~^",$_POST['eD']);
$isReworkFor = explode("~^",$_POST['isRew']);
include("conexiune.php");
for($i=0;$i<count($taskId)-1;$i++)
{
	$currentstatus=0;
	if($status[$i] =="Open")
		$currentstatus = 1;
	else
		if($status[$i] =="In work")
			$currentstatus = 2;
	else
		if($status[$i] =="Postponed")
			$currentstatus = 3;
	else
		if($status[$i] =="Reviewed")
			$currentstatus = 4;
	else
		if($status[$i] =="Closed")
			$currentstatus = 5;
	if($currentstatus!=0){
		
		$getprojectsql = "Select ProjectID from Projects where ProjectName = '$projectName[$i]'";
		$resultgetpr = mysql_query($getprojectsql) or die("error");
		$rowgetpr = mysql_fetch_array($resultgetpr);	
		
		$tipTask = 1;
		if($projectName[$i] == "Unproductive" || $projectName[$i] =="Training" || $projectName[$i] =="Meeting")
			$tipTask = 2;
		else
			$tipTask = 1;
		
		echo $rowgetpr;
		if($rowgetpr !="error"){
			$sql1 = "Insert into UserTasks(TaskID,IsReworkFor,UserID,ProjectID,TaskDescription,EstimatedHours,EnddaterequiredByProject,TipTask,Status,ActualEndDate,Reviewable,ReviewExplanation) values($taskId[$i],$isReworkFor[$i],$userId,$rowgetpr[0],'$taskName[$i]',$estimtime[$i],'$enddate[$i]',$tipTask,$currentstatus,'0000-00-00',$review[$i],' ')";
			$result1 = mysql_query($sql1) or die("error");
			$row1 = mysql_fetch_array($result1);
			echo $row1;
			if($row1!="error")
			{
				if($prevDate[$i]!=""){
					$sql2="Insert into DetailedTasks(taskid,hours,date) values($taskId[$i],$prevHour[$i],'$prevDate[$i]')";
					$result2 = mysql_query($sql2) or die("error");
					$row2 = mysql_fetch_array($result2);
					echo $row2;
				}
					$sql3="Insert into DetailedTasks(taskid,hours,date) values($taskId[$i],$currHour[$i],'$currDate[$i]')";
					$result3 = mysql_query($sql3) or die("error");
					$row3 = mysql_fetch_array($result3);
					echo $row3;
			}
		}
	}
}
?>
