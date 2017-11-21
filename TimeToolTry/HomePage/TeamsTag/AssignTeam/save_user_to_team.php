<?php
$teams = $_POST['teams'];
$users = $_POST['users'];

include("conexiune.php");


$sql1 = "Select * from Admin where UserName = '$users'";
$sql2 = "Select * from Teams where TeamName = '$teams'";

$result1=mysql_query($sql1)or die ("error");
$result2=mysql_query($sql2)or die ("error");



$row1=mysql_fetch_array($result1);
$row2=mysql_fetch_array($result2);


//$result2 = mysql_query($sql2)or die ("error");
$userid = $row1[0];
$teamid = $row2[0];


$sql3 = "Select * from UserTeam where userid='$userid'";

$result3=mysql_query($sql3)or die("error");
$row3 = mysql_fetch_array($result3);
//echo $row3[0]." ".$row3[1];

if(!$row3[0])
{
	$sql4 = "insert into UserTeam (userid,teamid) values($userid,$teamid);";
	$result4=mysql_query($sql4) or die("error");
	echo "success";
}
else
{
	$sql4 = "Update UserTeam set teamid=$teamid where userid = $userid;";
	$result4=mysql_query($sql4) or die("error");
	echo "already";
}



?>