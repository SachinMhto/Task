import React, { useState } from "react";
import myimage from "../../../assets/pictures/car.jpg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreVert from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import UserList from "../UserList";
import SubmissionList from "./SubmissionList";
import EditTaskCard from "./EditTaskCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../../ReduxToolKit/TaskSlice";
import { useLocation, useNavigate } from "react-router-dom";
import SubmitFormModel from "./SubmitFormModel";

const role = "ROLE_ADMIN";
const TaskCard = ({ item }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [openUserList, setOpenUserList] = useState(false);
  const handleCloseUserList = () => {
    setOpenUserList(false);
  };
  const handleOpenUserList = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", item.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenUserList(true);
    handleMenuClose();
  };
  const [openSubmissionList, setSubmissionList] = useState(false);
  const handleCloseSubmissionList = () => {
    setSubmissionList(false);
  };
  const handleOpenSubmissionList = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", item.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setSubmissionList(true);
    handleMenuClose();
  };
  const [openSubmitFormModel, setSubmitFormModel] = useState(false);
  const handleCloseSubmitFormModel = () => {
    setSubmitFormModel(false);
  };
  const handleOpenSubmitFormModel = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", item.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setSubmitFormModel(true);
    handleMenuClose();
  };
  const [openUpdateTask, setUpdateTask] = useState(false);
  const handleCloseUpdateTaskForm = () => {
    setUpdateTask(false);
  };
  const handleRemoveTaskIdParams = () => {
    updatedParams.delete("filter");
    const queryString = updatedParams.toString();
    const updatedPath = queryString
      ? `${location.pathname}?${queryString}`
      : location.pathname;
    navigate(updatedPath);
  };
  const handleOpenUpdateTaskModel = () => {
    const updatedParams = new URLSearchParams(location.search);

    updatedParams.set("taskId", item.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setUpdateTask(true);
    handleMenuClose();
  };
  const handleDeleteTask = () => {
    console.log("item Id: ", item.id);
    dispatch(deleteTask({ taskId: item.id }));
    handleMenuClose();
  };
  return (
    <div className="card lg:flex justify-between">
      <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
        <div className="">
          <img
            className="lg:w-[7rem] lg:h-[7rem] object-cover"
            src={item.image}
            alt=""
          />
        </div>
        <div className="space-y-2">
          <div className="space-y-2">
            <h1 className="font-bold text-lg">{item.title}</h1>
            <p className="text-gray-500 text-sm">{item.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {item.tags.map((item) => (
              <span className="py-1 px-5 rounded-full techStack">{item}</span>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleMenuClick}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {auth.user?.role === "ROLE_ADMIN" ? (
              <>
                <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
                <MenuItem onClick={handleOpenSubmissionList}>
                  See Submission
                </MenuItem>
                <MenuItem onClick={handleOpenUpdateTaskModel}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleOpenSubmitFormModel}>Submit</MenuItem>
              </>
            )}
          </Menu>
        </div>
      </div>
      <UserList open={openUserList} handleClose={handleCloseUserList} />
      <SubmissionList
        open={openSubmissionList}
        handleClose={handleCloseSubmissionList}
      />
      <EditTaskCard
        item={item}
        open={openUpdateTask}
        handleClose={handleCloseUpdateTaskForm}
      />
      <SubmitFormModel
        open={openSubmitFormModel}
        handleClose={handleCloseSubmitFormModel}
      />
    </div>
  );
};

export default TaskCard;
