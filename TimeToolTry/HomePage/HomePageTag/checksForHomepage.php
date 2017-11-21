<?php
session_start();
$nr=$_POST['nr'];
if($nr ==0 ) // check for password
{
	$userId = $_POST['usr'];
	$parola = addslashes($_POST["pw"]);
		
	$passmd5=md5($parola);

	include("conexiune.php");

	$result = mysql_query("Select * from Admin where userId=$userId AND pass = '$passmd5'") or die("Error");
	$row = mysql_fetch_array($result);
	if($row=="")
	{
		session_destroy();
		echo 0;

	}
	else
	{
		$_SESSION['expire'] = time()+300;
		$string = $row['UserID'];
		$_SESSION['username'] = $row['UserID'];
		$_SESSION['userID'] = $row['UserID'];
		$_SESSION['nrOfTasks'] = 0;
		$_SESSION['openTask']="0"; // am nevoie de asta sa testez cand se fac noi taskuri, nu sterjeee
		$_SESSION['superU'] = $row['SuperUser'];
		$_SESSION['weeklyReport']="0";
		echo 1;
	}
}
if($nr ==1 ) // check for is rework tasks
{
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
}
if($nr == 2)  // checkk session 
{
	if( time()> $_SESSION['expire'])  /// sa fac aia cu sessionul
	{
		
		$_SESSION['expire'] = time()+300;
		echo "error";
		
	}
	else
	{
		$_SESSION['expire'] = time()+300;
		echo $_SESSION['userID'];
	}
}
if($nr == 3)  // checkk for weekly reports
{
	$userId = $_SESSION['userID'];

	include ("conexiune.php");

	$sql = "Select * from HWWeeklyReport where userid = $userId  and datestart =(select max(datestart) from HWWeeklyReport where userid = $userId ); ";
	$result=mysql_query($sql) or die("error");
	$row=mysql_fetch_array($result);
	if($row["DateStart"]==null)echo 1;
	else
		echo $row["DateStart"]."~^".$row["Achievements"]."~^".$row["PlannedButNotDone"]."~^".$row["PlannedForNextWeek"]."~^".$row["Problems"];

}



?>