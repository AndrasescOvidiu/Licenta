<?php
session_start();
$userId = $_SESSION['userID'];
include ("conexiune.php");

$sql = "Select COUNT(1) from UserTasks where userid =  $userId;";
$result=mysql_query($sql) or die("error");
$row=mysql_fetch_array($result);

if($row[0]==0){ // e USER NOU, nu are nici un task !
		$sql1 = "Select TaskIdLow from UserTasksLimit where userid = $userId";
		$result1=mysql_query($sql1) or die("error");
		$row1=mysql_fetch_array($result1);
		echo $row1[0];
} 
else {
	$sql2 = "Select MAX(TaskID) from UserTasks where userid = $userId;";
	$result2=mysql_query($sql2) or die("error");
	$row2=mysql_fetch_array($result2);
	echo $row2[0];
}

?>
