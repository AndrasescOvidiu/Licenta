<?php
session_start();
$userId = $_SESSION['userID'];

include("conexiune.php");

$sql = "Select TaskIdLow,	TaskIdHigh from UserTasksLimit where userid = $userId";
$result=mysql_query($sql) or die("error");
$row = mysql_fetch_array($result);
echo $row[0]."~^".$row[1];

?>