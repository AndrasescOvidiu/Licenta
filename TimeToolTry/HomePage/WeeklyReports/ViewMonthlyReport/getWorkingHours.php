<?php
session_start();
$userId = $_SESSION['userID'];
$limitlow = $_POST['ll'];
$limithigh = $_POST['lh'];
$daysInMonth = $_POST['days'];
$month = $_POST['month'];
if($month<10)
	$nm="0".$month;
else $nm = $month;
$month = $nm;
$year = $_POST['year'];

include("conexiune.php");
for($i=1;$i<=$daysInMonth;$i++)
{
	if($i<10)
	{
		$day = "0".$i;
	}
	else{
		$day = $i;
	}
	$data = $year."-".$month."-".$day;
	//echo $data."~^";
	
	$sql2 = "Select Date from NationalHolidays where Date = '".$data."'";
	$result2=mysql_query($sql2) or die("error");
	$row2 = mysql_fetch_array($result2);	
	if(!$row2[0])
	{
		$sql="select sum(Hours) from DetailedTasks where TaskID >=$limitlow and TaskID <=$limithigh and Date = '".$data."'";
		$result=mysql_query($sql) or die("error");
		$row = mysql_fetch_array($result);	
		if(!$row[0])
			echo "0~^";
		else
			echo $row[0]."~^";
	}
	else
	{
		echo "-1~^";
	}
	
	
}

?>