import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice";
import { useGetCasesQuery } from "../features/caseApiSlice";
import { calcDaysUntilDue } from "../util/dueDate";

function UpcomingCase() {
  const user = useSelector(getCurrentUser);

  const navigate = useNavigate();
  const { data } = useGetCasesQuery({
    searchTerm: "",
    officeId: user.officeId,
  });

  return (
    <div className=" flex flex-col gap-2 w-full">
      <div>
        <span onClick={() => navigate("../")}>
          <FaArrowLeft />
        </span>
      </div>
      {data?.map((item) => {
        if (item.status == "Pending") {
          const due = calcDaysUntilDue(new Date(item?.dueDate), new Date());
          if (due !== "") {
            return (
              <div
                key={item._id}
                className="flex gap-2 sm:border-2 sm:border-gray-200 rounded px-2"
              >
                <div className="flex flex-col w-full">
                  <div className="py-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-2">
                    <span className=" font-medium text-gray-500">
                      Case number
                    </span>
                    <span>{item?.caseNumber}</span>
                  </div>
                  <div className="py-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-2">
                    <span className=" font-medium text-gray-500">Subject</span>
                    <span>{item.subject}</span>
                  </div>
                  <div className="py-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-2">
                    <span className=" font-medium text-gray-500">
                      Description
                    </span>
                    <span>{item.description}</span>
                  </div>
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <span className=" font-bold">{item.priority}</span>
                </div>
              </div>
            );
          }
        }
      })}
    </div>
  );
}

export default UpcomingCase;
