import { useEffect, useMemo, useState } from "react";
import Popup from "../components/Popup.jsx";
import SearchBar from "../components/searchBar/SearchBar";
import { useLocation, useSearchParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditAppointment from "../components/Edit/EditAppointment.jsx";
import {
  useDeleteAppointmentMutation,
  useGetAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} from "../features/appointmentApiSlice.js";
import { toast } from "react-toastify";
import DeleteConfirmation from "../components/DeleteConfirmation.jsx";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice.js";
import { rolesList } from "../util/userRoles.js";
import Button from "../components/button/Button.jsx";
import Appointment from "./Appointment.jsx";
import Case from "./Case.jsx";
import AppintmentScheduler from "./AppintmentScheduler.jsx";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const AppointmentStatus = ["Pending", "Canceled", "Completed"];

function AppointmentList() {
  const user = useSelector(getCurrentUser);
  const [appointments, setAppointments] = useState([]);
  const [appointmentId, setAppointmentId] = useState("");
  const [customerId, setCustomerId] = useState(""); // holde customer id to associate customer with appointment

  const [showAppointment, setShowAppointment] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [showCreate, setShowCreate] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showCreateCase, setShowCreateCase] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [appId, setAppId] = useState(""); // hold the appointment id for edit
  const [appToBeDelete, setAppToBeDelete] = useState({
    title: "appointment",
    itemId: "",
    name: "",
  }); // hold the appointment to be deleted
  const location = useLocation();
  const { data, refetch, isLoading, isFetching } = useGetAppointmentsQuery({
    searchTerm: query,
    officeId: user.officeId,
  });

  const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  //
  const columns = useMemo(
    () => [
      {
        accessorKey: "customerId.fullName", //simple recommended way to define a column
        header: "Customer Name",
        // muiTableHeadCellProps: { style: { color: "green" } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "startTime", //simple recommended way to define a column
        header: "Start time",
        accessorFn: (dataRow) => {
          if (dataRow.startTime) {
            return new Date(dataRow.startTime).toLocaleString();
          } else {
            return "Not set";
          }
        },
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "endTime", //simple recommended way to define a column
        header: "End time",
        accessorFn: (dataRow) => {
          if (dataRow.endTime) {
            return new Date(dataRow.endTime).toLocaleString();
          } else {
            return "Not set";
          }
        },
        enableHiding: false, //disable a feature for this column
      },
      {
        id: "schedule", //id required if you use accessorFn instead of accessorKey
        header: "Schedule Appointment",
        enableColumnFilter: false,
        Cell: ({ cell }) => (
          <>
            <div
              className=" hover:underline font-bold text-center h-full grid place-items-center"
              title="Schedule Appointment"
              onClick={(e) => {
                e.stopPropagation();
                setShowScheduler(true);
                setAppointmentId(cell.getValue());
              }}
            >
              Schedule
            </div>
          </>
        ),
      },
      {
        id: "createCase", //id required if you use accessorFn instead of accessorKey
        header: "Create case",
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <div
            className=" hover:underline font-bold text-center h-full grid place-items-center"
            title="Create case"
            onClick={(e) => {
              e.stopPropagation();
              setShowCreateCase(true);
              setAppointmentId(row.original._id);
              setCustomerId(row.original.customerId._id);
            }}
          >
            Create case
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        filterFn: "equals",
        filterSelectOptions: ["Pending", "Canceled", "Completed"],
        filterVariant: "select",
        Cell: ({ row }) => (
          <select
            className=" p-1 outline-none border-none cursor-pointer bg-transparent h-full grid place-items-center"
            defaultValue={row.original.status}
            onChange={(e) => handleAppointmentStateChange(row.original._id, e)}
            disabled={
              user.roleType == rolesList.boredMembers ||
              user.roleType == rolesList.staff
            }
          >
            {AppointmentStatus.map((value) => {
              if (value == row.original.status) {
                return (
                  <option key={value} value={row.original.status}>
                    {row.original.status}
                  </option>
                );
              } else {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              }
            })}
          </select>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <div className="table_actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAppId(row.original._id);
                showEditModal();
              }}
            >
              <MdEdit size={20} color="green" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDelete(true);
                setAppToBeDelete((prev) => ({
                  ...prev,
                  itemId: row.original._id,
                  name: row.original.customerId?.fullName,
                }));
              }}
            >
              <MdDelete size={20} color="red" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: appointments, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    state: {
      showProgressBars: isFetching,
      columnVisibility: {
        schedule:
          user.roleType !== rolesList.secretary &&
          user.roleType !== rolesList.staff
            ? true
            : false,
        createCase:
          user.roleType !== rolesList.secretary &&
          user.roleType !== rolesList.staff
            ? true
            : false,
        actions: user.roleType !== rolesList.staff ? true : false,
      },
    },
    muiSkeletonProps: {
      animation: "wave",
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        setAppointmentId(row.original._id);
        Show();
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

  function Show() {
    setShowAppointment(true);
  }

  useEffect(() => {
    setAppointments(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [location, query]);

  const handleCloseModal = () => {
    setShowAppointment(false);
    setShowScheduler(false);
    setShowDelete(false);
  };
  const CloseEdit = () => {
    setShowEdit(false);
  };

  const handleDeleteAppointment = () => {
    deleteAppointment(appToBeDelete.itemId);
    handleCloseModal();
  };

  const handleCreateAppointmentClick = () => {
    setShowCreate((prev) => !prev);
  };
  const handleCreateClick = () => {
    setShowCreateCase(false);
  };

  const handleAppointmentStateChange = async (appointmentid, e) => {
    try {
      const response = await updateAppointmentStatus({
        status: e.target.value,
        id: appointmentid,
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
    <div className=" w-full h-[98%] rounde-d-[10px] flex flex-col gap-2">
      <div className="flex gap-3">
        <SearchBar
          className=" !w-full "
          placeholder="Search appointment by name"
        />
        <Button className="!p-0" onClick={handleCreateAppointmentClick}>
          Create Appointment
        </Button>
      </div>
      <MaterialReactTable table={table} />

      {showCreate && (
        <Appointment
          customerId={customerId}
          onClose={handleCreateAppointmentClick}
        />
      )}
      {showScheduler && (
        <AppintmentScheduler
          appointmentId={appointmentId}
          handleClose={handleCloseModal}
        />
      )}
      {showCreateCase && (
        <Case
          customerId={customerId}
          appointmentId={appointmentId}
          handleClose={handleCreateClick}
        />
      )}

      {showAppointment && (
        <Popup appointmentId={appointmentId} onClose={handleCloseModal} />
      )}
      {showEdit && <EditAppointment appId={appId} onClose={CloseEdit} />}
      {showDelete && (
        <DeleteConfirmation
          item={appToBeDelete}
          onClose={handleCloseModal}
          handleDeleteItem={handleDeleteAppointment}
        />
      )}
    </div>
  );
}

export default AppointmentList;
