<?php
session_start();
if($_POST['nr']==1){
	$opTask = $_SESSION['openTask'];
	echo $opTask;
}
else
	if($_POST['nr']==2){
		if($_SESSION['enddateToday']=="0")
		{
			echo 1;
		}
		else
			echo 2;
		$_SESSION['enddateToday']="1";
		
	}

?>