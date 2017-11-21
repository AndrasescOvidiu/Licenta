<?php
session_start();
include("conexiune.php");
$userId = $_SESSION['userID'];



$sql = "SELECT vwWorkingWeeks.* FROM vwWorkingWeeks";
$result = mysqli_query($sql) or die('err');

/*
$row = mysql_fetch_array($result);*/
echo var_dump($result);



?>