import React, { Component } from 'react';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';

export default class Calendar extends Component {
  constructor() {
    super();
    this.state = { period: 1 };
  }
  componentWillReceiveProps(newProps) {
    const { courses } = this.props;
    if (newProps.courses !== courses && newProps.courses.length > 0) {
      this.updateView(newProps.courses);
    }
  }
  componentDidMount() {
    $(this.refs.calendar).fullCalendar({
      header: false,
      columnFormat: 'ddd',
			editable: true,
      defaultView: 'agendaWeek',
      hiddenDays: [ 0, 6 ], // hide Sundays and Saturdays
      contentHeight: 519,
      allDaySlot: false,
      minTime: "08:00:00",
      maxTime: "18:00:00",
    });
  }
  componentDidUpdate(oldProps, oldState) {
    if (oldState.period !== this.state.period) {
      this.updateView(this.props.courses);
    }
  }
  changePeriod(i) {
    this.setState({ period: i });
  }
  renderButtons() {
    const { period } = this.state;
    return Array(4).fill(0).map((v, i) => {
      return (
        <RaisedButton key={i}
          style={{margin: '0px 5px'}}
          label={i+1}
          primary={period !== i+1}
          secondary={period === i+1}
          onTouchTap={this.changePeriod.bind(this, i+1)}/>
      );
    });
  }
  updateView(courses) {
    $(this.refs.calendar).fullCalendar('removeEvents');
    courses.forEach((course, i) => {
      if(course.period==this.state.period){
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
  render() {
    return <div>
      <h3>Periods</h3>
      {this.renderButtons()}
      <div style={{marginTop: '10px'}} ref="calendar"></div>
    </div>;
  }
}

Calendar.propTypes = {
  courses: React.PropTypes.array,
}
