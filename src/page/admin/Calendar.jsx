import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import CreateEventModal from "../../components/Modal/CreateEventModal";
// calendar website
// https://fullcalendar.io/
function Calendar() {
  const [calenderModal, setCalenderModal] = useState(false);
  const[currentEventDate,setCurrentEventDate]=useState(null)
  const [eventData, setEventData] = useState([
    {
      title: "Event 1",

      start: "2024-06-23",
      end: "2024-06-23",
    },

    {
      title: "Event 2",
      start: "2024-06-26",
      // end: '2024-06-28'
    },
    // {
    //   title: "Event 1",

    //   start: "2024-06-23T09:00:00",
    //   end: "2024-06-23T10:30:00",
    // },
  ]);
  //   add events on specific date
  const handleDateClick = (arg) => {
    setCalenderModal(true);
    let date = arg.dateStr;
    setCurrentEventDate(date)
    
    // let eventData = prompt("Enter Event Name to Insert: ");
    // if (eventData != null && eventData !== "") {
    //   const newEvent = {
    //     title: eventData,
    //     start: date,
    //   };
    //   setEventData((prevEvents) => [...prevEvents, newEvent]);
    // }
  };
  return (
    <>
      <div className="flex justify-center sm:w-[100%] sm:m-0 h-[90vh] mx-auto sm:h-[75vh]">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
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
      <CreateEventModal calenderModal={calenderModal} setCalenderModal={setCalenderModal} currentEventDate={currentEventDate}/>
    </>
  );
}

export default Calendar;
