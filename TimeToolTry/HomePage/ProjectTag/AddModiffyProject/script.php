<?php 
session_start();
include("conexiune.php");


$sql = "Select ProjectName,Status from Projects order by ProjectName DESC;";
$result=mysql_query($sql)or die ("error");
$projN="";
$stats="";

while($row=mysql_fetch_array($result))
{
	$projN=$projN.$row['ProjectName']."~^";
	
	
	if($row['Status']==1)
		$stats=$stats.'Activ'."~^";
	else if($row['Status']==2)
		$stats=$stats.'Inactiv'."~^";
}
echo $projN.'@#'.$stats;
?>
