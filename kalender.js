function calendar(lang) {
// Defaults and variables
	currentDay		= 	moment().format('DD');	 // Today's day.
	currentMonth	= 	moment().format('MM');	 // Today's month.
	currentYear 	= 	moment().format('YYYY'); // Today's year.
	day 			=	currentDay;		// Default day on load.
	// month 			=	currentMonth;	// Default month on load.
	month 			=	9;	// Default month on load.
	year 			=	currentYear;	// Default year on load.

// Language
	function language(lang) {
		// Set english as default, if no language is passed through the parameter.
		lang = lang || 'en';
		// Define the language for the rest of the code.
		moment.lang(lang); // NB! for some reason "pushFirstDayOfMonth" don't need to be deducted 1 day with the danish language active.
	}


// Table head
	function tableHead() {
		// Define variable
		var th;
		// Loop through mon-sun.
		for (i = 1; i <= 7; i++) {
			// Append <th> to the variable
			th += '<th>'+moment().isoWeekday(i).format('ddd')+'</th>';
		};
		// Append the string to thead tr
		$('table thead tr').append(th);
	}

function adjustCalendar() {

	function appendMarkup() {

	}

	function setMonth() {
		monthText = moment(month, 'MM').format('MMMM');
		$('table caption').text(monthText);
	}



	// First day of the month (static: current month). (deduct 1 at the end to compensate for "the actual day").
	pushFirstDayOfMonth = parseInt(moment(month+'-01-'+currentYear,'MM-DD-YYYY').format('d')) - 1;
	// Calculate amount of days in a/the month.
	daysInCurrentMonth = moment(month, 'MM').daysInMonth();
	// Calculates the max amount of calender days.
	calendarDays = daysInCurrentMonth - pushFirstDayOfMonth;

	// Mark-up
		var appendStr;
		x = 0;
		// Push the day & append each day in the month.
		for (i = 1 - pushFirstDayOfMonth; i <= daysInCurrentMonth; i++) {
			x++;
			if (x === 1) {
				appendStr += '<tr><td>'+i+'</td>';
			} else if(x === 7) {
				appendStr += '<td>'+i+'</td></tr>';
				x = 0;
			} else {
				appendStr += '<td>'+i+'</td>';
			}
		};
		// Finish the week with blank days.
		if (x != 0) {
			for (i = 1; i <= (7-x); i++) {
				appendStr += '<td></td>';
			};
		}
		appendStr += '</tr>';

		// Remove current tablerows
		$('table tbody tr').remove();

		// Append new rows to the table.
		$('table tbody').append(appendStr);

	// Styling
		// .active
		$('table td').each(function() {
			// Get date inside td's
			calendarDate = $(this).text();
			// If date is less than 1, make the day, blank.
			if (calendarDate < 1) {
				// Replace the html of "td" with null.
				$(this).html('');
			}
			// If date is equal to today
			if (calendarDate == currentDay) {
				$(this).addClass('currentDay');
			}
		});

	// Execute the functions.
	setMonth();
}

// Init on load.
	language(lang);
	tableHead();
	adjustCalendar(); // init calendar

// Adjust on month-change.
	$('.next').click(function() {
		month++;
		adjustCalendar();
	});
	$('.prev').click(function() {
		month--;
		adjustCalendar();
	});
}