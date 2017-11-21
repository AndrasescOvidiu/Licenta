<?php 
session_start();
include("conexiune.php");

$userId = $_SESSION['userID'];


$sql="select RealName from Admin where UserID=$userId";
$result = mysql_query($sql) or die("err1");
$row = mysql_fetch_array($result);

echo $row[0];
		 

?>
