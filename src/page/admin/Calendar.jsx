import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
// calendar website
// https://fullcalendar.io/
function Calendar() {
  const [eventData, setEventData] = useState([
    {
      title: "Event 1",

      start: "2024-06-23T09:00:00",
      end: "2024-06-23T10:30:00",
    },

    {
      title: "Event 2",
      start: "2024-06-26",
      // end: '2024-06-28'
    },
  ]);
  //   add events on specific date
  const handleDateClick = (arg) => {
    let date = arg.dateStr;
    let eventData = prompt("Enter Event Name to Insert: ");
    if (eventData != null) {
      const newEvent = {
        title: eventData,
        start: date,
      };

      setEventData((prevEvents) => [...prevEvents, newEvent]);
    }
  };
  return (
    <>
        <div className="flex justify-center  mt-8  sm:w-[90%] sm:m-0 h-[90vh] mx-auto sm:h-auto">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            events={eventData}
            // dateClick={(info) => alert('Date: ' + info.dateStr)}
            dateClick={handleDateClick}
            eventContent={(eventInfo) => (
              <div className="p-1 px-2 rounded-md text-sm">
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
              </div>
            )}
          />
        </div>
    </>
  );
}

export default Calendar;
