import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './index.css';

export default class Datepicker extends Component {
  constructor(props) {
    super(props);
    this.state ={
      startDate: null,
      endDate: null
    }
    this.setBookingDates = props.setBookingDates;
  }

  handleDateChange(dates){
    console.log(dates);
    this.setState(dates);
    this.setBookingDates(dates);
  }

  render() {
    let handle = this.handleDateChange.bind(this);
    return (
      <div className="App">
        <DateRangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({startDate, endDate}) => handle({startDate, endDate})} // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
        <br/>
      </div>
    );
  }
};
