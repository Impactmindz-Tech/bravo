import { Modal } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { getAllGroup, getAllUser } from "../../utils/service/CommonService";
import {
  createEventApi,
  updateEventApi,
} from "../../utils/service/EventService";
import { createEvent } from "../../utils/validation/FormValidation";
import toast from "react-hot-toast";
import { setEvent } from "../../store/Slice/EventSlice";
import { useDispatch } from "react-redux";

const CreateEventModal = ({
  calenderModal,
  setCalenderModal,
  currentEventDate,
  eventDataToUpdate,
}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [eventId, setEventId] = useState("");
  const [userMemberList, setUserMemberList] = useState([]);
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [group, setGroup] = useState("");

  const [filename, setFileName] = useState("");
  const fetchDashboardData = async () => {
    try {
      const response = await getAllUser();
      setUser(response);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to load dashboard data");
    }
  };

  const fetchGroupData = async () => {
    try {
      const responseGrp = await getAllGroup();
      setGroup(responseGrp);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to load dashboard data");
    }
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(createEvent) });




  
  const [docFile, setDocFile] = useState([]);

  const handleSelect = (userMemberList) => {
    setUserMemberList(userMemberList);
  };

  const handleRemove = (selectedList) => setUserMemberList(selectedList);
  const handleGroupSelect = (groupMemberList) => {
    setGroupMemberList(groupMemberList);
  };

  const handleGroupRemove = (groupMemberList) =>
    setGroupMemberList(groupMemberList);

  const handleFileChange = (event) => {
    setDocFile(event.target.files[0]);
    setFileName("");
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data?.event_title);
    formData.append("description", data?.event_desc);
    formData.append("start_time", startTime);
    formData.append("end_time", data?.event_end);
    formData.append("location", data?.event_location);
    formData.append("cost", data?.event_cost);
    formData.append("event_notes", data?.event_notes);

    // update
    if (eventDataToUpdate.length !== 0) {
      const updatedGroupIDs = JSON.stringify(
        groupMemberList?.map((member) => member.group_id || member.id)
      );

      if (updatedGroupIDs.length === 2) {
        toast.error("Enter Group ID");
        return;
      }
      formData.append("group_id", updatedGroupIDs);
      const updatedUserId = JSON.stringify(
        userMemberList?.map((member) => member.user_id || member.id)
      );
      if (updatedUserId.length === 2) {
        toast.error("Enter User ID");
        return;
      }
      formData.append("user_id", updatedUserId);
      if (docFile.length !== 0) {
        formData.append("event_image", docFile);
      }
      formData.append("event_id", eventId);
      try {
        const responce = await updateEventApi(formData);
        if (responce?.isSuccess) {
          toast.success(responce?.message);
          setCalenderModal(false);
          setDocFile([]);
          dispatch(setEvent(responce));
          reset();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const groupIDs = JSON.stringify(
        groupMemberList?.map((member) => member.id)
      );

      if (groupIDs.length === 2) {
        toast.error("Enter Group ID");
        return;
      }
      formData.append("group_id", groupIDs);
      const userIds = JSON.stringify(
        userMemberList?.map((member) => member.id)
      );

      if (userIds.length === 2) {
        toast.error("Enter User ID");
        return;
      }
      formData.append("user_id", userIds);

      formData.append("event_doc", docFile);
      try {
        const responce = await createEventApi(formData);

        if (responce?.isSuccess) {
          toast.success(responce?.message);
          setCalenderModal(false);
          setDocFile([]);
          dispatch(setEvent(responce));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (currentEventDate) {
      setStartTime(currentEventDate);
    }
  }, [currentEventDate]);

  useEffect(() => {
    fetchDashboardData();
    fetchGroupData();
  }, [groupMemberList, userMemberList]);

  const convertToDateTimeLocal = (datetimeString) => {
    const date = new Date(datetimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  useEffect(() => {
    if (eventDataToUpdate[0]) {
      if (eventDataToUpdate[0].group_id !== null) {
        const trimmedGroupString = eventDataToUpdate[0].group_id
          .trim()
          .slice(1, -1);
        const groupIdArray = trimmedGroupString.split(",").map(Number);
        const filteredGroup = group.data.filter((user) =>
          groupIdArray.includes(user.group_id)
        );
        setGroupMemberList(filteredGroup);
      }

      if (eventDataToUpdate[0].user_id !== null) {
        const trimmedUserString = eventDataToUpdate[0].user_id
          .trim()
          .slice(1, -1);
        const userIdArray = trimmedUserString.split(",").map(Number);
        const filteredUsers = user.data.filter((user) =>
          userIdArray.includes(user.user_id)
        );

        const updatedUsers = filteredUsers.map((user) => ({
          ...user,
          name: user.first_name,
        }));

        setUserMemberList(updatedUsers);
      }

      setEventId(eventDataToUpdate[0]?.event_id);

      setValue("event_title", eventDataToUpdate[0]?.title);
      setValue("event_desc", eventDataToUpdate[0]?.description);
      setValue("event_start", eventDataToUpdate[0]?.start_time);
      setValue("event_end", eventDataToUpdate[0]?.end_time);
      setValue("event_location", eventDataToUpdate[0]?.location);
      setValue("event_cost", eventDataToUpdate[0]?.cost);
      setValue("event_notes", eventDataToUpdate[0]?.event_notes);
      setValue("event_group_id", eventDataToUpdate[0]?.group_id);

      setStartTime(convertToDateTimeLocal(eventDataToUpdate[0].start_time));

      setValue(
        "event_end",
        convertToDateTimeLocal(eventDataToUpdate[0].end_time)
      );

      if (eventDataToUpdate[0].event_doc !== null) {
        const url = eventDataToUpdate[0].event_doc;
        const fileName = url.split("/").pop();
        setFileName(fileName);
      }
    } else {
      reset();
      setFileName("");
      setUserMemberList([]);
      setGroupMemberList([]);
      setGroup("");
      setUser("");
    }
  }, [setValue, reset, eventDataToUpdate, currentEventDate]);
  return (
    <Modal open={calenderModal} onClose={() => setCalenderModal(false)}>
      <div
        className="w-[60vw] absolute top-[50%] left-[50%] bg-white p-8"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_title">
                title<span className="text-red-500 pl-1">*</span>
              </label>
              <input
                type="text"
                name="event_title"
                id="event_title"
                placeholder="title"
                className="input"
                {...register("event_title")}
              />
              <p>{errors?.event_title?.message}</p>
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_desc">
                description
              </label>
              <input
                type="text"
                name="event_desc"
                id="event_desc"
                placeholder="description"
                className="input"
                {...register("event_desc")}
              />
              {/* <p>{errors?.event_desc?.message}</p> */}
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_start">
                start time<span className="text-red-500 pl-1">*</span>
              </label>
              <input
                type="datetime-local"
                name="event_start"
                id="event_start"
                placeholder="start time"
                className="input"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                // {...register("event_start")}
              />
              {/* <p>{errors?.event_start?.message}</p> */}
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_end">
                end time<span className="text-red-500 pl-1">*</span>
              </label>
              <input
                type="datetime-local"
                name="event_end"
                id="event_end"
                placeholder="end time"
                className="input"
                {...register("event_end")}
              />
              <p>{errors?.event_end?.message}</p>
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_location">
                location
              </label>
              <input
                type="text"
                name="event_location"
                id="event_location"
                placeholder="location"
                className="input"
                {...register("event_location")}
              />
              {/* <p>{errors?.event_location?.message}</p> */}
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_cost">
                cost
              </label>
              <input
                type="text"
                name="event_cost"
                id="event_cost"
                placeholder="cost"
                className="input"
                {...register("event_cost")}
              />
              {/* <p>{errors?.event_cost?.message}</p> */}
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_doc">
                event doc <br />
                {}
              </label>
              {filename ? (
                <input
                  type="text"
                  id="file-name"
                  value={filename}
                  readOnly
                  onClick={() => setFileName("")}
                />
              ) : (
                <input
                  type="file"
                  name="event_doc"
                  id="event_doc"
                  placeholder="event doc"
                  className="input"
                  onChange={handleFileChange}
                />
              )}
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_notes">
                event notes
              </label>
              <input
                type="text"
                name="event_notes"
                id="event_notes"
                placeholder="event notes"
                className="input"
                {...register("event_notes")}
              />
              {/* <p>{errors?.event_notes?.message}</p> */}
            </div>

            {/* group id */}
            <div className="flex flex-col w-[30%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="groupId">
                Group id<span className="text-red-500 pl-1">*</span>
              </label>
              <Multiselect
                options={group.data?.map((group) => ({
                  name: group.name,
                  id: group.group_id,
                }))}
                selectedValues={groupMemberList}
                onSelect={handleGroupSelect}
                onRemove={handleGroupRemove}
                displayValue="name"
                placeholder="Group Name"
                style={{
                  multiselectContainer: { width: "100%" },
                  searchBox: { width: "100%" },
                }}
              />
            </div>

            {/* user id */}
            <div className="flex flex-col w-[30%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="userIdId">
                User id<span className="text-red-500 pl-1">*</span>
              </label>
              <Multiselect
                options={user.data?.map((user) => ({
                  name: user.first_name ? user.first_name.toLowerCase() : "", // Check if first_name exists before calling toLowerCase()
                  id: user.user_id,
                }))}
                selectedValues={userMemberList}
                onSelect={handleSelect}
                onRemove={handleRemove}
                displayValue="name"
                placeholder="User Name"
                style={{
                  multiselectContainer: { width: "100%" },
                  searchBox: { width: "100%" },
                }}
              />
            </div>
          </div>
          <div className="flex justify-end mr-9 gap-2 sm:mr-0 sm:justify-center">
            {eventDataToUpdate.length !== 0 ? (
              <button className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]">
                {"Update"}
              </button>
            ) : (
              <button className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]">
                {"Save"}
              </button>
            )}

            <button
              className="border border-black bg-white text-black font-semibold rounded-lg focus:outline-none"
              onClick={() => setCalenderModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateEventModal;
