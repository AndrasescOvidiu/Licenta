<?php
session_start();
include("conexiune.php");
$tId = $_POST['tId'];

$sql = "Select reviewable from UserTasks where taskid = $tId";
$res = mysql_query($sql) or die("error");
$row = mysql_fetch_array($res);
echo $row[0];

?>