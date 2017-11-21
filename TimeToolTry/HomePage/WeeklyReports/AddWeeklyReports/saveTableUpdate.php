<?php
session_start();
$_SESSION['weeklyReport']="1";
$userId = $_SESSION['userID'];
$achievements = $_POST['ach'];
$plannedbutnotdone = $_POST['pbnd'];
$plannedfornextweek = $_POST['pfnw'];
$problems = $_POST['pr'];
$data = $_POST['date'];
echo $data;
include ("conexiune.php");

$sqlTest = "Select ReportID from HWWeeklyReport where UserID = $userId and datestart =(select max(datestart) from HWWeeklyReport where userid = $userId ); ";
$resultTest=mysql_query($sqlTest) or die("errore");
$row=mysql_fetch_array($resultTest);
echo $row[0];

$sql = "Update HWWeeklyReport set DateStart='$data',Achievements ='$achievements',PlannedButNotDone='$plannedbutnotdone',PlannedForNextWeek='$plannedfornextweek',Problems='$problems' where ReportID=$row[0]";
$result=mysql_query($sql) or die("errore");
echo $result;


?>