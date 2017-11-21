<?php
session_start();

$userId = $_SESSION['userID'];
$weekNr = $_POST["weekNr"];
$dateOfWeek = explode("~^",$_POST['dW']);

include("conexiune.php");


$norme = "";

for($i=0;$i<5;$i++)
{
	$sqlNorme = "select hours from Norme where startnorma = (select max(startnorma) from Norme where startnorma <='$dateOfWeek[$i]' and userid = $userId) and userid= $userId";
	$resultNorme = mysql_query($sqlNorme) or die("error");
	$rowNorme = mysql_fetch_array($resultNorme);
	$norme.=$rowNorme[0]."~^";
}

$allower = 0;

$collector ="";

$sqlCheckForProjectAssignation = "Select AssignedProjectID from UserProjects where userid = $userId";
$resultCheck = mysql_query($sqlCheckForProjectAssignation)or die("error");
while($rowCheck = mysql_fetch_array($resultCheck))
{
	$taskid = "";
	$tester = 0;
	$sqlTest = "Select ProjectName from Projects where projectid = $rowCheck[0] and status = 1";
	$resultTest = mysql_query($sqlTest) or die("error");
	$row = mysql_fetch_array($resultTest);
	if($row[0]!= "Unproductive" && $row[0]!="Training" && $row[0]!="Meeting")
	{
		$allower = 1;
	}
	if($allower == 1)
	{
		$sqlUser = "Select taskid,TaskDescription from UserTasks where userid = $userId and projectid = $rowCheck[0] and status = 5";
		$resultUser = mysql_query($sqlUser) or die("error");
		while($rowUser = mysql_fetch_array($resultUser))
		{
			$tester = 1;
			$taskid.=$rowUser[0]." - ".$rowUser[1]."~^";
		}
		if($tester == 1)
		{
			$collector.=$row[0]."~^".$taskid."@#";
		}
	}
}
echo $collector."$%$".$norme;;
?>