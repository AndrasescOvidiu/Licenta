<?php
session_start();
$userId = $_SESSION['userID'];
include ("conexiune.php");


$sql = "Select Hours from Norme where userid = ".$userId." and startnorma = (select max(startnorma) from Norme where userid = $userId);";
$result=mysql_query($sql);
$row=mysql_fetch_array($result);

echo $row[0];
?>