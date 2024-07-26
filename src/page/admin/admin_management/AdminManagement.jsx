import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import editIcon from "../../../assets/images/editIcon.svg";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import adminUserProfile from "../../../assets/images/adminUserProfile.svg";
import AdminManagementModalComponent from "../../../components/Modal/AdminManagementModal";
import { getAllAdminsApi, searchAdminApi } from "../../../utils/service/AdminService";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../../../store/Slice/AdminSlice";
import Pagination from "../../../components/Pagination";
import Loading from "../../../components/Loading";
import { userStateUpdate } from "../../../utils/service/DashboardService";
import toast from "react-hot-toast";

export default function AdminManagement() {
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [adminItem, setAdminItem] = useState(null);
  const adminData = useSelector((state) => state.admin.admin);
  const [search, setSearch] = useState("");

  const handleAdminDelete = async (user_id) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    try {
      const response = await userStateUpdate(formData);
      if (response?.isSuccess) {
        toast.success(response?.message);
        getAllAdmins();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAdmins = async () => {
    try {
      setLoading(true);
      const response = await getAllAdminsApi({ pg: currentPage, items_per_page: itemsPerPage });
      if (response?.isSuccess) {
        dispatch(setAdmin(response));
        setTotalPages(Math.ceil(response.total_items / itemsPerPage));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, [currentPage, itemsPerPage]);

  const handleEditAdmin = (adminData) => {
    setAdminItem(adminData);
    setAddAdminModalOpen(true);
  };

  const handleAddUser = () => {
    setAdminItem(null);
    setAddAdminModalOpen(true);
  };

  const handleModalClose = () => {
    setAddAdminModalOpen(false);
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);

    if (e.target.value == "") {
      getAllAdmins();
      return;
    }
    const response = await searchAdminApi({ search: e.target.value });
    dispatch(setAdmin(response));
  };
  return (
    <>
      {loading && <Loading />}
      <div className="flex justify-between sm:flex-col sm:gap-y-2 md:flex-col md:gap-y-2 lg:flex-col lg:gap-y-5">
        <h1 className="text-3xl font-bold sm:text-sm md:text-md lg:text-3xl">Admin Management</h1>
        <div className="flex gap-1 sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-2 lg:gap-3">
          <div className="flex justify-center items-center border border-[#ccc] rounded-md bg-white text-[#3c3c3c] lg:w-[68%] md:w-[100%] sm:w-[100%]">
            <input type="text" name="search" value={search} onChange={(e) => handleSearch(e)} placeholder="Search" className="px-3 py-2 rounded-lg outline-none focus:outline-none text-md w-[270px] sm:w-[100%] sm:px-2 sm:py-2 sm:text-sm md:w-[100%] md:px-2 md:py-3 md:text-2xl lg:text-2xl lg:w-[100%] lg:py-0 lg:px-3" />
            <i className="pr-3 flex items-center text-[#5a5a5a] text-lg sm:pr-1 sm:text-sm md:pr-1 md:text-md md:text-2xl lg:text-2xl">
              <IoIosSearch />
            </i>
          </div>

          <button onClick={handleAddUser} className="bg-blue-900 text-white flex justify-center  hover:border-[#ccc] sm:text-sm md:text-xl">
            <i className="my-0.4 pr-2 text-2xl sm:text-sm sm:my-1  md:text-md md:my-0 lg:my-2">
              <IoMdAddCircleOutline />{" "}
            </i>{" "}
            Add Admin
          </button>
        </div>
      </div>

      <div className="overflow-y-auto mainFormSection mt-6 sm:max-h-[60vh] boxShadow rounded-lg sm:mx-1 md:mx-1 lg:mx-1" style={{ height: "calc(100vh - 257px)" }}>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">User Name</th>
              <th className="text-left">Email id</th>
              <th className="text-left">Contact No</th>
              <th className="text-left">Role</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {adminData?.data?.length > 0 ? (
              <>
                {adminData?.data?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-left">
                      <div className="flex gap-2 items-center">
                        <div className="w-[40px] flex justify-center md:w-[60px] lg:w-[60px]">
                        {item.profile_picture?    <img src={item.profile_picture} alt="user " className="rounded-full w-[40px] h-[40px]" />:    <img src={adminUserProfile} alt="adminUserProfile " className="rounded-full w-[40px] h-[40px]" />}
                      
                        </div>
                        <span>{item.first_name}</span>
                      </div>
                    </td>

                    <td className="text-left">{item.email}</td>
                    <td className="text-left">{item.phone}</td>

                    <td className="text-left">{item.role_name}</td>
                    <td className="text-left">
                      <div className="flex gap-2 sm:gap-1 items-center sm:flex-col sm:gap-y-3  sm:items-center md:gap-1 md:flex-col md:gap-y-3  md:items-center lg:flex-col lg:items-center xl:gap-1">
                        <img src={editIcon} onClick={() => handleEditAdmin(item)} alt="edit icon" className="mr-2 text-[#826007] hover:text-blue-800 cursor-pointer sm:w-[20px] sm:ml-0 sm:mr-0 md:w-[20px] md:ml-0 md:mr-0 lg:w-[30px] xl:mr-0" />
                        <img src={deleteIcon} onClick={() => handleAdminDelete(item?.user_id)} alt="edit icon" className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer sm:w-[20px] sm:mr-0 sm:ml-0 md:w-[20px] md:mr-0 md:ml-0 lg:w-[30px] xl:mr-0" />
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

      {/* popup model */}
      <div className="flex items-center ">
        <AdminManagementModalComponent adminItem={adminItem} getAllAdmins={getAllAdmins} addAdminModalOpen={addAdminModalOpen} setAddAdminModalOpen={handleModalClose} />
      </div>
    </>
  );
}
