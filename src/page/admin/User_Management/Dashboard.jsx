import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import editIcon from "../../../assets/images/editIcon.svg";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import adminUserProfile from "../../../assets/images/adminUserProfile.svg";
import { DashboardApi, deleteUserDataByID, searchUserApi, userStateUpdate } from "../../../utils/service/DashboardService";
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
  const [search, setSearch] = useState("");
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

  const handleSearch = async (e) => {
    setSearch(e.target.value);

    if (e.target.value == "") {
      fetchDashboardData();
      return;
    }
    const response = await searchUserApi({ search: e.target.value });
    dispatch(setUser(response));
  };

  const deleteUser = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    try {
      const response = await deleteUserDataByID(formData);
      if (response?.isSuccess) {
        toast.success(response?.message);
        fetchDashboardData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading && <Loading />}
      <div className="flex justify-between sm:flex-col sm:gap-y-2 md:flex-col md:gap-y-2 lg:flex-col lg:gap-y-5">
        <h1 className="text-3xl font-bold sm:text-sm md:text-md lg:text-3xl">User Management</h1>

        <div className="flex justify-between gap-1 sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-2 lg:gap-3">
          <div className="flex justify-center flex-1 items-center  border border-borderOutlineColor-900 rounded-md bg-white text-[#3c3c3c] lg:w-[68%] md:w-[100%] sm:w-[100%]">
            <input type="text" name="search" placeholder="Search" value={search} onChange={(e) => handleSearch(e)} className="px-3 py-2 rounded-lg outline-none focus:outline-none text-sm w-[250px] sm:w-[100%] sm:px-2 sm:py-2 sm:text-sm md:w-[100%] md:px-2 md:py-2 md:text-2xl lg:text-2xl lg:w-[100%] lg:py-0 lg:px-3" />
            <i className="pr-3 flex items-center text-[#5a5a5a] text-lg sm:pr-1 sm:text-sm md:pr-1 md:text-md md:text-2xl lg:text-2xl">
              <IoIosSearch />
            </i>
          </div>
          {/* create group btn */}
          <button onClick={handleAddUser} className="bg-blue-900 flex justify-center items-center text-white hover:-[#ccc] sm:text-sm md:text-xl lg:gap-3">
            <i className="my-0.4 pr-2 text-2xl lg:my-1 md:text-md md:my-1 lg:text-sm">
              <IoMdAddCircleOutline />
            </i>
            <span className="lg:text-sm " onClick={handleAddUser}>
              Add User
            </span>
          </button>
        </div>
      </div>

      <div className="overflow-y-auto mainFormSection mt-6 sm:max-h-[60vh] lg:max-h-[60vh] boxShadow rounded-lg  sm:mx-1 md:mx-1 lg:mx-1" style={{ height: "calc(100vh - 257px)" }}>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left"> Name</th>
              <th className="text-left">Surname</th>
              <th className="text-left">Contact No</th>
              <th className="text-left">Email id</th>
              <th className="text-left">Authentication Code</th>
              <th className="text-left">Status</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataDetails?.data?.length > 0 ? (
              <>
                {dataDetails?.data
                  ?.filter((item) => item.is_active !== 2)
                  .map((item, index) => (
                    <tr key={index}>
                      <td className="text-left">
                        <div className="flex gap-2 items-center">
                          <div className="w-[40px] flex justify-center md:w-[60px] lg:w-[60px]">{item.profile_picture ? <img src={item.profile_picture} alt="user" className="rounded-full w-[40px] h-[40px]" /> : <img src={adminUserProfile} alt="adminUserProfile" className="rounded-full w-[40px] h-[40px]" />}</div>
                          <span>{item.first_name}</span>
                        </div>
                      </td>

                      <td className="text-left capitalize">{item.last_name}</td>
                      <td className="text-left">{item.phone}</td>
                      <td className="text-left">{item.email}</td>
                      <td className="text-left">{item.authrization_code}</td>

                      <td className="text-left cursor-pointer">
                        <div onClick={() => handleClose(item?.user_id)}>{item.is_active === 1 ? <div className="border text-center rounded-full bg-success text-white p-1 text-sm w-[80px]">Active</div> : <div className="border p-1 text-sm w-[80px] text-center rounded-full bg-danger text-white">Inactive</div>}</div>
                      </td>
                      <td className="text-left">
                        <div className="flex gap-3 sm:gap-1 items-center sm:gap-y-3 sm:items-center md:gap-1 md:gap-y-3 md:items-center xl:gap-1">
                          <img onClick={() => handleEditUser(item)} src={editIcon} alt="edit icon" className="mr-2 text-[#826007] hover:text-blue-800 cursor-pointer sm:ml-0 sm:mr-0 md:w-[18px] md:ml-0 md:mr-0 lg:w-[18px] xl:mr-0" />
                          <img src={deleteIcon} onClick={() => deleteUser(item.user_id)} alt="delete icon" className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer sm:w-[20px] sm:mr-0 sm:ml-0 md:w-[20px] md:mr-0 md:ml-0 lg:w-[30px] xl:mr-0" />
                        </div>
                      </td>
                    </tr>
                  ))}
              </>
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  <p>No data found</p>
                </td>
              </tr>
            )}
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
