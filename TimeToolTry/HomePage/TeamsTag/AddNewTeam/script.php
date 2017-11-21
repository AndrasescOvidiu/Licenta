<?php 
session_start();


$userId = $_SESSION['userID'];

$realname="";
$lunjimi="";
include("conexiune.php");
		 

$sql="SELECT realname FROM Admin order by realname;";
$result=mysql_query($sql)or die("error");
while($row=mysql_fetch_array($result))
{
	$realname=$realname.$row["realname"]."~^";
}
echo "@#".$lunjimi."@#".$realname;

?>