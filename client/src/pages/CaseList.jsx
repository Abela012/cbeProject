import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import SearchBar from "../components/searchBar/SearchBar";
import Popup from "../components/Popup";
import {
  useAssigneCaseMutation,
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
import { useGetOfficesQuery } from "../features/officeApiSlice";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const CaseStatus = ["Pending", "Canceled", "Completed"];

function CaseList() {
  const user = useSelector(getCurrentUser);
  const [cases, setCases] = useState([]);
  const [offices, setOffice] = useState();
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
  const { data: officeList, isFetching: officeFetching } = useGetOfficesQuery();
  const { data, refetch, isFetching } = useGetCasesQuery({
    searchTerm: query,
    officeId: user.officeId,
  });
  const [updateCase] = useUpdateCaseMutation();
  const [updateCaseAssignement] = useAssigneCaseMutation();
  const [updateCaseStatus] = useUpdateCaseStatusMutation();
  const [deleteCase] = useDeleteCaseMutation();

  useEffect(() => {
    setOffice(officeList);
  }, [officeList]);

  useEffect(() => {
    setCases(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [location]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "customerId.fullName", //simple recommended way to define a column
        header: "Customer Name",
        // muiTableHeadCellProps: { style: { color: "green" } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "caseNumber", //simple recommended way to define a column
        header: "Case Number",
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "subject", //simple recommended way to define a column
        header: "Subject",
      },
      {
        accessorKey: "status", //id required if you use accessorFn instead of accessorKey
        header: "Status",
        filterFn: "equals",
        filterSelectOptions: ["Pending", "Canceled", "Completed"],
        filterVariant: "select",
        Cell: ({ row }) => (
          <select
            onClick={(e) => e.stopPropagation()}
            className=" p-1 h-full outline-none border-none cursor-pointer bg-transparent "
            defaultValue={row.original.status}
            onChange={(e) => handleSCaseStateChange(row.original._id, e)}
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
        ),
      },
      {
        accessorKey: "currentAssignedOfficeId", //id required if you use accessorFn instead of accessorKey
        header: "Assigne/Assigned",
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <select
            onClick={(e) => e.stopPropagation()}
            className="p-1 h-full outline-none border-none cursor-pointer bg-transparent "
            defaultValue={row.original.currentAssignedOfficeId}
            name="officeId"
            onChange={(e) => handleSCaseAssignementChange(row.original._id, e)}
          >
            <option value="">Select Office</option>
            {offices?.map((office) => (
              <option key={office._id} value={office._id}>
                {office.officeName}
              </option>
            ))}
          </select>
        ),
      },

      {
        id: "actions",
        header: "Actions",
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <div className="table_actions">
            <Button
              className=" !bg-transparent"
              title="Edit Appointment"
              onClick={(e) => {
                e.stopPropagation();
                setCaseId(row.original._id);
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
                  itemId: row.original._id,
                  name: row.original.customerId?.fullName,
                }));
              }}
            >
              <MdDelete size={20} color="red" />
            </Button>
          </div>
        ),
      },
    ],
    [officeFetching, offices]
  );

  const table = useMaterialReactTable({
    columns,
    data: cases, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    state: {
      showProgressBars: isFetching,
      columnVisibility: {
        currentAssignedOfficeId:
          user.roleType !== rolesList.boredMembers &&
          user.roleType !== rolesList.staff
            ? true
            : false,
        actions:
          user.roleType !== rolesList.boredMembers &&
          user.roleType !== rolesList.staff
            ? true
            : false,
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        setCaseId(row.original._id);
        handleShowCase();
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
    enableRowSelection: false, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature
  });

  function showEditModal() {
    setShowEdit(true);
  }

  function handleShowCase() {
    setShowCase(true);
  }

  const handleCloseModal = () => {
    setShowCase(false);
    setShowEdit(false);
    setShowDelete(false);
  };

  const handleDeleteCase = () => {
    deleteCase(caseToBeDelete.itemId);
    handleCloseModal();
  };

  const handleSCaseAssignementChange = async (caseId, e) => {
    try {
      const response = await updateCaseAssignement({
        officeId: e.target.value,
        caseId: caseId,
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

  const handleSCaseStateChange = async (caseId, e) => {
    try {
      const response = await updateCaseStatus({
        status: e.target.value,
        id: caseId,
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
      <MaterialReactTable table={table} />

      {/* <table className=" text-sm w-full bg-white p-5 rounded-lg border-collapse ">
        <thead className=" text-left">
          <tr className=" border-solid border-2 border-gray-300">
            <th className="p-[10px]">Customer Name</th>
            <th className="p-[10px]">Case Number</th>
            <th className="p-[10px]">Subject</th>
            <th className="p-[10px]">Status</th>
            {user.roleType !== rolesList.staff && (
              <>
                <th className="p-[10px]">Assigne/Assigned</th>
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

                <td className=" h-12" onClick={(e) => e.stopPropagation()}>
                  <select
                    className=" p-1 h-full outline-none border-none cursor-pointer bg-transparent "
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
                    <td className=" h-12" onClick={(e) => e.stopPropagation()}>
                      <select
                        className="p-1 h-full outline-none border-none cursor-pointer bg-transparent "
                        defaultValue={_case?.currentAssignedOfficeId}
                        name="officeId"
                        onChange={(e) =>
                          handleSCaseAssignementChange(_case._id, e)
                        }
                      >
                        <option value="">Select Office</option>
                        {offices?.map((office) => (
                          <option key={office._id} value={office._id}>
                            {office.officeName}
                          </option>
                        ))}
                      </select>
                    </td>
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
      </table> */}

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
