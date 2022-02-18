import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./style.scss";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";
import { ko } from "date-fns/esm/locale";
import { format, subWeeks } from "date-fns/esm";

function range(start, end) {
  let array = [];
  for (let i = start; i < end; ++i) {
    array.push(i);
  }
  return array;
}

const Calendar = () => {
  
  const [startCalendarDate, setStartCalendarDate] = useState(subWeeks(new Date(), 1));
  const [endCalendarDate, setEndCalendarDate] = useState(new Date());
  const years = range(1990, getYear(new Date()) + 1, 1);

  const months = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월",];

  const handleStartCalendarOpen = () => {
    console.log("시작 날짜 변경 함수 = ", startCalendarDate);
  };
  const handleEndCalendarOpen = () => {
    console.log("끝난 날짜 변경 함수 = ", endCalendarDate);
  };

  const onSearch = () => {
      console.log('시작 날짜 = ', format(startCalendarDate, "yyyy-MM-dd HH:mm"));
      console.log('끝난 날짜 = ', format(endCalendarDate, "yyyy-MM-dd HH:mm"));
  }

    const filterEndDateTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        if(startCalendarDate.getTime() < selectedDate.getTime() && currentDate.getTime() > selectedDate.getTime()) return true;

    }

    const filterStartDateTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        if(currentDate.getTime() > selectedDate.getTime()) return true;

    }

  return (
    <div className="custom-calendar-container">
      {/* 시작 달력 */}
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="custom-calendar__header-container">
            <p className="custom-calendar__header-title">시작 날짜 선택</p>
            <div className="custom-calendar__header-content">
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {"<"}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {">"}
              </button>
            </div>
          </div>
        )}
        locale={ko}
        dateFormat="yyyy-MM-dd aa hh:mm"
        selected={startCalendarDate}
        calendarClassName="custom-calendar" // Custom calendar class name
        showTimeSelect
        timeCaption="시간"
        onChange={(date) => setStartCalendarDate(date)}
        onCalendarOpen={handleStartCalendarOpen}
        maxDate={new Date()}
        filterTime={filterStartDateTime}
      />

      {/* 끝 달력 */}
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="custom-calendar__header-container">
            <p className="custom-calendar__header-title">끝 날짜 선택</p>
            <div className="custom-calendar__header-content">
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {"<"}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {">"}
              </button>
            </div>
          </div>
        )}
        locale={ko}
        dateFormat="yyyy-MM-dd aa hh:mm"
        selected={endCalendarDate}
        calendarClassName="custom-calendar" // Custom calendar class name
        showTimeSelect
        timeCaption="시간"
        onChange={(date) => setEndCalendarDate(date)}
        onCalendarOpen={handleEndCalendarOpen}
        minDate={startCalendarDate}
        maxDate={new Date()}
        filterTime={filterEndDateTime}
      />
      <button>최근 일주일</button>
      <button>최근 한달</button>
      <button>최근 6개월</button>
      <button onClick={onSearch}>검색</button>
    </div>
  );
};

export default Calendar;
