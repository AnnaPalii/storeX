import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      startDate: null,
      endDate: null
    }
  }

  alertStartDate = () => {
    alert(this.state.startDate);
  }
  alertEndDate = () => {
    alert(this.state.endDate);
  }


  render() {
    return (
      <div className="App">
        <DateRangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
        <br/>
        <br/>
        <button onClick={this.alertStartDate}>Click Me for Start Date</button>
        <button onClick={this.alertEndDate}>Click Me for End Date</button>
      </div>
    );
  }
}

export default App;
