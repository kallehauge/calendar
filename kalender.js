jQuery(document).ready(function($) {

// Settings
	// Danish
	moment.lang('da');

// Variables
	// Day
	currentDay = moment().format('DD');
	// Month
	currentMonth = moment().format('MM');
	currentMonth = 4;

	// Year
	currentYear = moment().format('YYYY');

// Month
	month = currentMonth;
	monthText = moment(currentMonth, 'MM').format('MMMM');
	$('table caption').text(monthText);

// Calendar days
	// First day of the month (static: current month). (deduct 1 at the end to compensate for "the actual day").
	pushFirstDayOfMonth = parseInt(moment(currentMonth+'-01-'+currentYear,'MM-DD-YYYY').format('e'));
	// Calculate amount of days in a/the month.
	daysInCurrentMonth = moment(currentMonth, 'MM').daysInMonth();
	// Calculates the max amount of calender days.
	calendarDays = daysInCurrentMonth - pushFirstDayOfMonth;


// Caption


// Mark-up
	var appendStr;
	x = 0;
	// Push the day & append each day in the month.
	for (i = (1 - pushFirstDayOfMonth); i <= daysInCurrentMonth; i++) {
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

	// Append HTML to table.
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
});


/* NOT IN USE:

// Variables
month = 2; // Used in "daysInMonth"
daysInMonth = moment(month, 'MM').daysInMonth(); // Set month as first parameter in "moment".
dayOfWeek = moment().format('e'); // returns as 1-7

*/