<?php 
session_start();
include("conexiune.php");

//////////////////////////////////////////////  trebuie introdusa la autentificare sau pe bodyload de la homepage ////////////////////
$userId = $_SESSION['userID'];



$selectStartDate = "Select StartDate from Admin where userid = $userId";
$resultStartDate = mysql_query($selectStartDate) or die ("error");
$rowStartDate = mysql_fetch_array($resultStartDate);
if($rowStartDate[0] == '0000-00-00')
{
	echo "P1"; // no data were inserted, create a new startdate;
	$date = date("Y-m-d");
	$sqlInsertNewStartDate = "Update Admin set StartDate ='$date' where userid=$userId";
	$resultInsertNewStartDate = mysql_query($sqlInsertNewStartDate) or die ("insertnew");
}
else{
	$totalWorkedHours = 0;
	
	$beginingDate = $rowStartDate[0];
	
	$sqlSelectLimits = "Select taskidlow,taskidhigh from UserTasksLimit where userid = $userId";
	$resultSelectLimits= mysql_query($sqlSelectLimits) or die("error");
	$rowSelectLimits = mysql_fetch_array($resultSelectLimits);
	
	$taskidlow = $rowSelectLimits[0];
	$taskidhigh = $rowSelectLimits[1];
	
	$sqlAllProductiveHours = "select sum(hours) from DetailedTasks where taskid >=$taskidlow and taskid<=$taskidhigh";
	$resultAllProductiveHours = mysql_query($sqlAllProductiveHours) or die("error");
	$rowAllProductiveHours = mysql_fetch_array($resultAllProductiveHours);
	
	$totalWorkedHours+=(int)$rowAllProductiveHours[0];
	
	
	
	$sqlAllOthersHours = "Select sum(hoursspend) from UserTasksOtherActivities where taskid >=$taskidlow and taskid <= $taskidhigh";
	$resultAllOthersHours = mysql_query($sqlAllOthersHours) or die("error");
	$rowAllOthersHours = mysql_fetch_array($resultAllOthersHours);
	
	$totalWorkedHours+=((int)$rowAllOthersHours[0]/60);
	
	
	
	//$spliterDate = explode("-",$beginingDate);

	//echo $totalWorkedHours;

	$spliterDate = explode("-",$beginingDate);
	$beginYear = $spliterDate[0];
	$beginMonth = $spliterDate[1];
	$beginDay = $spliterDate[2];
	
	$todayYear = (int)date("Y");
	$todayMonth = (int)date("m");
	$todayDay = 21;
	
	$lessMonth ="";
	if($todayMonth<=10)
		$lessMonth = "0".($todayMonth-1);
	else
		$lessMonth = $todayMonth;
	
	$plusMonth = "";
	if($beginMonth<=9)
		$plusMonth = "0".((int)$beginMonth+1);
	else
		$plusMonth = $beginMonth;
	
	$dateCreatedOneYearLess = ($todayYear-1)."-".$todayMonth."-".$todayDay;
	$dateCreatedOneMonthLess = $todayYear."-".$lessMonth."-".$todayDay;
	
	$dateCreatedOneMonthPlusBegining = $todayYear."-".$plusMonth."-01";
	
	//echo $dateCreatedOneMonthLess."    ";
	
	
	if($beginingDate<=$dateCreatedOneYearLess) // a trecut un an
	{
		echo "sarmale";
	}
	else{ // less than an year
		$daysFirstMonth = number_of_working_days($beginingDate,$dateCreatedOneMonthPlusBegining)-1;
		
		$totalHoursRequested =0;
		
		$sqlNorme = "select hours from Norme where startnorma = (select max(startnorma) from Norme where startnorma <='$beginingDate' and userid = $userId) and userid= $userId";
		$resultNorme = mysql_query($sqlNorme) or die("error");
		$rowNorme = mysql_fetch_array($resultNorme);
		if($rowNorme[0]=="")
		{
			echo "P1"; // no data were inserted, create a new startdate;
			$date = date("Y-m-d");
			$sqlInsertNewStartDate = "Update Admin set StartDate ='$date' where userid=$userId";
			$resultInsertNewStartDate = mysql_query($sqlInsertNewStartDate) or die ("insertnew");
		}
		else{
			$totalHoursRequested+=(int)$rowNorme[0]*$daysFirstMonth; // nr de 8re*nr zile in prima luna
			
			$dateIterator = $dateCreatedOneMonthPlusBegining;
			
			$sqlNationalHolidays="SELECT count(name) FROM NationalHolidays where date >='$beginingDate' and date <='$dateIterator'";
			$resultNationalHolidays = mysql_query($sqlNationalHolidays)or die("error");
			$rowNationalHolidays = mysql_fetch_array($resultNationalHolidays);
			if($rowNationalHolidays!="")
				$totalHoursRequested-=(int)$rowNorme[0]*(int)$rowNationalHolidays[0]; // scadere din cele requested atunci cand sunt sarbatori 
			
			
			while($dateIterator<$dateCreatedOneMonthLess)
			{
				$time = strtotime($dateIterator);
				
				$tableSpliter = explode("-",$dateIterator);
				
				if($dateIterator<$dateCreatedOneMonthLess)
				{
					
					$sqlNorme = "select hours from Norme where startnorma = (select max(startnorma) from Norme where startnorma <='$dateIterator' and userid = $userId) and userid= $userId";
					$resultNorme = mysql_query($sqlNorme) or die("error");
					$rowNorme = mysql_fetch_array($resultNorme);
					
					$totalHoursRequested+=$rowNorme[0]*(countDays((int)$tableSpliter[0],(int)$tableSpliter[1],array(0,6))); // adaugare la requested norma pe luna respectiva*nr de zile (22,23,20,21?)
					
					$prev = $dateIterator;
					$dateIterator = date("Y-m-d", strtotime("+1 month", $time));
					
				//	echo $prev." ".$dateIterator."\n";
					
					$sqlNationalHolidays="SELECT count(name) FROM NationalHolidays where date >='$prev' and date <='$dateIterator'";
					$resultNationalHolidays = mysql_query($sqlNationalHolidays)or die("error");
					$rowNationalHolidays = mysql_fetch_array($resultNationalHolidays);
					if($rowNationalHolidays[0]!="")	
					{	
						$totalHoursRequested-=(int)$rowNorme[0]*(int)$rowNationalHolidays[0];  // scadere zile nationale 
					}
				}
				else
					break;
			}
			
			$daysLastMonth = number_of_working_days($dateIterator,date("Y-m-d"))-1;	
			
			$sqlNorme = "select hours from Norme where startnorma = (select max(startnorma) from Norme where startnorma <='$dateIterator' and userid = $userId) and userid= $userId";
			$resultNorme = mysql_query($sqlNorme) or die("error");
			$rowNorme = mysql_fetch_array($resultNorme);
			
			$totalHoursRequested+=(int)$rowNorme[0]*$daysLastMonth; // adunare zile ultima luna
			
			$sqlNationalHolidays="SELECT count(name) FROM NationalHolidays where date >='$dateIterator' and date <='".date('Y-m-d')."'";
			$resultNationalHolidays = mysql_query($sqlNationalHolidays)or die("error");
			$rowNationalHolidays = mysql_fetch_array($resultNationalHolidays);
			if($rowNationalHolidays[0]!="")	
			{
				$totalHoursRequested-=(int)$rowNorme[0]*(int)$rowNationalHolidays[0];
			}
			
			echo (int)($totalWorkedHours-$totalHoursRequested);
		}
	}
	
}
function countDays($year, $month, $ignore) {
    $count = 0;
    $counter = mktime(0, 0, 0, $month, 1, $year);
    while (date("n", $counter) == $month) {
        if (in_array(date("w", $counter), $ignore) == false) {
            $count++;
        }
        $counter = strtotime("+1 day", $counter);
    }
    return $count;
}
function number_of_working_days($startDate, $endDate)
{
    $workingDays = 0;
    $startTimestamp = strtotime($startDate);
    $endTimestamp = strtotime($endDate);
    for ($i = $startTimestamp; $i <= $endTimestamp; $i = $i + (60 * 60 * 24)) {
        if (date("N", $i) <= 5) $workingDays = $workingDays + 1;
    }
    return $workingDays;
}



/*
$week = date('W');
$year = date('Y');
$overtime = 0;


$sql1= "SELECT MIN(StartNorma) FROM Norme WHERE UserID=$userId";
$result1=mysql_query($sql1) or die('err1');
$row1 = mysql_fetch_array($result1);

//echo $row1[0];

$weekn = "SELECT week, year FROM LocalDates WHERE date_value = '".$row1[0]."' ";
$res_w = mysql_query($weekn) or die('err2');
$row2 = mysql_fetch_array($res_w);

//echo $row2[0];
if($row2[1]==$year)
{// daca useru incepe din mijlocu anului atunci ia orvertimul din acea luna
	for($i=$row2[0];$i<=$week;$i++)
	{
		$sql = "SELECT (Monday + Tuesday + Wednesday + Thursday + Friday + Saturday + Sunday) as Sum FROM  (select @week1:=$i w, @user1:=$userId, @year1:=$year) parm, vwWorkedHoursAndOvertime LIMIT 2,1";
		$result = mysql_query($sql) or die('err');
		$row = mysql_fetch_array($result);
		//echo $row[0];
		$overtime=$overtime+intval($row[0]);
	}
}
else if($row2[1]<$year)  
{//face parcurgerea overtimului de la inceputul anului
	for($i=1;$i<=$week;$i++)
	{
		$sql = "SELECT (Monday + Tuesday + Wednesday + Thursday + Friday + Saturday + Sunday) as Sum FROM  (select @week1:=$i w, @user1:=$userId, @year1:=$year) parm, vwWorkedHoursAndOvertime LIMIT 2,1";
		$result = mysql_query($sql) or die('err');
		$row = mysql_fetch_array($result);
		//echo $row[0];
		$overtime=$overtime+intval($row[0]);
	}
}
$sql5 = "select * from LeavinPermOvertime where UserID=$userId";
$result5 = mysql_query($sql5) or die('err5');
$row5 = mysql_fetch_array($result5);

if($row5==null)
{
	$sql6 = "insert into LeavinPermOvertime(UserID,Year,SumOvertimeWeek) values($userId, $year, $overtime)";
	$result6 = mysql_query($sql6) or die('err6');
}
else 
	if($row5['SumOvertimeWeek']!=$overtime)
	{
		$sql7 = "update LeavinPermOvertime set SumOvertimeWeek = $overtime where UserID=$userId";
		$result7 = mysql_query($sql7) or die('err7');
	}
$sql8 = "select * from LeavinPermOvertime where UserID=$userId";
$result8 = mysql_query($sql8) or die('err8');
$row8 = mysql_fetch_array($result8);
echo $row8['SumOvertimeWeek']; 
*/
?>
