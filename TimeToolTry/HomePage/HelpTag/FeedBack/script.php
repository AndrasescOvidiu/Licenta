<?php 
session_start();
include("conexiune.php");
$userId = $_SESSION['userID'];

$sql = "select max(ChReqNb)+1 from OnlineFeedback";
$result=mysql_query($sql) or die('error');
$row=mysql_fetch_array($result);

$sql1 = "select UserName from Admin where UserID=$userId";
$result1=mysql_query($sql1) or die('error');
$row1=mysql_fetch_array($result1);

echo $row[0]."$%".$row1[0];
?>
