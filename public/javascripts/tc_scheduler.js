$(document).ready(function() {


   var $calendar = $('#calendar');
   var initialized = false;
   var local_date = new Date();
   var gmt_hours = -local_date.getTimezoneOffset()/60;
   var tc_host = $(tc_host).selector;   //'http://localhost:3001';


   $calendar.weekCalendar({
      displayOddEven:true,    // shade alternate days
      timeslotsPerHour : 2,
      allowCalEventOverlap : false,
      overlapEventsSeparate: true,
      firstDayOfWeek : 0,
      businessHours :{start: 0, end: 24, limitDisplay: true },
      daysToShow : 7,
      // switchDisplay: {'1 day': 1, '3 next days': 3, 'work week': 5, 'full week': 7},
      title: function(daysToShow) {
			return daysToShow == 1 ? '%date%' : ''; //%start% - %end%';
      },
      height : function($calendar) {
         return $(window).height() - $("h1").outerHeight() - 1;
      },
      eventRender : function(calEvent, $event) {
        // alert(gmtHours);
        calEvent.title = "[" + calEvent.appointment_type + "]";
        if (calEvent.appointment_type == 'phone_and_video') {
            $event.css("backgroundColor", "#090");
            $event.find(".wc-time").css({
               "backgroundColor" : "#080",
               "border" : "1px solid #070"
            });
         } else if (!calEvent.appointment_type || calEvent.appointment_type =='') {
           calEvent.appointment_type = 'phone';
         }

      },

      draggable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },
      resizable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },
      eventNew : function(calEvent, $event) {
         var $dialogContent = $("#event_edit_container");
         resetForm($dialogContent);
         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         var appointment_typeField = $dialogContent.find("select[name='appointment_type']");


         $dialogContent.dialog({
            modal: true,
            title: "New Availability Block",
            close: function() {
               $dialogContent.dialog("destroy");
               $dialogContent.hide();
               $('#calendar').weekCalendar("removeUnsavedEvents");
            },
            buttons: {
               save : function() {
                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.appointment_type = appointment_typeField.val();
                  $.ajax({ 
                    type: "POST", 
                    url: tc_host + "/availability_blocks.json", 
                    data: "start=" + calEvent.start + "&end=" + calEvent.end + "&appointment_type=" + calEvent.appointment_type,
                    success: function(data) 
                    { 
                      calEvent.id = data.availability_block.id;
                      $dialogContent.dialog("close");
                      $calendar.weekCalendar("removeUnsavedEvents");
                      $calendar.weekCalendar("updateEvent", calEvent);
                      
                    }, 
                    error: function() 
                    { 
                      alert("Error on Create"); 
                    } 
                  }); 
                  
                  // // $calendar.weekCalendar("removeUnsavedEvents");
                  // $dialogContent.dialog("close");
                  // $calendar.weekCalendar("updateEvent", calEvent);
               },
               cancel : function() {
                  $dialogContent.dialog("close");
               }
            }
         }).show();

         $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));
         setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));

      },
      eventDrop : function(calEvent, $event) {


        $.ajax({ 
            type: "PUT", 
            url: tc_host + "/availability_blocks/" + calEvent.id + ".json",
            data: "start=" + calEvent.start + "&end=" + calEvent.end + "&appointment_type=" + calEvent.appointment_type,

          success: function(data) 
          { 
            // alert("Availability Block Saved");
            callback(data); 
          }, 
          // error: function(data) 
          error: function() 
          { 
            alert("Error on Drop"); 
          } 
        }); 

        
      },
      eventResize : function(calEvent, $event) {

        $.ajax({ 
            type: "PUT", 
            url: tc_host + "/availability_blocks/" + calEvent.id + ".json",
            data: "start=" + calEvent.start + "&end=" + calEvent.end + "&appointment_type=" + calEvent.appointment_type,

          success: function(data) 
          { 
            // alert( "Availability Block Saved" );
            callback(data); 
          }, 
          // error: function(data) 
          error: function() 
          { 
            alert("Error on Resize"); 
          } 
        }); 
      },
      eventClick : function(calEvent, $event) {

         if (calEvent.readOnly) {
            return;
         }

         var $dialogContent = $("#event_edit_container");
         resetForm($dialogContent);
         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         var appointment_typeField = $dialogContent.find("select[name='appointment_type']").val(calEvent.appointment_type);

         $dialogContent.dialog({
            modal: true,
            title: "Edit  " + calEvent.title,
            close: function() {
               $dialogContent.dialog("destroy");
               $dialogContent.hide();
               $('#calendar').weekCalendar("removeUnsavedEvents");
            },
            buttons: {
               save : function() {

                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.appointment_type = appointment_typeField.val();
                  
                  $.ajax({ 
                      type: "PUT", 
                      url: tc_host + "/availability_blocks/" + calEvent.id + ".json",
                      data: "start=" + calEvent.start + "&end=" + calEvent.end + "&appointment_type=" + calEvent.appointment_type,
                  
                    success: function(data) 
                    { 
                      $calendar.weekCalendar("updateEvent", calEvent);
                      $dialogContent.dialog("close");
                    }, 
                    error: function(data) 
                    { 
                      alert("Error on Edit Update "); 
                    } 
                  }); 
                            
                    $calendar.weekCalendar("updateEvent", calEvent);
                    $dialogContent.dialog("close");
                    

               },
               "delete" : function() {
                  $calendar.weekCalendar("removeEvent", calEvent.id);
                  $dialogContent.dialog("close");

                  $.ajax({ 
                      type: "DELETE", 
                      url: tc_host + "/availability_blocks/" + calEvent.id + ".json",

                    success: function(data) 
                    { 
                      callback(data); 
                    }, 
                    error: function() 
                    { 
                      alert("Error on Delete"); 
                    } 
                  }); 

               },
               cancel : function(data) {
                  $dialogContent.dialog("close");
               }
            }
         }).show();

         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         var appointment_typeField = $dialogContent.find("select[name='appointment_type']").val(calEvent.appointment_type);
         $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));
         setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));
         $(window).resize().resize(); //fixes a bug in modal overlay size ??

      },
      eventMouseover : function(calEvent, $event) {
      },
      eventMouseout : function(calEvent, $event) {
      },
      noEvents : function() {

      },
   

       data: function(start, end, callback) { 

        if(!initialized) {


          $.ajax({ 
              type: "PUT", 
              url: tc_host + "/availability_blocks/reset_timezone",
              data: "offset=" + gmt_hours  + "&from=scheduler",

            success: function(data) 
            { 
              var ret = data; //jQuery.parseJSON(data);
              if (ret) {
                current_zone.innerHTML = ret.zone_name;
                gmt_hours = ret.zone_offset;
                initialized = true;
                $.ajax({      //to address race condition where the index GET is called before set timezone
                    type: "GET", 
                    url: tc_host + "/availability_blocks.json", 
                    success: function(data) 
                    { 
                      var ret = data;
                      for (var i = 0; i < data.length; i++) {
                        data[i].start = new Date(data[i].start * 1000)
                        data[i].end = new Date(data[i].end * 1000)
                      }
                      callback(data); 
                    }, 
                    error: function(data) 
                    { 
                      alert("Error on Events GET"); 
                    } 
                  }); 
              }
            }, 
            error: function(data) 
            { 
              alert("Error on Timezone Initialization"); 
            } 
          }); 
        }
        else {

          $.ajax({ 
            type: "GET", 
            url: tc_host + "/availability_blocks.json", 
            success: function(data) 
            { 
              // alert( "Data returned: " + data );
              // var ret = jQuery.parseJSON(data);
              var ret = data;
              for (var i = 0; i < data.length; i++) {
                data[i].start = new Date(data[i].start * 1000)
                data[i].end = new Date(data[i].end * 1000)
              }
              callback(data); 
            }, 
            error: function(data) 
            { 
              alert("Error on Events GET"); 
            } 
          }); 
        }
      } 

      


   });

   function resetForm($dialogContent) {
      $dialogContent.find("input").val("");
      $dialogContent.find("textarea").val("");
   }




   /*
    * Sets up the start and end time fields in the calendar event
    * form for editing based on the calendar event being edited
    */
   function setupStartAndEndTimeFields($startTimeField, $endTimeField, calEvent, timeslotTimes) {

      $startTimeField.empty();
      $endTimeField.empty();

      for (var i = 0; i < timeslotTimes.length; i++) {
         var startTime = timeslotTimes[i].start;
         var endTime = timeslotTimes[i].end;
         var startSelected = "";
         if (startTime.getTime() === calEvent.start.getTime()) {
            startSelected = "selected=\"selected\"";
         }
         var endSelected = "";
         if (endTime.getTime() === calEvent.end.getTime()) {
            endSelected = "selected=\"selected\"";
         }
         $startTimeField.append("<option value=\"" + startTime + "\" " + startSelected + ">" + timeslotTimes[i].startFormatted + "</option>");
         $endTimeField.append("<option value=\"" + endTime + "\" " + endSelected + ">" + timeslotTimes[i].endFormatted + "</option>");

         $timestampsOfOptions.start[timeslotTimes[i].startFormatted] = startTime.getTime();
         $timestampsOfOptions.end[timeslotTimes[i].endFormatted] = endTime.getTime();

      }
      $endTimeOptions = $endTimeField.find("option");
      $startTimeField.trigger("change");
   }

   var $endTimeField = $("select[name='end']");
   var $endTimeOptions = $endTimeField.find("option");
   var $timestampsOfOptions = {start:[],end:[]};

   //reduces the end time options to be only after the start time options.
   $("select[name='start']").change(function() {
      var startTime = $timestampsOfOptions.start[$(this).find(":selected").text()];
      var currentEndTime = $endTimeField.find("option:selected").val();
      $endTimeField.html(
            $endTimeOptions.filter(function() {
               return startTime < $timestampsOfOptions.end[$(this).text()];
            })
            );

      var endTimeSelected = false;
      $endTimeField.find("option").each(function() {
         if ($(this).val() === currentEndTime) {
            $(this).attr("selected", "selected");
            endTimeSelected = true;
            return false;
         }
      });

      if (!endTimeSelected) {
         //automatically select an end date 2 slots away.
         $endTimeField.find("option:eq(1)").attr("selected", "selected");
      }

   });


   var $about = $("#about");

   $("#about_button").click(function() {
      $about.dialog({
         title: "About TC Scheduler",
         width: 600,
         close: function() {
            $about.dialog("destroy");
            $about.hide();
         },
         buttons: {
            close : function() {
               $about.dialog("close");
            }
         }
      }).show();
   });



    // $('#zone').bind('change keyup',function () {
   // $("select[name='zone']").change(function() {
  var ret;

  $(function () {
    $('#zone').bind('change',function () {

      //get value of selected option
      var value = $(this).children("option:selected").attr('value');
      if (value) {
        var datastr = "offset=" + value + "&from=selector";
   
        // do something here
        $.ajax({ 
            type: "PUT", 
            url: tc_host + "/availability_blocks/reset_timezone",
            data: datastr,

          success: function(data) 
          { 
            // alert("timezone reset: " + data);
            // ret = jQuery.parseJSON(data);
            // if (ret) {
              current_zone.innerHTML = data.zone_name;
              $calendar.weekCalendar("clear");
              $calendar.weekCalendar("refresh");
            // }

          }, 
          error: function(data) 
          { 
            alert("Error on Timezone Change"); 
          } 
        }); 
      } 
    }).change();
  });


});
