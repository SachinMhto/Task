import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSubmissionByTaskId } from "../../../ReduxToolKit/SubmissionSlice";
import { useLocation } from "react-router-dom";
import SubmissionCard from "./SubmissionCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SubmissionList({ handleClose, open }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId");
  const { submission } = useSelector((store) => store.submission);

  useEffect(() => {
    if (taskId) {
      console.log("Fetching submission by task Id:", taskId);
      dispatch(fetchSubmissionByTaskId(taskId));
    }
  }, [taskId, dispatch]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {submission.length > 0 ? (
              <div className="space-y-2">
                {submission.map((item) => (
                  <SubmissionCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div>No Submission Found</div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
