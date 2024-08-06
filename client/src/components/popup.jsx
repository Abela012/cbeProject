import React from 'react'
import "../App.css"
import { useState } from 'react'
import { useEffect } from 'react'
import api from '../api/axios'
import { IoIosClose } from "react-icons/io";
import { useRef } from 'react'

function Popup({appointmentId, onClose}) {
    
    const [pop,setpop] = useState([])
    
    useEffect(() => {
        api.get(`/get-appointment/${appointmentId}`)
        .then(response => {
            setpop(response.data)})
            .catch(err => console.log(err));    
        }, [])
        
        console.log(pop);

    const modalRef = useRef(null)
    const closeModal = (e) => {
        if(modalRef.current === e.target){
            onClose()
        }
    }
  return (
    <div ref={modalRef} onClick={closeModal} className='popup'>
         
        <div className='pops'>
        <button onClick={()=>{onClose()}} className='closepop'><IoIosClose size={26} /></button>
        <div>Name: {pop.customerId?.customerName}</div>

        <div> {pop.customerId?.businessName}</div>

        <div>Email: {pop.customerId?.email}</div>

        <div>Phone: {pop.customerId?.phone}</div>

        <div>Office ID: {pop?.officeId}</div>

        <div>start Time: {pop.startTime}</div>

        <div>End Time: {pop.endTime}</div>

        <div>Catagory: {pop.category}</div>
        </div>
    </div>
  )
}

export default Popup