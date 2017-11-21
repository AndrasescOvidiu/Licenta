<?php
include("conexiune.php");

$username = $_POST['usname'];
$realname = $_POST['rlname'];
$tipuser = $_POST['Turs'];
$norma = $_POST['Norm'];
$data = $_POST['Dt'];

//verific daca mai este vreun username la fel
$sql4 = "select * from Admin where UserName='$username'";
$result4 = mysql_query($sql4)or die("error");
$row4 = mysql_fetch_array($result4);

if($row4[0]==null)
		{

			$x = $_POST['IdTeam'];

			$sql = "select TeamID from Teams where TeamName='$x'";
			$result = mysql_query($sql) or die("error");
			$row=mysql_fetch_array($result);


			$tip=0;

			if($tipuser=="Admin")
				$tip=1;

			$sql1="select MAX(UserID)+1 from Admin";
			$result1=mysql_query($sql1) or die("error");
			$row1=mysql_fetch_array($result1);


			mysql_query("SET @InUsername   = '" .$username ."'" );
			mysql_query("SET @InRealName   = '" .$realname ."'" );
			mysql_query("SET @InPass = '".md5('INIT4')."'");
			mysql_query("SET @InSuperUser   = '" .$tip ."'" );
			mysql_query("SET @InUserTeam   = '" .$row[0] ."'" );
			mysql_query("SET @InNorma1   = '" .$norma ."'" );
			mysql_query("SET @InStartNorma1   = '" .$data ."'" );

			if(!mysql_query("CALL AddUser(@InUsername, @InRealName, @InPass, @InSuperUser, @InUserTeam, @InNorma1, @InStartNorma1)"))
				{
					die("error");
				}	
				else 
				{//aloca training si unproductive la toti useri noi automat

					$sql2 = "insert into UserProjects (UserID,AssignedProjectID) values($row1[0],91);";
					$result2=mysql_query($sql2) or die("error");
					$sql3 = "insert into UserProjects (UserID,AssignedProjectID) values($row1[0],26);";
					$result3=mysql_query($sql3) or die("error");
					echo "done";
				}
		}
		else echo "already";
?>