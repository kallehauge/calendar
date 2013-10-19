function calendar(lang) {
	// Defaults and variables
		currentDay		= 	moment().format('DD');	 // Today's day.
		currentMonth	= 	moment().format('MM');	 // Today's month.
		currentYear 	= 	moment().format('YYYY'); // Today's year.
		month 			=	currentMonth;	// Default month on load.

	function staticContent(lang) {

		function language(lang) {
			// Set english as default, if no language is passed through the parameter.
			lang = lang || 'en';
			// Define the language for the rest of the code.
			moment.lang(lang); // NB! for some reason "pushFirstDayOfMonth" don't need to be deducted 1 day with the danish language active.
		}

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

		// Execute functions.
		language(lang);
		tableHead();
	}

	function adjustCalendar(changeMonth) {
		changeMonth = changeMonth || 0;

		// function setMonth(changeMonth) {
		// 	calenderMonth = moment().subtract('months', changeMonth);
		// 	console.log(calenderMonth);
		// 	return calenderMonth;
		// }

		function appendMonth() {
			monthText = moment(month, 'MM').format('MMMM');
			$('table caption').text(monthText);
		}

		// calculates amount of days in... bla bla
		function pushFirstDay() {
			theFirst = parseInt(moment(month+'-01-'+currentYear,'MM-DD-YYYY').format('e')); // sunday = 0;
			index = 1; // the days are 1-based, not 0.
			return index - theFirst;
		}

		function appendMarkup(push) {
			var appendStr;
			x = 0;
			daysInMonth = moment(month, 'MM').daysInMonth();
			// Push the day & append each day in the month.
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
			};
			// Finish the week with blank days.
			if (x != 0) {
				for (i = 1; i <= (7-x); i++) {
					appendStr += '<td></td>';
				};
			}
			appendStr += '</tr>';

			// Remove existing table-rows (tr).
			$('table tbody tr').remove();

			// Append new tablerows.
			$('table tbody').append(appendStr);
		}

		function styleMarkup() {
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

		// Execute functions.
		// setMonth();
		appendMonth();
		appendMarkup( pushFirstDay() );
		styleMarkup();
	}

	// Init static content (ex: lang & table-head).
	staticContent(lang);
	// Init the calender
	adjustCalendar();

	// Prev / Next buttons
	$('.prev').click(function() {
		month--;
		adjustCalendar(1);
	});

	$('.next').click(function() {
		month++;
		adjustCalendar(-1);
	});
}