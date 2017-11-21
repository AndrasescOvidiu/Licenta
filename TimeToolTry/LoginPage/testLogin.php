<?php

       $_SESSION['username'] = $username;
       $_SESSION['password'] = $password;
       $_SESSION['userobj'] = mysql_fetch_assoc($query);
     header('Location: http://localhost/member_area.php');
     exit;
?>
		