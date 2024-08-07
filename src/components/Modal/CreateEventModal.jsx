import { Modal } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { IoMdClose } from "react-icons/io";

import { getAllGroup, getAllUser } from "../../utils/service/CommonService";
import { createEventApi, updateEventApi } from "../../utils/service/EventService";
import { createEvent } from "../../utils/validation/FormValidation";
import toast from "react-hot-toast";
import { setEvent } from "../../store/Slice/EventSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const scaleTranslateInStyle = {
  animation: "scaleTranslateIn 0.5s ease-in-out",
};

const scaleTranslateOutStyle = {
  animation: "scaleTranslateOut 0.5s ease-in-out",
};
const CreateEventModal = ({ calenderModal, setCalenderModal, currentEventDate, eventDataToUpdate }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [eventId, setEventId] = useState("");
  const [userMemberList, setUserMemberList] = useState([]);
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [docList, setDocList] = useState([]);
  const [group, setGroup] = useState("");
  const [filename, setFileName] = useState("");
  const [show, setShow] = useState(calenderModal);
  const [docFile, setDocFile] = useState([]);
  const [otherSelectedFiles, setOtherSelectedFiles] = useState([]);
  const otherImage = useRef(null);

  useEffect(() => {
    if (calenderModal) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }
  }, [calenderModal]);

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

  const handleSelect = (userMemberList) => {
    setUserMemberList(userMemberList);
  };

  const handleRemove = (selectedList) => setUserMemberList(selectedList);
  const handleGroupSelect = (groupMemberList) => {
    setGroupMemberList(groupMemberList);
  };

  const handleGroupRemove = (groupMemberList) => setGroupMemberList(groupMemberList);
  const handleFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Extract existing file names from otherSelectedFiles
      const existingFileNames = new Set(otherSelectedFiles.map((file) => file.name));

      // Filter out files that already exist
      const newFiles = files.filter((file) => !existingFileNames.has(file.name));

      // Generate unique IDs for new files
      const fileData = newFiles.map((file, index) => ({
        name: file.name,
        id: `${Date.now()}-${index}`, // Unique ID based on timestamp and index
        url: URL.createObjectURL(file), // Generate preview URL
      }));

      // Update state with new files
      setOtherSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setDocList((prevList) => [...prevList, ...fileData]);
    }
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
      // Convert docList to the format of otherSelectedFiles

      // Merge and remove duplicates based on 'name'
      // Create a set of file names from otherSelectedFiles
      const otherSelectedFileNames = new Set(otherSelectedFiles.map((file) => file.name));

      // Filter docList to exclude files with names already in otherSelectedFiles
      const filteredDocList = docList.filter((file) => !otherSelectedFileNames.has(file.name));

      // Format filteredDocList to match the structure of otherSelectedFiles
      const formattedDocList = filteredDocList.map((file) => ({
        name: file.name,
      }));

      const formattedDocListArray = formattedDocList?.map((file) => file.name);
      for (let index = 0; index < otherSelectedFiles.length; index++) {
        formData.append(`event_doc[${index}]`, otherSelectedFiles[index]);
      }

      let count = 1;
      for (let index = 0; index < formattedDocListArray.length; index++) {
        formData.append(`event_doc[${count}]`, `[${formattedDocListArray[index]}]`);
        count++;
      }

      // if (docFile.length !== 0) {
      //   formData.append("event_image", docFile);
      // }
      const updatedGroupIDs = JSON.stringify(groupMemberList?.map((member) => member.group_id || member.id));

      if (updatedGroupIDs.length === 2) {
        toast.error("Enter Group ID");
        return;
      }
      formData.append("group_id", updatedGroupIDs);
      const updatedUserId = JSON.stringify(userMemberList?.map((member) => member.user_id || member.id));
      if (updatedUserId.length === 2) {
        toast.error("Enter User ID");
        return;
      }
      formData.append("user_id", updatedUserId);
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
      for (let index = 0; index < otherSelectedFiles.length; index++) {
        formData.append(`event_doc[${index}]`, otherSelectedFiles[index]);
      }

      const groupIDs = JSON.stringify(groupMemberList?.map((member) => member.id));

      if (groupIDs.length === 2) {
        toast.error("Enter Group ID");
        return;
      }
      formData.append("group_id", groupIDs);
      const userIds = JSON.stringify(userMemberList?.map((member) => member.id));

      if (userIds.length === 2) {
        toast.error("Enter User ID");
        return;
      }
      formData.append("user_id", userIds);

      // formData.append("event_doc", eventFilesDoc);
      for (let index = 0; index < otherSelectedFiles.length; index++) {
        // const element = array[index];
      }

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
      setDocList([]);
      if (eventDataToUpdate[0].group_id !== null) {
        const trimmedGroupString = eventDataToUpdate[0].group_id.trim().slice(1, -1);
        const groupIdArray = trimmedGroupString.split(",").map(Number);
        const filteredGroup = group.data.filter((user) => groupIdArray.includes(user.group_id));
        setGroupMemberList(filteredGroup);
      }

      if (eventDataToUpdate[0].user_id !== null) {
        const trimmedUserString = eventDataToUpdate[0].user_id.trim().slice(1, -1);
        const userIdArray = trimmedUserString.split(",").map(Number);
        const filteredUsers = user.data.filter((user) => userIdArray.includes(user.user_id));

        const updatedUsers = filteredUsers.map((user) => ({
          ...user,
          name: user.email,
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
      setValue("event_end", convertToDateTimeLocal(eventDataToUpdate[0].end_time));

      if (eventDataToUpdate[0].event_doc !== null) {
        const newFilesArray = JSON.parse(eventDataToUpdate[0]?.event_doc);
        const fileData = newFilesArray.map((file, index) => ({
          name: file,
          id: `${Date.now()}-${index}`, // Unique ID based on timestamp and index
        }));
        setDocList((prevDocList) => [...prevDocList, ...fileData]);
      }
    } else {
      reset();
      if (otherImage.current) {
        otherImage.current.value = ""; // Clear the file input
      }
      setDocList([]);
      setDocFile([]);
      setUserMemberList([]);
      setGroupMemberList([]);
      setGroup("");
      setUser("");
    }
  }, [setValue, reset, eventDataToUpdate, currentEventDate]);
  // handle files lists
  const options = docList.map((file) => ({
    name: file.name,
    id: file.id,
    url: file.url,
  }));

  const selectedValues = docList.map((file) => ({
    name: file.name,
    id: file.id,
    url: file.url,
  }));

  const handlDocFileSelect = (selectedList) => {
    setDocList(selectedList);
  };

  const handlDocFileSelectRemove = (selectedList, removedItem) => {
    setDocList(selectedList);
    setOtherSelectedFiles((prevFiles) => prevFiles.filter((file) => file.name !== removedItem.name));
    if (otherImage.current) {
      otherImage.current.value = ""; // Clear the file input
    }
  };

  const handleItemClick = (e, file) => {
    console.log("click");
    e.stopPropagation(); // Prevent the dropdown from closing
    window.open(file.url, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <Modal open={calenderModal} onClose={() => setCalenderModal(false)} className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-opacity-50 ">
        <div style={show ? scaleTranslateInStyle : scaleTranslateOutStyle} className="h-auto overflow-y-auto mt-6 sm:h-[70vh] mainFormSection md:h-[80vh] lg:h-[60vh] xl:h-[70vh]  2xl:h-[75vh] ">
          <div className="relative  w-[100%] max-w-[55vw] sm:max-w-[100vw] md:max-w-[100vw] lg:max-w-[70vw] xl:max-w-[65vw] 2xl:max-w-[60vw] 3xl:max-w-[65vw] 4xl:max-w-[65vw] mx-auto rounded-lg overflow-hidden sm:w-[90vw] md:w-[90vw] lg:w-[96vw]">
            <div className="relative w-full bg-white rounded-lg shadow-md pb-2 ">
              <div className="flex w-full justify-between items-center bg-blue-900 py-2 4xl:border-r-primary">
                <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">{eventDataToUpdate[0] == null ? " Add Event" : " Edit Event"}</h2>
                <button onClick={() => setCalenderModal(false)} className="text-red text-white hover:text-gray-900 hover:outline-none border-none outline-none bg-blue-900 text-lg">
                  <IoMdClose />
                </button>
              </div>

              <div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="flex p-4 items-center gap-4 flex-wrap">
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="event_title">
                        title<span className="text-red-500 pl-1">*</span>
                      </label>
                      <input type="text" name="event_title" id="event_title" placeholder="title" className="input w-full" {...register("event_title")} />
                      <p>{errors?.event_title?.message}</p>
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="event_desc">
                        description
                      </label>
                      <input type="text" name="event_desc" id="event_desc" placeholder="description" className="input w-full" {...register("event_desc")} />
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
                        className="input w-full"
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
                      <input type="datetime-local" name="event_end" id="event_end" placeholder="end time" className="input w-full" {...register("event_end")} />
                      <p>{errors?.event_end?.message}</p>
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="event_location">
                        location
                      </label>
                      <input type="text" name="event_location" id="event_location" placeholder="location" className="input w-full" {...register("event_location")} />
                      {/* <p>{errors?.event_location?.message}</p> */}
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="event_cost">
                        cost
                      </label>
                      <input type="text" name="event_cost" id="event_cost" placeholder="cost" className="input w-full" {...register("event_cost")} />
                      {/* <p>{errors?.event_cost?.message}</p> */}
                    </div>

                    <div className="relative flex w-full flex-wrap gap-2">
                      <div className="relative flex flex-col w-[45%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                        <label className="text-blue-300 text-sm" htmlFor="event_doc">
                          event doc <br />
                          {}
                        </label>

                        <input type="file" ref={otherImage} name="event_doc" id="event_doc" placeholder="event doc" className="input w-full" multiple onChange={handleFileChange} />

                        {/* {eventDocUrl !== "" && (
                        <p className="absolute -bottom-6 left-0 w-full text-center font-medium hover:text-[#12141b] text-[#2a2f3e]">
                          <Link to={eventDocUrl} target="_blank">
                            View Event Doc
                          </Link>
                        </p>
                      )} */}
                      </div>

                      <div className="flex flex-col w-full">
                        <label className="text-blue-300 text-sm" htmlFor="groupId">
                          Selected Docs<span className="text-red-500 pl-1">*</span>
                        </label>
                        <div className="relative">
                          <Multiselect
                            options={options}
                            selectedValues={selectedValues}
                            onSelect={handlDocFileSelect}
                            onRemove={handlDocFileSelectRemove}
                            displayValue="name"
                            placeholder="Event Doc Files Preview"
                            listProps={{
                              maxHeight: 200, // Set the maximum height of the dropdown list
                            }}
                            style={{
                              multiselectContainer: {
                                width: "100%",
                                maxHeight: "11vh",
                                overflowY: "auto",
                              },
                              searchBox: { width: "100%" },
                            }}
                            customCloseIcon={<span style={{ cursor: "pointer", color: "red" }}>&times;</span>}
                            customChipRenderer={(selectedItem, handleRemove) => (
                              <div
                                key={selectedItem.id}
                                style={{
                                  display: "inline-block",
                                  padding: "5px 10px",
                                  margin: "5px",
                                  backgroundColor: "#f1f1f1",
                                  borderRadius: "3px",
                                }}
                              >
                                <span
                                  style={{
                                    cursor: "pointer",
                                    color: "blue",
                                    textDecoration: "underline",
                                  }}
                                  onClick={(e) => handleItemClick(e, selectedItem)}
                                >
                                  {selectedItem.name}
                                </span>
                                <span
                                  style={{
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                    color: "red",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(selectedItem);
                                  }}
                                >
                                  &times;
                                </span>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    {/* group id */}
                    <div className="flex flex-col w-[45%] gap-y-2 sm:w-[100%] lg:w-[45%]">
                      <label className="text-blue-300 text-sm" htmlFor="groupId">
                        Group id<span className="text-red-500 pl-1">*</span>
                      </label>
                      <Multiselect
                        options={group?.data?.map((group) => ({
                          name: group.name,
                          id: group.group_id,
                        }))}
                        selectedValues={groupMemberList}
                        onSelect={handleGroupSelect}
                        onRemove={handleGroupRemove}
                        displayValue="name"
                        placeholder="Group Name"
                        listProps={{
                          maxHeight: 200, // adjust this value as needed
                        }}
                        style={{
                          multiselectContainer: { width: "100%" },
                          searchBox: { width: "100%" },
                        }}
                      />
                    </div>

                    {/* user id */}
                    <div className="flex flex-col w-[45%] gap-y-2 sm:w-[100%] lg:w-[45%]">
                      <label className="text-blue-300 text-sm" htmlFor="userIdId">
                        User id<span className="text-red-500 pl-1">*</span>
                      </label>
                      <Multiselect
                        options={user?.data?.map((user) => ({
                          name: user.email ? user.email.toLowerCase() : "", // Check if email exists before calling toLowerCase()
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

                    <div className="flex flex-col w-[100%] gap-y-2">
                      <label className="text-blue-300 text-sm" htmlFor="event_notes">
                        event notes
                      </label>

                      <textarea name="event_notes" id="event_notes" placeholder="event notes" className="input w-full h-[20vh] resize-none" {...register("event_notes")}></textarea>
                    </div>
                  </div>
                  <div className="flex justify-end mr-9 gap-2 sm:mr-0 sm:justify-center">
                    {eventDataToUpdate?.length !== 0 ? <button className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]">{"Update"}</button> : <button className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]">{"Save"}</button>}

                    <button className="border border-black bg-white text-black font-semibold rounded-lg focus:outline-none" onClick={() => setCalenderModal(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateEventModal;
