import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function MonthCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date()); // gices the current date
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getDaysInMonth = (month, year) => {
    let date = new Date(year, month, 1); ////starting point to calculate all the days of the specified month.
    let days = []; // days that will be used to store the days of the specific month
    while (date.getMonth() === month) {
      days.push(new Date(date)); //In each iteration of the loop, we create a new Date object using the date variable and push it to the days array
      date.setDate(date.getDate() + 1);
    }
    return days; // collect specific days in months
  };

  const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear()); // calculate the total days in months

  const firstDayIndex = days.findIndex((day) => day === days[daysInMonth[0].getDay()]); // calculate first days in months in which index 0-6
  console.log("index of days", firstDayIndex);
  const totalSlots = Math.ceil((daysInMonth.length + firstDayIndex) / 7) * 7; // required row to print month in the row
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  return (
    <div className="p-3 mb-2 bg-light text-dark">
      <div className="p-3 mb-2 bg-info text-dark">
        <h1>
          <b>MonthCalendar</b>
        </h1>
      </div>

      <h5>
        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h5>
      <button type="button" className="btn btn-sm m-1" onClick={handlePreviousMonth}>
        <ArrowBackIosNewIcon />
      </button>
      <button type="button" className="btn btn-sm m-1" onClick={handleNextMonth}>
        <ArrowForwardIosIcon />
      </button>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              {days.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(totalSlots)].map((_, i) => {
              // _ is used as a convention to denote unused parameter
              if (i % 7 === 0) {
                return (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => {
                      const index = i + j - firstDayIndex;
                      console.log("i -> ", i, "  j-", j, "firstDayIndex", firstDayIndex);
                      console.log("index", index);
                      const date = daysInMonth[index];
                      return <td key={j}>{date ? date.getDate() : " "}</td>;
                    })}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonthCalendar;
