<?php 
session_start();
include("conexiune.php");

$userId = $_SESSION['userID'];

$Getyear = $_POST["yearSend"];
$GetvacType = $_POST["vacType"];
$GetSdate = $_POST["Sd"];
$GetEdate = $_POST["Ed"];
$GetOinfo = $_POST["Oinf"];

$sql0 = "select max(EndDate) from VacationSickLeave where userID=$userId";
$result0 = mysql_query($sql0) or die("err0");
$row0 = mysql_fetch_array($result0);

$data = date('Y-m-d');





if($GetEdate<=$row0[0] || $GetSdate<=$row0[0])echo "You already have vacation";
else {

$x=4;
if($GetvacType=='Sick vacation' && $GetSdate==$data){


	$sql1="update UserTasks set Status=3 where Status=2 and UserID=$userId";
	$result1=mysql_query($sql1) or die("err2");

}
if($GetvacType=='Sick vacation')$x=2;

$sql="insert into VacationSickLeave(TypeofRequest,UserID,StartDate,EndDate,Comment) values ($x, $userId, '$GetSdate', '$GetEdate', '$GetOinfo')";
$result=mysql_query($sql) or die("err1");
$row=mysql_fetch_array($result);
echo "Vacation succesfully saved";
}/*
function date_range($first, $last, $step = '+1 day', $output_format = 'd/m/Y' ) {

    $dates = array();
    $current = strtotime($first);
    $last = strtotime($last);

    while( $current <= $last ) {

        $dates[] = date($output_format, $current);
        $current = strtotime($step, $current);
    }

    return $dates;
}
$sql="select max(TaskID)+1 from UserTasks where UserID=$userId";
$result=mysql_query($sql) or die("err");
$row=mysql_fetch_array($result);
echo $row[0];// trebuie preluat tasku maxim si adaugat in detail task toate zilele de concediu 

/*

$k=date_range($GetSdate, $GetEdate, "+1 day", "Y/m/d");
for($i=0;$i<sizeof($k);$i++)
{
	$sql="insert into DetailedTasks()"
}
*/
?>
