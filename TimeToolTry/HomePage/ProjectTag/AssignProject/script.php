<?php 
session_start();


$userId = $_SESSION['userID'];

$username ="";
$realname="";
$project ="";
include("conexiune.php");
		 
$sql="SELECT username,realname FROM Admin order by realname;";
$result=mysql_query($sql)or die("error");
while($row=mysql_fetch_array($result))
{
	$username =$username.$row["username"]."~^";
	$realname=$realname.$row["realname"]."~^";
}


$sql2="SELECT ProjectName FROM Projects;";
$result2=mysql_query($sql2)or die("error");
while($row2=mysql_fetch_array($result2))
{
	$project =$project.$row2["ProjectName"]."~^";
}
echo $username."@#".$realname."@#".$project;
?>
