<?php
session_start();

$taskId = explode("~^",$_POST['tId']);
include("conexiune.php");
$newEnddate="";
for($i=0;$i<count($taskId)-1;$i++)
{
	$sqlSelect = "Select taskId from UserTaskEndDateChanges where taskid= $taskId[$i]";
	$resultSelect = mysql_query($sqlSelect) or die("error");
	$rowSelect = mysql_fetch_array($resultSelect);
	if($rowSelect=="")
	{
		$sqlSelectNewDate = "Select EnddaterequiredByProject from UserTasks where taskid= $taskId[$i]";
		$resultSelectNewDate = mysql_query($sqlSelectNewDate) or die("error");
		$rowSelectNewDate = mysql_fetch_array($resultSelectNewDate);
		$newEnddate.=$rowSelectNewDate[0]."~^";

	}
	else
	{
		$sqlSelectNewDate = "Select NewEndDate from UserTaskEndDateChanges where taskid= $taskId[$i]";
		$resultSelectNewDate = mysql_query($sqlSelectNewDate) or die("error");
		$rowSelectNewDate = mysql_fetch_array($resultSelectNewDate);
		$newEnddate.=$rowSelectNewDate[0]."~^";
	}
		
}
echo $newEnddate;
?>