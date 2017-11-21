<?php 
session_start();
include("conexiune.php");

$NewNorm = $_POST['NewNorm'];
$UserName = $_POST['namID'];
$GetDate = $_POST['DateGet'];

$sql="select UserID from Admin where UserName='$UserName';";
$result=mysql_query($sql)or die ("error");
$row=mysql_fetch_array($result);


$year = date("Y");
$month = DateTime::createFromFormat("Y-m-d", $GetDate);



$date = DateTime::createFromFormat("Y-m-d", $GetDate);


		if($date->format("d")<=22)
		{
			//fac modificarile pe luna curenta
			
			$dataPrelucrata = $year."-".$month->format("m")."-"."01";
			

			$sql1="Select * from Norme where UserID=$row[0] and StartNorma='$dataPrelucrata'";
			$result1=mysql_query($sql1)or die ("error");
			$row1=mysql_fetch_array($result1);
			
			if($row1[0]==null)
			{
				$sql2="Insert into Norme (UserID,StartNorma,Hours) values($row[0],'$dataPrelucrata',$NewNorm)";
				$result2=mysql_query($sql2)or die ("error");
				$row2=mysql_fetch_array($result2);
			}
			else
			{
				$sql3="Update Norme set Hours='$NewNorm' where UserID=$row[0] and StartNorma='$dataPrelucrata'";
				$result3=mysql_query($sql3)or die ("error");
				$row3=mysql_fetch_array($result3);
			}
			
		}
		else 
		{
			// fac modificarile pe luna urmatoare datei pe care o primesc
			
				if(($month->format("m")+1)<10)
					$x="0".($month->format("m")+1);
				else 
					if(($month->format("m")+1)>12)
					{
						$x="0".(($month->format("m")+1)-12);
						$year=$year+1;
					}
					else 
						$x=($month->format("m")+1);

			$dataPrelucrata = $year."-".$x."-"."01";
			
			
			$sql1="Select * from Norme where UserID=$row[0] and StartNorma='$dataPrelucrata'";
			$result1=mysql_query($sql1)or die ("error");
			$row1=mysql_fetch_array($result1);
			
			if($row1[0]==null)
			{
				$sql2="Insert into Norme (UserID,StartNorma,Hours) values($row[0],'$dataPrelucrata',$NewNorm)";
				$result2=mysql_query($sql2)or die ("error");
				$row2=mysql_fetch_array($result2);
			}
			else
			{
				$sql3="Update Norme set Hours='$NewNorm' where UserID=$row[0] and StartNorma='$dataPrelucrata'";
				$result3=mysql_query($sql3)or die ("error");
				$row3=mysql_fetch_array($result3);
			}
			
		}
/*
// vreau sa vad daca data la care bag noua norma nu este folosita in caz pozitiv fac update altfel fac insert
if($row1[0]==null){
	$sql2="Insert into Norme (UserID,StartNorma,Hours) values($row[0],'$GetDate',$NewNorm)";
	$result2=mysql_query($sql2)or die ("error");
	$row2=mysql_fetch_array($result2);
}
else{
	$sql3="Update Norme set Hours='$NewNorm' where UserID=$row[0] and StartNorma='$GetDate'";
	$result3=mysql_query($sql3)or die ("error");
	$row3=mysql_fetch_array($result3);
}
*/
?>
