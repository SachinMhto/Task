import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import myimg from "../../../src/assets/pictures/bird.jpg";
import { useEffect } from "react";
import { getUserList } from "../../ReduxToolKit/AuthSlice";
import { assignTaskToUser } from "../../ReduxToolKit/TaskSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 2,
};

export default function UserList({ handleClose, open }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserList(localStorage.getItem("jwt")));
  }, [dispatch]);
  const handleAssignedTaskToUser = (user) => {
    dispatch(assignTaskToUser({ userId: user.id, taskId: taskId }));
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {auth.users && auth.users.length > 0 ? (
            auth.users.map((item, index) => (
              <React.Fragment key={item.id || index}>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={myimg}></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.username}
                        secondary={
                          item.username
                            ? `@${item.username
                                .split(" ")
                                .join("_")
                                .toLowerCase()}`
                            : "@unknown_user"
                        }
                      ></ListItemText>
                    </ListItem>
                  </div>
                  <div>
                    <Button
                      onClick={() => handleAssignedTaskToUser(item)}
                      className="customeButton"
                    >
                      Select
                    </Button>
                  </div>
                </div>
                {index !== auth.users.length - 1 && <Divider variant="inset" />}
              </React.Fragment>
            ))
          ) : (
            <Typography>No users available</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
}
