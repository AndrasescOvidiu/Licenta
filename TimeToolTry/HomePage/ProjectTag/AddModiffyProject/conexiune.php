<?php

include ("configTry.php");

$connect=mysql_connect($mysql_host,$mysql_user,$mysql_password) or die(mysql_error());

mysql_select_db($mysql_db) or die(mysql_error());

?>
