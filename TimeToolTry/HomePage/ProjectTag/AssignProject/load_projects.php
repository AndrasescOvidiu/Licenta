<?php
include("conexiune.php");

$UserN = $_POST['users'];

$sql = "select UserID from Admin where UserName='$UserN'";
$result = mysql_query($sql) or die ("error");
$row = mysql_fetch_array($result);

$sql1 = "select AssignedProjectID from UserProjects where UserID = $row[0]";
$result1 = mysql_query($sql1) or die ("error");

$projects="";

while($row1 = mysql_fetch_array($result1))
{
	$sql2 = "select ProjectName from Projects where ProjectID=$row1[0]";
	$result2 = mysql_query($sql2) or die ("error");
	$row2 = mysql_fetch_array($result2);
	
	$projects = $projects."#$".$row2[0];
}
echo $projects;



?>