import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import Multiselect from "multiselect-react-dropdown";
import "react-tagsinput/react-tagsinput.css";
import { CreateGroup, getUser } from "../../utils/service/GroupService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createGroup } from "../../utils/validation/FormValidation";

const CreateGroupModal = ({ createGroupModalOpen, setCreateGroupModalOpen }) => {
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createGroup) });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const fetchDashboardData = async () => {
    try {
      const response = await getUser();
      setUser(response);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const onSelect = (selectedList, selectedItem) => {
    setGroupMemberList(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setGroupMemberList(selectedList);
  };

  const handleSelect = (selectedList) => setGroupMemberList(selectedList);

  const handleRemove = (selectedList) => setGroupMemberList(selectedList);

  const onSubmit = async (payload) => {
    const formData = new FormData();
    formData.append("group_name", payload.group_name);
    formData.append("group_desc", payload.group_desc);
    const memberIds = JSON.stringify(groupMemberList.map(member => member.id));
    formData.append("members", memberIds);
    formData.append("group_picture", selectedFile);
    try {
      const response = await CreateGroup(formData);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Modal open={createGroupModalOpen} onClose={() => setCreateGroupModalOpen(false)} className="fixed modalContainer inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="overflow-y-auto mainFormSection sm:w-[90vw] sm:h-[70vh] md:w-[90vw] md:h-[70vh] lg:w-[80vw] lg:h-[65vh] xl:w-[60vw] xl:h-[60vh] w-[55vw] h-[60vh]">
        <div className="relative w-full mx-auto rounded-lg overflow-hidden">
          <div className="relative bg-white rounded-lg shadow-md pb-4">
            <div className="flex justify-between items-center mb-4 bg-blue-900 py-2">
              <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">Create Group</h2>
              <button onClick={() => setCreateGroupModalOpen(false)} className="bg-blue-900 hover:text-gray-900 hover:border-none hover:outline-none text-lg text-white border-none outline-none">
                <IoClose />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-8 flex flex-col gap-y-4">
                <div className="flex sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-1 lg:flex-col lg:gap-y-1">
                  <h4 className="text-blue-300 w-[20%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[25%]">
                    Group Name <span className="text-red-500 font-extrabold">*</span>
                  </h4>
                  <div className="flex w-[80%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[75%]">
                    <input type="text" placeholder="Std 10 Group" className="text-sm w-[100%] py-2 px-2 outline-none input" {...register("group_name")} />
                  </div>
                </div>
                <div className="flex sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-1 lg:flex-col lg:gap-y-1">
                  <h4 className="text-blue-300 w-[20%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[25%]">
                    Group Description <span className="text-red-500 font-extrabold">*</span>
                  </h4>
                  <div className="flex w-[80%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[75%]">
                    <input type="text" placeholder="Group Description" className="text-sm w-[100%] py-2 px-2 outline-none input" {...register("group_desc")} />
                  </div>
                </div>

                <div className="flex sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-1 lg:flex-col lg:gap-y-1">
                  <h4 className="text-blue-300 w-[20%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[25%]">
                    Members Name <span className="text-red-500 font-extrabold">*</span>
                  </h4>
                  <div className="w-[80%] md:w-[100%] lg:w-[100%] xl:w-[75%] sm:w-[100%] py-2 px-2 list-none">
                    <Multiselect
                      options={user.data?.map((user) => ({ name: user.first_name , id:user.user_id }))}
                      selectedValues={groupMemberList}
                      onSelect={handleSelect}
                      onRemove={handleRemove}
                      displayValue="name"
                      placeholder="Members Name"
                      style={{
                        multiselectContainer: { width: "100%" },
                        searchBox: { width: "100%" },
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-center sm:flex-col md:flex-col sm:gap-y-2 md:gap-y-2 lg:flex-col lg:gap-y-1">
                  <h4 className="text-blue-300 font-semibold w-[20%] lg:w-[100%] xl:w-[25%] sm:w-[100%] 3xl:text-xl md:w-[100%]">Group Picture</h4>

                  <div className="flex w-[80%] lg:w-[100%] xl:w-[75%] items-center input py-1 px-2 sm:flex-col sm:gap-y-1 sm:w-[100%] md:w-[100%]">
                    <label htmlFor="file-upload" className="flex items-center bg-blue-900 px-4 py-2 sm:justify-center sm:text-center rounded-lg cursor-pointer font-semibold text-white sm:w-[100%]">
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
              </div>

              <div className="flex justify-end mr-9 gap-2 sm:mr-0 sm:justify-center">
                <button className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none border-none">Submit</button>
                <button onClick={() => setCreateGroupModalOpen(false)} className="border border-black bg-white text-black font-semibold rounded-lg focus:outline-none hover:border-black">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateGroupModal;
