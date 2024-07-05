import { yupResolver } from '@hookform/resolvers/yup';
import { FiUpload } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddRelativeModal from "../AddRelativeModal";
import { Modal } from "@mui/material";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { CreateUser, EditUser, getAllGroup, getAllRoles } from "../../../utils/service/DashboardService";
import { useForm } from "react-hook-form"
import { createUser } from '../../../utils/validation/FormValidation';
import toast from 'react-hot-toast';

// eslint-disable-next-line react/prop-types
const UserManagementModal = ({ addAdminModalOpen, setAddAdminModalOpen, items }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [addRelativeModalOpen, setAddRelativeModalOpen] = useState(false);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [group, setGroup] = useState('');
  const [role, setRole] = useState('');
  const [city, setCity] = useState(0);
  const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(createUser) })
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

  const getAllGroups = async () => {
    try {
      const response = await getAllGroup()
      setGroup(response)
    } catch (error) {
      console.log(error)
    }
  }
  const getAllRoless = async () => {
    try {
      const response = await getAllRoles()
      setRole(response)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllGroups()
    getAllRoless()
  }, [])
  useEffect(() => {
    console.log(items, 'tinku')
    if (items) {
      setValue("authrization_code", items?.authrization_code || '')
      setValue("first_name", items?.first_name || '')
      setValue("last_name", items?.last_name)
      setValue("username", items?.username)
      setValue("phone", items?.phone)
      setValue("dob", items?.date_of_birth)
      setValue("Age", items?.Age)
      setValue("address", items?.address)
      setValue("postal_code", items?.postal_code)
      setValue("role_id", items?.role_name)
      setValue("password", items?.password)
      setValue("group_id", items?.group_id)
      setValue("email", items?.email)
      setCountryid({ id: items.country, name: items.country });
      setstateid({ id: items.state, name: items.state });
      setCity({ id: items.suburb, name: items.suburb });
    } else {
      setCountryid({ id: '', name: '' });
      setstateid({ id: '', name: '' });
      setCity({ id: '', name: '' });
      reset()
    }

  }, [items, reset, setValue])

  const onSubmit = async (data) => {

    if (items?.user_id) {
      const formData = new FormData()
      formData.append("authrization_code", data?.authrization_code)
      formData.append("first_name", data?.first_name)
      formData.append("last_name", data?.last_name)
      formData.append("username", data?.email)
      formData.append("phone", data?.phone)
      formData.append("dob", data?.dob)
      formData.append("Age", data?.Age)
      formData.append("address", data?.address)
      formData.append("postal_code", data?.postal_code)
      formData.append("role_id", data?.role_id)
      formData.append("password", data?.password)
      formData.append("suburb", city?.name)
      formData.append("state", stateid?.name)
      formData.append("country", countryid?.name)
      formData.append("group_id", data.group_id)
      formData.append("email", data?.email)
      formData.append("user_id", items?.user_id)
      try {
        const responce = await EditUser(formData)
        if (responce?.isSuccess) {
          toast.success(responce?.message)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      const formData = new FormData()
      formData.append("authrization_code", data?.authrization_code)
      formData.append("first_name", data?.first_name)
      formData.append("last_name", data?.last_name)
      formData.append("username", data?.email)
      formData.append("phone", data?.phone)
      formData.append("dob", data?.dob)
      formData.append("Age", data?.Age)
      formData.append("address", data?.address)
      formData.append("postal_code", data?.postal_code)
      formData.append("role_id", data?.role_id)
      formData.append("password", data?.password)
      formData.append("suburb", city?.name)
      formData.append("state", stateid?.name)
      formData.append("country", countryid?.name)
      formData.append("group_id", data.group_id)
      formData.append("email", data?.email)
      try {
        const response = await CreateUser(formData)
        if (response?.isSuccess) {
          toast.success(response?.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }



  return (
    <>
      <Modal open={addAdminModalOpen} onClose={() => setAddAdminModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-opacity-50 " >
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
                      <select name="groupSection" className="input w-full" {...register("group_id")}>
                        {
                          group?.data?.map((item, index) => (
                            <option key={index} value={item.group_id}>{item.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {
                      role?.data?.map((item, index) => {
                        return (
                          <div className='flex items-center' key={index}>
                            <input type="radio"
                              value={item.role_id}
                              name="role_id"
                              className="form-radio border-2 border-yellow-400 rounded-full appearance-none h-6 w-6 checked:bg-blue-900 checked:border-transparent"
                              {...register("role_id")}
                              defaultChecked={items ? item.role_id == items?.role_id : false} />
                            <span className="ml-2 text-gray-700">{item.role_name}</span>
                          </div>
                        )
                      })
                    }
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
                      <label className="text-blue-300 text-sm" htmlFor='authrization_code'> Authentication Code{" "} <span className="text-red-500 pl-1">*</span></label>
                      <input type="text" name="authrization_code" id='authrization_code' placeholder="385555" className="input"  {...register("authrization_code")} />
                      <p>{errors?.authrization_code?.message}</p>
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='password'>passowrd{" "} <span className="text-red-500 pl-1">*</span></label>
                      <input type="text" name="password" id='password' placeholder="385555" className="input"  {...register("password")} />
                      <p>{errors?.password?.message}</p>
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
                      <label className="text-blue-300 text-sm" htmlFor='phone'>Contact No<span className="text-red-500 pl-1">*</span></label>
                      <input type="text" name="phone" id='phone' className="input" {...register("phone")} />
                      <p>{errors?.phone?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='dob'>DOB</label>
                      <input type="date" name="dob" id='dob' className="input" {...register("dob")} />
                      <p>{errors?.dob?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='Age'>Age</label>
                      <input type="text" name="Age" id='Age' className="input" {...register("Age")} />
                      <p>{errors?.Age?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='address'>Address<span className="text-red-500 pl-1">*</span>
                      </label>
                      <input type="text" name="address" id='address' className="input" {...register("address")} />
                      <p>{errors?.address?.message}</p>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='postal_code'>Postal Code</label>
                      <input type="text" name="postal_code" id='postal_code' className="input" {...register("postal_code")} />
                      <p>{errors?.postal_code?.message}</p>
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm">Suburb</label>
                      <CitySelect
                        containerClassName="p-0"
                        inputClassName="w-full outline-none border-set"
                        countryid={countryid.id}
                        defaultValue={city}
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
                        defaultValue={stateid}
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
                        defaultValue={countryid}
                        onChange={handleCountry}
                        placeHolder="Select Country"
                      />
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <label className="text-blue-300 text-sm" htmlFor='Action'>Action</label>
                      <select name="Action" id='Action' className="input" >
                        <option value="">Adult</option>
                        <option value="">Teen</option>
                        <option value="">Old</option>
                      </select>
                      {/* <p>{errors?.Action?.message}</p> */}
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
                  <button className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]">
                    {items ? 'Update' : 'Save'}
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

export default UserManagementModal;
