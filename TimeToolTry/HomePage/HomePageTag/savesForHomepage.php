<?php
session_start();
$nr = $_POST['nr'];
if($nr == 0)  // save_db
{
	$userId = $_SESSION['userID'];

	$taskId = explode("~^",$_POST['tID']);
	$prevDate = explode("~^",$_POST['prD']);
	$currDate = explode("~^",$_POST['crD']);
	$prevHour = explode("~^",$_POST['prH']);
	$currHour = explode("~^",$_POST['crH']);
	$estimtime = explode("~^",$_POST['eT']);
	$reestimtime = explode("~^",$_POST['reT']);
	$reestReason = explode("~^",$_POST['reReason']);
	$reviewMaker = explode("~^",$_POST['revM']);
	$status = explode("~^",$_POST['sts']);
	$enddate = explode("~^",$_POST['eD']);


	$currentstatus = 0;
	include("conexiune.php");
	for($i=0;$i<count($taskId)-1;$i++)
	{
		
		/*
		//update statuss
		*/
		if($status[$i] =="Open")
			$currentstatus = 1;
		else
			if($status[$i] =="In work")
				$currentstatus = 2;
		else
			if($status[$i] =="Postponed")
				$currentstatus = 3;
		else
			if($status[$i] =="Reviewed")
				$currentstatus = 4;
		else
			if($status[$i] =="Closed")
				$currentstatus = 5;
		
		//$currentstatus = 0;
		//echo $estimtime[$i];	
		
		$sqlRew = "Select reviewable,status from UserTasks where taskid = $taskId[$i]";
		$resRew = mysql_query($sqlRew) or die("error");
		$rowRew = mysql_fetch_array($resRew);
		if($rowRew[0] == 1 && $currentstatus ==5 && $rowRew[1]==2 )
			echo $taskId[$i]."~^";
		else
		{
			
			if($currentstatus == 2) // taskul e in work
			{ 
				if($estimtime[$i]=="undefined") 
					// nu are estim time nici end date,facem update doar la ore 
				{  
					if($reestimtime[$i] =="undefined") // exact doar pe ore, nu a fost modificat nimic
					{
						//previous hours
						$sql_testing1 = "Select * from DetailedTasks where taskid=$taskId[$i] and Date='$prevDate[$i]'";
						$result1=mysql_query($sql_testing1) or die("error");
						$row1=mysql_fetch_array($result1);
						if($row1["Date"])
						{
							$sql1="Update DetailedTasks set Hours=$prevHour[$i] where Date = '$prevDate[$i]' AND TaskId = $taskId[$i]";
							$result1=mysql_query($sql1)or die("error");
							//echo $result1;
						}
						else
						{
							if($prevHour[$i]!=0)
							{
								$sql1="insert into DetailedTasks(taskid,hours,date) values ($taskId[$i],$prevHour[$i],'$prevDate[$i]')";
								$result1=mysql_query($sql1)or die("error");
								//echo $result1;
							}
								
						}
						// current hours
						$sql_testing2 = "Select * from DetailedTasks where taskid=$taskId[$i] and Date='$currDate[$i]'";
						$result2=mysql_query($sql_testing2) or die("error");
						$row2=mysql_fetch_array($result2);
						if($row2["Date"])
						{
							$sql2="Update DetailedTasks set Hours=$currHour[$i] where Date = '$currDate[$i]' AND TaskID = $taskId[$i]";
							$result2=mysql_query($sql2)or die("error");
							//echo $result2;
						}
						else
						{
							if($currHour[$i]!=0)
							{
								$sql2="insert into DetailedTasks(taskid,hours,date) values ($taskId[$i],$currHour[$i],'$currDate[$i]')";
								$result2=mysql_query($sql2)or die("error");
							//	echo $result2;
							}
						}
					}
					else  // trebuie facut si un update pe reestimated hours si tot acici si reasonul de ce a fost necesare mai multe ore
					{  // prima data pe ore, apoi pe reestimated cu reasonul
						//previous hours
						$sql_testing1 = "Select * from DetailedTasks where taskid=$taskId[$i] and Date='$prevDate[$i]'";
						$result1=mysql_query($sql_testing1) or die("error");
						$row1=mysql_fetch_array($result1);
						if($row1["Date"])
						{
							$sql1="Update DetailedTasks set Hours=$prevHour[$i] where Date = '$prevDate[$i]' AND TaskId = $taskId[$i]";
							$result1=mysql_query($sql1)or die("error");
							//echo $result1;
						}
						else
						{
							if($prevHour[$i]!=0)
							{
								$sql1="insert into DetailedTasks(taskid,hours,date) values ($taskId[$i],$prevHour[$i],'$prevDate[$i]')";
								$result1=mysql_query($sql1)or die("error");
								//echo $result1;
							}
								
						}
						// current hours
						$sql_testing2 = "Select * from DetailedTasks where taskid=$taskId[$i] and Date='$currDate[$i]'";
						$result2=mysql_query($sql_testing2) or die("error");
						$row2=mysql_fetch_array($result2);
						if($row2["Date"])
						{
							$sql2="Update DetailedTasks set Hours=$currHour[$i] where Date = '$currDate[$i]' AND TaskID = $taskId[$i]";
							$result2=mysql_query($sql2)or die("error");
							//echo $result2;
						}
						else
						{
							if($currHour[$i]!=0)
							{
								
								$sql2="insert into DetailedTasks(taskid,hours,date) values ($taskId[$i],$currHour[$i],'$currDate[$i]')";
								$result2=mysql_query($sql2)or die("error");
								//echo $result2;
							}
						}
						
						// acum pe reesimated cu orele si reest reason
						$sqlreestUp = "Select taskid from UserTaskReestimations where taskid = $taskId[$i]";
						$resultreest = mysql_query($sqlreestUp) or die("error");
						$rowreest=mysql_fetch_array($resultreest);
						if($rowreest=="") // nu a mai existat un taskid cu reest in UserTaskReestimations
						{
							$sqlinsertReestUp = "Insert into UserTaskReestimations(TaskID,DateOfChange,NewHours,EstimationReason) values($taskId[$i],'".date('Y-m-d')."',$reestimtime[$i],'$reestReason[$i]')";
							$resultReestUp = mysql_query($sqlinsertReestUp) or die("error");
							$rowReestUp = mysql_fetch_array($resultReestUp);
						}
						else
						{
							$sqlinsertReestUp = "Insert into UserTaskReestimations(TaskID,DateOfChange,NewHours,EstimationReason) values($taskId[$i],'".date('Y-m-d')."',$reestimtime[$i],'$reestReason[$i]')";
							$resultReestUp = mysql_query($sqlinsertReestUp) or die("error");
							$rowReestUp = mysql_fetch_array($resultReestUp);
						}
						//echo "merge? ".$rowreest."<-reestceva?"." ";
					}
				//previous hours
					/*$sql_testing1 = "Select * from DetailedTasks where taskid=$taskId[$i] and Date='$prevDate[$i]'";
					$result1=mysql_query($sql_testing1) or die("error");
					$row1=mysql_fetch_array($result1);
					if($row1["Date"])
					{
						$sql1="Update DetailedTasks set Hours=$prevHour[$i] where Date = '$prevDate[$i]' AND TaskId = $taskId[$i]";
						$result1=mysql_query($sql1)or die("error");
						//echo $result1;
					}
					else
					{
						if($prevHour[$i]!=0)
						{
							$sql1="insert into DetailedTasks(taskid,hours,date) values ($taskId[$i],$prevHour[$i],'$prevDate[$i]')";
							$result1=mysql_query($sql1)or die("error");
							//echo $result1;
						}
							
					}
					// current hours
					$sql_testing2 = "Select * from DetailedTasks where taskid=$taskId[$i] and Date='$currDate[$i]'";
					$result2=mysql_query($sql_testing2) or die("error");
					$row2=mysql_fetch_array($result2);
					if($row2["Date"])
					{
						$sql2="Update DetailedTasks set Hours=$currHour[$i] where Date = '$currDate[$i]' AND TaskID = $taskId[$i]";
						$result2=mysql_query($sql2)or die("error");
						//echo $result2;
					}
					else
					{
						if($currHour[$i]!=0)
						{
							$sql2="insert into DetailedTasks(taskid,hours,date) values ($taskId[$i],$currHour[$i],'$currDate[$i]')";
							$result2=mysql_query($sql2)or die("error");
							//echo $result2;
						}
					}*/
				}
				else{ // are eestimated, trebuie si update la estimated;
						// update / insert la orele noi
					//previous hours
					$sql_testing1 = "Select * from DetailedTasks where taskid=$taskId[$i] and Date='$prevDate[$i]'";
					$result1=mysql_query($sql_testing1) or die("error");
					$row1=mysql_fetch_array($result1);
					if($row1["Date"])
					{
						$sql1="Update DetailedTasks set Hours=$prevHour[$i] where Date = '$prevDate[$i]' AND TaskId = $taskId[$i]";
						$result1=mysql_query($sql1)or die("error");
						//echo $result1;
					}
					else
					{
						if($prevHour[$i]!=0)
						{
							$sql1="insert into DetailedTasks(taskid,hours,date) values ($taskId[$i],$prevHour[$i],'$prevDate[$i]')";
							$result1=mysql_query($sql1)or die("error");
							//echo $result1;
						}
							
					}
					// current hours
					$sql_testing2 = "Select * from DetailedTasks where taskid=$taskId[$i] and Date='$currDate[$i]'";
					$result2=mysql_query($sql_testing2) or die("error");
					$row2=mysql_fetch_array($result2);
					if($row2["Date"])
					{
						$sql2="Update DetailedTasks set Hours=$currHour[$i] where Date = '$currDate[$i]' AND TaskID = $taskId[$i]";
						$result2=mysql_query($sql2)or die("error");
						//echo $result2;
					}
					else
					{
						if($currHour[$i]!=0)
						{
							$sql2="insert into DetailedTasks(taskid,hours,date) values ($taskId[$i],$currHour[$i],'$currDate[$i]')";
							$result2=mysql_query($sql2)or die("error");
							//echo $result2;
						}
					}
					// acum update la estimated si dupa enddate 
					$sqlupdateEstimated = "Update UserTasks set EstimatedHours = $estimtime[$i] where taskID = $taskId[$i]";
					$resultupdateEstimated = mysql_query($sqlupdateEstimated)or die("error");
					echo $resultupdateEstimated;
					
					
					// enddate changed
					$sqlUpdateStatus = "Update UserTasks set status = 2 where taskid = $taskId[$i]";
					$resultUpdateStatus = mysql_query($sqlUpdateStatus)or die("error");
					//echo $resultUpdateStatus;
					
					$sqlSelectEndDateChange = "Select taskID from UserTaskEndDateChanges where taskID = $taskId[$i]";
					$resultSelectEndDateChange = mysql_query($sqlSelectEndDateChange)or die("error");
					$rowSelectEndDateChange = mysql_fetch_array($resultSelectEndDateChange);
					if($rowSelectEndDateChange=="") // facem insert, nu mai a fost schimbata data pan acu
					{	
						$sqlinsertNewEstimatedDate = "Insert into  UserTaskEndDateChanges(TaskId,NewEndDate,DateOfChange) values($taskId[$i],'$enddate[$i]','".date('Y-m-d')."');";
						$resultinsertNewEstimatedDate = mysql_query($sqlinsertNewEstimatedDate)or die("error");
						//echo $resultinsertNewEstimatedDate;
					
					}
					else
					{
						$sqlupdateNewEstimatedDate = "Update  UserTaskEndDateChanges set NewEndDate ='$enddate[$i]',DateOfChange = '".date('Y-m-d')."' where taskId = $taskId[$i]";
						$resultupdateNewEstimatedDate = mysql_query($sqlupdateNewEstimatedDate)or die("error");
						//echo $resultupdateNewEstimatedDate;
					}
				}
			}
			if($currentstatus == 3) // cand un task e in pp, doar statusul se modifica
			{
				$sqlUpdateStatus = "Update UserTasks set status = 3 where taskid = $taskId[$i]";
				$resultUpdateStatus = mysql_query($sqlUpdateStatus)or die("error");
				//echo $resultUpdateStatus;
			}
			if($currentstatus == 4) // rev->update la status si rev made by: ..
			{
				$sqlUpdateStatus = "Update UserTasks set status = 4 where taskid = $taskId[$i]";
				$resultUpdateStatus = mysql_query($sqlUpdateStatus)or die("error");
				//echo $resultUpdateStatus;
				
				$sqlUpdateReview = "Update UserTasks set ReviewExplanation='$reviewMaker[$i]' where taskid =$taskId[$i]";
				$resultUpdateReview =  mysql_query($sqlUpdateReview)or die("error");
				//echo $resultUpdateReview;
			}
			if($currentstatus == 5) // closed -> update la status si actual enddate 
			{
				$sqlUpdateStatus = "Update UserTasks set status = 5 where taskid = $taskId[$i]";
				$resultUpdateStatus = mysql_query($sqlUpdateStatus)or die("error");
				//echo $resultUpdateStatus;
				
				$sqlUpdateActualEnddate = "Update UserTasks set ActualEndDate='".date('Y-m-d')."' where taskid =$taskId[$i]";
				$resultUpdateActualEnddate =  mysql_query($sqlUpdateActualEnddate)or die("error");
				//echo $resultUpdateActualEnddate;
			}
		}
	}
}
if($nr == 1)  // saveDescription 
{
	$userId = $_SESSION['userID'];
	include ("conexiune.php");
	$coll = $_POST['coll'];
	$taskid = $_POST['taskid'];
	$description = $_POST['descr'];

	if($coll==1)
	{
		$sql = "select taskid,description from TasksDescription where taskid = $taskid";
		$result = mysql_query($sql) or die("error");
		$row = mysql_fetch_array($result);
		if($row[0]) // update
		{
			echo "exista, update, a fost: \n".$row[1]."\n";
			$sqlUpdate = "Update TasksDescription set Description = '$description' where taskid = $taskid";
			$resultUpdate = mysql_query($sqlUpdate) or die("error");
			$rowUpdate = mysql_fetch_array($resultUpdate);	
		}
		else // insert
		{
			echo "fajem insert ";
			$sqlInsert = "Insert into TasksDescription (taskid,description) values($taskid,'$description')";
			$resultInsert = mysql_query($sqlInsert) or die("error");
			$rowInsert = mysql_fetch_array($resultInsert);	
		}
	}
	else if($coll == 2)
	{
		$sql = "select taskid,description from TasksDescriptionOtherActivity where taskid = $taskid";
		$result = mysql_query($sql) or die("error");
		$row = mysql_fetch_array($result);
		if($row[0]) // update
		{
			echo "exista, update, a fost: \n".$row[1]."\n";
			$sqlUpdate = "Update TasksDescriptionOtherActivity set Description = '$description' where taskid = $taskid";
			$resultUpdate = mysql_query($sqlUpdate) or die("error");
			$rowUpdate = mysql_fetch_array($resultUpdate);	
		}
		else // insert
		{
			echo "fajem insert ";
			$sqlInsert = "Insert into TasksDescriptionOtherActivity (taskid,description) values($taskid,'$description')";
			$resultInsert = mysql_query($sqlInsert) or die("error");
			$rowInsert = mysql_fetch_array($resultInsert);	
		}
	}
}
if($nr == 2) // save new tasks inserted
{
	$userId = $_SESSION['userID'];

	$taskId = explode("~^",$_POST['tID']);
	$projectName = explode("~^",$_POST['pN']);
	$taskName = explode("~^",$_POST['tN']);
	$prevDate = explode("~^",$_POST['prD']);
	$currDate = explode("~^",$_POST['crD']);
	$prevHour = explode("~^",$_POST['prH']);
	$currHour = explode("~^",$_POST['crH']);
	$estimtime = explode("~^",$_POST['eT']);
	$status = explode("~^",$_POST['sts']);
	$review = explode("~^",$_POST['rwD']);
	$enddate = explode("~^",$_POST['eD']);
	$isReworkFor = explode("~^",$_POST['isRew']);
	include("conexiune.php");
	for($i=0;$i<count($taskId)-1;$i++)
	{
		$currentstatus=0;
		if($status[$i] =="Open")
			$currentstatus = 1;
		else
			if($status[$i] =="In work")
				$currentstatus = 2;
		else
			if($status[$i] =="Postponed")
				$currentstatus = 3;
		else
			if($status[$i] =="Reviewed")
				$currentstatus = 4;
		else
			if($status[$i] =="Closed")
				$currentstatus = 5;
		if($currentstatus!=0){
			
			$getprojectsql = "Select ProjectID from Projects where ProjectName = '$projectName[$i]'";
			$resultgetpr = mysql_query($getprojectsql) or die("error");
			$rowgetpr = mysql_fetch_array($resultgetpr);	
			
			$tipTask = 1;
			if($projectName[$i] == "Unproductive" || $projectName[$i] =="Training" || $projectName[$i] =="Meeting")
				$tipTask = 2;
			else
				$tipTask = 1;
			
			echo $rowgetpr;
			if($rowgetpr !="error"){
				$sql1 = "Insert into UserTasks(TaskID,IsReworkFor,UserID,ProjectID,TaskDescription,EstimatedHours,EnddaterequiredByProject,TipTask,Status,ActualEndDate,Reviewable,ReviewExplanation) values($taskId[$i],$isReworkFor[$i],$userId,$rowgetpr[0],'$taskName[$i]',$estimtime[$i],'$enddate[$i]',$tipTask,$currentstatus,'0000-00-00',$review[$i],' ')";
				$result1 = mysql_query($sql1) or die("error");
				$row1 = mysql_fetch_array($result1);
				echo $row1;
				if($row1!="error")
				{
					if($prevDate[$i]!=""){
						$sql2="Insert into DetailedTasks(taskid,hours,date) values($taskId[$i],$prevHour[$i],'$prevDate[$i]')";
						$result2 = mysql_query($sql2) or die("error");
						$row2 = mysql_fetch_array($result2);
						echo $row2;
					}
						$sql3="Insert into DetailedTasks(taskid,hours,date) values($taskId[$i],$currHour[$i],'$currDate[$i]')";
						$result3 = mysql_query($sql3) or die("error");
						$row3 = mysql_fetch_array($result3);
						echo $row3;
				}
			}
		}
	}
}
if($nr == 3) // save other Activities
{
	$userId = $_SESSION['userID'];
	include ("conexiune.php");
	$coll = $_POST['coll'];


	if($coll == 1){ // savin
		$project = $_POST['pr'];
		$taskname = $_POST['tn'];
		$hours = $_POST['h'];
		$enddate = $_POST['ed'];
		
		$sqlTid = "select max(taskid) from UserTasksOtherActivities where userid = $userId";
		$resultTid = mysql_query($sqlTid) or die("error");
		$rowTid = mysql_fetch_array($resultTid);
		if($rowTid[0] == 0)
		{
			$sql2 = "Select TaskIdLow from UserTasksLimit where userid = ".$userId.";";
			$result2=mysql_query($sql2) or die("error");
			$row2= mysql_fetch_array($result2);
			$taskid = $row2[0];
		}
		else
			$taskid = $rowTid[0]+1;

		$sql = "Insert into UserTasksOtherActivities(TaskID,UserID,ProjectName,TaskName,HoursSpend,Enddate) values($taskid,$userId,'$project','$taskname',$hours,'$enddate')";
		$result = mysql_query($sql) or die("error");
		$row = mysql_fetch_array($result);
		echo $row[0];
	}
	else
	if($coll == 2) // update hour
	{
		$hours = $_POST['h'];
		$taskid = $_POST['tid'];
		
		$sql = "Update UserTasksOtherActivities set hoursspend = $hours where taskid = $taskid";
		$result = mysql_query($sql) or die("error");
		$row = mysql_fetch_array($result);
		echo $row[0];
	}
}


?>