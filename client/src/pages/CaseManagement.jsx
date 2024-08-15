import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import "../App.css";
function CaseManagement() {
  return (
    <div className='case'>
      <nav className='casenav'>
        <NavLink to="" end className="casenavlinks"> Registration</NavLink>
        <NavLink to="case" className="casenavlinks">Case</NavLink>
        <NavLink to="case-list" className="casenavlinks" >Case Management</NavLink>
      </nav>
      <div className='case_outlet'>
      <Outlet/>
      </div>
            
    </div>
  )
}

export default CaseManagement