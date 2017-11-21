<?php
session_start();

$username = $_POST["user"];
$parola = addslashes($_POST["pass"]);
	
$passmd5=md5($parola); //cripteaza parola


include("conexiune.php");

$result = mysql_query("Select * from Admin where username='$username' AND pass = '$passmd5'") or die("Error");
$row = mysql_fetch_array($result);
if($row=="")
{
	echo -1;
}
else
{

	$string = $row['UserID'];

	$_SESSION['username'] = $row['UserID'];
	$_SESSION['userID'] = $row['UserID'];
	$_SESSION['nrOfTasks'] = 0;
	$_SESSION['openTask']="0"; // am nevoie de asta sa testez cand se fac noi taskuri, nu sterjeee
	$_SESSION['superU'] = $row['SuperUser'];
	$_SESSION['weeklyReport']="0";
	$_SESSION['enddateToday']="0";
}
?>