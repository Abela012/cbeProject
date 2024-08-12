import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import SearchBar from "../components/searchBar/SearchBar";
import Popup from "../components/Popup";
import api from "../api/axios";

function CaseList() {
  const [cases, setCases] = useState([]);
  const [caseId, setCaseId] = useState("");
  const [showApp, setShowApp] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  function Show() {
    setShowApp(true);
  }

  useEffect(() => {
    async function getCases() {
      const response = await api.get(`/get-cases?q=${query}`);
      setCases(response.data);
      console.log(response.data);
    }
    getCases();
  }, [query]);

  const handleCloseModal = () => {
    setShowApp(false);
  };
  return (
    <div className="table_Wrapper">
      <SearchBar placeholder="Search case" />
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Case Number</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody onClick={Show}>
          {cases?.map((_case, idx) => {
            return (
              <tr key={_case._id} onClick={() => setCaseId(_case._id)}>
                <td>{_case.customerId.customerName}</td>
                <td>{_case.caseNumber}</td>
                <td>{_case.subject}</td>
                <td>{_case.status}</td>
                <td className="table_actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      api.patch(`/update-case/${_case._id}`);
                    }}
                  >
                    <MdEdit size={20} color="green" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCases(
                        cases.filter((appoint) => {
                          return appoint._id !== _case._id;
                        })
                      );
                      api.delete(`/delete-case/${_case._id}`);
                    }}
                  >
                    <MdDelete size={20} color="red" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showApp && <Popup caseId={caseId} onClose={handleCloseModal} />}
    </div>
  );
}

export default CaseList;
