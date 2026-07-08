class Time {
    constructor() {
        const date = new Date();

        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        this.dayNo = date.getDate();
        this.dayName = days[date.getDay()];
        this.monthNo = date.getMonth();
        this.monthName = months[date.getMonth()];
        this.year = date.getFullYear();
        this.firstDay = this.getMonthFirstDay(this.monthNo, this.year);
        this.totalDays = this.getTotalDays(this.monthNo, this.year);
    }

    getMonthFirstDay(monthNo, year) {
        return new Date(year, monthNo, 1).getDay(); // get the first day of the current month
    }

    getTotalDays(monthNo, year) {
        return new Date(year, monthNo + 1, 0).getDate(); // the 0th day of the next month is the last day of the current month, so we can get the total days in the current month
    }
}

function Calendar() {
    let time = new Time();

    let daysRow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
        (day) => <td key={day}>{day}</td>,
    );

    const prevMonthTotal = new Date(time.year, time.monthNo, 0).getDate(); // get total days of the previous month

    let days = [];

    for (let i = 0; i < time.firstDay; i++) {
        const dayNum = prevMonthTotal - time.firstDay + 1 + i; // example: 30 (totaldays) - 3 (first day) = 27th is where the prev month ends so +1 to the next day and +i to get the next days after 27th (28, 29, 30)
        days.push(
            <td className="prev-days" key={`empty-${i}`}>
                {dayNum}
            </td>,
        );
    } // put previous cells for the days before the first day of the month

    // create cells of the month
    for (let i = 0; i < time.totalDays; i++) {
        if (i + 1 === time.dayNo) {
            days.push(
                <td className="current-day" key={`current-${i + 1}`}>
                    {i + 1}
                </td>,
            );
            continue; // a unique class so to highlight the current day in the month
        }

        days.push(
            <td className="current-days" key={`current-${i + 1}`}>
                {i + 1}
            </td>,
        );
    }

    // fill remaining cells with next month's leading days
    let i = 1;
    while (days.length % 7 !== 0) {
        days.push(
            <td className="next-days" key={`next-${i}`}>
                {i++}
            </td>,
        );
    }

    // divide into weeks (7 days in week instead of all days in one row (weeks))
    let weeks = [];
    for (let i = 0; i < days.length; i += 7) {
        const week = days.slice(i, i + 7); // n to n+7 into one week
        weeks.push(<tr key={`week-${i / 7}`}>{week}</tr>);
    }

    return (
        <>
            <h1>Calendar</h1>
            <table>
                <thead>
                    <tr>{daysRow}</tr>
                </thead>
                <tbody>{weeks}</tbody>
            </table>

            <div className="calender-navigation">
                <button value="prev">Previous</button>
                <button value="next">Next</button>
            </div>
        </>
    );
}

export default Calendar;
