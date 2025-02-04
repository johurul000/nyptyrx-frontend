import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { closeAlert, register } from '../../features/AuthSlice'
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    })
    const [showPassword1, setShowPassword1] = useState(false); 
    const [showPassword2, setShowPassword2] = useState(false); 

    const { username, email, password1, password2 } = formData


    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const message = useSelector((state) => state.auth.message)
    const isLoading = useSelector((state) => state.auth.isLoading)

    const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value})

    const handleSubmit = (e) => {
        e.preventDefault()
    
        dispatch(register({username, email, password1, password2}))
        .unwrap()
        .then(() => {
          navigate('/login')
        })
        .catch((error) => {
          console.error('Signup failed:', error)
        })
        dispatch(closeAlert())
    
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }


    return (
      <div className="min-h-screen flex items-center justify-center bg-lightBackground dark:bg-dark">
        <div className="bg-lightCard dark:bg-card shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-darkText dark:text-white text-center mb-6">Register</h2>
  
          {message && (
            <div className="bg-red-100 border border-red-400 text-red-700 text-sm rounded-md p-4 mb-4">
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
                required
                placeholder="Enter your username"
                onChange={handleInput}
                className="w-full px-4 py-2 border border-lightBorder dark:border-borderGray rounded-md bg-lightCard dark:bg-card text-darkText dark:text-white focus:outline-none focus:ring-2 focus:ring-lightHighlight dark:focus:ring-highlight"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-darkText dark:text-grayText mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                onChange={handleInput}
                className="w-full px-4 py-2 border border-lightBorder dark:border-borderGray rounded-md bg-lightCard dark:bg-card text-darkText dark:text-white focus:outline-none focus:ring-2 focus:ring-lightHighlight dark:focus:ring-highlight"
              />
            </div>
  
            <div className="relative">
              <label className="block text-sm font-medium text-darkText dark:text-grayText mb-1">
                Password
              </label>
              <input
                type={showPassword1 ? "text" : "password"} // Toggle input type for password1
                name="password1"
                required
                placeholder="Enter a password"
                onChange={handleInput}
                className="w-full px-4 py-2 border border-lightBorder dark:border-borderGray rounded-md bg-lightCard dark:bg-card text-darkText dark:text-white focus:outline-none focus:ring-2 focus:ring-lightHighlight dark:focus:ring-highlight"
              />
              <button
                type="button"
                onClick={() => setShowPassword1(!showPassword1)}
                className="absolute right-3 top-9 text-grayText dark:text-white text-sm focus:outline-none"
              >
                {showPassword1 ? <FaEyeSlash className='h-5 w-5' /> : <FaEye className='h-5 w-5' />}
              </button>
            </div>
  
            <div className="relative">
              <label className="block text-sm font-medium text-darkText dark:text-grayText mb-1">
                Confirm Password
              </label>
              <input
                type={showPassword2 ? "text" : "password"} // Toggle input type for password2
                name="password2"
                required
                placeholder="Confirm your password"
                onChange={handleInput}
                className="w-full px-4 py-2 border border-lightBorder dark:border-borderGray rounded-md bg-lightCard dark:bg-card text-darkText dark:text-white focus:outline-none focus:ring-2 focus:ring-lightHighlight dark:focus:ring-highlight"
              />
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute right-3 top-9 text-grayText dark:text-white text-sm focus:outline-none"
              >
                {showPassword2 ? <FaEyeSlash className='h-5 w-5' /> : <FaEye className='h-5 w-5' />}
              </button>
            </div>
  
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 text-white font-semibold rounded-md bg-lightHighlight dark:bg-highlight 
                  ${isLoading ? "opacity-75 cursor-not-allowed" : "hover:bg-lightHighlightHover dark:hover:bg-highlightHover"}`}
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>
          <div className='mt-2 text-black dark:text-white'>
            <p>Already have an account? <Link to='/login' className='text-highlight'>Login</Link></p>
          </div>
        </div>
      </div>
    );
}

export default Register