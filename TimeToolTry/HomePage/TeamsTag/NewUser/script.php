<?php 

session_start();

$valori = $_POST["num"];
$userId = $_SESSION['userID'];

$teams="";
$lunjimi="";
include("conexiune.php");
		 


$sql2="SELECT * FROM Teams;";
$result2=mysql_query($sql2)or die("error");
while($row2=mysql_fetch_array($result2))
{
	$teams = $teams.$row2["TeamName"]."~^";
	$lunjimi=$lunjimi.strlen($row2["TeamName"])."~^";
}
echo "@#".$lunjimi."@#".$teams;


?>