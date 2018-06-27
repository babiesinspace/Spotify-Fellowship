import React from 'react';
import moment from 'moment';
import axios from 'axios'
import "font-awesome/css/font-awesome.css";
import './calendar.css';

export default class Calendar extends React.Component {
	constructor(props) {
		super(props);
		this.width = props.width || "350px";
		this.style = props.style || {};
	}

	state = {
		dateContext: moment(),
		today: moment(),
		showMonthPopup: false,
		showYearPopup: false,
		events: []
	}

	componentDidMount() {
		axios.get('http://localhost:3001/api/v1/events.json')
	  	.then(response => {
	    	console.log(response)
	    this.setState({events: response.data})
	  })
	 	.catch(error => console.log(error))
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

    nextMonth = () => {
    	let dateContext = Object.assign({}, this.state.dateContext)
    	dateContext = moment(dateContext).add(1, "month")
    	this.setState({
    		dateContext: dateContext
    	})
    	this.props.onNextMonth && this.props.onNextMonth()
    }

     prevMonth = () => {
    	let dateContext = Object.assign({}, this.state.dateContext)
    	dateContext = moment(dateContext).subtract(1, "month")
    	this.setState({
    		dateContext: dateContext
    	})
    	this.props.onPrevMonth && this.props.onPrevMonth()
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

    showYearEditor = () => {
    	this.setState({
    		showYearEditor: true
    	})
    }

    setYear = (year) => {
    	let dateContext = Object.assign({}, this.state.dateContext);
    	 dateContext = moment(dateContext).set("year", year);
    	// reassign the state to show new year context
    	this.setState({
    		dateContext: dateContext
    	})
    }

    onYearChange = (e) => {
    	this.setYear(e.target.value);
    	this.props.onYearChange && this.props.onYearChange(e, e.target.value)
    }

    onKeyUpYear = (e) => {
    	// if user hits 'enter' or 'esc'
    	if (e.which === 13 || e.which === 27) {
    		this.setYear(e.target.value)
    		this.setState({
    			showYearEditor: false
    		})
    	}
    }

    // display year next to month with event listener
    YearNav = () => {
    	return (
    		this.state.showYearEditor ? 
    		<input defaultValue={this.year()} className="editor-year" ref={(yearInput) => {this.yearInput = yearInput}} onKeyUp={(e) => this.onKeyUpYear(e)} onChange={(e) => this.onYearChange(e)} type="number" placeholder="year" />
    		:
    		<span className="label-year" onDoubleClick={(e) => {this.showYearEditor()}}>
    			{this.year()}
    		</span>
    	)
    }

    onDayClick = (e, day) => {
    	this.props.onDayClick && this.props.onDayClick(e, day)
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
					<span onClick={(e) => {this.onDayClick(e, d)}}>{d}</span>
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

		return (
			<div className="calendar-container">
				<table className="calendar">
					<thead>
						<tr className="calendar-header">
							<td colSpan="5">
								<this.MonthNav />
								{" "}
								<this.YearNav />
							</td>
							<td colSpan="2" className="nav-month">
								<i className="prev fa fa-fw fa-chevron-left" onClick={(e) => {this.prevMonth()} } >
								</i>
								<i className="prev fa fa-fw fa-chevron-right" onClick={(e) => {this.nextMonth()} } >
								</i>
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