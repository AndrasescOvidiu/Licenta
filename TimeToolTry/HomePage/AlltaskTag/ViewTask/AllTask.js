var i=0,timehour=6;
var luni,marti,miercuri,joi,vineri,sambata;
var op = 0,iw=0,pp=0,rw=0,cl=0;
function logout()
{

	$.post('logout.php', { num:"" }, function(result) { 
		if (result == 1)
			window.location.href ="http://tmda365u/Quality/TimeToolTry/LoginPage/login.php";
	});
}


function goTo()
{
    $("#search").keyup(function(){
        _this = this;
        // Show only matching TR, hide rest of them
        $.each($("tbody tr"), function() {
            if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) == -1)
				{
					$(this).hide();
					$("#last_tr").show();
					$("#search").focus().val($('#search').val());
				}
            else
			{
				$(this).show();  
				if($("#noTaskYet").val()==0)
				{
					$("#noTaskYet").hide();
				}
			}
			
        });
    }); 
	
}
function validate() {
		if($("#Open").is(':checked'))
			{
					
			$.each($("tbody tr"), function() {
				if($(this).find(".status_class").text() =='Open')
				{
					$(this).show();
				}
			});
		}
		else
		{
			$.each($("tbody tr"), function() {
				if($(this).find(".status_class").text() =='Open')
				{
					$(this).hide();
				}
			});
		}
		if($("#InWork").is(':checked'))
		{
			
			
			$.each($("tbody tr"), function() {
				if($(this).find(".status_class").text() =='In Work')
				{
					$(this).show();
				}
			});
		}
		else
		{
			$.each($("tbody tr"), function() {
				if($(this).find(".status_class").text() =='In Work')
				{
					$(this).hide();
				}
			});
		}
		/////////////////////////////////////////////////////
		if($("#Postponed").is(':checked'))
		{
			
			
			$.each($("tbody tr"), function() {
				if($(this).find(".status_class").text() =='Postponed')
				{
					$(this).show();
				}
			});
		}
		else
		{
			$.each($("tbody tr"), function() {
				if($(this).find(".status_class").text() =='Postponed')
				{
					$(this).hide();
				}
			});
		}
		///////////////////////////////////////////////////
		if($("#Reviewed").is(':checked'))
		{
			
			
			$.each($("tbody tr"), function() {
				if($(this).find(".status_class").text() =='Reviewed')
				{
					$(this).show();
				}
			});
		}
		else
		{
			$.each($("tbody tr"), function() {
				if($(this).find(".status_class").text() =='Reviewed')
				{
					$(this).hide();
				}
			});
		}
		///////////////////////////////////////////////////
		if($("#Closed").is(':checked'))
		{
			
			
			$.each($("tbody tr"), function() {
				if($(this).find(".status_class").text() =='Closed')
				{
					$(this).show();
				}
			});
		}
		else
		{
			$.each($("tbody tr"), function() {
				if($(this).find(".status_class").text() =='Closed')
				{
					$(this).hide();
				}
			});
		}
	
		
  }
function hide_table()
{	
	//alert("ceapa");
	$.each($("tbody tr"), function() {
			$(this).hide();
	});
	$('#last_tr').show();
}
function loadTable(){
	
	var table = document.getElementById("myTable");
		var rowCount = table.rows.length-1;
		
		if($("#noTaskYet").val()==0)
		{
			$("#noTaskYet").hide();
		}
		
		
		$.post('script.php', function(result) { 
			var res = result.split("@#");
			
			var taskid = res[0].split('~^');
			var projectid = res[1].split('~^');
			var taskname = res[2].split('~^');
			var luni=res[3].split('~^');
			var marti = res[4].split('~^');
			var miercuri =res[5].split('~^');
			var joi =res[6].split('~^');
			var vineri=res[7].split('~^');
			var sambata=res[8].split('~^');
			var statuss = res[9].split('~^');
			var enddate =res[10].split('~^');
			var descr = res[11].split('~^');
			
			var currentDay = getCurrentDay();
			
			for(kz=0;kz<taskid.length-1;kz++)
			{	
			//if( statuss[kz]=="1" && iw==1 || statuss[kz] =="2" && pp ==1)
				//{
						var row = table.insertRow(rowCount);
						var taskidTable = "<td> "+taskid[kz]+" </td>";
						var projectidTable = "<td>"+projectid[kz]+"</td>";
						var tasknameTable = "<td>"+taskname[kz]+"</td>";
						
						var addplusbutton = "";
						var addminusbutton = "";

						if(luni[kz]<timehour)
						var stringLuni =  "<td><label class='luni' style='color:red' >"+luni[kz]+"/"+timehour+"</label> </td>";
						else 
						if(luni[kz]<timehour)
						var stringLuni =  "<td><label class='luni' style='color:green' >"+luni[kz]+"/"+timehour+"</label> </td>";
					
						
						if(marti[kz]<timehour)
						var stringMarti =  "<td><label class='marti' style='color:red' >"+marti[kz]+"/"+timehour+"</label> </td>";
						else 
						if(marti[kz]>timehour)
						var stringMarti =  "<td><label class='marti' style='color:green' >"+marti[kz]+"/"+timehour+"</label> </td>";
						
						if(miercuri[kz]<timehour)
						var stringMiercuri =  "<td><label class='miercuri' style='color:red' >"+miercuri[kz]+"/"+timehour+"</label> </td>";
						else 
						if(miercuri[kz]>timehour)
						var stringMiercuri =  "<td><label class='miercuri' style='color:green' >"+miercuri[kz]+"/"+timehour+"</label> </td>";
					
						if(joi[kz]<timehour)
						var stringJoi = " <td><label class='joi' style='color:red' >"+joi[kz]+"/"+timehour+"</label> </td>";
						else
						if(joi[kz]>timehour)
						var stringJoi = " <td><label class='joi' style='color:green' >"+joi[kz]+"/"+timehour+"</label> </td>";
					
						if(vineri[kz]<timehour)
						var stringVineri = " <td><label class='vineri' style='color:red' >"+vineri[kz]+"/"+timehour+"</label> </td>";
						else 
						if(vineri[kz]>timehour)
						var stringVineri = " <td><label class='vineri' style='color:green' >"+vineri[kz]+"/"+timehour+"</label> </td>";
						
						if(sambata[kz]<timehour)
						var stringSambata = " <td><label class='sambata' style='color:red' >"+sambata[kz]+"/"+timehour+"</label> </td>";
						else
						if(sambata[kz]>timehour)							
						var stringSambata = " <td><label class='sambata' style='color:green' >"+sambata[kz]+"/"+timehour+"</label> </td>";
						
						if(statuss[kz] == '0')
							var status2 = "<td class='status_class' >Open</td> ";
						else
							if(statuss[kz] == '1')
							var status2 = "<td class='status_class' >In Work</td> ";
						else
							if(statuss[kz] == '2')
							var status2 = "<td class='status_class'>Postponed</td> ";
						else
						if(statuss[kz] == '3')
							var status2 = "<td class='status_class'> Reviewed </td> ";
						else
						if(statuss[kz] == '4')
							var status2 = "<td class='status_class'>Closed</td> ";
						else
							var status2 = "<td class='status_class'>Closed</td> ";
						
						var enddateTable = "<td>"+enddate[kz]+"</td>";
						var detailsTable= "<td><ul class ='table_details_dropdown'><li><a href='#' style='text-decoration: none; margin:0 auto;'>Description</a><li class='hidden_details'> "+descr[kz]+"</li></li></ul></td>"
						//var deleteButtonTable = "<td> <button class='edit_button' name = 'editbutton' onclick='edittask(this)' value = 0>  <img src ='edit_button.png' style='width:24px;height:24px;'> </button> </td>";

						row.innerHTML= "<tr> "+ taskidTable+ projectidTable+ tasknameTable/*+stringLuni+stringMarti+stringMiercuri+stringJoi+stringVineri+stringSambata*/+status2+enddateTable+detailsTable+"</tr> ";
				//}
			}
				hide_table();
		});
	
}

function datePick(){
        $(".enddatepicker").datepicker({ minDate: new Date() ,dateFormat: "yy-mm-dd" });
		
		var today = new Date();
			var month = today.getMonth();
			var day = today.getDate();
			var year = today.getFullYear();

			
			var endDateObject = $("#enddatepicker").datepicker("getDate");
			var endDateString = $.datepicker.formatDate("dd-mm-yy", endDateObject);
			
			var endDateTable = endDateString.split("-");
			// testing if the year is good, month is good and then the day
			if(year > endDateTable[2])
			{
				alert("incorect pick of year! Choose again");
			}	
			else{
				if(month > endDateTable[1])
					alert("incorect pick of month! Choose again");
				else{
					if(day > endDateTable[0])
						alert("incorect pick of day! Choose again");
					else{
						if(day == endDateTable[0])
							alert("incorect pick of day,that's the same day! Choose again");
						else{
							alert ("Success! ");
						}
					}
				}
				
			}
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
	var month = today.getMonth();
	
	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	var monthName = month[today.getMonth()];
	
	var day = today.getDay();
	var year = today.getFullYear();
	
	day = checkTime(day);
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	
    document.getElementById('date_time').innerHTML =day+"/"+monthName+"/"+year+" " +h + ":" + m + ":" + s;
	
	//document.getElementById('date_time').innerHTML = day+" "+month+" "+year;

    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
function getCurrentDay()
{
	
	var today = new Date();
	return today.getDay();
}
function sortButton(clicked)
{
	alert("pressed");
	if($(clicked).parents('th').find('.down_arrow_img').attr('alt') == '0')
	{
		$(clicked).parents('th').find('.down_arrow_img').attr("src","up_arrow.png");
		$(clicked).parents('th').find('.down_arrow_img').attr('alt','1');
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		  table = document.getElementById("myTable");
		  switching = true;
		  //Set the sorting direction to ascending:
		  dir = "asc"; 
		  /*Make a loop that will continue until
		  no switching has been done:*/
		  while (switching) {
			//start by saying: no switching is done:
			switching = false;
			rows = table.getElementsByTagName("TR");
			/*Loop through all table rows (except the
			first, which contains table headers):*/
			for (i = 1; i < rows.length-1; i++) {
			  //start by saying there should be no switching:
			  shouldSwitch = false;
			  /*Get the two elements you want to compare,
			  one from current row and one from the next:*/
			  x = rows[i].getElementsByTagName("TD")[0];
			  y = rows[i+1].getElementsByTagName("TD")[0];
			  /*check if the two rows should switch place,
			  based on the direction, asc or desc:*/
			  if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				  //if so, mark as a switch and break the loop:
				  shouldSwitch= true;
				  break;
				}
			  } else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
				  //if so, mark as a switch and break the loop:
				  shouldSwitch= true;
				  break;
				}
				}
			}
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }	
	}
	else{
		$(clicked).parents('th').find('.down_arrow_img').attr("src","down_arrow.png");
		$(clicked).parents('th').find('.down_arrow_img').attr('alt','0');
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		  table = document.getElementById("myTable");
		  switching = true;
		  //Set the sorting direction to ascending:
		  dir = "asc"; 
		  /*Make a loop that will continue until
		  no switching has been done:*/
		  while (switching) {
			//start by saying: no switching is done:
			switching = false;
			rows = table.getElementsByTagName("TR");
			/*Loop through all table rows (except the
			first, which contains table headers):*/
			for (i = 1; i < rows.length-2; i++) {
			  //start by saying there should be no switching:
			  shouldSwitch = false;
			  /*Get the two elements you want to compare,
			  one from current row and one from the next:*/
			  x = rows[i].getElementsByTagName("TD")[0];
			  y = rows[i+1].getElementsByTagName("TD")[0];
			  /*check if the two rows should switch place,
			  based on the direction, asc or desc:*/
			  if (dir == "asc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
				  //if so, mark as a switch and break the loop:
				  shouldSwitch= true;
				  break;
				}
			  } else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				  //if so, mark as a switch and break the loop:
				  shouldSwitch= true;
				  break;
				}
				}
			}
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
		  }
	}
}
function afisare_tip_user()
{
	//aici facem pentru super user sau normal user afisarea taburilor
	
		$.post('verificaresuperuser.php', function(result) { 
	
		if(result == 0) 
		{
		
			$("#Projects").hide();
			$("#Teams").hide();
			$("#changeNorm").hide();
		}
		
	});
}