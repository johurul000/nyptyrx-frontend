import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const InventoryTable = ({ medicines, onEdit, onDelete }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = medicines.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(medicines.length / itemsPerPage);

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full">
      {/* Table Layout for medium and larger screens */}
      <div className="hidden custom:block bg-white dark:bg-card rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead className="bg-lightCard dark:bg-card text-darkText dark:text-grayText">
            <tr>
              <th className="px-4 py-2 border-b text-left">Medicine Name</th>
              {/* Uncomment the next line if you want to display Description */}
              {/* <th className="px-4 py-2 border-b text-left">Description</th> */}
              <th className="px-4 py-2 border-b text-left">Price</th>
              <th className="px-4 py-2 border-b text-left">Manufacturer</th>
              <th className="px-4 py-2 border-b text-left">Type</th>
              <th className="px-4 py-2 border-b text-left">Pack Size</th>
              <th className="px-4 py-2 border-b text-left">Short Composition 1</th>
              <th className="px-4 py-2 border-b text-left">Quantity</th>
              <th className="px-4 py-2 border-b text-left">Expiry Date</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-card text-darkText dark:text-grayText">
            {currentMedicines.map((medicine) => (
              <tr key={medicine.id} className="hover:bg-gray-100 dark:hover:bg-dark">
                <td className="px-4 py-2 border-b">{medicine.medicine_name}</td>
                {/* Uncomment if needed: <td className="px-4 py-2 border-b">{medicine.description}</td> */}
                <td className="px-4 py-2 border-b">{medicine.price}</td>
                <td className="px-4 py-2 border-b">{medicine.manufacturer_name}</td>
                <td className="px-4 py-2 border-b">{medicine.medicine_type}</td>
                <td className="px-4 py-2 border-b">{medicine.pack_size_label}</td>
                <td className="px-4 py-2 border-b">{medicine.short_composition1}</td>
                <td className="px-4 py-2 border-b">{medicine.quantity}</td>
                <td className="px-4 py-2 border-b">{medicine.expiry_date}</td>
                <td className="px-4 py-2 border-b">
                  <div className="flex justify-around items-center">
                    <button
                      onClick={() => onEdit(medicine)}
                      className="text-highlight dark:text-highlightHover hover:text-blue-500 transition-all"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(medicine.id)}
                      className="text-red-600 hover:text-red-500 transition-all"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}  
          </tbody>
        </table>
      </div>

      {/* Card Layout for mobile screens */}
      <div className="block custom:hidden space-y-4">
        {currentMedicines.map((medicine) => (
          <div
            key={medicine.id}
            className="bg-white dark:bg-card rounded-lg shadow p-4"
          >
            <div className="flex flex-col space-y-1 text-sm text-darkText dark:text-white">
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span>{medicine.medicine_name}</span>
              </div>
              {/* Uncomment if needed: */}
              {/* <div className="flex justify-between">
                <span className="font-semibold">Description:</span>
                <span>{medicine.description}</span>
              </div> */}
              <div className="flex justify-between">
                <span className="font-semibold">Price:</span>
                <span>{medicine.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Manufacturer:</span>
                <span>{medicine.manufacturer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Type:</span>
                <span>{medicine.medicine_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Pack Size:</span>
                <span>{medicine.pack_size_label}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Composition:</span>
                <span>{medicine.short_composition1}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Quantity:</span>
                <span>{medicine.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Expiry:</span>
                <span>{medicine.expiry_date}</span>
              </div>
            </div>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => onEdit(medicine)}
                className="text-highlight dark:text-highlightHover hover:text-blue-500 transition-all"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(medicine.id)}
                className="text-red-600 hover:text-red-500 transition-all"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 px-4 py-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-lightHighlight dark:bg-highlight text-white rounded disabled:opacity-50 hover:bg-lightHighlightHover dark:hover:bg-highlightHover transition duration-300"
        >
          Previous
        </button>
        <div className="text-sm text-darkText dark:text-white">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-lightHighlight dark:bg-highlight text-white rounded disabled:opacity-50 hover:bg-lightHighlightHover dark:hover:bg-highlightHover transition duration-300"
        >
          Next
        </button>
      </div>


    </div>

  )

}

export default InventoryTable;
