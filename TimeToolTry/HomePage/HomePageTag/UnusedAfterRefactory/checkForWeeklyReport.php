<?php
session_start();
$userId = $_SESSION['userID'];

include ("conexiune.php");

$sql = "Select * from HWWeeklyReport where userid = $userId  and datestart =(select max(datestart) from HWWeeklyReport where userid = $userId ); ";
$result=mysql_query($sql) or die("error");
$row=mysql_fetch_array($result);
if($row["DateStart"]==null)echo 1;
else
	echo $row["DateStart"]."~^".$row["Achievements"]."~^".$row["PlannedButNotDone"]."~^".$row["PlannedForNextWeek"]."~^".$row["Problems"];


?>