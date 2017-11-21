<?php
session_start();
include("conexiune.php");
$userId = $_SESSION['userID'];


$year = $_POST['year'];

$month = $_POST['month'];
if($month<10)
	$nm="0".$month;
else $nm = $month;
$month = $nm;

$daysInMonth = $_POST['days'];

$sql = "select TaskIdLow,TaskIdHigh from UserTasksLimit where userid = $userId";
$result = mysql_query($sql) or die("o crapeat");
$row = mysql_fetch_array($result);

$taskid = "";
$taskName = "";
$projectName ="";
$donehours = "";
$sqln = "Select TaskID from DetailedTasks where taskid>=$row[0] and taskid <= $row[1] and date >='$year-$month-01' and date <='$year-$month-$daysInMonth' group by taskid";
$resultn = mysql_query($sqln) or die("o crapeat");
while ($rown = mysql_fetch_array($resultn))  // avem taskiurile care sunt pe luna asta, id lor
{
	
	$taskid.=$rown[0]."~^";
	
	$sqlSelect = "Select TaskDescription,ProjectID from UserTasks where taskid = $rown[0]";
	$resultSelect = mysql_query($sqlSelect)or die("o crapeat");
	$rowSelect= mysql_fetch_array($resultSelect);
	
	$taskName .= $rowSelect[0]."~^";
	
	$sqlProject = "select ProjectName from Projects where projectid = $rowSelect[1]";
	$resultProject = mysql_query($sqlProject)or die("o crapeat");
	$rowProject = mysql_fetch_array($resultProject);
	
	$projectName .= $rowProject[0]."~^";
	
	
	for($i = 1;$i<=$daysInMonth;$i++)
	{
		if($i<10)
			$day = "0".$i;
		else
			$day = $i;
		$data = $year."-".$month."-".$day;
		//echo $data." ";
		
		
		$sql2 = "Select Hours from DetailedTasks where Date = '$data' and taskid = $rown[0]";
		$result2 = mysql_query($sql2)or die("o crapeat");
		$row2 = mysql_fetch_array($result2);
		if($row2[0])
		{
			$donehours.=$row2[0]."~^";
		}
		else
			$donehours.="0~^";
	}
	$donehours.="#@%~!";
}
echo $taskid."@#".$projectName.'@#'.$taskName.'@#'.$donehours;
?>