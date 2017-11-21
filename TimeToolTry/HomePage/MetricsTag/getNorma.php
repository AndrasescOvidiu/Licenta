<?php
session_start();

include ("conexiune.php");


$sql = "";
$result=mysql_query($sql);
$row=mysql_fetch_array($result);

echo $row[0];
?>