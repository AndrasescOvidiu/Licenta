<?php
//$teams = $_POST['teams'];
$users = $_POST['users'];

include("conexiune.php");


$sql1 = "Select * from Admin where UserName = '$users'";
$result1=mysql_query($sql1)or die ("error");
$row1=mysql_fetch_array($result1);

$userid = $row1["UserID"];

$sql3 = "delete from UserTeam where userid=$userid ";
$result3=mysql_query($sql3)or die("error");


echo $result3;



?>