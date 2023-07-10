import React from "react";
import  DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./_datepicker.scss";

const DatePickerSchedule = ({ startDate, setStartDate }) => {
  const now = new Date();

  return (
    <DatePicker
      className="date-picker-mlbb"
      selected={startDate}
      includeDateIntervals={[
        {
          start: now,
          end: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
        },
      ]}
      showTimeSelect
      timeIntervals={15}
      timeCaption="time"
      dateFormat="dd.MM.yyyy HH:mm"
      onChange={(date = Date) => setStartDate(date)}
    />
  );
};

export default DatePickerSchedule;

/*() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};*/
