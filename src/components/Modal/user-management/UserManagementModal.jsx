import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import AddRelativeModal from "../AddRelativeModal";
import { Modal } from "@mui/material";
import { DashboardApi } from "../../../utils/service/DashboardService";
import { setUser } from "../../../store/Slice/UserSlice";
import { Country, State, City } from "country-state-city";
import { CreateUser, EditUser, getAllRoles } from "../../../utils/service/DashboardService";
import { createUser } from "../../../utils/validation/FormValidation";
import toast from "react-hot-toast";
import { getAdminRolesApi, getAllGroup } from "../../../utils/service/CommonService";
import Multiselect from "multiselect-react-dropdown";
const scaleTranslateInStyle = {
  animation: "scaleTranslateIn 0.5s ease-in-out",
};

const scaleTranslateOutStyle = {
  animation: "scaleTranslateOut 0.5s ease-in-out",
};
// eslint-disable-next-line react/prop-types
const UserManagementModal = ({ addAdminModalOpen, setAddAdminModalOpen, items, onUserCreated }) => {
  const admindetails = useSelector((state) => state.admindetails.data);
  console.log(admindetails);
  const [selectedFile, setSelectedFile] = useState(null);
  const currentDate = new Date().toISOString().split("T")[0];
  const [addRelativeModalOpen, setAddRelativeModalOpen] = useState(false);
  const [group, setGroup] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const [memberList, setMemberList] = useState([]);
  const fileInputRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [adminState, setAdminState] = useState(false);
  const [show, setShow] = useState(addAdminModalOpen);
  useEffect(() => {
    if (addAdminModalOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }
  }, [addAdminModalOpen]);

  // fetching data for country,state city
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);
  // country select
  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.isoCode));
    } else {
      setStates([]);
    }

    if (!items) {
      setSelectedState("");
      setSelectedCity("");
    }
  }, [selectedCountry]);
  // state select
  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode));
    } else {
      if (!items) setCities([]);
    }
    if (!items) {
      setSelectedCity("");
    }
  }, [selectedState]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(createUser) });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  const getAllGroups = async () => {
    try {
      const response = await getAllGroup();
      if (response?.isSuccess) {
        setGroup(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllRoless = async () => {
    try {
      const response = await getAllRoles();
      const responses = await getAdminRolesApi();
      const mergedRoles = [...response.data, ...responses.data];
      setRole(mergedRoles);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllGroups();
    getAllRoless();
  }, []);

  useEffect(() => {
    if (items) {
      if (items.profile_picture) {
        const filename = items.profile_picture.split("/").pop();
        setSelectedFile({ name: filename });
      } else {
        setSelectedFile(null);
      }
      setValue("first_name", items?.first_name || "");
      setValue("last_name", items?.last_name);
      setValue("username", items?.username);
      setValue("phone", items?.phone);
      setValue("dob", items?.date_of_birth);
      setValue("age", items?.age);
      setValue("address", items?.address);
      setValue("postal_code", items?.postal_code);
      setValue("role_id", items?.role_name);
      setValue("password", items?.password);
      setValue("group_id", items?.group_id);
      setValue("email", items?.email);
      setValue("notes", items?.notes);
      setValue("username", items?.username);

      const formattedMembers =
        items?.groups?.map((member) => ({
          name: member.name,
          id: member.group_id,
        })) || [];

      setMemberList(formattedMembers);
      let countryName = Country.getAllCountries().filter((item) => item.name.toLowerCase() === items.country.toLowerCase());
      setSelectedCountry(countryName[0]);

      if (items.state !== null && items.state !== "") {
        let statesSet = State.getStatesOfCountry(countryName[0].isoCode).filter((item) => item.name.toLowerCase() === items.state.toLowerCase());
        setSelectedState(statesSet[0]);
        if (items.suburb !== null && items.suburb !== "") {
          let citiesSet = City.getCitiesOfState(countryName[0].isoCode, statesSet[0].isoCode).filter((item) => item.name.toLowerCase() === items.suburb.toLowerCase());
          setSelectedCity(citiesSet[0]);
        }
      }
    } else {
      reset();
      setSelectedFile(null);
      setSelectedCountry({
        name: "Australia",
        isoCode: "AU",
        flag: "🇦🇺",
        phonecode: "61",
        currency: "AUD",
        latitude: "-27.00000000",
        longitude: "133.00000000",
        timezones: [
          {
            zoneName: "Antarctica/Macquarie",
            gmtOffset: 39600,
            gmtOffsetName: "UTC+11:00",
            abbreviation: "MIST",
            tzName: "Macquarie Island Station Time",
          },
          {
            zoneName: "Australia/Adelaide",
            gmtOffset: 37800,
            gmtOffsetName: "UTC+10:30",
            abbreviation: "ACDT",
            tzName: "Australian Central Daylight Saving Time",
          },
          {
            zoneName: "Australia/Brisbane",
            gmtOffset: 36000,
            gmtOffsetName: "UTC+10:00",
            abbreviation: "AEST",
            tzName: "Australian Eastern Standard Time",
          },
          {
            zoneName: "Australia/Broken_Hill",
            gmtOffset: 37800,
            gmtOffsetName: "UTC+10:30",
            abbreviation: "ACDT",
            tzName: "Australian Central Daylight Saving Time",
          },
          {
            zoneName: "Australia/Currie",
            gmtOffset: 39600,
            gmtOffsetName: "UTC+11:00",
            abbreviation: "AEDT",
            tzName: "Australian Eastern Daylight Saving Time",
          },
          {
            zoneName: "Australia/Darwin",
            gmtOffset: 34200,
            gmtOffsetName: "UTC+09:30",
            abbreviation: "ACST",
            tzName: "Australian Central Standard Time",
          },
          {
            zoneName: "Australia/Eucla",
            gmtOffset: 31500,
            gmtOffsetName: "UTC+08:45",
            abbreviation: "ACWST",
            tzName: "Australian Central Western Standard Time (Unofficial)",
          },
          {
            zoneName: "Australia/Hobart",
            gmtOffset: 39600,
            gmtOffsetName: "UTC+11:00",
            abbreviation: "AEDT",
            tzName: "Australian Eastern Daylight Saving Time",
          },
          {
            zoneName: "Australia/Lindeman",
            gmtOffset: 36000,
            gmtOffsetName: "UTC+10:00",
            abbreviation: "AEST",
            tzName: "Australian Eastern Standard Time",
          },
          {
            zoneName: "Australia/Lord_Howe",
            gmtOffset: 39600,
            gmtOffsetName: "UTC+11:00",
            abbreviation: "LHST",
            tzName: "Lord Howe Summer Time",
          },
          {
            zoneName: "Australia/Melbourne",
            gmtOffset: 39600,
            gmtOffsetName: "UTC+11:00",
            abbreviation: "AEDT",
            tzName: "Australian Eastern Daylight Saving Time",
          },
          {
            zoneName: "Australia/Perth",
            gmtOffset: 28800,
            gmtOffsetName: "UTC+08:00",
            abbreviation: "AWST",
            tzName: "Australian Western Standard Time",
          },
          {
            zoneName: "Australia/Sydney",
            gmtOffset: 39600,
            gmtOffsetName: "UTC+11:00",
            abbreviation: "AEDT",
            tzName: "Australian Eastern Daylight Saving Time",
          },
        ],
      });
      setSelectedState("");
      setMemberList([]);
      setSelectedCity("");
    }
  }, [items, reset, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data?.first_name);
    formData.append("last_name", data?.last_name);
    formData.append("username", data?.email);
    formData.append("phone", data?.phone);
    formData.append("dob", data?.dob);
    formData.append("age", data?.age);
    formData.append("address", data?.address);
    formData.append("username", data?.username);
    formData.append("postal_code", data?.postal_code);
    formData.append("role_id", data?.role_id);
    formData.append("email", data?.email);
    formData.append("notes", data?.notes);
    formData.append("gender", data?.Gender);
    if (memberList.length === 0) {
      toast.error("Please select at least one group");
      return;
    }

    const memberIds = JSON.stringify(memberList.map((member) => member.id));
    formData.append("group_id", memberIds);

    if (selectedCountry.length == 0) {
      toast.error("Select Country Name");
      return;
    }
    if (selectedCity == "" || selectedCity.length == 0) {
      formData.append("suburb", null);
    } else {
      formData.append("suburb", selectedCity.name);
    }
    if (selectedState == "" || selectedState.length == 0) {
      formData.append("state", null);
    } else {
      formData.append("state", selectedState.name);
    }
    formData.append("country", selectedCountry.name);

    if (items?.profile_picture) {
      const filename = items.profile_picture.split("/").pop();
      const result = selectedFile.name === filename;

      if (result == false) {
        formData.append("profile_pic", selectedFile);
      }
    } else {
      if (selectedFile !== null) {
        formData.append("profile_pic", selectedFile);
      }
    }

    if (items?.user_id) {
      formData.append("user_id", items?.user_id);
      try {
        const responce = await EditUser(formData);
        if (responce?.isSuccess) {
          toast.success(responce?.message);

          reset();
          setMemberList([]);
          setSelectedFile(null);
          const response = await DashboardApi({ page: 1, items_per_page: 10 });
          if (response?.isSuccess) {
            dispatch(setUser(response));
            setAddAdminModalOpen(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (data.password == "") {
          toast.error("Password is required");
          return;
        }
        formData.append("password", data?.password);
        // profile_picture
        const response = await CreateUser(formData);
        if (response?.isSuccess) {
          toast.success(response?.message);
          onUserCreated();
          reset();
          setSelectedFile(null);
          setMemberList([]);
          setAddAdminModalOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlemodalClose = () => {
    if (!items) {
      reset();
      setAddAdminModalOpen(false);
    } else {
      setAddAdminModalOpen(false);
    }
  };

  const handleSelect = (selectedList) => setMemberList(selectedList);

  const handleRemove = (selectedList) => setMemberList(selectedList);
  const calculateAge = (dob) => {
    const currentDate = new Date();
    const dobDate = new Date(dob);
    const diffInMilliseconds = currentDate - dobDate;
    const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // use 365.25 to account for leap years
    const age = Math.floor(diffInYears);
    setValue("age", age);
  };

  const calulateAgeError = () => {
    toast.error("Please enter your date of birth (DOB) ");
  };
  return (
    <>
      <Modal open={addAdminModalOpen} onClose={handlemodalClose} className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-opacity-50 ">
        <div style={show ? scaleTranslateInStyle : scaleTranslateOutStyle} className="rounded-lg relative h-[600px] overflow-y-auto mt-6 sm:h-[70vh] mainFormSection md:h-[80vh] lg:h-[60vh] xl:h-[70vh]  2xl:h-[75vh] 4xl:h-[60vh]">
          <div className="relative w-[100%] max-w-[55vw] sm:max-w-[100vw] md:max-w-[100vw] lg:max-w-[70vw] xl:max-w-[65vw] 2xl:max-w-[60vw] 3xl:max-w-[65vw] 4xl:max-w-[65vw] mx-auto rounded-lg overflow-hidden sm:w-[90vw] md:w-[90vw] lg:w-[96vw]">
            <div className="relative w-full bg-white rounded-lg shadow-md pb-2 rounded-t-lg">
              <div className="flex justify-between items-center bg-blue-900 py-2 4xl:border-r-primary  fixed z-50  w-[100%] max-w-[55vw] sm:max-w-[100vw] md:max-w-[100vw] lg:max-w-[70vw] xl:max-w-[65vw] 2xl:max-w-[60vw] 3xl:max-w-[65vw] 4xl:max-w-[65vw] mx-auto  overflow-hidden sm:w-[90vw] md:w-[90vw] lg:w-[96vw]">
                <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">{items == null ? " Add User" : " Edit User"}</h2>
                <button onClick={handlemodalClose} className="text-red text-white hover:text-gray-900 hover:outline-none border-none outline-none bg-blue-900 text-lg">
                  <IoMdClose />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="p-8 flex flex-col gap-y-4 w-full py-20 rounded-t-full">
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-gray-500">
                      Choose Group <span className="text-red-500">*</span>
                    </h1>

                    <div className="w-[100%] list-none">
                      <Multiselect
                        options={group?.data?.map((user) => ({ name: user.name, id: user.group_id }))}
                        selectedValues={memberList}
                        onSelect={handleSelect}
                        onRemove={handleRemove}
                        displayValue="name"
                        placeholder="Members Name"
                        style={{
                          multiselectContainer: { width: "100%" },
                          searchBox: { width: "100%" },
                        }}
                      />
                    </div>

                    {/* <div>
                      <select name="groupSection" placeholder="select group" className="input w-full" {...register("group_id")}>
                        <option value="">Select group</option>
                        {group?.data?.map((item, index) => (
                          <option key={index} value={item.group_id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div> */}

                    {/* <p className="text-danger">{errors?.group_id?.message}</p> */}
                  </div>

                  <div className="flex gap-3">
                    {role.length !== 0 && (
                      <>
                        {" "}
                        {role?.map((item, index) => {
                          return (
                            <div className="flex items-center" key={index}>
                              <input type="radio" value={item.role_id} name="role_id" className="form-radio border-2 border-yellow-400 rounded-full appearance-none h-6 w-6 checked:bg-blue-900 checked:border-transparent" {...register("role_id")} defaultChecked={item.role_name == items?.role_name} />
                              <span className="ml-2 text-gray-700">{item.role_name}</span>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                  <p className="text-danger">{errors?.role_id?.message}</p>

                  {/* file upload section */}

                  <div className="flex gap-3 flex-wrap">
                    <h4 className="text-blue-300 pt-2 sm:text-sm ">Profile Picture</h4>
                    <div className="flex w-[90%] 3xl:w-full  items-center border border-[#c9c9c9] rounded-lg py-1 px-2 sm:flex-col sm:gap-y-1">
                      <label htmlFor="file-upload" className="flex items-center bg-blue-900 text-white  px-4 py-1 rounded-lg cursor-pointer font-semibold sm:w-[100%]">
                        <FiUpload className="font-semibold mr-1" />
                        Upload
                      </label>
                      <input id="file-upload" type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                      {selectedFile && (
                        <div className="flex justify-between items-center bg-blue-300 rounded-full ml-2 px-4 sm:justify-center sm:w-[100%] sm:ml-0 ">
                          <span className="text-sm pl-2">{selectedFile.name.length <= 22 ? <>{selectedFile.name}</> : <>{selectedFile.name.substring(0, 22) + "." + selectedFile.name.split(".").pop()}</>}</span>
                          <button onClick={handleRemoveFile} className="text-black text-sm bg-transparent border-none">
                            <IoIosCloseCircleOutline className="text-lg bg-none" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap list-none mt-6 gap-6">
                    {/* <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="authrization_code">
                        {" "}
                        Authentication Code <span className="text-red-500 pl-1">*</span>
                      </label>
                      <input type="number" name="authrization_code" id="authrization_code" placeholder="385555" className="input" {...register("authrization_code")} />
                      <p>{errors?.authrization_code?.message}</p>
                    </div> */}

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="email">
                        Email Id
                      </label>
                      <input type="text" name="email" id="email" className="input" {...register("email")} />
                      <p>{errors?.email?.message}</p>
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="email">
                        username <span className="text-red-500 pl-1">*</span>
                      </label>
                      <input type="text" name="email" id="email" className="input" {...register("username")} />
                      <p>{errors?.username?.message}</p>
                    </div>
                    {items == null && (
                      <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                        <label className="text-blue-300 text-sm" htmlFor="password">
                          password
                        </label>
                        <input type="text" name="password" id="password" placeholder="Password" className="input" {...register("password")} />
                        <p>{errors?.password?.message}</p>
                      </div>
                    )}
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="first_name">
                        First Name<span className="text-red-500 pl-1"> *</span>{" "}
                      </label>
                      <input type="text" name="first_name" id="first_name" placeholder="Wade" className="input" {...register("first_name")} />
                      <p>{errors?.first_name?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="last_name">
                        Last Name<span className="text-red-500 pl-1"> *</span>{" "}
                      </label>
                      <input type="text" name="last_name" id="last_name" placeholder="Willams" className="input" {...register("last_name")} />
                      <p>{errors?.last_name?.message}</p>
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="Gender">
                        Gender<span className="text-red-500 pl-1">*</span>{" "}
                      </label>
                      <select name="Gender" className="input" id="Gender" {...register("Gender")}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <p>{errors?.Gender?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="phone">
                        Contact No
                      </label>
                      <input type="number" name="phone" id="phone" className="input" {...register("phone")} />
                      <p>{errors?.phone?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="dob">
                        DOB<span className="text-red-500 pl-1">*</span>
                      </label>
                      <input type="date" name="dob" id="dob" max={currentDate} className="input" {...register("dob")} onChange={(e) => calculateAge(e.target.value)} />
                      <p>{errors?.dob?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]" onClick={() => calulateAgeError()}>
                      <label className="text-blue-300 text-sm" htmlFor="Age">
                        Age<span className="text-red-500 pl-1">*</span>
                      </label>
                      <input type="number" name="Age" id="Age" className="input" {...register("age")} readOnly />
                      <p>{errors?.Age?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="address">
                        Address<span className="text-red-500 pl-1">*</span>
                      </label>
                      <input type="text" name="address" id="address" className="input" {...register("address")} />
                      <p>{errors?.address?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label htmlFor="country" className="text-blue-300 text-sm">
                        Country <span className="text-red-500 pl-1">*</span>
                      </label>
                      <select
                        id="country"
                        value={selectedCountry.name || ""}
                        onChange={(e) => {
                          const country = countries.find((country) => country.name === e.target.value);
                          setSelectedCountry(country);
                        }}
                        className="input"
                      >
                        {selectedState !== "" ? <option value={selectedCountry.name}>{selectedCountry.name}</option> : <option value="">Select Country</option>}
                        {countries.map((country) => (
                          <option key={country?.isoCode} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="state">
                        State
                      </label>
                      <select
                        id="state"
                        value={selectedState.name || ""}
                        onChange={(e) => {
                          const state = states.find((state) => state.name === e.target.value);
                          setSelectedState(state);
                        }}
                        disabled={!selectedCountry}
                        className="input"
                      >
                        {selectedState !== "" ? <option value={selectedState?.name}>{selectedState?.name}</option> : <option value="">Select State</option>}
                        {states.map((state) => (
                          <option key={state?.isoCode} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="city">
                        Suburb
                      </label>
                      <select
                        id="city"
                        className="input"
                        value={selectedCity.name || ""}
                        onChange={(e) => {
                          const city = cities.find((city) => city.name === e.target.value);
                          setSelectedCity(city);
                        }}
                        disabled={!selectedState}
                      >
                        {selectedCity !== "" ? <option value={selectedCity?.name}>{selectedCity?.name}</option> : <option value="">Select suburb</option>}

                        {cities.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>{" "}
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="Action">
                        Action
                      </label>
                      <select name="Action" id="Action" className="input">
                        <option value="">Adult</option>
                        <option value="">Teen</option>
                        <option value="">Old</option>
                      </select>
                      {/* <p>{errors?.Action?.message}</p> */}
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="postal_code">
                        Postal Code <span className="text-red-500 pl-1">*</span>
                      </label>
                      <input type="number" name="postal_code" id="postal_code" className="input" {...register("postal_code")} />
                      <p>{errors?.postal_code?.message}</p>
                    </div>
                  </div>

                  <div className="flex w-full flex-col space-y-2">
                    <h1 className="text-gray-500">Notes</h1>
                    <input type="text" name="Authentication_Code" className="input" placeholder="Add Text Here" {...register("notes")} />
                  </div>

                  {/* <div className="flex text gap-3 mt-3 sm:flex-col">
                    <span className="text-md font-medium text-blue-300 pt-2">
                      Relative Details
                    </span>
                    <button
                      className="flex justify-center text-center gap-3 bg-blue-900 text-white"
                      onClick={() => setAddRelativeModalOpen(true)}
                    >
                      <i className="text-lg pt-1">
                        {" "}
                        <IoIosAddCircleOutline />
                      </i>{" "}
                      Add Relative
                    </button>
                  </div> */}
                </div>

                <div className="flex justify-end mr-9 gap-2 sm:mr-0 sm:justify-center">
                  <button className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]">{items ? "Update" : "Save"}</button>
                  <button onClick={handlemodalClose} className="border border-black bg-white text-black font-semibold rounded-lg focus:outline-none">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex items-center">
        <AddRelativeModal addRelativeModalOpen={addRelativeModalOpen} setAddRelativeModalOpen={setAddRelativeModalOpen} />
      </div>
    </>
  );
};

export default UserManagementModal;
