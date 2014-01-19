Calendar
===
This is a calendar plugin which supports "themes", so it's easy to customize the colors for your specific project. The calendar is responsive, so it required a container with a max-width. The calendar also returns an object with the current/active day, month and year. This makes the calendar easy to integrate into other solutions where you want data returned by ajax etc.

*This plugin is based on the date library " [moment.js](http://momentjs.com/) " which makes it easier to handle dates compared to JavaScript's Date Object.*


Demo
---
[Demo-page](http://kallehauge.github.io/calendar/)

*The design for the demo-page is inspired by another calendar by the name of "CLNDR".*

Initialize
---
To initialize this project, you simply have to create a container and give it a unique class/id to target it.

    calendar('.container');

If you want to use the date-object the calendar returns, simply store the init in a variable.

    date = calendar('.container');
    date.day = 11;
    date.month = 04;
    date.year = 2013;

Markup
---
When you initialize the calender, it will use the provided selector and create a "static" table. The content of this table will change dynamically.

    <div class="container">
    	<table>
    		<caption>
    			<span class="prev">&lt;&lt;</span>
    			<span class="month"></span>
    			<span class="year"></span>
    			<span class="next">&gt;&gt;</span>
    		</caption>
    		<thead>
    			<tr> <-- jQuery inserts Mon => Sun --> </tr>
    		</thead>
    		<tbody>
    		  <-- jQuery inserts rows and data -->
    		</tbody>
    	</table>
    </div>

Future plans
---
* Clean up the code. It's still a bit "hardcoded" and could use some cleaning.
* Change languages feature
* Show dates from the previous and next month instead of blank fields (this feature is uncertain since this might lower usability. But some soft of "enable" feature could be possible).

License
---
[MIT License](https://github.com/kallehauge/calendar/blob/master/LICENSE)
