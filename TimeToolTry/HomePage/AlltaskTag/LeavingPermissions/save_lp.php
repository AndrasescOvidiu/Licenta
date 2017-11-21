<?php 
session_start();
include("conexiune.php");

$valori = $_POST["data"];
$valori1 = $_POST["ore"];
$valori2 = $_POST["dc"];
$userId = $_SESSION['userID'];
$sql="insert into LeavingPermissionTry(UserID,Date,Hour,Comment,Activity) values($userId,'$valori',$valori1,'$valori2',1)";
$result=mysql_query($sql) or die('error');



?>