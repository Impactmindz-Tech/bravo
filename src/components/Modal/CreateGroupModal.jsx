import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import Multiselect from "multiselect-react-dropdown";
import "react-tagsinput/react-tagsinput.css";
import { CreateGroup, updateEditGroup } from "../../utils/service/GroupService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createGroup } from "../../utils/validation/FormValidation";
import toast from "react-hot-toast";
import { getAllUser } from "../../utils/service/CommonService";

const CreateGroupModal = ({ createGroupModalOpen, setCreateGroupModalOpen, fetchGroup, groupItem }) => {
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(createGroup) });

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const fetchDashboardData = async () => {
    try {
      const response = await getAllUser();
      setUser(response);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (groupItem) {
      setValue("group_name", groupItem?.name || "");
      setValue("group_desc", groupItem?.description || "");
      const formattedMembers =
        groupItem?.members?.map((member) => ({
          name: member.first_name,
          id: member.user_id,
        })) || [];
      setGroupMemberList(formattedMembers);
      setSelectedFile(groupItem?.group_picture);
    } else {
      reset(); // Reset form fields if not in edit mode
      setGroupMemberList([]);
      setSelectedFile(null);
    }
  }, [groupItem, setValue, reset]);

  const handleSelect = (selectedList) => setGroupMemberList(selectedList);

  const handleRemove = (selectedList) => setGroupMemberList(selectedList);

  const onSubmit = async (payload) => {
    if (groupMemberList.length === 0) {
      toast.error("Please select at least one group member");
      return;
    }
    if (!selectedFile) {
      toast.error("Please select Group Image");
      return;
    }
    const formData = new FormData();
    formData.append("group_name", payload.group_name);
    formData.append("group_desc", payload.group_desc);
    const memberIds = JSON.stringify(groupMemberList.map((member) => member.id));
    formData.append("members", memberIds);
    formData.append("group_picture", selectedFile);

    try {
      let response;
      if (groupItem) {
        formData.append("group_id", groupItem?.group_id);
        response = await updateEditGroup(formData);
      } else {
        response = await CreateGroup(formData);
      }

      if (response?.isSuccess) {
        toast.success(response?.message);
        setCreateGroupModalOpen(false);
        reset();
        setGroupMemberList([]);
        setSelectedFile(null);
        fetchGroup();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    if (!groupItem) {
      reset();
      setGroupMemberList([]);
      setSelectedFile(null);
      setCreateGroupModalOpen(false);
    } else {
      setCreateGroupModalOpen(false);
    }
  };

  return (
    <Modal open={createGroupModalOpen} onClose={handleModalClose} className="fixed modalContainer inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="overflow-y-auto mainFormSection sm:w-[90vw] sm:h-[70vh] md:w-[90vw] md:h-[70vh] lg:w-[80vw] lg:h-[65vh] xl:w-[60vw] xl:h-[60vh] w-[55vw] h-[60vh]">
        <div className="relative w-full mx-auto rounded-lg overflow-hidden">
          <div className="relative bg-white rounded-lg shadow-md pb-4">
            <div className="flex justify-between items-center mb-4 bg-blue-900 py-2">
              <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">Create Group</h2>
              <button onClick={handleModalClose} className="bg-blue-900 hover:text-gray-900 hover:border-none hover:outline-none text-lg text-white border-none outline-none">
                <IoClose />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-8 flex flex-col gap-y-4">
                <div>
                  <div className="flex sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-1 lg:flex-col lg:gap-y-1">
                    <h4 className="text-blue-300 w-[20%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[25%]">
                      Group Name <span className="text-red-500 font-extrabold">*</span>
                    </h4>
                    <div className="flex w-[80%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[75%]">
                      <input type="text" placeholder="Std 10 Group" className="text-sm w-[100%] py-2 px-2 outline-none input" {...register("group_name")} />
                    </div>
                  </div>
                  <p className="text-[red]">{errors?.group_name?.message}</p>
                </div>
                <div>
                  <div className="flex sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-1 lg:flex-col lg:gap-y-1">
                    <h4 className="text-blue-300 w-[20%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[25%]">
                      Group Description <span className="text-red-500 font-extrabold">*</span>
                    </h4>
                    <div className="flex w-[80%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[75%]">
                      <input type="text" placeholder="Group Description" className="text-sm w-[100%] py-2 px-2 outline-none input" {...register("group_desc")} />
                    </div>
                  </div>
                  <p className="text-[red]">{errors?.group_desc?.message}</p>
                </div>
                <div className="flex sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-1 lg:flex-col lg:gap-y-1">
                  <h4 className="text-blue-300 w-[20%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[25%]">
                    Members Name <span className="text-red-500 font-extrabold">*</span>
                  </h4>
                  <div className="w-[80%] md:w-[100%] lg:w-[100%] xl:w-[75%] sm:w-[100%] py-2 px-2 list-none">
                    <Multiselect
                      options={user.data?.map((user) => ({ name: user.first_name, id: user.user_id }))}
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
                    <input id="file-upload" type="file" className="hidden" onChange={(event) => setSelectedFile(event.target.files[0])} />
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
                <button className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none border-none">{groupItem ? "Update Group" : "Create Group"}</button>
                <button onClick={handleModalClose} className="border border-black bg-white text-black font-semibold rounded-lg focus:outline-none hover:border-black">
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
