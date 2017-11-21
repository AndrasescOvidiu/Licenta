<?php
session_start();
$userId = $_SESSION['userID'];
include ("conexiune.php");
$nr = $_POST['nr'];
$taskid = $_POST['taskid'];
$description = $_POST['descr'];

if($nr==1)
{
	$sql = "select taskid,description from TasksDescription where taskid = $taskid";
	$result = mysql_query($sql) or die("error");
	$row = mysql_fetch_array($result);
	if($row[0]) // update
	{
		echo "exista, update, a fost: \n".$row[1]."\n";
		$sqlUpdate = "Update TasksDescription set Description = '$description' where taskid = $taskid";
		$resultUpdate = mysql_query($sqlUpdate) or die("error");
		$rowUpdate = mysql_fetch_array($resultUpdate);	
	}
	else // insert
	{
		echo "fajem insert ";
		$sqlInsert = "Insert into TasksDescription (taskid,description) values($taskid,'$description')";
		$resultInsert = mysql_query($sqlInsert) or die("error");
		$rowInsert = mysql_fetch_array($resultInsert);	
	}
}
else if($nr == 2)
{
	$sql = "select taskid,description from TasksDescriptionOtherActivity where taskid = $taskid";
	$result = mysql_query($sql) or die("error");
	$row = mysql_fetch_array($result);
	if($row[0]) // update
	{
		echo "exista, update, a fost: \n".$row[1]."\n";
		$sqlUpdate = "Update TasksDescriptionOtherActivity set Description = '$description' where taskid = $taskid";
		$resultUpdate = mysql_query($sqlUpdate) or die("error");
		$rowUpdate = mysql_fetch_array($resultUpdate);	
	}
	else // insert
	{
		echo "fajem insert ";
		$sqlInsert = "Insert into TasksDescriptionOtherActivity (taskid,description) values($taskid,'$description')";
		$resultInsert = mysql_query($sqlInsert) or die("error");
		$rowInsert = mysql_fetch_array($resultInsert);	
	}
}



?>