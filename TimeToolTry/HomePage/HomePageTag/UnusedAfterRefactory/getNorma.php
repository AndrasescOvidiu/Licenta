<?php
session_start();
$userId = $_SESSION['userID'];
include ("conexiune.php");

$data=date("Y-m-d");

$sql = "Select Hours from Norme where UserID= ".$userId." and StartNorma=(select max(StartNorma) from Norme where UserID=$userId and StartNorma<='$data')";
$result=mysql_query($sql) or die("error");
$row=mysql_fetch_array($result);

echo $row[0]."~^".$userId;
?>