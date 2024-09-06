import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import SearchBar from "../components/searchBar/SearchBar";
import Popup from "../components/Popup";
import {
  useDeleteCaseMutation,
  useGetCasesQuery,
  useUpdateCaseMutation,
  useUpdateCaseStatusMutation,
} from "../features/caseApiSlice";
import Button from "../components/button/Button";
import { toast } from "react-toastify";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice";
import { rolesList } from "../util/userRoles";
import EditCase from "../components/Edit/EditCase";

const CaseStatus = ["Pending", "Canceled", "Completed"];

function CaseList() {
  const user = useSelector(getCurrentUser);
  const [cases, setCases] = useState([]);
  const [caseId, setCaseId] = useState(""); // holde case id to show case detail

  const [showCase, setShowCase] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [caseToBeDelete, setCaseToBeDelete] = useState({
    title: "case",
    itemId: "",
    name: "",
  });
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const location = useLocation();
  const { data, refetch } = useGetCasesQuery({
    searchTerm: query,
    officeId: user.officeId,
  });
  const [updateCase] = useUpdateCaseMutation();
  const [updateCaseStatus] = useUpdateCaseStatusMutation();
  const [deleteCase] = useDeleteCaseMutation();

  function showEditModal() {
    setShowEdit(true);
  }

  function handleShowCase() {
    setShowCase(true);
  }

  useEffect(() => {
    setCases(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [location]);

  const handleCloseModal = () => {
    setShowCase(false);
    setShowEdit(false);
    setShowDelete(false);
  };

  const handleDeleteCase = () => {
    deleteCase(caseToBeDelete.itemId);
    handleCloseModal();
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
    <div className=" flex flex-col gap-2 w-full">
      <div className="flex gap-3">
        <SearchBar className=" !w-full" placeholder="Search by case number" />
      </div>
      <table className=" text-sm w-full bg-white p-5 rounded-lg border-collapse ">
        <thead className=" text-left">
          <tr className=" border-solid border-2 border-gray-300">
            <th className="p-[10px]">Customer Name</th>
            <th className="p-[10px]">Case Number</th>
            <th className="p-[10px]">Subject</th>
            <th className="p-[10px]">Status</th>
            {user.roleType !== rolesList.staff && (
              <>
                <th className="p-[10px]">Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {cases?.map((_case, idx) => {
            return (
              <tr
                className="hover:bg-light-gray hover:cursor-pointer border-solid border-2 border-gray-300"
                key={_case._id}
                onClick={() => {
                  setCaseId(_case._id);
                  handleShowCase();
                }}
              >
                <td className="p-[10px]">{_case.customerId?.fullName}</td>
                <td className="p-[10px]">{_case.caseNumber}</td>
                <td className="p-[10px]">{_case.subject}</td>
                <td className="p-[10px]" onClick={(e) => e.stopPropagation()}>
                  <select
                    className=" p-1 outline-none border-none cursor-pointer bg-transparent "
                    defaultValue={_case.status}
                    onChange={(e) => handleSCaseStateChange(_case._id, e)}
                    disabled={
                      user.roleType == rolesList.boredMembers ||
                      user.roleType == rolesList.staff
                    }
                  >
                    {CaseStatus.map((value) => {
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </td>
                {user.roleType !== rolesList.staff && (
                  <>
                    <td className="p-[10px]">
                      <div className="table_actions">
                        <Button
                          className=" !bg-transparent"
                          title="Edit Appointment"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCaseId(_case._id);
                            showEditModal();
                          }}
                        >
                          <MdEdit size={20} color="green" />
                        </Button>
                        <Button
                          className=" !bg-transparent"
                          title="Delete Appointment"
                          onClick={(e) => {
                            e.stopPropagation();

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
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showCase && <Popup caseId={caseId} onClose={handleCloseModal} />}
      {showEdit && <EditCase caseId={caseId} onClose={handleCloseModal} />}
      {showDelete && (
        <DeleteConfirmation
          item={caseToBeDelete}
          onClose={handleCloseModal}
          handleDeleteItem={handleDeleteCase}
        />
      )}
    </div>
  );
}

export default CaseList;
