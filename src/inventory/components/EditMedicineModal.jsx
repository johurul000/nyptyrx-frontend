import React from "react";

const EditMedicineModal = ({
  showEditModal,
  closeModal,
  handleEditFormSubmit,
  searchQuery,
  handleSearch,
  searchResults,
  handleSelectMedicine,
  medicineDetails,
  handleInput,
}) => {
  if (!showEditModal) return null;

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
        <h2 className="text-xl font-semibold mb-4">Edit Medicine</h2>
        <form onSubmit={handleEditFormSubmit}>

          {/* Form Fields */}
          {[
            { id: "medicine_name", label: "Medicine Name", type: "text", placeholder: "Enter medicine name" },
            { id: "description", label: "Description", type: "textarea", placeholder: "Enter description" },
            {
              id: "is_discontinued",
              label: "Is Discontinued",
              type: "select",
              options: [
                { value: "false", label: "No" },
                { value: "true", label: "Yes" },
              ],
            },
            { id: "manufacturer_name", label: "Manufacturer Name", type: "text", placeholder: "Enter manufacturer name" },
            { id: "medicine_type", label: "Medicine Type", type: "text", placeholder: "Enter medicine type" },
            { id: "pack_size_label", label: "Pack Size Label", type: "text", placeholder: "Enter pack size label" },
            { id: "short_composition1", label: "Short Composition 1", type: "text", placeholder: "Enter short composition 1" },
            { id: "short_composition2", label: "Short Composition 2", type: "text", placeholder: "Enter short composition 2" },
            { id: "quantity", label: "Quantity", type: "number", placeholder: "Enter quantity", required: true },
            { id: "price", label: "Price", type: "number", placeholder: "Enter price" },
            { id: "expiry_date", label: "Expiry Date", type: "date", required: true },
          ].map((field) =>
            field.type === "textarea" ? (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.id} className="block text-sm font-medium">
                  {field.label}
                </label>
                <textarea
                  id={field.id}
                  name={field.id}
                  value={medicineDetails[field.id]}
                  onChange={handleInput}
                  placeholder={field.placeholder}
                  className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                />
              </div>
            ) : field.type === "select" ? (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.id} className="block text-sm font-medium">
                  {field.label}
                </label>
                <select
                  id={field.id}
                  name={field.id}
                  value={medicineDetails[field.id]}
                  onChange={handleInput}
                  className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.id} className="block text-sm font-medium">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={medicineDetails[field.id]}
                  onChange={handleInput}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                />
              </div>
            )
          )}

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-highlight dark:bg-highlightHover text-white px-4 py-2 rounded"
          >
            Edit Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMedicineModal;
