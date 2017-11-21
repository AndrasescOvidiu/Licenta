<?php 
session_start();


$userId = $_SESSION['userID'];

$username ="";
$realname="";
$teams ="";
include("conexiune.php");
		 
$sql="SELECT username,realname FROM Admin order by realname;";
$result=mysql_query($sql) or die ("error");
while($row=mysql_fetch_array($result))
{
	$username =$username.$row["username"]."~^";
	$realname=$realname.$row["realname"]."~^";
}


$sql2="SELECT teamname FROM Teams;";
$result2=mysql_query($sql2)or die ("error");
while($row2=mysql_fetch_array($result2))
{
	$teams =$teams.$row2["teamname"]."~^";
}
echo $username."@#".$realname."@#".$teams;
?>
