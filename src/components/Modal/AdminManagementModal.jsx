import { FiUpload } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { createAdminApi } from "../../utils/service/AdminService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createAdmin } from "../../utils/validation/FormValidation";
import { getAllGroup } from "../../utils/service/CommonService";
import { Modal } from "@mui/material";
import { CitySelect, CountrySelect, StateSelect, LanguageSelect } from "react-country-state-city";
// eslint-disable-next-line react/prop-types
const AdminManagementModalComponent = ({ addAdminModalOpen, setAddAdminModalOpen }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [groupData, setGroupData] = useState([]);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [city, setCity] = useState(0);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(createAdmin) });

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

  useEffect(() => {
    fetchAllGroup();
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
    formData.append("group_id", data?.group_id);
    formData.append("authrization_code", data?.authrization_code
      
    );
    try {
      const response = await createAdminApi(formData);
      if (response?.isSuccess) {
        reset();
        setSelectedFile(null);
        setAddAdminModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={addAdminModalOpen} onClose={() => setAddAdminModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-opacity-50 ">
      <div className="h-[600px] overflow-y-auto mt-6 sm:h-[80vh] md:h-auto mainFormSection">
        <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden sm:w-[90vw] md:w-[90vw] lg:w-[92vw]">
          <div className="relative bg-white  rounded-lg shadow-md pb-2">
            <div className="flex justify-between items-center  bg-blue-900 py-2">
              <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">Add Admin</h2>
              <button onClick={() => setAddAdminModalOpen(false)} className="text-red text-white  hover:text-gray-900 hover:outline-none border-none outline-none bg-blue-900 text-lg">
                <IoMdClose />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="p-8 flex flex-col gap-y-4">
                <div className="flex flex-col space-y-2">
                  <h1 className="text-gray-500">
                    Choose Group <span className="text-red-500">*</span>
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
                <div className="flex gap-3 sm:flex-col">
                  <label className="flex items-center">
                    <input type="radio" name="fav_language" className="form-radio border-2 border-yellow-400 rounded-full appearance-none h-6 w-6 checked:bg-blue-900 checked:border-transparent" />
                    <span className="ml-2 text-gray-700">Admin</span>
                  </label>

                  <label className="inline-flex items-center">
                    <input type="radio" name="fav_language" className="form-radio border-2 border-yellow-400 rounded-full appearance-none h-6 w-6 checked:bg-blue-900 checked:border-transparent" />
                    <span className="ml-2 text-gray-700">Regional Admin</span>
                  </label>
                </div>

                {/* file upload section */}
                <div className="flex gap-2">
                  <h4 className="text-blue-300 pt-2 sm:text-sm">Profile Picture</h4>
                  <div className="flex w-[75%] items-center border rounded-lg py-1 px-2 sm:flex-col sm:gap-y-1">
                    <label htmlFor="file-upload" className="flex items-center bg-blue-900 text-white  px-4 py-1 rounded-lg cursor-pointer font-semibold sm:w-[100%]">
                      <FiUpload className="font-semibold mr-1" />
                      Upload
                    </label>
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                    {selectedFile && (
                      <div className="flex justify-between items-center bg-blue-300 rounded-full ml-2 px-4 sm:justify-center sm:w-[100%] sm:ml-0">
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
                    <label className="text-blue-300 text-sm" htmlFor="Authentication_Code">
                      Authentication Code <span className="text-red-500 pl-1">*</span>
                    </label>
                    <input type="text" name="Authentication_Code" placeholder="Authentication Code" id="Authentication_Code" className="input" {...register("authrization_code")} />
                    <p>{errors?.authrization_code?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm" htmlFor="first_name">
                      First Name<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input type="text" name="first_name" id="first_name" className="input" {...register("first_name")} />
                    <p>{errors?.first_name?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm" htmlFor="last_name">
                      Last Name<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input type="text" name="last_name" id="last_name" className="input" {...register("last_name")} />
                    <p>{errors?.last_name?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%] ">
                    <label className="text-blue-300 text-sm" htmlFor="email">
                      Email Id<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input type="text" name="email" className="input" {...register("email")} />
                    <p>{errors?.email?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm" htmlFor="gender">
                      Gender<span className="text-red-500 pl-1">*</span>
                    </label>
                    <select name="gender" id="gender" className="input w-full" {...register("gender")}>
                      <option value="male">Male</option>
                    </select>
                    <p>{errors?.gender?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm" htmlFor="phone">
                      Contact No<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input type="text" name="phone" id="phone" className="input" {...register("phone")} />
                    <p>{errors?.phone?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm" htmlFor="address">
                      Address<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input type="text" name="address" id="address" className="input" {...register("address")} />
                    <p>{errors?.address?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm" htmlFor="postal_code">
                      Postal Code
                    </label>
                    <input type="text" name="postal_code" id="postal_code" className="input" {...register("postal_code")} />
                    <p>{errors?.postal_code?.message}</p>
                  </div>
                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <label className="text-blue-300 text-sm">Suburb</label>
                    <CitySelect containerClassName="p-0" inputClassName="w-full outline-none border-set" countryid={countryid.id} defaultValue={city} stateid={stateid.id} onChange={handleCity} placeHolder="Select City" />
                  </div>

                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <h6 className="text-blue-300 text-sm">State</h6>
                    <StateSelect containerClassName="p-0" inputClassName="w-full outline-none border-set" countryid={countryid.id} defaultValue={stateid} onChange={handleState} placeHolder="Select State" />
                  </div>

                  <div className="w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                    <h6 className="text-blue-300 text-sm">Country</h6>
                    <CountrySelect containerClassName="p-0" inputClassName="w-full outline-none border-set" showFlag={true} defaultValue={countryid} onChange={handleCountry} placeHolder="Select Country" />
                  </div>
                </div>

                <div className="flex flex-col space-y-2 sm:w-[100%]">
                  <h1 className="text-gray-500">Notes</h1>
                  <input type="text" name="" className="input" placeholder="Add Text Here" />
                </div>
              </div>

              <div className="flex justify-end mr-9 gap-2 sm:mr-0 sm:justify-center">
                <button className=" bg-blue-900 text-white font-semibold rounded-lg focus:outline-none">Save</button>
                <button onClick={() => setAddAdminModalOpen(false)} className="border border-black bg-white  text-black font-semibold rounded-lg focus:outline-none">
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
