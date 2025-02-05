import React from 'react'
import { NavLink } from 'react-router-dom'


const SidebarLink = ({ to, children }) => {
  return (
    <>
    <li 
            className='mt-2 flex justify-center'
          >
            <NavLink
              to={to}
              className={({ isActive }) => `w-full rounded p-1 flex flex-row items-center space-x-2 font-bold
              ${isActive? 'bg-lightHighlight text-white dark:bg-highlight dark:text-white'
                : 'hover:bg-[#dbecff] hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'}
              `
              }
            >
              {children}

            </NavLink>
          </li>
    </>
  )
}

export default SidebarLink