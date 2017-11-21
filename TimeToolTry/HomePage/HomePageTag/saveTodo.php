<?php
session_start();
$userId = $_SESSION['userID'];
include ("conexiune.php");

$taskid = (int)$_POST["tid"];
$newTitle = $_POST["ttl"];

$checkSql = "Select min(taskid),max(taskid) from PersonalTodo where userid = $userId";
$checkResult = mysql_query($checkSql) or die("error");
$rowResult = mysql_fetch_array($checkResult);



if($taskid>=$rowResult[0] && $taskid <=$rowResult[1])
{
	$sqlUpdate = "Update PersonalTodo set title = '".$newTitle."' where taskid = $taskid";
	$checkUpdate= mysql_query($sqlUpdate) or die("error");
	echo "success";
}
else
	echo "errorNotInRange";
/*
$saveNew = "Insert into PersonalTodo (taskid,userid,title,showed,important,hour,data) values (1,77,'sarmale',1,1,'14:00:00','2017-01-01')";
$checkResult2 = mysql_query($saveNew) or die("error");
$rowResult2 = mysql_fetch_array($checkResult2);
echo $rowResult2[0];
 */
 
?>