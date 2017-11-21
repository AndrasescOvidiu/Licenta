<?php 
session_start();
include("conexiune.php");

$userId = $_SESSION['userID'];


$sql="select * from VacationSickLeave where UserID=$userId";
$result = mysql_query($sql) or die("err1");

while($row = mysql_fetch_array($result))
{
	$startD=$startD.$row['StartDate']."%^";
	$endD=$endD.$row['EndDate']."%^";
	$typeV=$typeV.$row['TypeofRequest']."%^";
}
	
	
echo $startD."@# ".$endD."@#".$typeV;
		 

?>
