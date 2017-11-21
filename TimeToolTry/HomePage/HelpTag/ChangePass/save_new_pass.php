<?php
session_start();
include("conexiune.php");
$userId = $_SESSION['userID'];

$oldPass=$_POST['OldPass'];
$newPass=$_POST['NewPass'];
$confirmPass=$_POST['ConfirmPass'];

$sql = "select Pass from Admin where UserID=$userId";
$result=mysql_query($sql) or die('error');
$row=mysql_fetch_array($result);
//echo $userId;

if($oldPass==$newPass && $newPass==null)echo "Fill the blank space";
else if($oldPass==$newPass)echo "samepassword";
else
if(md5($oldPass)==$row[0]){
if(strlen($newPass) < 5)echo "toshort";
else
	if($newPass==$confirmPass)
	{	
			$newP = md5($newPass);

			$sql1="Update Admin set Pass='$newP' where UserID=$userId";
			$result1=mysql_query($sql1)or die ("error");
			$row1=mysql_fetch_array($result1);
			echo "success";
	}
	else echo "nomatch";
}
else echo "wrongpassword";
?>