import { useEffect, useState } from "react";
import { useGetCaseTaskQuery } from "../features/caseApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { formatDistanceToNow } from "date-fns";

function CaseDetail({ detail }) {
  const [hoveredOfficeId, setHoveredOfficeId] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const [taskIdentifier, setTaskIdentifier] = useState(skipToken);
  const { data: taskDescription } = useGetCaseTaskQuery(taskIdentifier);
  useEffect(() => {
    setTaskData(taskDescription);
  }, [taskDescription]);

  return (
    <div className="bg-white overflow-auto rounded border h-full">
      <div className="px-4 py-5 sm:px-6 sticky top-0 bg-white">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Case Detail
        </h3>
        <p className="mt-1 max-w-2xl  text-gray-500">
          This is some information about the case.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {detail.customerId && (
            <>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className=" font-medium text-gray-500">Full name</dt>
                <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                  {detail.customerId?.fullName}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className=" font-medium text-gray-500">Business name</dt>
                <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                  {detail.customerId?.businessName}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className=" font-medium text-gray-500">Email address</dt>
                <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                  {detail.customerId?.customerEmail}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className=" font-medium text-gray-500">Phone number</dt>
                <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                  {detail.customerId?.phoneNumber}
                </dd>
              </div>
            </>
          )}

          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className=" font-medium text-gray-500">Case number</dt>
            <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
              {detail.caseNumber}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className=" font-medium text-gray-500">Subject</dt>
            <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
              {detail.subject}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className=" font-medium text-gray-500">Description</dt>
            <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
              {detail.description}
            </dd>
          </div>

          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className=" font-medium text-gray-500">Assignment list</dt>
            <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
              {!detail?.assignedOfficeIdList?.length
                ? "No history"
                : detail?.assignedOfficeIdList?.map((office, idx) => (
                    <span
                      className="bg-secondary-dark py-1 px-2 rounded-full mx-1 relative"
                      key={idx}
                      onMouseOver={() => {
                        setTaskIdentifier({
                          caseId: detail._id,
                          officeId: office._id,
                        });
                        setHoveredOfficeId(office._id);
                      }}
                      onMouseOut={() => {
                        setHoveredOfficeId(null);
                      }}
                    >
                      {office?.officeName}
                      {hoveredOfficeId == office._id && (
                        <div className="casetask absolute left-1/2 bottom-full -translate-x-1/2 mb-1 bg-secondary-dark px-1 py-2 transition-opacity opacity-100 rounded flex flex-col gap-1 max-h-24 min-w-[200px] overflow-auto ">
                          {taskData?.map((task) => (
                            <span
                              key={task._id}
                              className="w-full inline-block border-b "
                            >
                              {task?.description}
                            </span>
                          ))}
                        </div>
                      )}
                    </span>
                  ))}
            </dd>
          </div>

          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className=" font-medium text-gray-500">Category</dt>
            <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
              {detail.category?.categoryName}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className=" font-medium text-gray-500">Due date</dt>
            <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
              {detail.dueDate && formatDistanceToNow(new Date(detail?.dueDate))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default CaseDetail;
