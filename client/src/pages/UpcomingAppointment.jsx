import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice";
import { calcDaysUntilDue } from "../util/dueDate";
import { useGetUpcomingScheduleListQuery } from "../features/schedulerApiSlice";
import { formatDistanceToNow } from "date-fns";

function UpcomingAppointment() {
  const user = useSelector(getCurrentUser);

  const navigate = useNavigate();
  const { data: scheduleList } = useGetUpcomingScheduleListQuery({
    officeId: user.officeId,
  });

  return (
    <div className="w-[98%] h-[98%] flex flex-col ">
      <div className="flex items-center justify-center">
        <div className=" flex flex-col gap-2 w-full">
          <div>
            <span onClick={() => navigate("../")}>
              <FaArrowLeft />
            </span>
          </div>
          {scheduleList?.some(
            (item) =>
              calcDaysUntilDue(new Date(item?.startTime)).daysRemaining !== 0
          ) ? (
            scheduleList?.map((item) => {
              const { daysRemaining } = calcDaysUntilDue(
                new Date(item?.startTime),
                new Date()
              );

              if (daysRemaining !== 0) {
                return (
                  <div
                    key={item._id}
                    className="flex gap-2 sm:border-2 sm:border-gray-200 rounded px-2"
                  >
                    <div className="flex flex-col w-full">
                      <div className="py-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-2">
                        <span className=" font-medium text-gray-500">
                          Title
                        </span>
                        <span>{item?.title}</span>
                      </div>
                      <div className="py-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-2">
                        <span className=" font-medium text-gray-500">
                          Start
                        </span>
                        <span>{new Date(item.startTime).toLocaleString()}</span>
                      </div>
                      <div className="py-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-2">
                        <span className=" font-medium text-gray-500">End</span>
                        <span>{new Date(item.endTime).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 items-center justify-center">
                      <span className=" font-bold">
                        {formatDistanceToNow(item.startTime)}
                      </span>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <div className="text-center py-4 text-gray-500">
              No upcoming appointments
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpcomingAppointment;
