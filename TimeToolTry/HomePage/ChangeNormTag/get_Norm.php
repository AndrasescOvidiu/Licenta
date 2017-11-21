<?php 
session_start();
include("conexiune.php");

$IdN=$_POST['nameID'];
$sql="Select UserID from Admin where UserName='$IdN';";
$result=mysql_query($sql)or die ("error");
$row=mysql_fetch_array($result);

$norm="";

$data=date("Y-m-d");


$sql1="Select StartNorma,Hours from Norme where UserID=$row[0] and StartNorma=(select max(StartNorma) from Norme where UserID=$row[0] and StartNorma<='$data')";
$result1=mysql_query($sql1)or die ("error");
$row1=mysql_fetch_assoc($result1);


$sql2="Select StartNorma, Hours from Norme where UserID=$row[0] order by StartNorma desc limit 3 ";
$result2=mysql_query($sql2)or die ("error");
while($row2=mysql_fetch_array($result2))
{
	$norm=$norm."~^".$row2['StartNorma']."$%".$row2['Hours'];
}

echo " ".$row1['StartNorma']." ".$row1['Hours']." ".$norm;

?>
