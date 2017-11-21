<?php 
session_start();
include("conexiune.php");
$userId = $_SESSION['userID'];

$reqNumber = $_POST['ReqN'];
$priority = $_POST['Prior'];
$typeReq = $_POST['TypeR'];
$subject = $_POST['SubjT'];
$description = $_POST['Descr'];

$dateCreation = $_POST['DateCreat'];
$version = $_POST['Vers'];
$commentBox = $_POST['CommBox'];

$priorNum = 1;
$typeNum = 0;

if($priority =='Medium')$priorNum = 2;
else if($priority == 'High')$priorNum = 3;

if($typeReq=='Change')$typeNum = 1;
else if($typeReq=='Problem')$typeNum = 2;


$sql = "Insert into OnlineFeedback (Priority, TypeOfRequest, ShortDescription, Description, UserID, DateofCreation, TimeToolVersion, Comment) values($priorNum, $typeNum, '$subject', '$description', $userId, '$dateCreation', $version, '$commentBox')";
$result = mysql_query($sql) or die("error");
$row = mysql_fetch_array($result);

echo "Succesfully saved the feedback"
?>
