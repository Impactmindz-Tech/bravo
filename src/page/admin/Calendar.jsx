import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import CreateEventModal from "../../components/Modal/CreateEventModal";
import {
  deleteEventApi,
  getAllEventsApi,
} from "../../utils/service/EventService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
// calendar website
// https://fullcalendar.io/
function Calendar() {
  const eventDataState = useSelector((state) => state.event.event);
  const [calenderModal, setCalenderModal] = useState(false);
  const [currentEventDate, setCurrentEventDate] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [data, setData] = useState([""]);
  const [dataBackup, setDataBackup] = useState([""]);
  //   add events on specific date
  const handleDateClick = (arg) => {
    setCalenderModal(true);
    setData([]);
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
        setDataBackup(data.data);
      }
    }
  };

  const filterData = (id) => {
    return dataBackup.filter((item) => {
      return item.event_id == id;
    });
  };

  // edit events
  const editEvent = (event) => {
    setCalenderModal(true);
    setData(filterData(event.id));
  };

  // delete events
  const deleteEvent = async (event) => {
    const responce = await deleteEventApi({"event_id":event.id});
    try {
      if (responce?.isSuccess) {
        toast.success(responce?.message);
        fetchAllEventsData()
      }
    } catch (error) {
      console.log(error);
    }
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
          dateClick={handleDateClick}
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
        eventDataToUpdate={data}
      />
    </>
  );
}

export default Calendar;
