<?php
include("conexiune.php");

$project = $_POST['proj'];
$statss = $_POST['stat'];

$table_project = explode('~^',$project);
$table_status = explode('~^',$statss);


for($i=0;$i<count($table_status);$i++)
{$sql0 = "select Status from Projects where ProjectName='$table_project[$i]'";
	$result0 = mysql_query($sql0)or die("error");
	$row0 = mysql_fetch_array($result0); 


	
	if($table_status[$i]=='2' && $row0[0]==1 )
	{
		
		$sql = "update Projects set Status = 2 where ProjectName ='$table_project[$i]'";
		$result = mysql_query($sql)or die("error"); 
	}
	else if($table_status[$i]=='1' && $row0[0]==2)
	{
		$sql1 = "update Projects set Status = 1 where ProjectName ='$table_project[$i]'";
		$result1 = mysql_query($sql1)or die("error");
	}
	
}
?>