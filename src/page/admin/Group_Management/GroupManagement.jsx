import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import editIcon from "../../../assets/images/editIcon.svg";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import groupIcon from "../../../assets/images/groupIcon.svg";
import { IoMdAddCircleOutline } from "react-icons/io";
import CreateGroupModal from "../../../components/Modal/CreateGroupModal";
import Loading from "../../../components/Loading";
import { setGroup } from "../../../store/Slice/GroupSlice";
import { getAllGroups, searchGroupApi, statusUpdae } from "../../../utils/service/GroupService";
import Pagination from "../../../components/Pagination";
import toast from "react-hot-toast";

export default function GroupManagement() {
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groupItem, setGroupItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const groupData = useSelector((state) => state.group.group);

  const groupStatusUpdate = async (id) => {
    const formData = new FormData();
    formData.append("group_id", id);
    try {
      const responnse = await statusUpdae(formData);
      if (responnse?.isSuccess) {
        toast.success(responnse?.message);
        fetchGroup();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroup = async () => {
    try {
      setLoading(true);
      const response = await getAllGroups({
        pg: currentPage,
        items_per_page: itemsPerPage,
      });
      if (response?.isSuccess) {
        dispatch(setGroup(response));
        setTotalPages(Math.ceil(response.total_items / itemsPerPage));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    fetchGroup();
  }, []);

  const handleGroupEdit = (item) => {
    setGroupItem(item);
    setCreateGroupModalOpen(true);
  };

  const handleModalClose = () => {
    setCreateGroupModalOpen(false);
  };

  const handleAddGroup = () => {
    setGroupItem(null);
    setCreateGroupModalOpen(true);
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);

    if (e.target.value == "") {
      fetchGroup();
      return;
    }
    const response = await searchGroupApi({ search: e.target.value });
    dispatch(setGroup(response));
  };
  return (
    <>
      {loading && <Loading />}
      <div className="flex justify-between sm:flex-col sm:gap-y-2 md:flex-col md:gap-y-2 lg:flex-col lg:gap-y-5 w-[100%]">
        <h1 className="text-3xl font-bold sm:text-sm md:text-md lg:text-3xl">Group Management</h1>
        {/* search bar */}
        <div className="flex justify-between gap-1 sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-2 lg:gap-3">
          <div className="flex justify-center flex-1 items-center  border border-borderOutlineColor-900 rounded-md bg-white text-[#3c3c3c] lg:w-[68%] md:w-[100%] sm:w-[100%]">
            <input type="text" name="search" placeholder="Search" value={search} onChange={(e) => handleSearch(e)} className="px-3 py-2 rounded-lg outline-none focus:outline-none text-sm w-[250px] sm:w-[100%] sm:px-2 sm:py-2 sm:text-sm md:w-[100%] md:px-2 md:py-2 md:text-2xl lg:text-2xl lg:w-[100%] lg:py-0 lg:px-3" />
            <i className="pr-3 flex items-center text-[#5a5a5a] text-lg sm:pr-1 sm:text-sm md:pr-1 md:text-md md:text-2xl lg:text-2xl">
              <IoIosSearch />
            </i>
          </div>
          {/* create group btn */}
          <button onClick={() => setCreateGroupModalOpen(true)} className="bg-blue-900 flex justify-center items-center text-white hover:-[#ccc] sm:text-sm md:text-xl lg:gap-3">
            <i className="my-0.4 pr-2 text-2xl lg:my-1 md:text-md md:my-1 lg:text-sm">
              <IoMdAddCircleOutline />
            </i>
            <span className="lg:text-sm" onClick={handleAddGroup}>
              Create Group
            </span>
          </button>
        </div>
      </div>

      {/* table section */}
      <div className="overflow-y-auto mainFormSection mt-6 sm:max-h-[60vh] lg:max-h-[60vh] boxShadow rounded-lg  sm:mx-1 md:mx-1 lg:mx-1" style={{ height: "calc(100vh - 257px)" }}>
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
            {groupData?.data?.length > 0 ? (
              <>
                {groupData?.data?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-left">
                        <div className="flex gap-2 items-center">
                          <div className="w-[40px] flex justify-center md:w-[60px] lg:w-[60px]">{item.group_picture ? <img src={item.group_picture} alt="user " className="rounded-full w-[40px] h-[40px]" /> : <img src={groupIcon} alt="adminUserProfile " className="rounded-full w-[40px] h-[40px]" />}</div>
                          <span>{item.name}</span>
                        </div>
                      </td>

                      <td className="text-left">{item?.members?.length}</td>
                      <td className="text-left">
                        <div className="flex gap-3 flex-wrap lg:flex-nowrap">
                          {item?.members?.map((member, index) => {
                            return <p key={index}>{member.username}</p>;
                          })}
                        </div>
                      </td>

                      <td className="text-left">
                        <div className="flex gap-2 sm:gap-1 items-center sm:gap-y-3  sm:items-center md:gap-1  md:gap-y-3  md:items-center lg:items-center xl:gap-1 lg:gap-2">
                          <img onClick={() => handleGroupEdit(item)} src={editIcon} alt="edit icon" className="mr-2 text-[#826007] hover:text-blue-800 cursor-pointer sm:w-[20px] sm:ml-0 sm:mr-0 md:w-[20px] md:ml-0 md:mr-0 lg:w-[18px] xl:mr-0" />
                          <img src={deleteIcon} onClick={() => groupStatusUpdate(item.group_id)} alt="edit icon" className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer   md:ml-0 lg:w-[15px] xl:mr-0" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
      <div className="flex items-center">
        <CreateGroupModal groupItem={groupItem} createGroupModalOpen={createGroupModalOpen} setCreateGroupModalOpen={handleModalClose} fetchGroup={fetchGroup} />
      </div>
    </>
  );
}
