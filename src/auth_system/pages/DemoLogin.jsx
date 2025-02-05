import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { closeAlert, login } from '../../features/AuthSlice'
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"

const DemoLogin = () => {
    
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const isLoading = useSelector((state) => state.auth.isLoading)
    const message = useSelector((state) => state.auth.message)


    const [formData, setFormData] = useState({
        username: 'jacob',
        password: 'Password@123'
    })
    const [showPassword, setShowPassword] = useState(false);

    // dispatch(closeAlert())
    const { username, password } = formData
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({username, password}))
        dispatch(closeAlert())
    }

    

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-lightBackground dark:bg-dark">
        <div className="bg-lightCard dark:bg-card shadow-lg rounded-lg p-8 w-[95%] max-w-md">
          <h2 className="text-2xl font-bold text-darkText dark:text-white text-center mb-6">Login</h2>
  
          {message && (
            <div className="bg-red-100 border border-red-400 text-red-500 text-sm rounded-md p-4 mb-4">
              {typeof message === "object" ? (
                Object.entries(message).map(([key, errors]) => (
                  <div key={key} className="mb-2">
                    <strong>{key}:</strong>
                    <ul className="ml-4 list-disc">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>{message}</p>
              )}
            </div>
          )}
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-darkText dark:text-grayText mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value="jacob"
                required
                placeholder="Enter your username"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-lightBorder dark:border-borderGray rounded-md bg-lightCard dark:bg-card text-darkText dark:text-white focus:outline-none focus:ring-2 focus:ring-lightHighlight dark:focus:ring-highlight"
              />
            </div>
  
            <div className="relative">
              <label className="block text-sm font-medium text-darkText dark:text-grayText mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                name="password"
                value="Password@123"
                required
                placeholder="Enter a password"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-lightBorder dark:border-borderGray rounded-md bg-lightCard dark:bg-card text-darkText dark:text-white focus:outline-none focus:ring-2 focus:ring-lightHighlight dark:focus:ring-highlight"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-grayText dark:text-white text-sm focus:outline-none"
              >
                {showPassword ? <FaEyeSlash className='h-5 w-5' /> : <FaEye className='h-5 w-5' />}
              </button>
            </div>
  
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 text-white font-semibold rounded-md bg-lightHighlight dark:bg-highlight 
                  ${isLoading ? "opacity-75 cursor-not-allowed" : "hover:bg-lightHighlightHover dark:hover:bg-highlightHover"}`}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
          <div className='mt-2 text-black dark:text-white'>
            <p>Don't have an account? <Link to='/register' className='text-highlight'>Register</Link></p>
          </div>
        </div>
      </div>
    );
      
}

export default DemoLogin