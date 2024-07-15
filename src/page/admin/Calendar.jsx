import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import CreateEventModal from "../../components/Modal/CreateEventModal";
import { getAllEventsApi } from "../../utils/service/EventService";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
// calendar website
// https://fullcalendar.io/
function Calendar() {
  const eventDataState = useSelector((state) => state.event.event);
  const [calenderModal, setCalenderModal] = useState(false);
  const [currentEventDate, setCurrentEventDate] = useState(null);
  const [eventData, setEventData] = useState([]);

  //   add events on specific date
  const handleDateClick = (arg) => {
    setCalenderModal(true);
    let date = arg.dateStr;
    setCurrentEventDate(date);
  };
  

  const fetchAllEventsData = async () => {
    const data = await getAllEventsApi();
    let newData = [];
    if (data) {
      if (data.data.length != 0) {
        data.data.map((item) => {
          newData.push({
            title: item.title,
            start: item.start_time,
            end: item.end_time,
            id: item.event_id,
          });
        });
        setEventData(newData);
      }
    }
  };

  const editEvent = (event) => {
    console.log(`Editing event ID: ${event.id}`);
    // Implement your edit logic here, e.g., open a modal for editing
  };

  // Function to handle deleting an event
  const deleteEvent = (event) => {
    console.log(`Deleting event ID: ${event.id}`);
    // Implement your delete logic here, e.g., show a confirmation dialog
  };
  useEffect(() => {
    fetchAllEventsData();
  }, [eventDataState]);
  return (
    <>
      <div className="flex justify-center sm:w-[100%] sm:m-0 h-[90vh] mx-auto sm:h-[75vh]">
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
          eventContent={(eventInfo) => (
            <div className="p-1 px-2 rounded-md text-sm flex gap-2 items-center justify-between">
              <div>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
              </div>
              <div className="flex">
                <i>
                  <TbEdit
                    className="cursor-pointer  text-lg hover:text-blue-900"
                    title="Edit"
                    onClick={() => editEvent(eventInfo.event)}
                  />
                </i>
                <i>
                  <MdDelete
                    className="cursor-pointer  text-lg hover:text-blue-900"
                    title="Delete"
                    onClick={() => deleteEvent(eventInfo.event)}
                  />
                </i>
              </div>
            </div>
          )}
        />
      </div>
      <CreateEventModal
        calenderModal={calenderModal}
        setCalenderModal={setCalenderModal}
        currentEventDate={currentEventDate}
      />
    </>
  );
}

export default Calendar;
