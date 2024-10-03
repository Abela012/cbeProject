import { useGetCustomerFileMutation } from "../features/customerApiSlice";
import { useGetAppointmentFileMutation } from "../features/appointmentApiSlice";
import { toast } from "react-toastify";

function AppointmentDetail({ detail, appointmentId }) {
  const [appointmentFile] = useGetAppointmentFileMutation();
  const [customerFile] = useGetCustomerFileMutation();

  async function openFile(fileType) {
    try {
      if (fileType == "appointment") {
        const response = await appointmentFile({ id: appointmentId }).unwrap();

        window.open(
          import.meta.env.VITE_BASE_URL +
            "/" +
            response.appointmentFile.fileName,
          "_blank"
        );
      } else {
        const response = await customerFile({ id: appointmentId }).unwrap();

        window.open(
          import.meta.env.VITE_BASE_URL +
            "/" +
            response.customerId.customerFile.fileName,
          "_blank"
        );
      }
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  }

  return (
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
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className=" font-medium text-gray-500">Start time</dt>
            <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
              {detail.startTime
                ? new Date(detail.startTime).toLocaleString()
                : "Not set"}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className=" font-medium text-gray-500">End time</dt>
            <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
              {detail.endTime
                ? new Date(detail.endTime).toLocaleString()
                : "Not set"}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className=" font-medium text-gray-500">Customer File</dt>
            <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
              {detail?.customerId?.customerFile?.fileName ? (
                <span
                  className=" bg-secondary-light p-1 rounded cursor-pointer "
                  onClick={() => {
                    openFile("customer");
                  }}
                >
                  View file
                </span>
              ) : (
                "No file attached"
              )}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className=" font-medium text-gray-500">Appointment File</dt>
            <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
              {detail?.appointmentFile?.fileName ? (
                <span
                  className=" bg-secondary-light p-1 rounded cursor-pointer "
                  onClick={() => {
                    openFile("appointment");
                  }}
                >
                  View file
                </span>
              ) : (
                "No File attached"
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default AppointmentDetail;
