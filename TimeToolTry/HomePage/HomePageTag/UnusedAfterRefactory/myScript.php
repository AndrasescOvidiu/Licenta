<?php

include("conexiune.php");
$tasklim = 1;
$tasklim2 = 2000;
$sql = "Select userid from Admin order by userid";
$result = mysql_query($sql)or die("gras e adi");
while($row=mysql_fetch_array($result)){
	echo "ceapa";
	echo $row[0]." ";
	$sql2 = "Insert into UserTasksLimit(userid,taskidlow,taskidhigh) values($row[0],$tasklim,$tasklim2)";
	$result2 = mysql_query($sql2)or die("gras e adi de 2 ori");
	echo $result2;
	$tasklim +=  2000;
	$tasklim2 += 2000;
}
echo $result;

?>
