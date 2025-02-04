import React from 'react';

const EditUserModal = ({ isEditingUser, userData, closeUserEditModal, handleUserInputChange, handleSaveUserData }) => {
  return (
    <>
      {isEditingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-darkText dark:text-white">Edit User</h2>
              <button onClick={closeUserEditModal} className="text-grayText dark:text-grayText hover:text-red-500">✕</button>
            </div>

            {/* Form Inputs */}
            <div className="flex flex-col mb-4">
              <label className="text-grayText dark:text-grayText mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                value={userData.first_name}
                onChange={handleUserInputChange}
                placeholder="Enter first name"
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-lightBackground dark:bg-dark text-darkText dark:text-white focus:outline-none focus:ring-2 focus:ring-highlight"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-grayText dark:text-grayText mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={handleUserInputChange}
                placeholder="Enter last name"
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-lightBackground dark:bg-dark text-darkText dark:text-white focus:outline-none focus:ring-2 focus:ring-highlight"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded-lg font-medium transition bg-highlight hover:bg-highlightHover text-white"
                onClick={handleSaveUserData}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUserModal;
