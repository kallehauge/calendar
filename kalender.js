function calendar(lang) {
	// Defaults and variables
	currentDay		= 	moment().format('DD');	 // Today's day.
	currentMonth	= 	moment().format('MM');	 // Today's month.
	currentYear 	= 	moment().format('YYYY'); // Today's year.
	month 			=	currentMonth;	// Default month on load.
	// Define default.
	var monthChange = 0;

	// Load on init
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

	// Will execute on init & prev + next buttons.
	function dynamicContent(change, activeDay) {
		// Define variables and set default.
		change = change || 0;
		activeDay = activeDay || null;

		// If the month have been changed
		if (activeDay === null) {
			// Determine how many months to add or subtract.
			monthChange += change;
			// New Date
			newDate = moment().add('months', monthChange);
			// Active month dates.
			calendarMonth = newDate.format('MM');
			calendarYear = newDate.format('YYYY');
			calendarFull = newDate.format('MM-DD-YYYY');

			function appendMonth(month) {
				monthText = moment(month).format('MMMM');
				$('table caption').text(monthText);
			}

			function appendMarkup(month, year, push) {
				// Define
				var appendStr;
				// Push
				theFirst = parseInt(moment(month+'-01-'+year,'MM-DD-YYYY').format('e')); // monday = 0;
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
				$('table tbody td').each(function() {
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
			appendMonth( calendarMonth );
			appendMarkup( calendarMonth, calendarYear );
			styleMarkup();
		}

		// If activeDay != null (a <td> have been clicked).
		else {
			$('tbody td').each(function() {
				tdDate = $(this).text();
				if (activeDay == tdDate) {
					$(this).addClass('active');
				} else {
					$(this).removeClass('active');
				}
			});
		}
	}

	// Init static content (ex: lang & table-head).
	staticContent(lang);
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