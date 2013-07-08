  $.widget('ui.weekCalendar', (function() {
        firstDayOfWeek: function(calendar) {
        draggable: function(calEvent, element) {
        resizable: function(calEvent, element) {
        eventClick: function(calEvent, element, dayFreeBusyManager, 
        eventRender: function(calEvent, element) {
        eventAfterRender: function(calEvent, element) {
        eventRefresh: function(calEvent, element) {
        eventDrag: function(calEvent, element) {
        eventDrop: function(calEvent, element) {
        eventResize: function(calEvent, element) {
        eventNew: function(calEvent, element, dayFreeBusyManager, 
        eventMouseover: function(calEvent, $event) {
        eventMouseout: function(calEvent, $event) {
        calendarBeforeLoad: function(calendar) {
        calendarAfterLoad: function(calendar) {
        noEvents: function() {
        eventHeader: function(calEvent, calendar) {
        eventBody: function(calEvent, calendar) {
        getUserId: function(user, index, calendar) {
        getUserName: function(user, index, calendar) {
        getEventUserId: function(calEvent, calendar) {
        setEventUserId: function(userId, calEvent, calendar) {
        getFreeBusyUserId: function(calFreeBusy, calendar) {
         * function used to display the freeBusy element
        freeBusyRender: function(freeBusy, $freeBusy, calendar) {
        startOnFirstDayOfWeek: function(calendar) {
         * you can pass a function returning an object or a litteral object
         * @type {object|function(#calendar)}
          * @type {function(date,calendar)}
      _create: function() {
          $(window).bind(this.options.resizeEvent, function() {
       * public functions *
      refresh: function() {
      clear: function() {
      today: function() {
      prevWeek: function() {
      nextWeek: function() {
      gotoWeek: function(date) {
      gotoDate: function(date) {
      setDaysToShow: function(daysToShow) {
            $(window).bind(this.options.resizeEvent, function() {
      removeEvent: function(eventId) {
          self.element.find('.wc-cal-event').each(function() {
          self.element.find('.wc-day-column-inner').each(function() {
      removeUnsavedEvents: function() {
          self.element.find('.wc-new-cal-event').each(function() {
          self.element.find('.wc-day-column-inner').each(function() {
      updateEvent: function(calEvent) {
      getTimeslotTimes: function(date) {
      formatDate: function(date, format) {
      formatTime: function(date, format) {
      serializeEvents: function() {
        self.element.find('.wc-cal-event').each(function() {
      next: function() {
      prev: function() {
      getCurrentFirstDay: function() {
      getCurrentLastDay: function() {
        * private functions *
      _setOption: function(key, value) {
          var currentEvents = $.map(self.element.find('.wc-cal-event'), function() {
      _computeOptions: function() {
        * Resize the calendar scrollable height based on the provided function in options.
      _resizeCalendar: function() {
      _findScrollBarWidth: function() {
      _setupEventDelegation: function() {
        this.element.click(function(event) {
        }).mouseover(function(event) {
        }).mouseout(function(event) {
      _isDraggingOrResizing: function($target) {
      _renderCalendar: function() {
        $weekDayColumns.each(function(i, val) {
      _renderCalendarButtons: function($calendarContainer) {
              .click(function() {
              .click(function() {
              .click(function() {
              $.each(this.options.switchDisplay, function(label, option) {
              $container.find('input').change(function() {
      _renderCalendarHeader: function($calendarContainer) {
        * for further explanations, see each part rendering function.
      _renderCalendarBody: function($calendarContainer) {
      _renderCalendarBodyTimeSlots: function($calendarTableTbody) {
      _renderCalendarBodyOddEven: function($calendarTableTbody) {
      _renderCalendarBodyFreeBusy: function($calendarTableTbody) {
      _renderCalendarBodyEvents: function($calendarTableTbody) {
      _setupEventCreationForWeekDay: function($weekDay) {
          $weekDay.mousedown(function(event) {
                  $target.bind('mousemove.newevent', function(event) {
                  }).mouseup(function() {
          }).mouseup(function(event) {
      _loadCalEvents: function(dateWithinWeek) {
              error: function(XMLHttpRequest, textStatus, errorThrown) {
              success: function(data) {
              complete: function() {
                  function(data) {
      _updateDayColumnHeader: function($weekDayColumns) {
          self.element.find('.wc-header td.wc-day-column-header').each(function(i, val) {
            self.element.find('.wc-header td.wc-user-header').each(function(i, val) {
          $weekDayColumns.each(function(i, val) {
            self.element.find('.wc-grid-row-freebusy .wc-column-freebusy').each(function(i, val) {
      _getCalendarTitle: function() {
      _renderEvents: function(data, $weekDayColumns) {
            $.each(data.options, function(key, value) {
          $.each(eventsToRender, function(i, calEvent) {
          $weekDayColumns.each(function() {
      _renderEvent: function(calEvent, $weekDay) {
          $weekDay.each(function() {
      addEvent: function() {
      _adjustOverlappingEvents: function($weekDay) {
            $.each(groupsList, function() {
                $.each(curGroups, function(groupIndex) {
                  $.each(curGroup, function() {
                        $(this).bind('mouseover.z-index', function() {
                            $.each(curGroup, function() {
      _groupOverlappingEventElements: function($weekDay) {
          var sortedEvents = $events.sort(function(a, b) {
          $.each(sortedEvents, function() {
      _findWeekDayForEvent: function(calEvent, $weekDayColumns) {
          $weekDayColumns.each(function(index, curDay) {
      _updateEventInCalendar: function(calEvent) {
            self.element.find('.wc-cal-event').each(function() {
            $weekDays.each(function(index, weekDay) {
      _positionEvent: function($weekDay, $calEvent) {
      _getEventDurationFromPositionedEventElement: function($weekDay, $calEvent, top) {
      _adjustForEventCollisions: function($weekDay, $calEvent, newCalEvent, oldCalEvent, maintainEventDuration) {
          $weekDay.find('.wc-cal-event').not($calEvent).each(function() {
      _addDraggableToCalEvent: function(calEvent, $calEvent) {
            start: function(event, ui) {
      _addDroppableToWeekDay: function($weekDay) {
            drop: function(event, ui) {
                setTimeout(function() {
      _addResizableToCalEvent: function(calEvent, $calEvent, $weekDay) {
            stop: function(event, ui) {
                setTimeout(function() {
      _refreshEventDetails: function(calEvent, $calEvent) {
      _clearCalendar: function() {
      _scrollToHour: function(hour, animate) {
          $scrollable.animate({scrollTop: 0}, 0, function() {
      _hourForIndex: function(index) {
      _24HourForIndex: function(index) {
      _amOrPm: function(hourOfDay) {
      _isToday: function(date) {
      _cleanEvents: function(events) {
          $.each(events, function(i, event) {
      _cleanEvent: function(event) {
      _disableTextSelect: function($elements) {
          $elements.each(function() {
                $(this).bind('selectstart', function() {
                $(this).mousedown(function() {
      _dateFirstDayOfWeek: function(date) {
      _dateLastDayOfWeek: function(date) {
      _fixMinMaxDate: function(date) {
      _getAdjustedDayIndex: function(date) {
      _firstDayOfWeek: function() {
      _dateLastMilliOfWeek: function(date) {
      _clearTime: function(d) {
      _addDays: function(d, n, keepTime) {
      _rotate: function(a /*array*/, p /* integer, positive integer rotate to the right, negative to the left... */) {
      _cloneDate: function(d) {
      _cleanDate: function(d) {
      _formatDate: function(date, format) {
      d: function(date) { return (date.getDate() < 10 ? '0' : '') + date.getDate(); },
      D: function(date, calendar) { return calendar.options.shortDays[date.getDay()]; },
      j: function(date) { return date.getDate(); },
      l: function(date, calendar) { return calendar.options.longDays[date.getDay()]; },
      N: function(date) { var _d = date.getDay(); return _d ? _d : 7; },
      S: function(date) { return (date.getDate() % 10 == 1 && date.getDate() != 11 ? 'st' : (date.getDate() % 10 == 2 && date.getDate() != 12 ? 'nd' : (date.getDate() % 10 == 3 && date.getDate() != 13 ? 'rd' : 'th'))); },
      w: function(date) { return date.getDay(); },
      z: function(date) { var d = new Date(date.getFullYear(), 0, 1); return Math.ceil((date - d) / 86400000); }, // Fixed now
      W: function(date) { var d = new Date(date.getFullYear(), 0, 1); return Math.ceil((((date - d) / 86400000) + d.getDay() + 1) / 7); }, // Fixed now
      F: function(date, calendar) { return calendar.options.longMonths[date.getMonth()]; },
      m: function(date) { return (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1); },
      M: function(date, calendar) { return calendar.options.shortMonths[date.getMonth()]; },
      n: function(date) { return date.getMonth() + 1; },
      t: function(date) { var d = date; return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() }, // Fixed now, gets #days of date
      L: function(date) { var year = date.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); },  // Fixed now
      o: function(date) { var d = new Date(date.valueOf()); d.setDate(d.getDate() - ((date.getDay() + 6) % 7) + 3); return d.getFullYear();}, //Fixed now
      Y: function(date) { return date.getFullYear(); },
      y: function(date) { return ('' + date.getFullYear()).substr(2); },
      a: function(date) { return date.getHours() < 12 ? 'am' : 'pm'; },
      A: function(date) { return date.getHours() < 12 ? 'AM' : 'PM'; },
      B: function(date) { return Math.floor((((date.getUTCHours() + 1) % 24) + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600) * 1000 / 24); }, // Fixed now
      g: function(date) { return date.getHours() % 12 || 12; },
      G: function(date) { return date.getHours(); },
      h: function(date) { return ((date.getHours() % 12 || 12) < 10 ? '0' : '') + (date.getHours() % 12 || 12); },
      H: function(date) { return (date.getHours() < 10 ? '0' : '') + date.getHours(); },
      i: function(date) { return (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(); },
      s: function(date) { return (date.getSeconds() < 10 ? '0' : '') + date.getSeconds(); },
      u: function(date) { var m = date.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ? '0' : '')) + m; },
      e: function(date) { return 'Not Yet Supported'; },
      I: function(date) { return 'Not Yet Supported'; },
      O: function(date) { return (-date.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(date.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(date.getTimezoneOffset() / 60)) + '00'; },
      P: function(date) { return (-date.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(date.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(date.getTimezoneOffset() / 60)) + ':00'; }, // Fixed now
      T: function(date) { var m = date.getMonth(); date.setMonth(0); var result = date.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); date.setMonth(m); return result;},
      Z: function(date) { return -date.getTimezoneOffset() * 60; },
      c: function(date, calendar) { return calendar._formatDate(date, 'Y-m-d\\TH:i:sP'); }, // Fixed now
      r: function(date, calendar) { return calendar._formatDate(date, 'D, d M Y H:i:s O'); },
      U: function(date) { return date.getTime() / 1000; }
      getUserForId: function(id) {
      _getUserName: function(index) {
      _getUserIdFromIndex: function(index) {
      _getUserIndexFromId: function(id) {
      _getEventUserId: function(calEvent) {
      _setEventUserId: function(calEvent, userId) {
      _getFreeBusyUserId: function(freeBusy) {
      _clearFreeBusys: function() {
          $freeBusyPlaceholders.each(function() {
      _findWeekDaysForFreeBusy: function(freeBusy, $weekDays) {
        $weekDays.each(function() {
      _renderFreeBusys: function(freeBusys) {
          $.each(freebusysToRender, function(index, freebusy) {
                $placeholders.each(function() {
      _refreshFreeBusys: function($freeBusyPlaceholders) {
          $freeBusyPlaceholders.each(function() {
              $.each($placehoder.data('wcFreeBusyManager').getFreeBusys(s, e), function() {
      _renderFreeBusy: function(freeBusy, $freeBusyPlaceholder) {
      _positionFreeBusy: function($placeholder, $freeBusy) {
      _cleanFreeBusys: function(freebusys) {
          $.each(freebusys, function(i, freebusy) {
      _cleanFreeBusy: function(freebusy) {
      getFreeBusyManagersFor: function(date, users) {
      getFreeBusyManagerForEvent: function(newCalEvent) {
          $freeBusyPlaceHoders.each(function() {
      updateFreeBusy: function(freeBusys) {
          $.each(_freeBusys, function(index, _freeBusy) {
              $weekdays.each(function(index, day) {
      _startOnFirstDayOfWeek: function() {
      _getCurrentScrollHour: function() {
      _getJsonOptions: function() {
      _getHeaderDate: function(date) {
      _getDSTdayShift: function(date, shift) {
      _needDSTdayShift: function(date1, date2) {
    }; // end of widget function return
    })() //end of widget function closure execution
      getStart: function() {return this.getOption('start')},
      getEnd: function() {return this.getOption('end')},
      getOption: function() {
      setOption: function(key, value) {
      isWithin: function(dateTime) {return Math.floor(dateTime.getTime() / 1000) >= Math.floor(this.getStart().getTime() / 1000) && Math.floor(dateTime.getTime() / 1000) <= Math.floor(this.getEnd().getTime() / 1000)},
      isValid: function() {return this.getStart().getTime() < this.getEnd().getTime()}
    var FreeBusy = function(options) {
    var FreeBusyManager = function(options) {
      getFreeBusys: function() {
              $.each(this.freeBusys, function() {
              $.each(this.freeBusys, function() {
      insertFreeBusy: function(freeBusy) {
          var pushNewFreeBusy = function(_f) {if (_f.isValid()) newFreeBusys.push(_f);};
          $.each(this.freeBusys, function(index) {
            $.each(tmpFB, function(i){str.push(i + ": " + this.getStart().getHours() + ' > ' + this.getEnd().getHours() + ' ' + (this.getOption('free') ? 'free' : 'busy'))});
            $.each(newFreeBusys, function(i){str.push(this.getStart().getHours() + ' > ' + this.getEnd().getHours())});
            $.each(this.freeBusys, function(i){str.push(i + ": " + this.getStart().getHours() + ' > ' + this.getEnd().getHours()  + ' ' + (this.getOption('free') ? 'free' :'busy'))});
