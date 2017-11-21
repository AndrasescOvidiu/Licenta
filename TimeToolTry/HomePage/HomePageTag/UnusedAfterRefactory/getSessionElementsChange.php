<?php
session_start();
$_SESSION['openTask'] = "1";
echo $_SESSION['openTask'];
?>