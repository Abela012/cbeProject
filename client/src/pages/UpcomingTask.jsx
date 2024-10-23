import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetTasksQuery } from "../features/taskApiSlice";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice";
import { differenceInDays } from "date-fns";
import { calcDaysUntilDue } from "../util/dueDate";

function UpcomingTask() {
  const user = useSelector(getCurrentUser);

  const navigate = useNavigate();
  const { data } = useGetTasksQuery({ officeId: user.officeId });
  console.log(data);

  return (
    <div className=" flex flex-col gap-2 w-full">
      <div>
        <span onClick={() => navigate("../")}>
          <FaArrowLeft />
        </span>
      </div>
      {data?.map((task) => {
        if (task.status == "Pending") {
          const due = calcDaysUntilDue(new Date(task?.dueDate), new Date());
          if (due !== "") {
            return (
              <div
                key={task._id}
                className="flex gap-2 sm:border-2 sm:border-gray-200 rounded"
              >
                <div className="flex flex-col w-full">
                  <div className="py-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-2">
                    <span className=" font-medium text-gray-500">Assigner</span>
                    <span>{task?.assigner?.name}</span>
                  </div>
                  <div className="py-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-2">
                    <span className=" font-medium text-gray-500">
                      Description
                    </span>
                    <span>{task.description}</span>
                  </div>
                  <div className="py-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-2">
                    <span className=" font-medium text-gray-500">Due in</span>
                    <span>
                      {differenceInDays(new Date(task?.dueDate), new Date())}{" "}
                      day/s
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <span className=" font-bold">
                    {task.isSeen ? "Seen" : "UnSeen"}
                  </span>
                </div>
              </div>
            );
          }
        }
      })}
    </div>
  );
}

export default UpcomingTask;
