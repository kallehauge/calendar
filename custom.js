jQuery(document).ready(function($) {

	// Current
	currentDay = moment().format('DD');
	currentMonth = moment().format('MM');
	currentYear = moment().format('YYYY');
	daysInCurrentMonth = moment(currentMonth, 'MM').daysInMonth();
	// Variables
	// month = 2; // Used in "daysInMonth"
	// daysInMonth = moment(month, 'MM').daysInMonth(); // Set month as first parameter in "moment".
	// dayOfWeek = moment().format('e'); // returns as 1-7

// First day of the month (static: current month).
	pushFirstDayOfMonth = moment(currentMonth+'-01-'+currentYear,'MM-DD-YYYY').format('e');
	// blank days = (firstDayOfMonth-1) + daysInCurrentMonth;

	// Define variable.
	var appendStr;
	// Loop each day in a month (Static for current month).
	i_week = 1; // Used to set new table-rows.
	for (i = (2-pushFirstDayOfMonth); i <= daysInCurrentMonth; i++) {
		// If it's the first day of the week.
		if(i_week === 1) {
			if (i < 1) {
				appendStr += '<tr><td></td>';
			} else {
				appendStr += '<tr><td>'+i+'</td>';
			}
		}
		// It it's the last day of the week.
		else if (i_week === 7){
			if (i < 1) {
				appendStr += '<td></td></tr>';
			} else {
				appendStr += '<td>'+i+'</td></tr>';
			}
			// reset to set the beginning of a new week.
			i_week = 0;
		}
		// All other days during a week.
		else {
			if (i < 1) {
				appendStr += '<td></td>';
			} else {
				appendStr += '<td>'+i+'</td>';
			}
		}
		// Add day to the ongoing week.
		i_week++;
	};
	for (i = 0; i <= (7-i_week); i++) {
		appendStr += '<td></td>';
	};
	appendStr += '</tr>';
	console.log(i_week);

	// Append HTML to table.
	$('table tbody').append(appendStr);


	// Styling
	// .active
});