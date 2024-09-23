import { useState } from "react";
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import OverLay from "./OverLay";
import {
  useGetAppointmentFileMutation,
  useGetAppointmentQuery,
} from "../features/appointmentApiSlice";
import { useGetCaseQuery } from "../features/caseApiSlice";
import Button from "./button/Button";

function Popup({ appointmentId, caseId, onClose }) {
  const [pop, setPop] = useState({});
  const [appointmentFile] = useGetAppointmentFileMutation();

  if (appointmentId) {
    const { data: appointmentData, isSuccess: isSuccessAppointment } =
      useGetAppointmentQuery(appointmentId);
    useEffect(() => {
      if (isSuccessAppointment) {
        setPop(appointmentData);
      }
    }, [appointmentData]);
  } else {
    const { data: caseData, isSuccess: isSuccessCase } =
      useGetCaseQuery(caseId);
    useEffect(() => {
      if (isSuccessCase) {
        setPop(caseData);
      }
    }, [caseData]);
  }

  // console.log(pop);

  async function openFile() {
    try {
      const response = await appointmentFile({ id: appointmentId }).unwrap();
      window.open(
        import.meta.env.VITE_BASE_URL + "/" + response.appointmentFile.fileName,
        "_blank"
      );
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  }

  return (
    <OverLay handleClick={onClose}>
      <div className=" relative bg-white border rounded shadow-sm h-[98vh] flex items-center ">
        <Button
          onClick={() => {
            onClose();
          }}
          className=" absolute right-[5px] top-[2px] p-1 border-none !bg-transparent z-20"
        >
          <IoIosClose size={30} />
        </Button>

        {caseId ? (
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
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.customerId?.fullName}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">Business name</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.customerId?.businessName}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.customerId?.customerEmail}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">Phone number</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.customerId?.phoneNumber}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">Case number</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.caseNumber}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">Subject</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.subject}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">Description</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.description}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">
                    Currently assigned to
                  </dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {!pop.currentAssignedOfficeId
                      ? "Not assigned"
                      : pop?.currentAssignedOfficeId?.officeName}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">
                    Assignment history
                  </dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {!pop?.assignedOfficeIdList?.length
                      ? "No history"
                      : pop?.assignedOfficeIdList?.map((office, idx) => (
                          <span
                            className="bg-secondary-dark py-1 px-2 rounded-full mx-1"
                            key={idx}
                          >
                            {office?.officeName}
                          </span>
                        ))}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">Category</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.category?.categoryName}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ) : (
          <div className="bg-white overflow-auto rounded border h-full">
            <div className="px-4 py-5 sm:px-6 sticky top-0 bg-white">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Appointment detail
              </h3>
              <p className="mt-1 max-w-2xl  text-gray-500">
                This is some information about the appointment.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.customerId?.fullName}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">Business name</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.customerId?.businessName}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.customerId?.customerEmail}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">Phone number</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.customerId?.phoneNumber}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">Start time</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.startTime
                      ? new Date(pop.startTime).toLocaleString()
                      : "Not set"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">End time</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    {pop.endTime
                      ? new Date(pop.endTime).toLocaleString()
                      : "Not set"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className=" font-medium text-gray-500">File</dt>
                  <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                    <span
                      className=" bg-secondary-light p-1 rounded cursor-pointer "
                      onClick={() => {
                        openFile();
                      }}
                    >
                      View file
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </OverLay>
  );
}

export default Popup;
