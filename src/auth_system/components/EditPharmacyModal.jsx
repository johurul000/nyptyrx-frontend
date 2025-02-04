import React from 'react'

const EditPharmacyModal = ({ isEditing, closePharmacyEditMoadal, handleChange, pharmacyData, handleSave }) => {
  return (
    <>
    {isEditing && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-lg w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-darkText dark:text-white">Edit Pharmacy</h2>
                    <button onClick={closePharmacyEditMoadal} className="text-grayText dark:text-grayText hover:text-red-500">
                      ✕
                    </button>
                  </div>

                  {/* Form Inputs */}
                  <div className="flex flex-col mb-4">
                    <label className="text-grayText dark:text-grayText mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={pharmacyData.name}
                      onChange={handleChange}
                      placeholder="Enter pharmacy name"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-lightBackground dark:bg-dark text-darkText dark:text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                    />
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="text-grayText dark:text-grayText mb-1">Owner</label>
                    <input
                      type="text"
                      name="owner_name"
                      value={pharmacyData.owner_name}
                      onChange={handleChange}
                      placeholder="Enter owner's name"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-lightBackground dark:bg-dark text-darkText dark:text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                    />
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="text-grayText dark:text-grayText mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={pharmacyData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-lightBackground dark:bg-dark text-darkText dark:text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                    />
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="text-grayText dark:text-grayText mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={pharmacyData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-lightBackground dark:bg-dark text-darkText dark:text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                    />
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="text-grayText dark:text-grayText mb-1">Address</label>
                    <textarea
                      name="address"
                      value={pharmacyData.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-lightBackground dark:bg-dark text-darkText dark:text-white focus:outline-none focus:ring-2 focus:ring-highlight resize-none"
                      rows="3"
                    />
                  </div>

                  {/* Modal Actions */}
                  <div className="flex justify-end gap-2 mt-4">
                    {/* <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button> */}
                    {/* <Button onClick={handleSave}>Save</Button> */}

                    <button
                      class="px-4 py-2 rounded-lg font-medium transition bg-highlight hover:bg-highlightHover text-white"
                      onClick={handleSave}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
    </>
  )
}

export default EditPharmacyModal