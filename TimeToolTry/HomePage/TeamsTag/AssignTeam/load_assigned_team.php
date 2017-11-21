<?php 
session_start();
include("conexiune.php");

$username =$_POST['users'];

$sql = "select UserID from Admin where UserName ='$username'";
$result = mysql_query($sql) or die("error");
$row = mysql_fetch_array($result);

$sql1 = "select TeamID from UserTeam where UserID = $row[0]";
$result1 = mysql_query($sql1) or die("error");
$row1 = mysql_fetch_array($result1);

if($row1[0]==null)
	echo "---------------------------";
else{

$sql2 = "select TeamName from Teams where TeamID= $row1[0]";
$result2 = mysql_query($sql2) or die("error");
$row2 = mysql_fetch_array($result2);

echo $row2[0];
}
?>
