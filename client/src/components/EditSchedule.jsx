import Button from './button/Button'
import OverLay from './OverLay'
import FormInput from './forminput/FormInput'
import { useEffect, useState } from 'react'
import { useGetScheduleQuery } from '../features/schedulerApiSlice'



const EditSchedule = ({
    handleCloseModal,
    selecteAppointmentId,
    handleCloseEdit
  }) => {

//use
 const [newSchedule, setNewSchedule] = useState({
    title:"",
    start:"",
    end:"" 
 })
const {data:Schedule, isSuccess} = useGetScheduleQuery(selecteAppointmentId)

useEffect( () => {
    if(isSuccess){
        setNewSchedule(Schedule)
        console.log(Schedule, selecteAppointmentId);
    }
},[Schedule]) 


 function handleChange(event){
    const {name, value} = event.target
    setNewSchedule((prev) => ({...prev, [name]:value}))
 }

  return (
    
    <OverLay handleClick={()=>{handleCloseModal(); handleCloseEdit()}}>
      <div className="bg-white p-5 rounded-lg min-w-[400px]">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Add Event
        </h3>
        <form action="submit" onSubmit={ () => {}}>
          <div className="mt-2">
            <FormInput
              lableName="Title"
              inputName="title"
              type="text"
              name="title"
              value={newSchedule?.title}
              onChange={(e) => handleChange(e)}
              placeholder="Title"
            />
            <FormInput
              lableName="Start"
              inputName="start"
              name="start"
              type="datetime-local"
              value={newSchedule?.start}
              onChange={(e) => handleChange(e)}
            />
            <FormInput
              lableName="End"
              inputName="end"
              name="end"
              type="datetime-local"
              value={newSchedule?.end}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex gap-4 mt-3">
            <Button
              type="button"
              className=" w-full rounded-md bg-white px-3 py-2 font-semibold  ring-1 ring-inset ring-gray-300 "
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className=" px-3 py-2 font-semibold w-full"
              disabled={newSchedule.title === ""}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </OverLay>
   
  )
}

export default EditSchedule