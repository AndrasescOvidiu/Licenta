<?php
session_start();
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

?>