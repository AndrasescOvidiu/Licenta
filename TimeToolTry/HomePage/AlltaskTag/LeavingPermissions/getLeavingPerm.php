<?php 
session_start();
include("conexiune.php");

$userId = $_SESSION['userID'];

$sql = "select * from LeavingPermissionTry where UserID=$userId";
$result = mysql_query($sql) or die ('err');

$data = "";
$ora = "";

while ($row=mysql_fetch_array($result))
{
	if($row['Activity']==1){
		$data=$data.$row['Date']."~^";
		$ora=$ora.$row['Hour']."~^";
	}
}
echo "$#".$data.'$#'.$ora;

?>
