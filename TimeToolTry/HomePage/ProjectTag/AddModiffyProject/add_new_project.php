<?php
include("conexiune.php");

$projectN = $_POST['projN'];
$stats = $_POST['stats'];

$ok=1;
if($stats=='Inactiv')$ok=2;

$sql = "insert into Projects (ProjectName,Status) values('$projectN',$ok);";
$result=mysql_query($sql) or die("error");
	echo "Project assign succesfully";
?>