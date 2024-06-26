import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import adminUserProfile from "../../assets/images/adminUserProfile.svg";
import editIcon from "../../assets/images/editIcon.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import { IoMdAddCircleOutline } from "react-icons/io";
import ModalComponent from "../../components/Modal/GroupManagementModal";
import NavBar from "../../components/NavBar/NavBar";
import Header from "../../components/Header/Header";
export default function GroupManagement() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* top title */}
      <div className="flex justify-between sm:flex-col sm:gap-y-2 md:flex-col md:gap-y-2 lg:flex-col lg:gap-y-5">
        <h1 className="text-3xl font-bold sm:text-sm md:text-md lg:text-3xl">
          Group Management
        </h1>
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
            <i className="my-0.4 pr-2 text-2xl sm:my-1 md:text-md md:my-1 sm:text-sm">
              <IoMdAddCircleOutline />
            </i>
            <span className="sm:text-sm">Create Group</span>
          </button>
        </div>
      </div>

      {/* table section */}

      <div className="overflow-y-auto mainFormSection mt-6 sm:max-h-[60vh] boxShadow rounded-lg sm:mx-1 md:mx-1 lg:mx-1" style={{ height: "calc(100vh - 200px)" }}>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Group Name</th>
              <th className="text-left">Total Members</th>
              <th className="text-left">Members Name</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left">
                <div className="flex gap-2 ">
                  <div className="w-[40px] flex justify-center md:w-[60px] lg:w-[60px]">
                    <img
                      src={adminUserProfile}
                      alt="user "
                      className="rounded-full"
                    />
                  </div>
                  <span className="md:text-xl lg:text-2xl">Devon Lane </span>
                </div>
              </td>

              <td className="text-left">
                debra.holt@exaple.com
              </td>
              <td className="text-left">Jaini Shah, Dipal Shah, kinjal Bhoil, Kinal Patel, Yash Patel, vibha shah...</td>
              <td className="text-left">
                <div className="flex gap-2 sm:gap-1 sm:flex-col sm:gap-y-3  sm:items-center md:gap-1 md:flex-col md:gap-y-3  md:items-center lg:flex-col lg:items-center xl:gap-1">
                  <img onClick={openModal} src={editIcon} alt="edit icon" className="mr-2 text-[#826007] hover:text-blue-800 cursor-pointer sm:w-[20px] sm:ml-0 sm:mr-0 md:w-[20px] md:ml-0 md:mr-0 lg:w-[30px] xl:mr-0" />

                  <img
                    src={deleteIcon}
                    alt="edit icon"
                    className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer sm:w-[20px] sm:mr-0 sm:ml-0 md:w-[20px] md:mr-0 md:ml-0 lg:w-[30px] xl:mr-0"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* popup model */}
      <div className="flex items-center">
        <ModalComponent isOpen={isOpen} onClose={closeModal} />
      </div>
    </>
  );
}
