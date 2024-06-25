import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import adminUserProfile from "./assets/images/adminUserProfile.svg";
import editIcon from "./assets/images/editIcon.svg";
import deleteIcon from "./assets/images/deleteIcon.svg";
import { IoMdAddCircleOutline } from "react-icons/io";
import ModalComponent from "./components/Modal/GroupManagementModal";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
export default function GroupManagement() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* header section */}
      <Header />

      {/* menu section */}
      <div className="flex justify-start">
        {/* left nav bar */}
        <NavBar />

        {/* right side section */}
        <div className="w-[90%] m-auto h-[41vw]  sm:px-2 md:px-2  lg:px-2 mt-0">
          {/* top title */}
          <div className="flex justify-between px-1 mt-12 sm:mt-5 sm:flex-col sm:gap-y-2 md:flex-col md:gap-y-2 lg:flex-col lg:gap-y-5">
            <h1 className="text-3xl font-bold sm:text-sm md:text-md lg:text-3xl">Group Management</h1>
            {/* search bar */}
            <div className="flex gap-1 sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-2 lg:gap-3">
              <div className="flex justify-center items-center  border border-borderOutlineColor-900 rounded-md bg-white text-[#3c3c3c] lg:w-[68%] md:w-[100%] sm:w-[100%]">
                <input
                  type="text"
                  name="search"
                  placeholder="User Name"
                  className="px-3 py-2 rounded-lg outline-none focus:outline-none text-sm w-[250px] sm:w-[100%] sm:px-2 sm:py-2 sm:text-sm md:w-[100%] md:px-2 md:py-3 md:text-2xl lg:text-2xl lg:w-[100%] lg:py-0 lg:px-3"
                />
                <i className="pr-3 flex items-center text-[#5a5a5a] text-lg sm:pr-1 sm:text-sm md:pr-1 md:text-md md:text-2xl lg:text-2xl">
                  <IoIosSearch />
                </i>
              </div>

              {/* create group btn */}
              <button className="bg-blue-900 flex justify-center text-white hover:-[#ccc]sm:text-sm md:text-xl lg:gap-3 lg:text-2xl">
                <i className="my-0.4 pr-2 text-2xl sm:text-md sm:my-0 md:text-md md:my-1">
                  <IoMdAddCircleOutline />
                </i>{" "}
                <span className="sm:text-sm">

                Create Group
                </span>
              </button>
            </div>
          </div>

          {/* table section */}

          <div className="max-h-[440px] overflow-y-auto mainFormSection mt-6 sm:max-h-[60vh] boxShadow rounded-lg sm:mx-1 md:mx-1 lg:mx-1">
            <div className="flex justify-between border-gray-100 py-2 px-10 sm:px-0 md:px-0 lg:px-0">
              <table className="min-w-full">
                {/* table heading */}
                <thead>
                  <tr>
                    <th className="px-4 py-4   sticky bg-white top-0 border-gray-200 text-left rounded-tl-lg md:text-xl lg:text-2xl">
                      Group Name
                    </th>
                    <th className="text-center  sticky top-0  bg-white border-gray-200  px-4 md:text-xl lg:text-2xl">
                      Total Members
                    </th>
                    <th className=" text-center  max-w-[450px] sticky top-0 bg-white border-gray-200 md:text-xl lg:text-2xl">
                      Members Name
                    </th>
                  
                    <th className="px-2 text-center  sticky top-0 bg-white md:text-xl lg:text-2xl">
                      Action
                    </th>
                  </tr>
                </thead>
                {/* table body */}
                <tbody>
                  {/* data 1 */}
                  <tr className="text-center">
                    {/* user profile and name */}
                    <td className="px-4 py-4 ">
                      <div className="flex gap-2 ">
                        <div className="w-[40px] flex justify-center md:w-[60px] lg:w-[60px]">
                          <img
                            src={adminUserProfile}
                            alt="user "
                            className="rounded-full"
                          />
                        </div>
                        <span className="text-xl lg:text-2xl">Devon Lane </span>
                      </div>
                    </td>

                    {/* admin email id */}
                    <td className="py-2 text-center px-4 lg:text-2xl">
                      50
                    </td>
                   
                    <td className="px-4 py-4">
                      <div className="flex gap-2 justify-center">
                        <div className="flex justify-center w-[200px] lg:text-2xl">
                        Jaini shah, Dipal Shah, Kinjal Bholi, Kinal Patel,Yash Patel, vibha shah...
                      </div>
                      </div>
                    </td>
                    

                    
                    
                    <td className="px-4 py-2 sm:px-0 sm:py-0 lg:px-0 lg:py-0">
                      <div className="flex justify-center gap-2 sm:gap-1 sm:flex-col sm:gap-y-3  sm:items-center lg:flex-col lg:items-center">
                        <img
                          src={editIcon}
                          alt="edit icon"
                          className="mr-2  text-[#826007] hover:text-blue-800 cursor-pointer sm:w-[20px] sm:ml-0 sm:mr-0 lg:w-[30px]"
                          onClick={openModal}
                        />

                        <img
                          src={deleteIcon}
                          alt="edit icon"
                          className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer sm:w-[20px] sm:mr-0 sm:ml-0 lg:w-[30px]"
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
      <div className="flex items-center">
        <ModalComponent isOpen={isOpen} onClose={closeModal} />
      </div>
    </>
  );
}
