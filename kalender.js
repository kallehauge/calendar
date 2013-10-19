function calendar() {
// Settings
	// Danish language
	moment.lang('da'); // NB! for some reason "pushFirstDayOfMonth" don't need to be deducted 1 day with the danish language active.

// Variables
	currentDay = moment().format('DD');
	currentMonth = moment().format('MM');
	currentYear = moment().format('YYYY');
	month = currentMonth; // Default month on load.

function adjustCalendar() {
// Month + caption
	monthText = moment(month, 'MM').format('MMMM');
	$('table caption').text(monthText);

// Calendar days
	// First day of the month (static: current month). (deduct 1 at the end to compensate for "the actual day").
	pushFirstDayOfMonth = parseInt(moment(currentMonth+'-01-'+currentYear,'MM-DD-YYYY').format('e'));
	// Calculate amount of days in a/the month.
	daysInCurrentMonth = moment(currentMonth, 'MM').daysInMonth();
	// Calculates the max amount of calender days.
	calendarDays = daysInCurrentMonth - pushFirstDayOfMonth;

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
}

// Init on load.
	adjustCalendar();

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