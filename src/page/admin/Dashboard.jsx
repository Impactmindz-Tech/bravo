import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import UserManagementModalComponent from "../../components/Modal/UserManagementModal";
import { IoChevronDown } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import adminUserProfile from "../../assets/images/adminUserProfile.svg";
import ViewRelativeModal from "../../components/Modal/ViewRelativeModal";
import editIcon from "../../assets/images/editIcon.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import { DashboardApi } from "../../utils/service/DashboardService";
import { setUser } from "../../store/Slice/UserSlice";

export default function Dashboard() {
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const [viewUserModalOpen, setViewUserModalOpen] = useState(false);

  const dispatch = useDispatch();
  const dataDetails = useSelector((state) => state.user.user);

  const fetchDashboardData = async () => {
    try {
      const response = await DashboardApi();
      dispatch(setUser(response));
    } catch (error) {
      console.log(error);
      throw new Error("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <>
      <div className="flex justify-between sm:flex-col sm:gap-y-2 md:flex-col md:gap-y-2 lg:flex-col lg:gap-y-5">
        <h1 className="text-3xl font-bold sm:text-sm md:text-md lg:text-3xl">
          User Management
        </h1>
        <div className="flex gap-1 sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-2 lg:gap-3">
          <div className="flex justify-center items-center border border-[#ccc] rounded-md bg-white text-[#3c3c3c] lg:w-[68%] md:w-[100%] sm:w-[100%]">
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="px-3 py-2 rounded-lg outline-none focus:outline-none text-md  w-[270px] sm:w-[100%] sm:px-2 sm:py-2 sm:text-sm md:w-[100%]  md:px-2 md:py-3 md:text-2xl lg:text-2xl lg:w-[100%] lg:py-0 lg:px-3"
            />
            <i className="pr-3 flex items-center text-[#5a5a5a] text-lg sm:pr-1 sm:text-sm md:pr-1 md:text-md md:text-2xl lg:text-2xl">
              <IoIosSearch />
            </i>
          </div>

          <button onClick={()=>setViewUserModalOpen(true)} className="bg-blue-300 flex justify-center gap-8 text-sm text-white hover:border-[#ccc] sm:gap-2 md:gap-2 md:text-xl sm:text-sm lg:gap-3 lg:text-2xl px-8">
            Filter
          </button>
          <button
            className="bg-blue-900 text-white flex justify-center  hover:border-[#ccc] sm:text-sm md:text-xl"
            onClick={() => setAddAdminModalOpen(true)}
          >
            <i className="my-0.4 pr-2 text-2xl sm:text-lg sm:my-0  md:text-md md:my-0 lg:my-2">
              <IoMdAddCircleOutline />
            </i>{" "}
            Add User
          </button>
        </div>
      </div>

      <div
        className="overflow-y-auto mainFormSection mt-6 sm:max-h-[60vh] boxShadow rounded-lg sm:mx-1 md:mx-1 lg:mx-1"
        style={{ height: "calc(100vh - 205px)" }}
      >
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">User Name</th>
              <th className="text-left">Email id</th>
              <th className="text-left">Contact No</th>
              <th className="text-left">Authentication Code</th>
              <th className="text-left">Status</th>
              <th className="text-left">Relation</th>
              <th className="text-left">Relative</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataDetails?.data?.map((item, index) => (
              <tr key={index}>
                <td className="text-left">
                  <div className="flex gap-2 ">
                    <div className="w-[40px] flex justify-center md:w-[60px] lg:w-[60px]">
                      <img
                        src={adminUserProfile}
                        alt="user "
                        className="rounded-full"
                      />
                    </div>
                    <span className="md:text-xl lg:text-2xl">
                      {item.Username}
                    </span>
                  </div>
                </td>

                <td className="text-left">{item.Email}</td>
                <td className="text-left">{item.PhoneNumber}</td>
                <td className="text-left">3467895768</td>

                <td className="text-left">
                  {item.Status}
                  {/* <select
                    id="role"
                    name="role"
                    className="py-1 px-6 rounded-full bg-[#E2E9D7]  focus:outline-none  text-[#036507] focus:border-none "
                  >
                    <option value="admin">Active</option>
                    <option value="user">Inactive</option>
                  </select> */}
                </td>
                <td className="text-left">student</td>
                <td className="text-left">
                  <div
                    className="flex justify-center text-[#065813] cursor-pointer"
                    // onClick={openRelativeModal}
                  >
                    <FaEye />
                  </div>
                </td>
                <td className="text-left">
                  <div className="flex gap-2 sm:gap-1 sm:flex-col sm:gap-y-3  sm:items-center md:gap-1 md:flex-col md:gap-y-3  md:items-center lg:flex-col lg:items-center xl:gap-1">
                    <img
                      src={editIcon}
                      alt="edit icon"
                      className="mr-2 text-[#826007] hover:text-blue-800 cursor-pointer sm:w-[20px] sm:ml-0 sm:mr-0 md:w-[20px] md:ml-0 md:mr-0 lg:w-[30px] xl:mr-0"
                    />

                    <img
                      src={deleteIcon}
                      alt="edit icon"
                      className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer sm:w-[20px] sm:mr-0 sm:ml-0 md:w-[20px] md:mr-0 md:ml-0 lg:w-[30px] xl:mr-0"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* popup model */}
      <div className="flex items-center ">
        <UserManagementModalComponent
          addAdminModalOpen={addAdminModalOpen}
          setAddAdminModalOpen={setAddAdminModalOpen}
        />
      </div>

      {/* relative modal */}
      <div className="flex items-center ">
        <ViewRelativeModal
          viewUserModalOpen={viewUserModalOpen}
          setViewUserModalOpen={setViewUserModalOpen}
        />
      </div>
    </>
  );
}
