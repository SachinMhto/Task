import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import "./Sidebar.css";
import CreateTask from "../Task/CreateTask";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../ReduxToolKit/AuthSlice";

const menu = [
  {
    name: "Home",
    value: "Home",
    role: ["ROLE_ADMIN", "ROLE_CUSTOMER"],
  },
  {
    name: "Done",
    value: "DONE",
    role: ["ROLE_ADMIN", "ROLE_CUSTOMER"],
  },
  {
    name: "Assigned",
    value: "ASSIGNED",
    role: ["ROLE_ADMIN"],
  },
  {
    name: "Not Assigned",
    value: "PENDING",
    role: ["ROLE_ADMIN"],
  },
  {
    name: "Create New Task",
    value: "Create New Task",
    role: ["ROLE_ADMIN"],
  },
  {
    name: "Notification",
    value: "NOTIFICATION",
    role: ["ROLE_CUSTOMER"],
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  console.log("Authorization: ", auth.user.role);
  const role = auth.user.role;
  const [activeMenu, setActiveMenu] = useState("Home");
  const [openCreateTaskForm, setOpenCreateTaskForm] = useState(false);

  const handleCloseCreateTaskForm = () => {
    setOpenCreateTaskForm(false);
  };

  const handleOpenCreateTaskModel = () => {
    setOpenCreateTaskForm(true);
  };

  const handleMenuChange = (item) => {
    console.log("Selected Menu Item:", item); // Debug log
    const updatedParams = new URLSearchParams(location.search);
    if (item.name === "Create New Task") {
      handleOpenCreateTaskModel();
    } else if (item.name === "Home") {
      updatedParams.delete("filter");
      const queryString = updatedParams.toString();
      const updatedPath = queryString
        ? `${location.pathname}?${queryString}`
        : location.pathname;
      navigate(updatedPath);
    } else {
      updatedParams.set("filter", item.value);
      navigate(`${location.pathname}?${updatedParams.toString()}`);
    }
    setActiveMenu(item.name);
    console.log("Active Menu:", item.name); // Debug log
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="card min-h-[85vh] flex flex-col justify-center fixed w-[20vw]">
        <div className="space-y-5 h-full">
          <div className="flex justify-center">
            <Avatar
              sx={{ width: "8rem", height: "8rem" }}
              className="border-2 border-[#c24dd0]"
              src="https://cdn.pixabay.com/photo/2018/07/31/21/58/lion-3576031_640.jpg"
            ></Avatar>
          </div>
          {menu
            .filter((item) => item.role.includes(role))
            .map((item) => (
              <p
                key={item.name}
                onClick={() => handleMenuChange(item)}
                className={`py-1.5 px-3 rounded-full text-center cursor-pointer ${
                  activeMenu === item.name ? "activeMenuItem" : "menuItem"
                }`}
              >
                {item.name}
              </p>
            ))}
          <Button
            onClick={handleLogout}
            sx={{ padding: ".7rem", borderRadius: "2rem" }}
            fullWidth
            className="logoutButton"
          >
            Logout
          </Button>
        </div>
      </div>
      <CreateTask
        open={openCreateTaskForm}
        handleClose={handleCloseCreateTaskForm}
      />
    </>
  );
};

export default Sidebar;
