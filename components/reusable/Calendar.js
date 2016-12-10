import React, { Component } from 'react';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';
import moment from 'moment';

export default class Calendar extends Component {
  render() {
    return <div ref="calendar"></div>;
  }
  componentDidMount() {
    $(this.refs.calendar).fullCalendar({
			editable: true,
      defaultView: 'agendaWeek',
      hiddenDays: [ 0, 6 ], // hide Sundays and Saturdays
      contentHeight: 519,
      allDaySlot: false,
      minTime: "08:00:00",
      maxTime: "18:00:00",
			droppable: true, // this allows things to be dropped onto the calendar
			drop: function() {
				// is the "remove after drop" checkbox checked?
				if ($('#drop-remove').is(':checked')) {
					// if so, remove the element from the "Draggable Events" list
					$(this).remove();
				}
			}
    })
  }
}
