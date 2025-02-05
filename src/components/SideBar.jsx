import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineDashboard } from "react-icons/ai"
import { SiInvoiceninja } from "react-icons/si"
import { LiaFileInvoiceSolid } from "react-icons/lia"
import { LuUsers } from "react-icons/lu"
import { GrServices } from "react-icons/gr"
import { TbLogout } from "react-icons/tb"
import SidebarLink from './SidebarLink'

const SideBar = ({ isOpen, toggleSidebar}) => {

  const navigate = useNavigate()

  // Logout function
  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')

    // Reload the page and redirect to login
    window.location.reload()
    // navigate('/login')
  }

  return (
    <div 
      className={`fixed lg:static z-40 inset-y-0 bg-lightCard dark:bg-card left-0 text-darkText 
        dark:text-grayText shadow-[4px_0_10px_rgba(0,0,0,0.25)] dark:shadow-[4px_0_10px_rgba(255, 255, 255, 0.15)]
        ${isOpen? 'translate-x-0' : '-translate-x-full'}
        transition-transform lg:translate-x-0
        `}
    
    >
      

      <div className='flex h-[6%] flex-row justify-between items-center w-full px-4 pt-3 lg:justify-center'>
        <button
          onClick={toggleSidebar}
          className='lg:hidden text-darkText hover:text-gray-700 dark:text-grayText dark:hover:text-gray-400'
        >
          ✕
        </button>
        <NavLink>
          <SiInvoiceninja  className='h-10 w-10 text-lightHighlight dark:text-highlight'/>
        </NavLink>
      </div>

      <div
        className='p-4 w-64 lg:w-50 flex flex-col justify-center h-[94%]'
      >
        <ul className='mt-2 space-y-2'>

          <SidebarLink to="/dashboard">
            <span className='w-6 flex justify-center'>
              <AiOutlineDashboard className='h-6 w-6'/>
            </span>        
            <span
              className='flex-1'
            >
              Dashboard
            </span>
          </SidebarLink>

          <SidebarLink to="/invoices">
          
            <span className='w-6 flex justify-center'>
              <LiaFileInvoiceSolid className='h-6 w-6'/>
            </span>        
            <span
              className='flex-1'
            >
              Invoices
            </span>
          </SidebarLink>

          <SidebarLink to="/inventory">
          
            <span className='w-6 flex justify-center'>
              <LuUsers className='h-6 w-6'/>
            </span>        
            <span
              className='flex-1'
            >
              Inventory
            </span>
          </SidebarLink>

          <SidebarLink to="/settings">
          
            <span className='w-6 flex justify-center'>
              <GrServices className='h-6 w-6'/>
            </span>        
            <span
              className='flex-1'
            >
              Settings
            </span>
          </SidebarLink>
        </ul>

        {/* Logout button */}
        <div className='mt-auto'>
          <button 
            onClick={handleLogout} 
            className='w-full flex items-center text-darkText dark:text-white hover:bg-[#dbecff] dark:hover:bg-gray-700 p-2 rounded'>
            <span className='w-6 flex justify-center'>
              <TbLogout className='h-6 w-6'/>
            </span> 
            <span className='flex-1'>Logout</span>
          </button>
        </div>


      </div>

      
    </div>
  )
}

export default SideBar