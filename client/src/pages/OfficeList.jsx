import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import SearchBar from "../components/searchBar/SearchBar";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Button from "../components/button/Button";
import CreateOffice from "./CreateOffice";
import {
  useDeleteOfficeMutation,
  useGetOfficesQuery,
} from "../features/officeApiSlice";
import DeleteConfirmation from "../components/DeleteConfirmation";
import EditOffice from "../components/Edit/EditOffice";

function OfficeList() {
  const [offices, setOffices] = useState([]);
  const [officeId, setOfficeId] = useState("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const location = useLocation();
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [officeToBeDelete, setOfficeToBeDelete] = useState({
    title: "office",
    itemId: "",
    name: "",
  });
  const { data, refetch } = useGetOfficesQuery(query);
  const [deleteOffice] = useDeleteOfficeMutation();

  const handleCreateClick = () => {
    setShowCreate((prev) => !prev);
  };

  useEffect(() => {
    setOffices(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [location, query]);

  function showEditModal() {
    setShowEdit(true);
  }
  const CloseEdit = () => {
    setShowEdit(false);
  };

  const handleCloseModal = () => {
    setShowDelete(false);
  };

  const handleDeleteOffice = () => {
    deleteOffice(officeToBeDelete.itemId);
    handleCloseModal();
  };

  return (
    <div className=" w-full h-full rounde-d-[10px] flex flex-col gap-2">
      <div className="flex gap-3">
        <SearchBar className=" !w-full" placeholder="Search office" />
        <Button onClick={handleCreateClick}>Create</Button>
      </div>
      <table className=" text-sm w-full bg-white p-5 rounded-lg border-collapse ">
        <thead className=" text-left">
          <tr className=" border-solid border-2 border-gray-300">
            <th className="p-[10px]">Office name</th>
            <th className="p-[10px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offices?.map((office, idx) => {
            return (
              <tr
                className="hover:bg-light-gray hover:cursor-pointer border-solid border-2 border-gray-300"
                key={office._id}
              >
                <td className="p-[10px]">{office.officeName}</td>

                <td className="p-[10px]">
                  <div className="table_actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOfficeId(office._id);
                        showEditModal();
                      }}
                    >
                      <MdEdit size={20} color="green" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDelete(true);
                        setOfficeToBeDelete((prev) => ({
                          ...prev,
                          itemId: office._id,
                          name: office.officeName,
                        }));
                      }}
                    >
                      <MdDelete size={20} color="red" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showCreate && <CreateOffice handleClick={handleCreateClick} />}
      {showEdit && <EditOffice officeId={officeId} handleClick={CloseEdit} />}
      {showDelete && (
        <DeleteConfirmation
          item={officeToBeDelete}
          onClose={handleCloseModal}
          handleDeleteItem={handleDeleteOffice}
        />
      )}
    </div>
  );
}

export default OfficeList;
