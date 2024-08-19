import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import SearchBar from "../components/searchBar/SearchBar";
import Popup from "../components/Popup";
import {
  useGetCasesMutation,
  useUpdateCaseMutation,
  useUpdateCaseStatusMutation,
} from "../features/caseApiSlice";
import Appointment from "./Appointment";
import Button from "../components/button/Button";
import { toast } from "react-toastify";
import DeleteConfirmation from "../components/DeleteConfirmation";

function CaseList() {
  const [cases, setCases] = useState([]);
  const [caseId, setCaseId] = useState(""); // holde case id to show case detail
  const [customerId, setCustomerId] = useState(""); // holde customer id to associate customer with appointment

  const [showApp, setShowApp] = useState(false);
  const [showCreateAppointment, setShowCreateAppointment] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [caseToBeDelete, setCaseToBeDelete] = useState({
    title: "case",
    itemId: "",
    name: "",
  });
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [getCaseData] = useGetCasesMutation();
  const [updateCase] = useUpdateCaseMutation();
  const [updateCaseStatus] = useUpdateCaseStatusMutation();

  function Show() {
    setShowApp(true);
  }

  useEffect(() => {
    async function getCases() {
      const response = await getCaseData(query);
      setCases(response.data);
    }
    getCases();
  }, [query]);

  const handleCloseModal = () => {
    setShowApp(false);
    setShowCreateAppointment(false);
    setShowDelete(false);
  };

  const handleSCaseStateChange = async (caseid, e) => {
    try {
      const response = await updateCaseStatus({
        status: e.target.value,
        id: caseid,
      }).unwrap();
      toast.success(response, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className=" flex flex-col gap-2">
      <SearchBar className=" !w-full" placeholder="Search by case number" />
      <table className=" text-sm w-full bg-white p-5 rounded-lg border-collapse ">
        <thead className=" text-left">
          <tr className=" border-solid border-2 border-gray-300">
            <th className="p-[10px]">Customer Name</th>
            <th className="p-[10px]">Case Number</th>
            <th className="p-[10px]">Subject</th>
            <th className="p-[10px]">Status</th>
            <th className="p-[10px]">Create Appointment</th>
            <th className="p-[10px]">Actions</th>
          </tr>
        </thead>
        <tbody onClick={Show}>
          {cases?.map((_case, idx) => {
            return (
              <tr
                className="hover:bg-light-gray hover:cursor-pointer border-solid border-2 border-gray-300"
                key={_case._id}
                onClick={() => setCaseId(_case._id)}
              >
                <td className="p-[10px]">{_case.customerId?.fullName}</td>
                <td className="p-[10px]">{_case.caseNumber}</td>
                <td className="p-[10px]">{_case.subject}</td>
                <td className="p-[10px]" onClick={(e) => e.stopPropagation()}>
                  <select
                    className=" p-1 outline-none border-none cursor-pointer bg-transparent "
                    defaultValue={_case.status}
                    onChange={(e) => handleSCaseStateChange(_case._id, e)}
                  >
                    <option value={_case.status}>{_case.status}</option>
                    <option value="Pending">Pending</option>
                    <option value="Canceled">Canceled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="p-[10px]">
                  <div
                    className=" hover:underline font-bold text-center"
                    title="Create Appointment"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCreateAppointment(true);
                      setCustomerId(_case.customerId._id);
                    }}
                  >
                    Create
                  </div>
                </td>
                <td className="p-[10px]">
                  <div className="table_actions">
                    <Button
                      className=" !bg-transparent"
                      title="Edit Appointment"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateCase(_case._id);
                      }}
                    >
                      <MdEdit size={20} color="green" />
                    </Button>
                    <Button
                      className=" !bg-transparent"
                      title="Delete Appointment"
                      onClick={(e) => {
                        e.stopPropagation();
                        // setCases(
                        //   cases.filter((appoint) => {
                        //     return appoint._id !== _case._id;
                        //   })
                        // );
                        setShowDelete(true);
                        setCaseToBeDelete((prev) => ({
                          ...prev,
                          itemId: _case._id,
                          name: _case.customerId?.fullName,
                        }));
                      }}
                    >
                      <MdDelete size={20} color="red" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showApp && <Popup caseId={caseId} onClose={handleCloseModal} />}
      {showCreateAppointment && (
        <Appointment customerId={customerId} onClose={handleCloseModal} />
      )}
      {showDelete && (
        <DeleteConfirmation item={caseToBeDelete} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default CaseList;
