import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

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
      {/* header section */}
      <Header />

      {/* menu section */}
      <div className="flex justify-start ">
        {/* left nav bar */}
        <NavBar />

        {/* right side section */}
        <div className="flex justify-center mx-4 w-[85vw] my-5 ml-9 h-[80vh]">
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
              <div className=" p-1 px-2 rounded-md text-sm">
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;
