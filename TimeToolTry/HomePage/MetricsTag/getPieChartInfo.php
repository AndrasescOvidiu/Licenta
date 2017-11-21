<?php
session_start();
$user = $_POST['userid'];
$month =$_POST['month'];
$year = $_POST['year'];
$days = $_POST['days'];
include ("conexiune.php");
if((int)$month <10)
	$monthH = "0".$month;
else
	$monthH = $month;
$beginingDate = $year."-".$monthH."-01";
$endDate = $year."-".$monthH."-".$days;
$projects = "";
$hours ="";
$sql = "SELECT projectname,sum(hoursspend) from UserTasksOtherActivities where userid = $user and enddate >='$beginingDate' and enddate <='$endDate' group by projectname order by sum(hoursspend)";
$result = mysql_query($sql) or die ("error");
while($row = mysql_fetch_array($result))
{
	$projects.=$row[0]."~^";
	$hours.="".($row[1]/60)."~^";	
}
echo $projects."@#".$hours;
?>