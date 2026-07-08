import { useState } from "react";

class Time {
    constructor(monthNo, yearNo) {
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

        this.dayNo = new Date().getDate();
        this.monthNo = monthNo;
        this.monthName = months[monthNo];
        this.year = yearNo;
        this.firstDay = this.getMonthFirstDay(monthNo, yearNo);
        this.totalDays = this.getTotalDays(monthNo, yearNo);
    }

    getMonthFirstDay(monthNo, year) {
        return new Date(year, monthNo, 1).getDay(); // get the first day of the current month
    }

    getTotalDays(monthNo, year) {
        return new Date(year, monthNo + 1, 0).getDate(); // the 0th day of the next month is the last day of the current month, so we can get the total days in the current month
    }
}

function moveMonth(monthNo, year) {
    if (monthNo < 0 || monthNo > 11) {
        throw new Error(`Invalid month: ${monthNo}`);
    }
    if (monthNo % 11 === 0) {
        // if n/12 = 0 then even
        return { month: 1, year: year + 1 };
    } else {
        return { month: monthNo + 1, year: year };
    }
}

function Calendar({ onLogout }) {
    let today = new Date();

    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());

    let time = new Time(month, year);

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
        if (
            i + 1 === time.dayNo &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
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
            <p className="caption">
                {time.monthName}, {time.year}
            </p>
            <table>
                <thead>
                    <tr>{daysRow}</tr>
                </thead>
                <tbody>{weeks}</tbody>
            </table>

            <div className="calender-navigation">
                <button
                    value="prev"
                    onClick={() => {
                        if (month === 0) {
                            setMonth(11);
                            setYear(year - 1);
                        } else {
                            setMonth(month - 1);
                        }
                    }}
                >
                    Previous
                </button>
                <button
                    value="next"
                    onClick={() => {
                        if (month === 11) {
                            setMonth(0);
                            setYear(year + 1);
                        } else {
                            setMonth(month + 1);
                        }
                    }}
                >
                    Next
                </button>
            </div>
            <button className="logout-btn" onClick={onLogout}>
                Logout
            </button>
        </>
    );
}

export default Calendar;
