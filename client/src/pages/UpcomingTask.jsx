import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetTasksQuery } from "../features/taskApiSlice";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice";
import { formatDistanceToNow } from "date-fns";
import { calcDaysUntilDue } from "../util/dueDate";

function UpcomingTask() {
  const user = useSelector(getCurrentUser);

  const navigate = useNavigate();
  const { data } = useGetTasksQuery({ officeId: user.officeId });
  // console.log(data);

  return (
    <div className=" flex flex-col gap-2 w-full">
      <div>
        <span onClick={() => navigate("../")}>
          <FaArrowLeft />
        </span>
      </div>
      {data?.some(
        (task) =>
          task.status === "Pending" &&
          calcDaysUntilDue(new Date(task?.dueDate), new Date()) !== ""
      ) ? (
        data?.map((task) => {
          if (task.status === "Pending") {
            const due = calcDaysUntilDue(new Date(task?.dueDate), new Date());
            if (due !== "") {
              return (
                <div
                  key={task._id}
                  className="flex gap-2 border-2 border-gray-200 rounded"
                >
                  <div className="flex flex-col w-full">
                    <div className="py-2 grid grid-cols-2 gap-2 px-2">
                      <span className="font-medium text-gray-500">
                        Assigner
                      </span>
                      <span>{task?.assigner?.name}</span>
                    </div>
                    <div className="py-2 grid grid-cols-2 gap-2 px-2">
                      <span className="font-medium text-gray-500">
                        Description
                      </span>
                      <span>{task.description}</span>
                    </div>
                    <div className="py-2 grid grid-cols-2 gap-2 px-2">
                      <span className="font-medium text-gray-500">Due in</span>
                      <span>
                        {formatDistanceToNow(new Date(task?.dueDate))}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center justify-center">
                    <span className="font-bold">
                      {task.isSeen ? "Seen" : "UnSeen"}
                    </span>
                  </div>
                </div>
              );
            }
          }
          return null;
        })
      ) : (
        <div className="text-center py-4 text-gray-500">No upcoming tasks</div>
      )}
    </div>
  );
}

export default UpcomingTask;
