// Function to get the ISO week number of a date
Date.prototype.getWeek = function () {
    let date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    let week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

// Function to get the date of the first day of the ISO week
function getDateOfISOWeek(w, y) {
    let simple = new Date(y, 0, 1 + (w - 1) * 7);
    let dow = simple.getDay();
    let ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

// Main function to calculate the start and end dates of each week in a year
function calculateWeeksOfYear(year) {
    let weeks = [];
    let date = new Date(year, 0, 1);
    let week = date.getWeek();
    
    while (date.getFullYear() === year) {
        let startOfWeek = getDateOfISOWeek(week, year);
        let endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        if (endOfWeek.getFullYear() !== year) {
            endOfWeek = new Date(year, 11, 31); // Ensure we don't cross the year boundary
        }

        weeks.push({
            week: week,
            start: startOfWeek.toISOString().split('T')[0],
            end: endOfWeek.toISOString().split('T')[0]
        });

        date.setDate(date.getDate() + 7);
        week++;
    }

    return weeks;
}

// Example usage:
const year = 2024;
const weeks = calculateWeeksOfYear(year);
console.log(weeks);
