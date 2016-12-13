import React, { Component } from 'react';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';
import moment from 'moment';

export default class Calendar extends Component {
  render() {
    return <div>
      <button onClick="">1</button>
      <div ref="calendar"></div>
    </div>;
  }
  componentWillReceiveProps(newProps) {
    const { courses } = this.props;
    if (newProps.courses !== courses && newProps.courses.length > 0) {
      newProps.courses.forEach((course, i) => {
        if(course.period==2){
          course.lessons.forEach((lesson, j) => {
            // console.log(lesson);
            console.log(lesson);
            const startTime = moment().startOf('isoweek').add(lesson.day-1, 'days').add(lesson.startTime, 'hours').toDate();
            const endTime = moment().startOf('isoweek').add(lesson.day-1, 'days').add(lesson.endTime, 'hours').toDate();
            console.log(startTime); 
            $(this.refs.calendar).fullCalendar('renderEvent',
              {
                id: course.id,
                title: course.name,
                start: startTime, // lesson.startTime
                end: endTime,
              },
            );
          });
        }
      });
    }
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
    });
  }
}

Calendar.propTypes = {
  courses: React.PropTypes.array,
}
