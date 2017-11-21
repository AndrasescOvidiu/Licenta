<?php
session_start();
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


?>