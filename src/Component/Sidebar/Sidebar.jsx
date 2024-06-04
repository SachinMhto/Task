import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import "./Sidebar.css";
import CreateTask from "../Task/CreateTask";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
const role = "ROLE_ADMIN";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Home");
  const [openCreateTaskForm, setOpenCreateTaskForm] = useState(false);
  const handleCloseCreateTaskForm = () => {
    setOpenCreateTaskForm(false);
  };
  const handleOpenCreateTaskModel = () => {
    setOpenCreateTaskForm(true);
  };
  const handleMenuChange = (item) => {
    const updatedParams = new URLSearchParams(location.search);
    if (item.name == "Create New Task") {
      handleOpenCreateTaskModel();
    } else if (item.name == "Home") {
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
              src="data:image/png;base64,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"
            ></Avatar>
          </div>
          {menu
            .filter((item) => item.role.includes(role))
            .map((item) => (
              <p
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
