<?php
session_start();
if( time()> $_SESSION['expire'])  /// sa fac aia cu sessionul
{
	
	$_SESSION['expire'] = time()+300;
	echo "error";
	
}
else
{
	$_SESSION['expire'] = time()+300;
	echo $_SESSION['userID'];
}
?>