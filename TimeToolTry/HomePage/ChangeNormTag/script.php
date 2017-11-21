<?php 
session_start();


$userId = $_SESSION['userID'];

$username ="";
$realname="";

include("conexiune.php");
		 
$sql="SELECT username,realname FROM Admin order by realname;";
$result=mysql_query($sql) or die("error");
while($row=mysql_fetch_array($result))
{
	$username =$username.$row["username"]."~^";
	$realname=$realname.$row["realname"]."~^";
}



echo "@#".$username."@#".$realname;
?>
