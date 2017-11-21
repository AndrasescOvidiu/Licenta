<?php
session_start();

$userId = $_SESSION['userID'];
$teamId = $_POST["tmbr"];

$username ="";
$realname="";
$teamsmebID="";
include("conexiune.php");

$sql ="Select teamid from Teams where teamname ='$teamId';";
$result=mysql_query($sql) or die ("error");
$row = mysql_fetch_array($result);



$sql2 = "Select * from UserTeam where teamid = $row[0]";
$result2=mysql_query($sql2)or die ("error");

while($row2=mysql_fetch_array($result2))
{
	$teamsmebID=$row2["UserID"];
	$sql3="Select * from Admin where userid=$teamsmebID";
	$result3=mysql_query($sql3);
	$row3 = mysql_fetch_array($result3);
	$username=$username.$row3['UserName']."~^";
	$realname=$realname.$row3['RealName']."~^";
}

/*
for($i=0;$i<count($row2);$i++)
{
	echo $row2[$i]." ";
}*/

echo $username."@#".$realname;

?>


