<?php
session_start();
$userId = $_SESSION['userID'];
include ("conexiune.php");
$dataYesterday=date('Y-m-d',strtotime("-1 days"));
$dataForward=date('Y-m-d',strtotime("+7 days"));

$taskid = "";
$title ="";
$important="";
$hour="";
$data = "";

$sql = "SELECT * from PersonalTodo where userid = $userId and Showed  =1 and data >='".$dataYesterday."' and data <='".$dataForward."'  order by data ASC,hour ASC,important DESC";
$result = mysql_query($sql) or die("error");
while ($row =mysql_fetch_array($result)){
		$taskid.=$row[0]."~^";
		$title.=$row[2]."~^";
		$important.=$row[4]."~^";
		$hour.=$row[5]."~^";
		$data.=$row[6]."~^";
}

echo $taskid."@#".$title."@#".$important."@#".$hour."@#".$data;

?>