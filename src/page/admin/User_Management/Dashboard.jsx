import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import editIcon from "../../../assets/images/editIcon.svg";
import adminUserProfile from "../../../assets/images/adminUserProfile.svg";
import { DashboardApi, userStateUpdate } from "../../../utils/service/DashboardService";
import { setUser } from "../../../store/Slice/UserSlice";
import toast from "react-hot-toast";
import Pagination from "../../../components/Pagination";
import UserManagementModalComponent from "../../../components/Modal/user-management/UserManagementModal";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";

const Dashboard = () => {
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const dataDetails = useSelector((state) => state.user.user);

  const handleClose = async (user_id) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    try {
      const response = await userStateUpdate(formData);
      if (response?.isSuccess) {
        toast.success(response?.message);
        fetchDashboardData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await DashboardApi({ page: currentPage, items_per_page: itemsPerPage });
      if (response?.isSuccess) {
        dispatch(setUser(response));
        setTotalPages(Math.ceil(response.total_items / itemsPerPage));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [currentPage, itemsPerPage]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setAddAdminModalOpen(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setAddAdminModalOpen(true);
  };

  const handleModalClose = () => {
    setAddAdminModalOpen(false);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="flex justify-between sm:flex-col sm:gap-y-2 md:flex-col md:gap-y-2 lg:flex-col lg:gap-y-5">
        <h1 className="text-3xl font-bold sm:text-sm md:text-md lg:text-3xl">User Management</h1>
        <div className="flex gap-1 sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-2 lg:gap-3">
          <div className="flex justify-center items-center border border-[#ccc] rounded-md bg-white text-[#3c3c3c] lg:w-[68%] md:w-[100%] sm:w-[100%]">
            <input type="text" name="search" placeholder="Search" className="px-3 py-2 rounded-lg outline-none focus:outline-none text-md w-[270px] sm:w-[100%] sm:px-2 sm:py-2 sm:text-sm md:w-[100%] md:px-2 md:py-3 md:text-2xl lg:text-2xl lg:w-[100%] lg:py-0 lg:px-3" />
            <i className="pr-3 flex items-center text-[#5a5a5a] text-lg sm:pr-1 sm:text-sm md:pr-1 md:text-md md:text-2xl lg:text-2xl">
              <IoIosSearch />
            </i>
          </div>

          <button className="bg-blue-900 text-white flex justify-center hover:border-[#ccc] sm:text-sm md:text-xl" onClick={handleAddUser}>
            <i className="my-0.4 pr-2 text-2xl sm:text-lg sm:my-0 md:text-md md:my-0 lg:my-2">
              <IoMdAddCircleOutline />
            </i>
            Add User
          </button>
        </div>
      </div>

      <div className="overflow-y-auto mainFormSection mt-6 sm:max-h-[60vh] boxShadow rounded-lg sm:mx-1 md:mx-1 lg:mx-1" style={{ height: "calc(100vh - 205px)" }}>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">User Name</th>
              <th className="text-left">Email id</th>
              <th className="text-left">Contact No</th>
              <th className="text-left">Authentication Code</th>
              <th className="text-left">Status</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataDetails?.data?.map((item, index) => (
              <tr key={index}>
                <td className="text-left">
                  <div className="flex gap-2">
                    <div className="w-[40px] flex justify-center md:w-[60px] lg:w-[60px]">
                      <img src={adminUserProfile} alt="user" className="rounded-full" />
                    </div>
                    <span className="md:text-xl lg:text-2xl">{item.first_name}</span>
                  </div>
                </td>

                <td className="text-left">{item.email}</td>
                <td className="text-left">{item.phone}</td>
                <td className="text-left">{item.authrization_code}</td>

                <td className="text-left cursor-pointer">
                  <div onClick={() => handleClose(item?.user_id)}>{item.is_active === 1 ? "Active" : "Inactive"}</div>
                </td>
                <td className="text-left">
                  <div className="flex gap-2 sm:gap-1 sm:flex-col sm:gap-y-3 sm:items-center md:gap-1 md:flex-col md:gap-y-3 md:items-center lg:flex-col lg:items-center xl:gap-1">
                    <img onClick={() => handleEditUser(item)} src={editIcon} alt="edit icon" className="mr-2 text-[#826007] hover:text-blue-800 cursor-pointer sm:w-[20px] sm:ml-0 sm:mr-0 md:w-[20px] md:ml-0 md:mr-0 lg:w-[30px] xl:mr-0" />
                    <Link to={`/admin/user/${item?.user_id}`} className="flex justify-center text-[#065813] cursor-pointer">
                      <FaEye />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => {
          setCurrentPage(1);
          setItemsPerPage(value);
        }}
      />

      {/* Modal for User Management */}
      <UserManagementModalComponent addAdminModalOpen={addAdminModalOpen} setAddAdminModalOpen={handleModalClose} items={selectedUser} onUserCreated={fetchDashboardData} />
    </>
  );
};

export default Dashboard;
