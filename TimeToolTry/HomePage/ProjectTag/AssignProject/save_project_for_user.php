<?php
include("conexiune.php");

$project = $_POST['proj'];
$users = $_POST['users'];


$sql1 = "Select UserID from Admin where UserName = '$users'";
$result1=mysql_query($sql1)or die ("error");
$row1=mysql_fetch_array($result1);


$sql2 = "Select ProjectID from Projects where ProjectName = '$project'";
$result2=mysql_query($sql2)or die ("error");
$row2=mysql_fetch_array($result2);

$sql3 = "Select * from UserProjects where UserID=$row1[0] and AssignedProjectID=$row2[0]";
$result3=mysql_query($sql3)or die("error");
$row3 = mysql_fetch_array($result3);



if(!$row3[0])
{
	$sql4 = "insert into UserProjects (UserID,AssignedProjectID) values($row1[0],$row2[0]);";
	$result4=mysql_query($sql4) or die("error");
	echo "success";
}
else
	echo "already";

?>