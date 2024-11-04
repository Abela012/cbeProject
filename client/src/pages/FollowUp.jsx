import { useSelector } from "react-redux";
import OverLay from "../components/OverLay";
import TextArea from "../components/textArea/TextArea";
import { useGetCaseQuery } from "../features/caseApiSlice";
import {
  useGetTaskFollowUpQuery,
  useSendMessageMutation,
} from "../features/taskApiSlice";
import { getCurrentUser } from "../features/authSlice";
import Button from "../components/button/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { parseISO } from "date-fns";

function FollowUp({ caseId, handleClose }) {
  //   const officeId = "66d01e877ee4082d58a5e7df";
  // const officeId = "66d025d3802707b84e640f11"
  // const officeId = "66d025e7802707b84e640f14";
  const user = useSelector(getCurrentUser);
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [message, setMessage] = useState({
    taskId: selectedTask,
    userId: user._id,
    message: "",
  });
  const { data: caseData, isSuccess: isSuccessCase } = useGetCaseQuery(caseId);
  const { data } = useGetTaskFollowUpQuery({
    caseId,
    officeId: selectedOffice,
  });
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    setSelectedOffice(caseData?.assignedOfficeIdList[0]?._id);
  }, [isSuccessCase]);

  // console.log(data, caseData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await sendMessage(message).unwrap();
      toast.success(response, {
        position: "bottom-right",
      });
      setMessage((prev) => ({ ...prev, message: "" }));
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  };
  return (
    <OverLay handleClick={handleClose}>
      <div className=" flex flex-col gap-4 bg-white p-5 rounded-lg w-[80%] sm:w-[600px] h-[90%] overflow-auto ">
        <div className=" grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
          {caseData?.assignedOfficeIdList ? (
            caseData?.assignedOfficeIdList?.map((office) => (
              <span
                key={office._id}
                className={
                  selectedOffice == office._id
                    ? " bg-secondary-dark" +
                      " text-center p-2 border-b-2 border-secondary-dark  rounded-t "
                    : " text-center p-2 border-b-2 border-secondary-dark  rounded-t "
                }
                onClick={(e) => setSelectedOffice(office?._id)}
              >
                {office.officeName}
              </span>
            ))
          ) : (
            <span className="w-max">No assigned to anyone</span>
          )}
        </div>

        <div className="">
          <div>
            <div className="border-2 rounded-md p-1">
              {data?.map((chat) => (
                <div
                  key={chat._id}
                  className="border-b p-1"
                  onClick={() => {
                    setSelectedTask(chat.taskId._id);
                    setMessage((prev) => ({
                      ...prev,
                      taskId: chat.taskId._id,
                    }));
                  }}
                >
                  <h2
                    className={
                      selectedTask == chat.taskId._id
                        ? "text-left text-lg font-bold"
                        : " text-left text-lg"
                    }
                  >
                    {chat.taskId.description}
                  </h2>

                  {chat?.followUp.lenght == 0 ? (
                    "No message yet"
                  ) : (
                    <div className="flex flex-col gap-4 max-h-60 overflow-auto bg-[rgb(241,241,241)]">
                      {chat?.followUp.length == 0 ? (
                        <span className="text-sm opacity-50 text-center w-full inline-block">
                          No message yet
                        </span>
                      ) : (
                        chat?.followUp?.map((msg, idx) => (
                          <span
                            key={idx}
                            className={
                              user._id == msg.user
                                ? " border bg-primary-light rounded p-1 w-1/2 self-end relative"
                                : " border bg-white rounded p-1 w-1/2 relative"
                            }
                          >
                            {msg.message}
                            <span className="absolute right-1 text-xs -bottom-4">
                              {parseISO(msg?.time).toLocaleTimeString([], {
                                month: "long",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </span>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <TextArea
                  disabled={selectedTask ? false : true}
                  handleInputChange={handleChange}
                  value={message.message}
                  name="message"
                  placeholder="Type message"
                  inputName="message"
                />
              </div>
              <Button
                disabled={selectedTask ? false : true}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </OverLay>
  );
}

export default FollowUp;
