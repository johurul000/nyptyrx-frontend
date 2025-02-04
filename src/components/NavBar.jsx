import React, { useEffect, useRef, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { FiChevronDown } from 'react-icons/fi'
import { useTheme } from '../theme/ThemeContext'
import { useSelector } from 'react-redux'
import profileImage from '../images/boy.png'
import { Link } from 'react-router-dom'




const NavBar = ({toggleSidebar}) => {
  const { theme, toggleTheme } = useTheme()
  const username = useSelector((state)=> state.auth.user?.email)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const toggleRef = useRef(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ){
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }

  }, [])

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    window.location.reload();
  };


  return (
    <div
      className='w-full py-4 px-6 z-10 bg-lightCard dark:bg-card flex items-center justify-between lg:justify-end border-b-2 dark:border-none'
    >
      <div className='lg:hidden'>
        <button
          onClick={toggleSidebar}
          className="text-xl text-gray-700 dark:text-gray-300"
        >
          <FaBars />

        </button>
      </div>

      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="text-xl text-gray-700 dark:text-gray-300"
        >
          {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown} ref={toggleRef}>
          <img 
            src={profileImage}
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
            <span className='max-w-[70px] lg:max-w-[100px] overflow-hidden whitespace-nowrap truncate'>
              {username}
            </span>
            <FiChevronDown className="ml-1 text-sm" />
          </div>

        </div>

        {isDropdownOpen && (
          <div 
            ref={dropdownRef} 
            className={`
              absolute top-14 right-6 bg-lightCard dark:bg-card text-gray-700 
              dark:text-gray-300 rounded-md shadow-md w-48 pt-2 pb-2
              shadow-gray-500/50 dark:shadow-white/10 border border-[#d4d4d4] dark:border-[#474747]
              `}
          >
            <div className="py-2 px-4 text-sm border-b border-[#d4d4d4] dark:border-[#474747]">
              <span className='max-w-[70px] lg:max-w-[100px] overflow-hidden whitespace-nowrap truncate'>
                {username}
              </span>
            </div>

            <div className='pt-2'>
              <div className="py-2 px-4 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer ">
                <Link to="/settings">
                  Settings
                </Link>
              </div>
              <div onClick={handleLogout}  className="py-2 px-4 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer ">
                Logout
              </div>
            </div>
            
          </div>
        )}

      </div>

    </div>
  )
}

export default NavBar