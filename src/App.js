import React, { useEffect, useState } from "react";
import {
  startOfWeek,
  parseISO,
  endOfWeek,
  subWeeks,
  eachDayOfInterval,
  format,
  getDaysInMonth,
  parse,
} from "date-fns";
import "./App.css";
import ItemBlock from "./components/ItemBlock";
import Colors from "./components/Colors";

const App = () => {
  const array = [];
  const dayOfWeek = ["пн.", "вт.", "ср.", "чт.", "пт.", "сб.", "вс."];
  const allWeeks = 51;
  const currentDate = new Date();
  const [data, setData] = useState(null);

  function getDataFromApi() {
    return fetch("https://dpg.gg/test/calendar.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }

  function isFirstWeekOfMonth(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return day <= 7;
  }

  function getDaysInMonthFromInput(dateStr) {
    const [year, month, day] = dateStr.split("-");
    const date = parse(`${year}-${month}-01`, "yyyy-MM-dd", new Date());
    const daysInMonth = getDaysInMonth(date);
    return daysInMonth;
  }

  function getWeeksInMonth(dateStr) {
    const [year, month, day] = dateStr.split("-");
    const daysInMonth = getDaysInMonthFromInput(dateStr);
    if (daysInMonth - +day >= 28) {
      return 5;
    } else if (daysInMonth - +day >= 21) {
      return 4;
    } else if (daysInMonth - +day >= 14) {
      return 3;
    } else if (daysInMonth - +day >= 7) {
      return 2;
    } else {
      return 1;
    }
  }


  for (let i = 0; i < allWeeks; i++) {
    const startOfPreviousWeek = startOfWeek(subWeeks(currentDate, i), {
      weekStartsOn: 1,
    });
    const endOfPreviousWeek = endOfWeek(subWeeks(currentDate, i), {
      weekStartsOn: 1,
    });

    const daysOfPreviousWeek = eachDayOfInterval({
      start: startOfPreviousWeek,
      end: endOfPreviousWeek,
    });

    const previousWeek = daysOfPreviousWeek.map((day) => {
      return format(day, "yyyy-MM-dd");
    });

    array.unshift(previousWeek);
  }

  function transposeArray(array) {
    return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
  }

  const transposedArray = transposeArray(array);

  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <div className="app">
      <div className="container">
        {data && (
          <table>
            <thead>
              <tr>
                <td></td>
                {transposedArray[0].map((item, index) => {
                  return (
                    isFirstWeekOfMonth(item) && (
                      <td colSpan={getWeeksInMonth(item)} key={item}>
                        {format(parseISO(item), "LLL.")}
                      </td>
                    )
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {transposedArray.map((item, index) => {
                return (
                  <tr key={index} style={{ whiteSpace: "nowrap" }}>
                    <td style={{ maxHeight: "15px" }}>{dayOfWeek[index]}</td>
                    {item.map((cell, i) => {
                      return (
                        // <td key={cell} style={{ whiteSpace: "nowrap" }}>
                        //   {data[cell]}
                        // </td>
                        <ItemBlock
                          key={i}
                          data={data[cell]}
                          date={cell}
                        />
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Colors />
      </div>
    </div>
  );
};
export default App;
