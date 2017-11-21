<?php 
session_start();
$userId = $_SESSION['userID'];
include ("conexiune.php");

$sql = "Select MAX(taskID) from UserTasks where userid = ".$userId.";";
$result=mysql_query($sql);
$row=mysql_fetch_array($result);
echo $row[0];

?>