import React from 'react'
import flipimage from '../../images/finger_flipping.png'

const DeleteModel = ({
    handleDelete,
    closeModal,
    showDeleteModal
}) => {
    if (!showDeleteModal) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-85 flex flex-col items-center justify-center">
          {/* Modal Close Button */}
          <div className="flex justify-end items-end w-full pr-2 mb-3">
            <button
              onClick={closeModal}
              className="mt-4 text-lg bg-red-600 hover:bg-red-500 font-bold text-white p-1 rounded"
            >
              Close
            </button>
          </div>
    
          {/* Modal Content */}
          <div className="bg-lightCard dark:bg-modalBackground p-6 rounded-lg max-h-[90vh] w-[95%] lg:w-[60%] shadow-lg overflow-y-auto">
            <h1 className="text-xl font-semibold mb-4">Fuck You</h1>
            <div className='w-full flex justify-center items-center'>
                <img 
                src={flipimage}
                alt="Profile" 
                className="object-cover w-[70%] h-[90%]"
            />
            </div>
          </div>
        </div>
      );
}

export default DeleteModel