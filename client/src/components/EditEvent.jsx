import React, { useState } from 'react'
import Button from './button/Button'
import { MdDelete, MdEdit } from 'react-icons/md'
import OverLay from './OverLay'
import DeleteEvent from './DeleteEvent'
import EditSchedule from './EditSchedule'

;
import { useDeleteScheduleMutation } from '../features/schedulerApiSlice'
import ScheduleAppointment from '../pages/ScheduleAppointment'



const EditEvent = ({handleCloseModal, selecteAppointmentId }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditEvent, setShowEditEvent] = useState(false)
    const [deleteSchedule] = useDeleteScheduleMutation()
    const [editTime, setEditTime] = useState()

const handleCloseEdit = () => {
 setShowEditEvent(false)
}

const handleCloseDelete = () => {
    setShowDeleteModal(false)
}

    function handleEdit(){
        setShowEditEvent(true)
    }
    
    function handleEventDelete(){
        setShowDeleteModal(true)
        setIdToDelete(data.event.id);
    }
    
    function handleDelete() {
        setAllEvents(allEvents.filter((event) => event.id !== idToDelete));
        deleteSchedule(idToDelete);
        setShowDeleteModal(false);
        setIdToDelete(null);
      }

  return (
    <OverLay handleClick={handleCloseModal}>
    <div className=" flex gap-10 bg-white p-5 rounded-lg sm:flex-row-reverse sm:px-6">
        <Button
         className="w-full rounded-md bg-white px-3 py-2 font-semibold ring-inset ring-1 ring-gray-300 "
        onClick={handleEventDelete}
        >
        <MdDelete size={20} color="red" />
        </Button>

        <Button  
        className="w-full rounded-md bg-white px-3 py-2 font-semibold ring-inset ring-1 ring-gray-300 "
        onClick={handleEdit}
        >
        <MdEdit size={20} color="green" />
        </Button>
    </div>
    {showDeleteModal && (
        <DeleteEvent
        handleDelete={ handleDelete}
        handleCloseDelete={handleCloseDelete}
        handleCloseModal={handleCloseModal}
        selecteAppointmentId={selecteAppointmentId} 
        />
    )}

    {showEditEvent && (
        <EditSchedule 
        handleCloseEdit={handleCloseEdit}
        handleCloseModal={handleCloseModal}
        selecteAppointmentId={selecteAppointmentId}  />
    )}
    </OverLay>
  )
}

export default EditEvent
