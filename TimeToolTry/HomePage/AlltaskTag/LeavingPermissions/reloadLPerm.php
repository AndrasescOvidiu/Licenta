<?php 
session_start();
include("conexiune.php");

$month = date('n');

$userId = $_SESSION['userID'];

$sql = "select * from LeavingPermissionTry where UserID=$userId";
$result = mysql_query($sql) or die ('err');
while($row=mysql_fetch_array($result))
{
	//muta toate Lpermision pe activity 0 dupa o luna
	$x=explode('-',$row['Date']);
	if(intval($x[1])!=$month)
	{
	
	$sql1="update LeavingPermissionTry set Activity=0 where userID=$userId and Date='$row[Date]'";
	$result1=mysql_query($sql1) or die ('err1');
	
	}
}

/*
while ($row=mysql_fetch_array($result))
{
	if($row['Activity']==1){
		$data=$data.$row['Date']."~^";
		$ora=$ora.$row['Hour']."~^";
	}
}
echo "$#".$data.'$#'.$ora;*/

?>
