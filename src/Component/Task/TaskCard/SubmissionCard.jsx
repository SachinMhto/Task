import React, { useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { acceptDeclineSubmission } from "../../../ReduxToolKit/SubmissionSlice";

const SubmissionCard = ({ item }) => {
  const dispatch = useDispatch();
  const [isAccepted, setIsAccepted] = useState(true);

  const handleAcceptOrDecline = (status) => {
    dispatch(acceptDeclineSubmission({ id: item.id, status }));
    console.log("item from submissioncard: ", item);
  };

  return (
    <div className="rounded-md bg-black p-5 flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span>GitHub:</span>
          <div className="flex items-center gap-2 text-[#c24dd0]">
            <OpenInNewIcon />
            <a href={item.githubLink} target="_blank" rel="noopener noreferrer">
              Go To Link
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <p>Submission Time: {item.submissionTime}</p>
          <p className="text-gray-500"></p>
        </div>
      </div>
      <div>
        {item.status === "PENDING" ? (
          <div className="flex gap-5">
            <div className="text-green-500">
              <IconButton
                color="success"
                onClick={() => handleAcceptOrDecline("ACCEPTED")}
              >
                <CheckIcon />
              </IconButton>
            </div>
            <div className="text-red-500">
              <IconButton
                color="Error"
                onClick={() => handleAcceptOrDecline("DECLINED")}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <Button
            color={item.status == "ACCEPTED" ? "success" : "error"}
            size="small"
            variant="outlined"
          >
            {item.status}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubmissionCard;
