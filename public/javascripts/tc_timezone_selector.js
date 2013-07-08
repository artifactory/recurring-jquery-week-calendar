
  $(function setTimezone() {
 
    $('#zone').bind('change keyup',function () {

      // location.reload(true);
      var ret = "";
      //get value of selected option
      var value = $(this).children("option:selected").attr('value');
      if (value) {
	      var datastr = "offset=" + value + "&from=selector";
	 
	      // do something here
		    $.ajax({ 
		        type: "PUT", 
		        url: "/availability_blocks/reset_timezone",
		        data: datastr,

		      success: function(data) 
		      { 
		        // alert("timezone reset: " + data);
		        ret = jQuery.parseJSON(data);
		        if (ret) {
			        current_zone.innerHTML = ret.zone_name;
						  $calendar.weekCalendar("clear");
						  $calendar.weekCalendar("refresh");
						}

		      }, 
		      error: function() 
		      { 
		        alert("Error: " + data); 
		      } 
		    }); 
			} 
    }).change();
  });
