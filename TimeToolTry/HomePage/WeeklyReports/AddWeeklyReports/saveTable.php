<?php
session_start();
$_SESSION['weeklyReport']="1";
$userId = $_SESSION['userID'];
$achievements = $_POST['ach'];
$plannedbutnotdone = $_POST['pbnd'];
$plannedfornextweek = $_POST['pfnw'];
$problems = $_POST['pr'];
$data = $_POST['date'];

include ("conexiune.php");

$sql = "insert into  HWWeeklyReport(UserID,DateStart,Achievements,PlannedButNotDone,PlannedForNextWeek,Problems) values($userId,'$data','$achievements','$plannedbutnotdone','$plannedfornextweek','$problems')";
$result=mysql_query($sql) or die("errore");
echo $result;

?>