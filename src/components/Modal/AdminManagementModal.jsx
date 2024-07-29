import { FiUpload } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { createAdminApi, getEditAdminApi } from "../../utils/service/AdminService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createAdmin } from "../../utils/validation/FormValidation";
import { getAdminRolesApi, getAllGroup } from "../../utils/service/CommonService";
import { Modal } from "@mui/material";
import { CitySelect, CountrySelect, StateSelect, LanguageSelect } from "react-country-state-city";
import toast from "react-hot-toast";
// eslint-disable-next-line react/prop-types
const AdminManagementModalComponent = ({ addAdminModalOpen, getAllAdmins, setAddAdminModalOpen, adminItem }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [groupData, setGroupData] = useState([]);
  const [countryid, setCountryid] = useState(0);
  const [adminRole, setAdminRole] = useState([]);
  const [stateid, setstateid] = useState(0);
  const [city, setCity] = useState(0);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(createAdmin) });

  useEffect(() => {
    if (adminItem) {
      console.log(adminItem);
      setValue("group_id", adminItem?.group_id);
      setValue("first_name", adminItem?.first_name);
      setValue("last_name", adminItem?.last_name);
      setValue("email", adminItem?.email);
      setValue("gender", adminItem?.gender);
      setValue("phone", adminItem?.phone);
      setValue("username", adminItem?.username);
      // setValue("password", adminItem?.password);
      setValue("address", adminItem?.address);
      setValue("postal_code", adminItem?.postal_code);
      setValue("authrization_code", adminItem?.authrization_code);
      setValue("role_id", adminItem?.role_id);

      setValue("profile_pic", adminItem?.role_id);
      setCountryid({ id: adminItem.country, name: adminItem.country });
      setstateid({ id: adminItem.state, name: adminItem.state });
      setCity({ id: adminItem.suburb, name: adminItem.suburb });
    } else {
      setCountryid({ id: "", name: "" });
      setstateid({ id: "", name: "" });
      setCity({ id: "", name: "" });
      reset();
    }
  }, [setValue, reset, adminItem]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCountry = (country) => {
    setCountryid(country);
  };

  const handleState = (state) => {
    setstateid(state);
  };

  const handleCity = (city) => {
    setCity(city);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const fetchAllGroup = async () => {
    try {
      const response = await getAllGroup();

      if (response?.isSuccess) {
        setGroupData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAdminRoles = async () => {
    try {
      const response = await getAdminRolesApi();

      if (response?.isSuccess) {
        setAdminRole(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllGroup();
    getAdminRoles();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("group_id", data?.group_id);
    formData.append("first_name", data?.first_name);
    formData.append("last_name", data?.last_name);
    formData.append("email", data?.email);
    formData.append("gender", data?.gender);
    formData.append("phone", data?.phone);
    formData.append("address", data?.address);
    formData.append("postal_code", data?.postal_code);
    formData.append("role_id", data?.role_id);
    formData.append("suburb", city?.name);
    formData.append("state", stateid?.name);
    formData.append("username", data?.username);
    formData.append("country", countryid?.name);
    formData.append("password", data?.password);
    formData.append("profile_pic", selectedFile);
    if (countryid.name === "") {
      toast.error("Select Country Name");
      return;
    }

    if (stateid.name === "") {
      toast.error("Select State Name");
      return;
    }
    if (city.name === "") {
      toast.error("Select Suburb Name");
      return;
    }

    if (adminItem) {
      formData.append("user_id", adminItem?.user_id);
      try {
        const response = await getEditAdminApi(formData);
        if (response?.isSuccess) {
          setAddAdminModalOpen(false);
          toast.success(response?.message);
          getAllAdmins();
          reset();
          setSelectedFile(null);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      if (data.password == "") {
        toast.error("Password is required");
        return;
      }
      try {
        const response = await createAdminApi(formData);
        if (response?.isSuccess) {
          toast.success(response?.message);
          getAllAdmins();
          reset();
          setSelectedFile(null);
          setAddAdminModalOpen(false);
          setCountryid([]);
          setstateid(0);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCloseModal = () => {
    if (!adminItem) {
      setAddAdminModalOpen(false);
      setSelectedFile(null);
      reset();
    } else {
      setAddAdminModalOpen(false);
    }
  };

  return (
    <Modal open={addAdminModalOpen} onClose={handleCloseModal} className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-opacity-50 ">
      <div className="h-[600px] overflow-y-auto mt-6 sm:h-[70vh] mainFormSection md:h-[80vh] lg:h-[60vh] xl:h-[70vh]  2xl:h-[75vh] 4xl:h-[60vh]">
        <div className="relative w-[100%] max-w-[55vw] sm:max-w-[100vw] md:max-w-[100vw] lg:max-w-[70vw] xl:max-w-[65vw] 2xl:max-w-[60vw] 3xl:max-w-[65vw] 4xl:max-w-[65vw] mx-auto rounded-lg overflow-hidden sm:w-[90vw] md:w-[90vw] lg:w-[96vw]">
          <div className="relative w-full bg-white rounded-lg shadow-md pb-2">
            <div className="flex w-full justify-between items-center bg-blue-900 py-2 4xl:border-r-primary">
              <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">{adminItem ? "Edit Admin" : "Add Admin"}</h2>
              <button onClick={handleCloseModal} className="text-red text-white  hover:text-gray-900 hover:outline-none border-none outline-none bg-blue-900 text-lg">
                <IoMdClose />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="p-8 flex flex-col gap-y-4 w-full">
                <div className="flex flex-col space-y-2">
                  <h1 className="text-gray-500">
                    Choose Groups <span className="text-red-500">*</span>
                  </h1>
                  <div className="">
                    <select name="groupSection" className="input w-full" {...register("group_id")}>
                      {groupData.map((item, index) => (
                        <option key={index} value={item.group_id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <p className="text-[red]">{errors?.group_id?.message}</p>
                <div className="flex gap-4 items-center sm:flex-col">
                  {adminRole?.data?.map((item, index) => {
                    return (
                      <div key={index} className="flex gap-2">
                        <input type="radio" value={item?.role_id} name="role_id" id="role_id" className="form-radio border-2 border-yellow-400 rounded-full appearance-none h-6 w-6 checked:bg-blue-900 checked:border-transparent" {...register("role_id")} />
                        <label className="flex items-center" htmlFor={item?.role_id} key={index}>
                          {item.role_name}
                        </label>
                      </div>
                    );
                  })}
                </div>

                <p className="text-[red]">{errors?.role_id?.message}</p>

                <div className="flex gap-3 flex-wrap">
                  <h4 className="text-blue-300 pt-2 sm:text-sm ">Profile Picture</h4>
                  <div className="flex w-[90%] 3xl:w-full  items-center border rounded-lg py-1 px-2 sm:flex-col sm:gap-y-1">
                    <label htmlFor="file-upload" className="flex items-center bg-blue-900 text-white  px-4 py-1 rounded-lg cursor-pointer font-semibold sm:w-[100%]">
                      <FiUpload className="font-semibold mr-1" />
                      Upload
                    </label>
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                    {selectedFile && (
                      <div className="flex justify-between items-center bg-blue-300 rounded-full ml-2 px-4 sm:justify-center sm:w-[100%] sm:ml-0 w-full">
                        <span className="text-sm pl-2">{selectedFile.name}</span>
                        <button onClick={handleRemoveFile} className="text-black text-sm bg-transparent border-none">
                          <IoIosCloseCircleOutline className="text-lg bg-none" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/* form section */}
                <div className="flex flex-wrap list-none mt-6 gap-6">
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm" htmlFor="username">
                      User Name <span className="text-red-500 pl-1">*</span>
                    </label>
                    <input type="text" name="username" placeholder="username" id="username" className="input w-full" {...register("username")} />
                    <p>{errors?.username?.message}</p>
                  </div>

                  {adminItem == null && (
                    <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor="password">
                        Password <span className="text-red-500 pl-1">*</span>
                      </label>
                      <input type="text" name="password" placeholder="password" id="password " className="input w-full" {...register("password")} />
                      <p>{errors?.password?.message}</p>
                    </div>
                  )}

                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm" htmlFor="first_name">
                      First Name<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input type="text" name="first_name" id="first_name" className="input w-full" {...register("first_name")} />
                    <p>{errors?.first_name?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm" htmlFor="last_name">
                      Last Name<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input type="text" name="last_name" id="last_name" className="input w-full" {...register("last_name")} />
                    <p>{errors?.last_name?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%] ">
                    <label className="text-blue-300 text-sm" htmlFor="email">
                      Email Id<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input type="text" name="email" className="input w-full" {...register("email")} />
                    <p>{errors?.email?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm" htmlFor="gender">
                      Gender<span className="text-red-500 pl-1">*</span>
                    </label>
                    <select name="gender" id="gender" className="input w-full" {...register("gender")}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <p>{errors?.gender?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm" htmlFor="phone">
                      Contact No<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input type="text" name="phone" id="phone" className="input w-full" {...register("phone")} />
                    <p>{errors?.phone?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm" htmlFor="address">
                      Address<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input type="text" name="address" id="address" className="input w-full" {...register("address")} />
                    <p>{errors?.address?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm" htmlFor="postal_code">
                      Postal Code <span className="text-red-500 pl-1">*</span>
                    </label>
                    <input type="number" name="postal_code" id="postal_code" className="input w-full" {...register("postal_code")} />
                    <p>{errors?.postal_code?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <h6 className="text-blue-300 text-sm">
                      Country <span className="text-red-500 pl-1">*</span>
                    </h6>
                    <CountrySelect containerClassName="p-0" inputClassName="w-full outline-none border-set" showFlag={true} defaultValue={countryid} onChange={handleCountry} placeHolder="Select Country" />
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <h6 className="text-blue-300 text-sm">
                      State <span className="text-red-500 pl-1">*</span>
                    </h6>
                    <StateSelect containerClassName="p-0" inputClassName="w-full outline-none border-set" countryid={countryid.id} defaultValue={stateid} onChange={handleState} placeHolder="Select State" />
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm">
                      Suburb <span className="text-red-500 pl-1">*</span>
                    </label>
                    <CitySelect containerClassName="p-0" inputClassName="w-full outline-none border-set" countryid={countryid.id} defaultValue={city} stateid={stateid.id} onChange={handleCity} placeHolder="Select City" />
                  </div>
                </div>
                {/* <div className="flex flex-col space-y-2 sm:w-[100%]">
                  <h1 className="text-gray-500">Notes</h1>
                  <input type="text" name="" className="input" placeholder="Add Text Here" />
                </div> */}
              </div>

              <div className="flex justify-end mr-9 gap-2 sm:mr-0 sm:justify-center">
                <button className=" bg-blue-900 text-white font-semibold rounded-lg focus:outline-none">{adminItem ? "Update" : "Save"}</button>
                <button onClick={handleCloseModal} className="border border-black bg-white  text-black font-semibold rounded-lg focus:outline-none">
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminManagementModalComponent;
