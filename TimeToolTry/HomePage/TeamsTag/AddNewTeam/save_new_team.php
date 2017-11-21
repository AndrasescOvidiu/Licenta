<?php
include("conexiune.php");

$realname = $_POST['rlname'];
$tName = $_POST['TName'];

$sql="select UserID from Admin where RealName='$realname'";
$result=mysql_query($sql)or die ("error");
$row=mysql_fetch_array($result);

$sql1="select TeamName from Teams where TeamName='$tName'";
$result1=mysql_query($sql1)or die ("error");
$row1=mysql_fetch_array($result1);

if($row1==null)
{
	$sql2 = "insert into Teams (TeamName,TeamLeaderUserID) values('$tName',$row[0]);";
	$result2=mysql_query($sql2) or die("error");
	echo "success";
}
else
	echo "already";
?>