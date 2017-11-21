<?php
session_start();

$userId = $_SESSION['userID'];
include("conexiune.php");

$sql = "select startdate from Admin where userid = $userId";
$result = mysql_query($sql) or die("error");
$row = mysql_fetch_array($result);

if($row[0] =="0000-00-00")
{
	$sql1 = "Update Admin set startdate='".date("Y-m-d")."' where userid = $userId";
	$result1 = mysql_query($sql1) or die("error");
}
?>


