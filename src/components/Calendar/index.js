import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const myEvents = [
  // Your events...
];

const MyCalendar = () => {
  return (
    // Use Tailwind CSS to set the calendar to full width and a larger height
    // <div className="w-full h-screen p-4">
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week']}
        className="h-[500px]"  // Tailwind classes for styling
      />
    // </div>
  );
};

export default MyCalendar;
