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
	// array of shortened weekday names
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

    // toggle the month selection list when you click the month
    onChangeMonth = (e, month) => {
    	this.setState({
    		showMonthPopup: !this.state.showMonthPopup
    	})
    }


    setMonth = (month) => {
    	let monthNum = this.months.indexOf(month);
    	// clone the dateContext object
    	let dateContext = Object.assign({}, this.state.dateContext);
    	// change the dateContext object to reflect new month
    	dateContext = moment(dateContext).set("month", monthNum);
    	// reassign the state to show new month context
    	this.setState({
    		dateContext: dateContext
    	})
    }

    onSelectMonthChange = (e, data) => {
    	this.setMonth(data);
    	// if no property is being passed, the parent can take action
    	this.props.onChangeMonth && this.props.onChangeMonth()
    }

    // create a link for each month, nestled inside a div
    SelectMonth = (props) => {
    	let popup = props.data.map((data) => {
    		return (
    			<div key={data}>
    				<a href="#" onClick={(e) => this.onSelectMonthChange(e, data)}>
    					{data}
    				</a>
    			</div>
    		)
    	})
    	return (
    		<div className="month-popup">
    			{popup}
    		</div>
    	)
    }

    // add the event listener to the current month
    MonthNav = () => {
    	return (
    		<span className="label-month" onClick={(e) => {this.onChangeMonth(e, this.month())}}>
    			{this.month()}
    			{this.state.showMonthPopup &&
    				<this.SelectMonth data={this.months} />
    			}
    		</span>
    	)
    }

	render() {
		// grab the shortened weekdays array and iterate through, create a cell for each day of the week
		let weekdays = this.weekdaysShort.map((day) => {
			return (
				<td key={day} className="week-day">{day}</td>
			);
		})
		// create an array of blank days to represent day cells which belong to previous month
		let blanks = [];
		// first day of month returns a number between 0..6
		for (let i = 0; i < this.firstDayOfMonth(); i++) {
			// create a blank day cell for each day belonging to previous month
			blanks.push(
				<td key={i+13} className="emptySlot">
					{""}
				</td>
			);
		}

		
		let daysInMonth = [];
		for (let d = 1; d <= this.daysInMonth(); d++) {
			// add classes to each day. add current day class to today
			let className = (d === this.currentDay ? "day current-day" : "day");
			// as in blanks, create a cell for each day of the month and push to daysInMonth array
			daysInMonth.push(
				<td key={d} className={className} >
					<span>{d}</span>
				</td>
			)
		}

		var totalCells = [...blanks, ...daysInMonth];
		let rows = [];
		let cells = [];

		totalCells.forEach((row, i) => {
			// push a row corresponding to the day of the week into cells array
			if ((i % 7) !== 0) {
				cells.push(row);
			} else {
				// if the row belongs to the last day of the week, create new subarray with slice 
				let insertRow = cells.slice();
				// push the completed week into rows array
				rows.push(insertRow);
				// create new cells array
				cells = [];
				// push that row (day cell) into cells array
				cells.push(row);
			}
			// when you reach the last day of the month
			if (i === totalCells.length - 1) {
				// same functionality as end of week
				let insertRow = cells.slice();
				rows.push(insertRow)
			}
		})

		let trElems = rows.map((d, i) => {
			return (
				<tr key={i*10}>
					{d}
				</tr>
			)
		});

		console.log("blanks: ", blanks)
		console.log("days: ", daysInMonth)
		console.log("totalCells: ", totalCells)
		return (
			<div className="calendar-container">
				<h1>Calendar</h1>
				<table className="calendar">
					<thead>
						<tr className="calendar-header">
							<td colSpan="5">
								<this.MonthNav />
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							{weekdays}
						</tr>
						{trElems}
					</tbody>
				</table>
			</div>
		)
	}
}