<?php
session_start();
include("conexiune.php");

$collecter = "";
$sql = "Select * from Teams";
$res = mysql_query($sql) or die("error");
while($row = mysql_fetch_array($res))
{
	$collecter.=$row[1]."~^";
}
echo $collecter;
?>