import { yupResolver } from '@hookform/resolvers/yup';
import { FiUpload } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddRelativeModal from "./AddRelativeModal";
import { Modal } from "@mui/material";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { CreateUser } from "../../utils/service/DashboardService";
import { useForm } from "react-hook-form"
import { createUser } from '../../utils/validation/FormValidation';

// eslint-disable-next-line react/prop-types
const AdminManagementModalComponent = ({ addAdminModalOpen, setAddAdminModalOpen, }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [addRelativeModalOpen, setAddRelativeModalOpen] = useState(false);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [city, setCity] = useState(0);
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(createUser) })

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
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

  const userCreate = async () => {
    try {
      const response = await CreateUser()
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Modal
        open={addAdminModalOpen}
        onClose={() => setAddAdminModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-opacity-50 "
      >

        <div className="h-[600px] overflow-y-auto mt-6 sm:h-[70vh] mainFormSection md:h-[80vh] lg:h-[60vh] xl:h-[70vh]  2xl:h-[75vh] 4xl:h-[60vh]">
          <div className="relative w-[100%] max-w-[55vw] sm:max-w-[100vw] md:max-w-[100vw] lg:max-w-[70vw] xl:max-w-[65vw] 2xl:max-w-[60vw] 3xl:max-w-[65vw] 4xl:max-w-[65vw] mx-auto rounded-lg overflow-hidden sm:w-[90vw] md:w-[90vw] lg:w-[96vw]">
            <div className="relative w-full bg-white rounded-lg shadow-md pb-2">
              <div className="flex w-full justify-between items-center bg-blue-900 py-2 4xl:border-r-primary">
                <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">
                  Add User
                </h2>
                <button
                  onClick={() => setAddAdminModalOpen(false)}
                  className="text-red text-white hover:text-gray-900 hover:outline-none border-none outline-none bg-blue-900 text-lg"
                >
                  <IoMdClose />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="p-8 flex flex-col gap-y-4 w-full">
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-gray-500">
                      Choose Group <span className="text-red-500">*</span>
                    </h1>
                    <div>
                      <select name="groupSection" className="input w-full">
                        <option value="">Select</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <label className="flex items-center">
                      <input type="radio" name="fav_language" className="form-radio border-2 border-yellow-400 rounded-full appearance-none h-6 w-6 checked:bg-blue-900 checked:border-transparent" />
                      <span className="ml-2 text-gray-700">Admin</span>
                    </label>

                    <label className="inline-flex items-center">
                      <input type="radio" name="fav_language" className="form-radio border-2 border-yellow-400 rounded-full appearance-none h-6 w-6 checked:bg-blue-900 checked:border-transparent" />
                      <span className="ml-2 text-gray-700">Relatives</span>
                    </label>
                  </div>

                  {/* file upload section */}
                  <div className="flex gap-2">
                    <h4 className="text-blue-300 pt-2 sm:text-sm"> Profile Picture</h4>
                    <div className="flex w-[75%] items-center border input rounded-lg py-1 px-2 sm:flex-col sm:gap-y-1">
                      <label htmlFor="file-upload" className="flex items-center sm:justify-center sm:text-center bg-blue-900 text-white px-4 py-1 rounded-lg cursor-pointer font-semibold sm:w-[100%]" >
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

                  <div className="flex flex-wrap list-none mt-6 gap-6">
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm"> Authentication Code{" "} <span className="text-red-500 pl-1">*</span></label>
                      <input type="text" name="Authentication_Code" placeholder="385555" className="input"  {...register("authenticationCode")} />
                      <p>{errors?.authenticationCode?.message}</p>
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='first_name'>First Name<span className="text-red-500 pl-1"> *</span>{" "} </label>
                      <input type="text" name="first_name" id='first_name' placeholder="Wade" className="input" {...register("first_name")} />
                      <p>{errors?.first_name?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='last_name'>Last Name<span className="text-red-500 pl-1"> *</span>{" "}</label>
                      <input type="text" name="last_name" id='last_name' placeholder="Willams" className="input" {...register("last_name")} />
                      <p>{errors?.last_name?.message}</p>
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='Gender'>Gender<span className="text-red-500 pl-1">*</span>{" "}</label>
                      <select name="Gender" className="input" id='Gender' {...register("Gender")}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <p>{errors?.Gender?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='email'>Email Id<span className="text-red-500 pl-1">*</span></label>
                      <input type="text" name="email" id='email' className="input" {...register("email")} />
                      <p>{errors?.email?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='contactNo'>Contact No<span className="text-red-500 pl-1">*</span></label>
                      <input type="text" name="contactNo" id='contactNo' className="input" {...register("contactNo")} />
                      <p>{errors?.contactNo?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='DOB'>DOB</label>
                      <input type="date" name="DOB" id='DOB' className="input" {...register("DOB")} />
                      <p>{errors?.DOB?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='Age'>Age</label>
                      <input type="text" name="Age" id='Age' className="input" {...register("Age")} />
                      <p>{errors?.Age?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='Address'>Address<span className="text-red-500 pl-1">*</span>
                      </label>
                      <input type="text" name="Address" id='Address' className="input" {...register("Address")} />
                      <p>{errors?.Address?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='postalCode'>Postal Code</label>
                      <input type="text" name="postalCode" id='postalCode' className="input" {...register("postalCode")} />
                      <p>{errors?.postalCode?.message}</p>
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm">Suburb</label>
                      <CitySelect
                        containerClassName="p-0"
                        inputClassName="w-full outline-none border-set"
                        countryid={countryid.id}
                        stateid={stateid.id}
                        onChange={handleCity}
                        placeHolder="Select City"
                      />
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm">State</label>
                      <StateSelect
                        containerClassName="p-0"
                        inputClassName="w-full outline-none border-set"
                        countryid={countryid.id}
                        onChange={handleState}
                        placeHolder="Select State"
                      />
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm">Country</label>
                      <CountrySelect
                        containerClassName="p-0"
                        inputClassName="w-full outline-none border-set"
                        showFlag={true}
                        onChange={handleCountry}
                        placeHolder="Select Country"
                      />
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='Action'>Action</label>
                      <select name="Action" id='Action' className="input" {...register("Action")}>
                        <option value="">Adult</option>
                        <option value="">Teen</option>
                        <option value="">Old</option>
                      </select>
                      <p>{errors?.Action?.message}</p>
                    </div>
                  </div>

                  <div className="flex w-full flex-col space-y-2">
                    <h1 className="text-gray-500">Notes</h1>
                    <input
                      type="text"
                      name="Authentication_Code"
                      className="input"
                      placeholder="Add Text Here"
                    />
                  </div>

                  <div className="flex text gap-3 mt-3 sm:flex-col">
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
                  </div>
                </div>

                <div className="flex justify-end mr-9 gap-2 sm:mr-0 sm:justify-center">
                  <button className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]">
                    Save
                  </button>
                  <button
                    onClick={() => setAddAdminModalOpen(false)}
                    className="border border-black bg-white text-black font-semibold rounded-lg focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </Modal>
      <div className="flex items-center">
        <AddRelativeModal
          addRelativeModalOpen={addRelativeModalOpen}
          setAddRelativeModalOpen={setAddRelativeModalOpen}
        />
      </div>
    </>
  );
};

export default AdminManagementModalComponent;
