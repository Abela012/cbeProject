import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { getCurrentUser } from "../features/authSlice";
import {
  useGetAppointmentsQuery,
  useGetAppointmentStatiQuery,
  useUpdateAppointmentStatusMutation,
} from "../features/appointmentApiSlice";
import { toast } from "react-toastify";

const AppointmentStatus = ["Pending", "Canceled", "Completed"];

function DashboardAppointmentTable() {
  const user = useSelector(getCurrentUser);
  const [appointments, setAppointments] = useState([]);

  const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();
  const { refetch } = useGetAppointmentStatiQuery();

  const { data, isFetching } = useGetAppointmentsQuery({
    searchTerm: "",
    officeId: user.officeId,
  });

  useEffect(() => {
    setAppointments(data);
  }, [data]);

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
      //   {
      //     id: "actions",
      //     header: "Actions",
      //     enableColumnFilter: false,
      //     Cell: ({ row }) => (
      //       <div className="table_actions">
      //         <button
      //           onClick={(e) => {
      //             e.stopPropagation();
      //             setAppId(row.original._id);
      //             showEditModal();
      //           }}
      //         >
      //           <MdEdit size={20} color="green" />
      //         </button>
      //         <button
      //           onClick={(e) => {
      //             e.stopPropagation();
      //             setShowDelete(true);
      //             setAppToBeDelete((prev) => ({
      //               ...prev,
      //               itemId: row.original._id,
      //               name: row.original.customerId?.fullName,
      //             }));
      //           }}
      //         >
      //           <MdDelete size={20} color="red" />
      //         </button>
      //       </div>
      //     ),
      //   },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: appointments, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // state: {
    //   showProgressBars: isFetching,
    // },
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
    enableRowSelection: false, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: true, //turn off a feature
  });

  const handleAppointmentStateChange = async (appointmentid, e) => {
    try {
      const response = await updateAppointmentStatus({
        status: e.target.value,
        id: appointmentid,
      }).unwrap();
      refetch();
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
    <>
      <MaterialReactTable
        table={table}
        muiTableContainerProps={{ sx: { maxHeight: "300px" } }}
      />
    </>
  );
}

export default DashboardAppointmentTable;
