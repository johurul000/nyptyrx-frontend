import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import { createPharmacy } from '../../features/AuthSlice'
import { useNavigate } from 'react-router-dom'

const CreatePharmacy = () => {
  const [formData, setFormData] = useState({
    name: '',
    owner_name: '',
    email: '',
    phone: '',
    address: '',
  })
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.pharmacy) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(createPharmacy(formData))
    .unwrap()
    .then(() => {
      navigate('/dashboard')
    })
    .catch((error) => {
      console.error('Creating Pharmacy failed:', error)
    })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-lightBackground dark:bg-dark p-4">
      <div className="max-w-md lg:max-w-[40%] w-full bg-lightCard dark:bg-card p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Create a Pharmacy</h2>

        {/* Success or Error messages */}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pharmacy Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium dark:text-white">
              Pharmacy Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-highlight focus:ring-highlight sm:text-sm text-black"
              required
            />
          </div>

          {/* Owner Name */}
          <div>
            <label htmlFor="owner_name" className="block text-sm font-medium dark:text-white">
              Owner Name
            </label>
            <input
              type="text"
              name="owner_name"
              id="owner_name"
              value={formData.owner_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-highlight focus:ring-highlight sm:text-sm text-black"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-highlight focus:ring-highlight sm:text-sm text-black"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium dark:text-white">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-highlight focus:ring-highlight sm:text-sm text-black"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium dark:text-white">
              Address
            </label>
            <textarea
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-highlight focus:ring-highlight sm:text-sm text-black"
              rows="4"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-highlight hover:bg-highlightHover text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2"
          >
            Create Pharmacy
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePharmacy
