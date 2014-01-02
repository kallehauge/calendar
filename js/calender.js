function calendar() {
	// Defaults and variables
	currentDay		=	moment().format('DD');   // Today's day.
	currentMonth	=	moment().format('MM');   // Today's month.
	currentYear		=	moment().format('YYYY'); // Today's year.
	// Define default.
	var monthChange = 0;
	var storedDay;
	var storedMonth;
	var storedYear;

	// Load on init
	function staticContent() {

		function tableHead() {
			// Define variable
			var th;
			// Loop through mon-sun.
			for (i = 1; i <= 7; i++) {
				// Append <th> to the variable
				th += '<th>'+moment().isoWeekday(i).format('ddd')+'</th>';
			}
			// Append the string to thead tr
			$('table thead tr').append(th);
		}

		// Execute functions.
		tableHead();
	}

	// Will execute on init & prev + next buttons.
	function dynamicContent(change, activeDay) {
		// Define variables and set default.
		change = change || 0;
		activeDay = activeDay || null;
		// Determine how many months to add or subtract.
		monthChange += change;
		// New Date
		newDate = moment().add('months', monthChange);
		// Active month dates.
		calendarMonth = newDate.format('MM');
		calendarYear = newDate.format('YYYY');
		calendarFull = newDate.format('MM-DD-YYYY');

		function appendHeadline(month, year) {
			// Convert month from int to string.
			if( month == 01 ) {
				month = 'January';
			} else if( month == 02 ) {
				month = 'February';
			} else if( month == 03 ) {
				month = 'March';
			} else if( month == 04 ) {
				month = 'April';
			} else if( month == 05 ) {
				month = 'May';
			} else if( month == 06 ) {
				month = 'June';
			} else if( month == 07 ) {
				month = 'July';
			} else if( month == 08 ) {
				month = 'August';
			} else if( month == 09 ) {
				month = 'September';
			} else if( month == 10 ) {
				month = 'October';
			} else if( month == 11 ) {
				month = 'November';
			} else if( month == 12 ) {
				month = 'December';
			} else {
				month = 'Error in month';
			}
			// Append month and year to caption
			$('table caption .month').text(month);
			$('table caption .year').text(year);
		}

		function appendMarkup(month, year, push) {
			// Define
			var appendStr;
			// Push
			theFirst = parseInt(moment(month+'-01-'+year,'MM-DD-YYYY').format('e'), 10); // monday = 0;
			index = 1; // the days are 1-based, not 0.
			push = index - theFirst;
			// Days in month
			daysInMonth = moment(calendarMonth+'-'+calendarYear, 'MM-YYYY').daysInMonth();
			// Push the day & append each day in the month.
			x = 0;
			for (i = push; i <= daysInMonth; i++) {
				x++;
				if (x === 1) {
					appendStr += '<tr><td>'+i+'</td>';
				} else if(x === 7) {
					appendStr += '<td>'+i+'</td></tr>';
					x = 0;
				} else {
					appendStr += '<td>'+i+'</td>';
				}
			}
			// Finish the week with blank days.
			if (x !== 0) {
				for (i = 1; i <= (7-x); i++) {
					appendStr += '<td></td>';
				}
			}
			appendStr += '</tr>';

			// Remove existing tbody-rows (tr).
			$('table tbody tr').remove();

			// Append new tablerows.
			$('table tbody').append(appendStr);
		}

		function styleMarkup() {
			// if data matches last time a td were clicked
			if (storedMonth == calendarMonth && storedYear == calendarYear) {
				activeMonth = 1;
			} else {
				activeMonth = 0;
			}
			// Loop through each day
			$('table tbody td').each(function() {
				// Get date inside td's
				calendarDate = parseInt($(this).text(), 10);
				// If date is less than 1, make the day, blank.
				if (calendarDate < 1) {
					// Replace the html of "td" with null.
					$(this).html('');
				}
				// If date is equal to today
				if (calendarDate == currentDay && calendarMonth == currentMonth && calendarYear == currentYear) {
					$(this).addClass('currentDay');
				}
				if (activeMonth == 1 && storedDay == calendarDate) {
					$(this).addClass('active');
				}
			});
		}

		// If the month have been changed
		if (activeDay === null) {
			// Execute functions.
			appendHeadline( calendarMonth, calendarYear );
			appendMarkup( calendarMonth, calendarYear );
			styleMarkup();
		}
		// If activeDay != null (a <td> have been clicked).
		else {
			// Set month and year for the active date.
			storedDay	= activeDay;
			storedMonth	= calendarMonth;
			storedYear	= calendarYear;

			// Loop through each day and remove .active from all elements that isn't the clicked date.
			$('tbody td').each(function() {
				tdDays = $(this).text();
				// If date = the clicked date
				if (activeDay == tdDays) {
					$(this).addClass('active');
				} else {
					$(this).removeClass('active');
				}
			}); // end each
		}
	}

	// Init static content (ex: lang & table-head).
	staticContent();
	// Init the calender
	dynamicContent();

	// Prev / Next buttons
	$('.prev').click(function() {
		dynamicContent(-1);
	});

	$('.next').click(function() {
		dynamicContent(1);
	});

	$('table').delegate('tbody td', 'click', function() {
		day = $(this).text();
		dynamicContent(null, day);
	});
}