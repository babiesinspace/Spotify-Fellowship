import React from 'react';
import moment from 'moment';
import "font-awesome/css/font-awesome.css";

export default class Calendar extends React.Component {
	constructor(props) {
		super(props);
		this.width = props.width || "500px";
		this.style = props.style || {};
	}

	state = {
		dateContext: moment(),
		today: moment(),
		showMonthPopup: false,
		showYearPopup: false
	}

	weekdays = moment.weekdays();
	weekdaysShort = moment.weekdaysShort();
	months = moment.months();
	
	year = () => {
        return this.state.dateContext.format("Y");
    }

    month = () => {
        return this.state.dateContext.format("MMMM");
    }

    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }

    currentDate = () => {
        console.log("currentDate: ", this.state.dateContext.get("date"));
        return this.state.dateContext.get("date");
    }

    currentDay = () => {
        return this.state.dateContext.format("D");
    }

    // find what day of the week the first of the month falls on 0..6
    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d');
        return firstDay;
    }

	render() {
		let weekdays = this.weekdaysShort.map((day) => {
			return (
				<td key={day} className="week-day">{day}</td>
			);
		})
		return (
			<div className="calendar-container">
				<h1>Calendar</h1>
				<table className="calendar">
					<thead>
						<tr className="calendar-header">
						</tr>
					</thead>
					<tbody>
						{weekdays}
					</tbody>
				</table>
			</div>
		)
	}
}