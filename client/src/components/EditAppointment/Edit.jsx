import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../FormError";
import { useForm } from "react-hook-form";
import api from '../../api/axios.js';
import styles from "./EditAppointment.module.css";
import { useRef } from 'react'
import "../../App.css"
import { IoIosClose } from "react-icons/io";

function Edit({appId,onClose }) {
  const schema = yup.object().shape({
    customer_name: yup.string().required("Customer name required"),
    buissness_name: yup.string().required("Buissness name required"),
    email: yup.string().required("Email required").email("Invalid email"),
    phone: yup
      .string()
      .required("Phone required")
      .min(10, "Invalid phone number")
      .max(10),
    office_id: yup.string().required("Office id required"),
    start_time: yup.string().required("Start time required"),
    end_time: yup.string().required("End time required"),
    category: yup.string().required("Category required"),
  });
  const [edit,setedit]  = useState({
    _id:'',
      customerName:'',
      businessName:'',
      email:'',
      phone:'',
    officeId:'',
    startTime:'',
    endTime:'',
    category:''
  })

  useEffect(() => {
    async function getAppointment(){
      const response = await api.get(`/get-appointment/${appId}`)
      setedit({
        _id: response.data._id,
        customerName: response.data.customerId.customerName,
        businessName: response.data.customerId.businessName,
        email: response.data.customerId.email,
        phone: response.data.customerId.phone,
      officeId: response.data.officeId,
      startTime: response.data.startTime,
      endTime: response.data.endTime,
      category: response.data.category
      })
console.log(response.data);

    }
    getAppointment()
  },[])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (e) => {
    e.preventDefault()
     const response = await api.patch(`/update-appointment/${edit._id}`, edit);
    console.log(edit);
  };

  const modalRef = useRef(null)
  const closeModal = (e) => {
    if(modalRef.current === e.target){
        onClose()
    }
}

  return (
    
      <div className={styles.edit}  ref={modalRef} onClick={closeModal}>
      <form action="" className="Hform edit" onSubmit={submit}>
      <button onClick={()=>{onClose()}} className='closepop'><IoIosClose size={26} /></button>
      <div className="forminput">
        {errors.customer_name && (
          <FormError error={errors.customer_name.message} />
        )}
        <label htmlFor="">Customer Name</label>
        <input  type="text" value={edit.customerName} 
        onChange={e => setedit({
          ...edit,
            customerName: e.target.value
          })}
        />
      </div>
     
     
      <div className="forminput">
        {errors.buissness_name && (
          <FormError error={errors.buissness_name.message} />
        )}
        <label htmlFor="">Buissness Name</label>
        <input type="text" value={edit.businessName}
          onChange={e => setedit({
            ...edit,
              businessName: e.target.value
            })}/>
      </div>

      <div className="forminput">
        {errors.email && <FormError error={errors.email.message} />}
        <label htmlFor="" >Email</label>
        <input  type="text" value={edit.email}
          onChange={e => setedit({
            ...edit,
              email: e.target.value
            })}/>
      </div>

      <div className="forminput">
        {errors.phone && <FormError error={errors.phone.message} />}

        <label htmlFor="">Phone Number</label>
        <input
         
          type="tel"
          pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
       value={edit.phone}
       onChange={e => setedit({
        ...edit,
          phone: e.target.value
        })} />
      </div>

      <div className="forminput">
        {errors.office_id && <FormError error={errors.office_id.message} />}

        <label htmlFor="">Office Id</label>
        <input  type="text" value={edit.officeId}
          onChange={e => setedit({
            ...edit,officeId: e.target.value
            
            })}/>
      </div>

      <div className="forminput">
        {errors.start_time && <FormError error={errors.start_time.message} />}

        <label htmlFor="">Start Time</label>
        <input  type="datetime-local" value={edit.startTime}
         onChange={e => setedit({
          ...edit,startTime: e.target.value
          
          })}/>
      </div>

      <div className="forminput">
        {errors.end_time && <FormError error={errors.end_time.message} />}
        <label htmlFor="">End Time</label>
        <input  type="datetime-local" value={edit.endTime}
         onChange={e => setedit({
          ...edit,endTime: e.target.value
          
          })}/>
      </div>

      <div className="forminput">
        {errors.category && <FormError error={errors.category.message} />}
        <label htmlFor="">Cataory</label>
        <input  type="text" value={edit.category} 
        onChange={e => setedit({
          ...edit, 
          category: e.target.value})}
          />
      </div>
      <button type="submit" className="btn btn-submit">
        Submit
      </button>
    </form>
    </div>
    
  )
}

export default Edit