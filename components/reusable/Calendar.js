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
			header: {
				left: 'prev,next today',
				center: 'title',
			},
			editable: true,
      defaultView: 'agendaWeek',
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
