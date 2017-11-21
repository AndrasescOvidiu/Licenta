<?php 
session_start();

$valori = $_POST["num"];
$userId = $_SESSION['userID'];

include("conexiune.php");
		 
 $sql="SELECT * FROM vwTasksByWeekDay where UserId = ".$userId.";";
$result=mysql_query($sql);

$taskid = "";
$projectid = "";
$taskname = "";
$luni="";
$marti = "";
$miercuri ="";
$joi ="";
$vineri="";
$sambata="";
$statuss = "";
$enddate ="";
$descr = "My descriptionnn";

while ($row=mysql_fetch_array($result))
{	
	$taskid = $taskid.$row[0]."~^";	
	$projectid = $projectid.$row[4]."~^";
	$taskname = $taskname.$row[5]."~^";	
	
	$luni = $luni.$row[6]."~^";
	$marti = $marti.$row[7]."~^";
	$miercuri = $miercuri.$row[8]."~^";
	$joi = $joi.$row[9]."~^";
	$vineri = $vineri.$row[10]."~^";
	$sambata = $sambata.$row[11]."~^";
	if($row[13] == 'Open')
		$statuss = $statuss.'0'."~^";	
	else
		if($row[13] == 'In Work')
		$statuss = $statuss.'1'."~^";
	else
		if($row[13] == 'Postponed')
		$statuss = $statuss.'2'."~^";	
	else
		if($row[13] == 'Reviewed')
		$statuss = $statuss.'3'."~^";	
	else
		if($row[13] == 'Closed')
		$statuss = $statuss.'4'."~^";	


		
	
	$enddate = $enddate.$row[14]."~^";
	
	$descr = $descr."My descriptionnn"."~^";
}
echo $taskid."@#".$projectid."@#".$taskname."@#".$luni."@#".$marti."@#".$miercuri."@#".$joi."@#".$vineri."@#".$sambata."@#".$statuss."@#".$enddate."@#".$descr;
?>
