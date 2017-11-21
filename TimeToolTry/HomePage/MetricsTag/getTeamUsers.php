<?php
session_start();
$userId = $_SESSION['userID'];
$teamName = $_POST['tn'];
$daysInMonth= $_POST['nrd'];
$year = $_POST['year'];
$mnt= $_POST['month'];
$month ="";
if($mnt<10)
	$month = "0".$mnt;
else
	$month = "".$mnt;
include("conexiune.php");

$dataMaker = $year."-".$month."-".$daysInMonth;
$sql = "Select TaskIdLow,	TaskIdHigh from UserTasksLimit where userid = $userId";
$result=mysql_query($sql) or die("error");
$row = mysql_fetch_array($result);
$limitlow =$row[0];
$limithigh = $row[1];

$sql = "Select TeamID from Teams where TeamName = '$teamName'";
$res = mysql_query($sql) or die("error");
$row = mysql_fetch_array($res);

$userids = "";
$norme = "";


$usersNames = "";
$uids ="";
$totalDoneHours = "";
$totalRequestedHours = "";
$totalResultHours = "";
$totalDeliverySplippage="";
$totalEffortDeviation ="";
$totalReworkPercentage = "";
$totalReviewPercentage ="";
$totalOpenTasks = "";
$totalIwTasks ="";
$totalPpTasks ="";
$totalRwTasks = "";
$totalClosedTasks ="";



$sql2 = "Select userid from UserTeam where teamId = $row[0]";
$res2 = mysql_query($sql2) or die("error");
while($row2 = mysql_fetch_array($res2))
{
	$sql3 = "select RealName,username from Admin where userID = $row2[0]";
	$res3 = mysql_query($sql3) or die("error");
	$row3= mysql_fetch_array($res3);
	$usersNames .=$row3[0]."~^";
	$uids.= $row3[1]."~^";
	

	// selectare userid pt fiecare 
	$sqlUserId = "Select userid from Admin where realname = '$row3[0]'";
	$resultUserId = mysql_query($sqlUserId) or die("error");
	$rowUserId= mysql_fetch_array($resultUserId);
	
	$userids.=$rowUserId[0]."~^";
	
	$userId = $rowUserId[0];
	//selectare norma pt fiecare
	$sqlNorma ="select hours from Norme where startnorma = (select max(startnorma) from Norme where startnorma <='$dataMaker' and userid = $userId) and userid= $userId";
	$resultNorma = mysql_query($sqlNorma) or die("error");
	$rowNorma= mysql_fetch_array($resultNorma);
	
	$norme.= $rowNorma[0]."~^";
	// selectare taskidlow si high
	
	$sqlTask = "Select taskidlow,taskidhigh from UserTasksLimit where userid = $rowUserId[0]";
	$resultTask = mysql_query($sqlTask) or die("error");
	$rowTask= mysql_fetch_array($resultTask);
	
	$taskidlow = $rowTask[0];
	$taskidhigh = $rowTask[1];
	
	$requestedHours = 0;
	$doneHours = 0;

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

	
		// sa sara peste weekenduri
		$timestamp = strtotime($data);
		$weekday= date("l", $timestamp );
		$normalized_weekday = strtolower($weekday);
		if ($normalized_weekday != "saturday" && $normalized_weekday != "sunday") {
			$sqlNational = "Select Date from NationalHolidays where Date = '".$data."'";
			$resultNational=mysql_query($sqlNational) or die("error");
			$rowNational = mysql_fetch_array($resultNational);	
			if(!$rowNational[0])
			{
				$sqlSum="select sum(Hours) from DetailedTasks where TaskID >=$taskidlow and TaskID <=$taskidhigh and Date = '".$data."'";
				$resultSum=mysql_query($sqlSum) or die("error");
				$rowSum = mysql_fetch_array($resultSum);	
				$doneHours+=$rowSum[0];
				$requestedHours+=$rowNorma[0];
				
			}
		}
	}
	
	$totalDoneHours.=$doneHours."~^";
	$totalRequestedHours.=$requestedHours."~^";
	$totalResultHours.=floor($doneHours*100/$requestedHours)."~^";
//echo "    ".$doneHours." | ".$requestedHours."  ";
	$doneHours= 0;
	$requestedHours = 0;
	
	
	// selectare taskuri closed pe luna astaaaa
	
	$deliverySlippage = 0;
	
	$sqlClosed = "Select actualenddate,enddaterequiredbyproject from UserTasks where actualenddate >= '$year-$month-01' and actualenddate <= '$year-$month-$daysInMonth' and status = 5 and taskid >= $taskidlow and taskid <$taskidhigh";
	$resultclosed = mysql_query($sqlClosed)or die ("error");
	while($rowClosed = mysql_fetch_array($resultclosed))
	{
		$start = strtotime($rowClosed[1]);
		$end = strtotime($rowClosed[0]);

		$days_between = ceil(($end - $start) / 86400);
		$deliverySlippage+=	$days_between;
	//	echo $userId." ".$days_between." ";
	}
	$totalDeliverySplippage.="".$deliverySlippage."~^";
	


	//selectare din DetailedTasks taskurile care sunt cuprimse intre date
	$effortDeviation = 0;
	
	$sqlDetailedExtract = "Select taskid,sum(hours) from DetailedTasks where taskid >=$taskidlow && taskid <=$taskidhigh and date >='$year-$month-01' && date <= '$year-$month-$daysInMonth' group by taskid";
	$resultDetailedExtract = mysql_query($sqlDetailedExtract) or die ("error");
	while($rowDetailedExtract = mysql_fetch_array($resultDetailedExtract))
	{
		$sqlUserTasks = "Select estimatedHours from UserTasks where taskid = $rowDetailedExtract[0] and status = 5 group by taskid";
		$resultUserTasks = mysql_query($sqlUserTasks) or die ("error");;
		$rowUserTasks = mysql_fetch_array($resultUserTasks);
		if($rowUserTasks)
		{
			$var =(($rowDetailedExtract[1]-$rowUserTasks[0])/$rowUserTasks[0])*100;
			$effortDeviation+=$var;
			//echo " ( ".$rowDetailedExtract[1]." | ".$rowUserTasks[0]." | ".$rowUserTasks[0]." ) "."\n";
		}
	}
	$totalEffortDeviation.="".$effortDeviation."~^";
	// calculare taskuri REWORK (rework closed/closed 
	$reworkPercentage = 0;
	$rwClosed= 0;
	$rwOthers = 0;
	$sqlRework = "Select taskid from DetailedTasks where taskid >=$taskidlow && taskid <=$taskidhigh and date >='$year-$month-01' && date <= '$year-$month-$daysInMonth' group by taskid";
	$resultRework = mysql_query($sqlRework) or die ("error");
	while($rowRework = mysql_fetch_array($resultRework))
	{
		$sqlReworkTrue="Select taskid from UserTasks where taskid =$rowRework[0] and status = 5 and IsReworkFor!=0";
		$resultReworkTrue = mysql_query($sqlReworkTrue) or die ("error");
		$rowReworkTrue = mysql_fetch_array($resultReworkTrue);
		if($rowReworkTrue)
		{
			$rwClosed++;
		}
		$sqlReworkTrue="Select taskid from UserTasks where taskid =$rowRework[0] and IsReworkFor=0";
		$resultReworkTrue = mysql_query($sqlReworkTrue) or die ("error");
		$rowReworkTrue = mysql_fetch_array($resultReworkTrue);
		if($rowReworkTrue)
		{
			$rwOthers++;
		}
	}
	$reworkPercentage=(($rwClosed/$rwOthers)*100);
	
	$totalReworkPercentage.="".$reworkPercentage."~^";
	//echo $reworkPercentage." ";
	// review perc
	$reviewPercentage = 0;
	$reviewReview = 0;
	$reviewOther = 0;
	$sqlReview = "Select taskid from DetailedTasks where taskid >=$taskidlow && taskid <=$taskidhigh and date >='$year-$month-01' && date <= '$year-$month-$daysInMonth' group by taskid";
	$resultReview = mysql_query($sqlReview) or die ("error");
	while($rowReview = mysql_fetch_array($resultReview))
	{
		$sqlReviewTrue="Select taskid from UserTasks where taskid =$rowReview[0] and status = 5 and reviewable = 1";
		$resultReviewTrue = mysql_query($sqlReviewTrue) or die ("error");
		$rowReviewTrue = mysql_fetch_array($resultReviewTrue);
		if($rowReviewTrue)
		{
			$reviewReview++;
		}
		
		$sqlReviewTrue="Select taskid from UserTasks where taskid =$rowReview[0] and status = 5 and reviewable = 0";
		$resultReviewTrue = mysql_query($sqlReviewTrue) or die ("error");
		$rowReviewTrue = mysql_fetch_array($resultReviewTrue);
		if($rowReviewTrue)
		{
			$reviewOther++;
		}
	}
	$reviewPercentage = ($reviewReview/$reviewOther)*100;
	$totalReviewPercentage.="".$reviewPercentage."~^";
	//echo "---->".$reviewReview." cu ".$reviewOther."<---";
	//echo "  ->".$reviewPercentage."% ";
	//nr taskuri 
		
	$openTasks = 0;
	$iwTasks = 0;
	$ppTasks = 0;
	$rwTasks = 0;
	$closedTasks = 0;
	
	
	
	$sqlTasks = "Select taskid from DetailedTasks where taskid >=$taskidlow && taskid <=$taskidhigh and date >='$year-$month-01' && date <= '$year-$month-$daysInMonth' group by taskid";
	$resultTasks = mysql_query($sqlDetailedExtract) or die ("error");
	while($rowTasks = mysql_fetch_array($resultTasks))
	{
		$sqlOpenTasks="Select taskid from UserTasks where taskid =$rowTasks[0] and status = 1";
		$resultOpenTasks = mysql_query($sqlOpenTasks) or die ("error");
		$rowOpenTasks = mysql_fetch_array($resultOpenTasks);
		if($rowOpenTasks)
		{
			$openTasks +=1;
		}
		
		$sqlIWTasks="Select taskid from UserTasks where taskid =$rowTasks[0] and status = 2";
		$resultIWTasks = mysql_query($sqlIWTasks) or die ("error");
		$rowIWTasks = mysql_fetch_array($resultIWTasks);
		if($rowIWTasks)
		{
			$iwTasks +=1;
		}
		
		$sqlPPTasks="Select taskid from UserTasks where taskid =$rowTasks[0] and status = 3";
		$resultPPTasks = mysql_query($sqlPPTasks) or die ("error");
		$rowPPTasks = mysql_fetch_array($resultPPTasks);
		if($rowPPTasks)
		{
			$ppTasks +=1;
		}
		
		$sqlRWTasks="Select taskid from UserTasks where taskid =$rowTasks[0] and status = 4";
		$resultRWTasks = mysql_query($sqlRWTasks) or die ("error");
		$rowRWTasks = mysql_fetch_array($resultRWTasks);
		if($rowRWTasks)
		{
			$rwTasks +=1;
		}
		$sqlClosedTasks="Select taskid from UserTasks where taskid =$rowTasks[0] and status = 5";
		$resultClosedTasks = mysql_query($sqlClosedTasks) or die ("error");
		$rowClosedTasks = mysql_fetch_array($resultClosedTasks);
		if($rowClosedTasks)
		{
			$closedTasks +=1;
		}
	}
	$totalOpenTasks.="".$openTasks."~^";
	$totalIwTasks.="".$iwTasks."~^";
	$totalPpTasks.="".$ppTasks."~^";
	$totalRwTasks.="".$rwTasks."~^";
	$totalClosedTasks.="".$closedTasks."~^";
	//echo $rowUserId[0]." ".$openTasks." ".$iwTasks." ".$ppTasks." ".$rwTasks." ".$closedTasks." \n";
	//$sqlEffort = "Select taskid,estimatedHours from UserTasks where userid = $rowUserId[0]"
}
echo $usersNames."@#".$totalResultHours."@#".$norme."@#".$totalDeliverySplippage."@#".$totalEffortDeviation."@#".$totalReworkPercentage."@#".$totalReviewPercentage."@#".$totalOpenTasks."@#".$totalIwTasks."@#".$totalPpTasks."@#".$totalRwTasks."@#".$totalClosedTasks."@#".$uids."@#".$userids."@#".$totalDoneHours."@#".$totalRequestedHours;                                     

/*
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
*/
?>