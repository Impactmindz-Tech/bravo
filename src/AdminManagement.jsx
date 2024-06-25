import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import AdminManagementModalComponent from "./components/Modal/AdminManagementModal";
import { IoChevronDown } from "react-icons/io5";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import adminUserProfile from "./assets/images/adminUserProfile.svg";
import editIcon from "./assets/images/editIcon.svg";
import deleteIcon from "./assets/images/deleteIcon.svg";
export default function AdminManagement() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* header section */}
      <Header />

      {/* menu section */}
      <div className="flex justify-start ">
        {/* left nav bar */}
        <NavBar />

        {/* right side section */}
        <div className="w-[90%] m-auto h-[41vw] sm:m-0">
          {/* top title */}
          <div className="flex justify-between px-1 mt-12 sm:mt-5 sm:flex-col sm:gap-y-2">
            <h1 className="text-3xl font-bold sm:text-sm">Admin Management</h1>
            {/* search bar */}
            <div className="flex gap-1 sm:flex-col sm:gap-y-1">
              <div className="flex justify-center items-center border border-[#ccc] rounded-md bg-white text-[#3c3c3c]">
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  className="px-3 py-2 rounded-lg outline-none focus:outline-none text-md w-[270px] sm:w-[100%] sm:px-2 sm:py-2 sm:text-sm"
                />
                <i className="pr-3 flex items-center text-[#5a5a5a] text-lg sm:pr-1 sm:text-sm">
                  <IoIosSearch />
                </i>
              </div>

              {/* filter btn */}
              <button className="bg-blue-300 flex justify-center gap-8 text-sm text-white hover:border-[#ccc] sm:gap-2 ">
                Filter
                <i className="text-white text-md my-1">
                  <IoChevronDown />
                </i>
              </button>
              {/* add admin btn */}
              <button
                className="bg-blue-900 text-white flex justify-center  hover:border-[#ccc] sm:text-sm"
                onClick={openModal}
              >
                <i className="my-0.4 pr-2 text-2xl sm:text-sm sm:my-1">
                  <IoMdAddCircleOutline />
                </i>{" "}
                Add Admin
              </button>
            </div>
          </div>

          {/* table section */}

          <div className="max-h-[440px] overflow-y-auto mainFormSection mt-6 sm:max-h-[60vh] shadow-2xl shadow-[#969696] rounded-lg sm:mx-1">
            <div className="flex justify-between border-gray-100 py-2 px-10 sm:px-0">
              <table className="min-w-full ">
                {/* table heading */}
                <thead>
                  <tr>
                    <th className="px-4 py-4   sticky bg-white top-0 border-gray-200 text-left rounded-tl-lg">
                      User Name
                    </th>
                    <th className="text-left   bg-white border-gray-200  px-4">
                      Email Id
                    </th>
                    <th className=" text-center   bg-white border-gray-200">
                      Contact No
                    </th>
                    <th className=" text-center  bg-white border-gray-200 w-[150px] px-9">
                      Authentication Code
                    </th>
                    <th className="text-center   bg-white">Role</th>

                    <th className=" px-2 text-center  bg-white">Action</th>
                  </tr>
                </thead>
                {/* table body */}
                <tbody>
                  {/* data 1 */}
                  <tr className="text-center">
                    {/* user profile and name */}
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <div className="w-[40px] flex justify-center">
                          <img
                            src={adminUserProfile}
                            alt="user "
                            className="rounded-full"
                          />
                        </div>
                        <span>Devon Lane </span>
                      </div>
                    </td>

                    {/* admin email id */}
                    <td className=" py-2 text-left px-4">
                      debra.holt@exaple.com
                    </td>
                    <td className=" px-4 py-2 ">(406) 555-0120</td>
                    <td className=" px-4 py-2 ">3467895768</td>

                    <td className=" px-4 py-2 ">Student</td>

                    <td className="px-4 py-2 sm:px-0 sm:py-0 ">
                      <div className="flex justify-center gap-2 sm:gap-1 sm:flex-col sm:gap-y-3  sm:items-center">
                        <img
                          src={editIcon}
                          alt="edit icon"
                          className="mr-2  text-[#826007] hover:text-blue-800 cursor-pointer sm:w-[20px] sm:ml-0 sm:mr-0"
                        />

                        <img
                          src={deleteIcon}
                          alt="edit icon"
                          className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer sm:w-[20px] sm:mr-0 sm:ml-0"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* popup model */}
      <div className="flex items-center ">
        <AdminManagementModalComponent isOpen={isOpen} onClose={closeModal} />
      </div>
    </>
  );
}
