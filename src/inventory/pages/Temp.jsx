import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMedicineToInventory, searchMedicines } from "../../features/InventorySlice"; 

const Inventory = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [medicineDetails, setMedicineDetails] = useState({
        medicine_name: '',
        description: '',
        is_discontinued: false,
        manufacturer_name: '',
        pack_size_label: '',
        short_composition1: '',
        short_composition2: '',
        quantity: 0,
        medicine_type: '',
        price: '',
        expiry_date: ''
    })
    const { searchResults, status } = useSelector((state) => state.inventory);
    const pharmacyId = useSelector((state) => state.auth.pharmacyId)

    const handleInput = (e) => {
        const { name, value } = e.target;
        setMedicineDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        dispatch(searchMedicines(e.target.value));
    };

    const handleSelectMedicine = (medicine) => {
        setSelectedMedicine(medicine);
        setMedicineDetails({
            medicine_name: medicine.name || '',
            description: medicine.description || '',
            is_discontinued: medicine.is_discontinued || false,
            manufacturer_name: medicine.manufacturer_name || '',
            pack_size_label: medicine.pack_size_label || '',
            short_composition1: medicine.short_composition1 || '',
            short_composition2: medicine.short_composition2 || '',
            quantity: 0,
            price: medicine.price || '',
            expiry_date: ''
        })
        setSearchQuery("");
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Logic for adding a new medicine
        dispatch(addMedicineToInventory({ pharmacyId, medicineDetails}))
        .unwrap()
        .then(() => {
          closeModal()
        })
        .catch((error) => {
          console.error('Adding medicine failed:', error)
        })
        console.log("Form submitted");
    };

    const resetForm = () => {
        setSearchQuery('');       // Clear search query
        setMedicineDetails({      // Reset medicine details
            medicine_name: '',
            description: '',
            is_discontinued: false,
            manufacturer_name: '',
            pack_size_label: '',
            short_composition1: '',
            short_composition2: '',
            quantity: 0,
            medicine_type: '',
            price: '',
            expiry_date: ''
        });
    };

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    

    return (
        <div className="min-h-screen bg-lightBackground dark:bg-dark text-darkText dark:text-white">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Inventory</h1>
                <button
                    className="mt-4 bg-highlight dark:bg-highlightHover text-white px-4 py-2 rounded"
                    onClick={() => setShowModal(true)}
                >
                    Add Medicine
                </button>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-85 flex flex-col items-center justify-center">
                        <div className="flex justify-end items-end w-full pr-2 mb-3">
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="mt-4 text-lg bg-red-600 hover:bg-red-500 font-bold text-white p-1 rounded"
                            >
                                close
                            </button>
                        </div>
                        <div className="bg-lightCard dark:bg-modalBackground p-6 rounded-lg max-h-[90vh] w-[95%] lg:w-[60%] shadow-lg overflow-y-auto">
                            <h2 className="text-xl font-semibold mb-4">Add Medicine</h2>
                            <form onSubmit={handleFormSubmit}>
                                {/* Search Field */}
                                <div className="mb-4">
                                <label htmlFor="search" className="block text-sm font-medium">
                                    Search Medicine
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Search for a medicine..."
                                    className="mt-1 block text-black w-full border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                                />
                                {searchQuery && searchResults.length > 0 && (
                                    <ul className="mt-2 bg-white border text-black border-gray-300 rounded shadow-md max-h-40 overflow-y-auto">
                                    {searchResults.map((medicine) => (
                                        <li
                                        key={medicine.id}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSelectMedicine(medicine)}
                                        >
                                        {medicine.name}
                                        </li>
                                    ))}
                                    </ul>
                                )}
                                </div>

                                {/* Medicine Name */}
                                <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium">
                                    Medicine Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={medicineDetails.medicine_name}
                                    onChange={handleInput}
                                    placeholder="Enter medicine name"
                                    className="mt-1 block w-full text-black  border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                                />
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={medicineDetails.description}
                                    onChange={handleInput}
                                    placeholder="Enter description"
                                    className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                                />
                                </div>

                                {/* Is Discontinued */}
                                <div className="mb-4">
                                <label htmlFor="is_discontinued" className="block text-sm font-medium">
                                    Is Discontinued
                                </label>
                                <select
                                    id="is_discontinued"
                                    name="is_discontinued"
                                    value={medicineDetails.is_discontinued}
                                    onChange={handleInput}
                                    className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                                >
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                                </div>

                                {/* Manufacturer Name */}
                                <div className="mb-4">
                                <label htmlFor="manufacturer_name" className="block text-sm font-medium">
                                    Manufacturer Name
                                </label>
                                <input
                                    type="text"
                                    id="manufacturer_name"
                                    name="manufacturer_name"
                                    value={medicineDetails.manufacturer_name}
                                    onChange={handleInput}
                                    placeholder="Enter manufacturer name"
                                    className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                                />
                                </div>

                                {/* Pack Size Label */}
                                <div className="mb-4">
                                <label htmlFor="pack_size_label" className="block text-sm font-medium">
                                    Pack Size Label
                                </label>
                                <input
                                    type="text"
                                    id="pack_size_label"
                                    name="pack_size_label"
                                    value={medicineDetails.pack_size_label}
                                    onChange={handleInput}
                                    placeholder="Enter pack size label"
                                    className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                                />
                                </div>

                                {/* Short Composition 1 */}
                                <div className="mb-4">
                                <label htmlFor="short_composition1" className="block text-sm font-medium">
                                    Short Composition 1
                                </label>
                                <input
                                    type="text"
                                    id="short_composition1"
                                    name="short_composition1"
                                    value={medicineDetails.short_composition1}
                                    onChange={handleInput}
                                    placeholder="Enter short composition 1"
                                    className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                                />
                                </div>

                                {/* Short Composition 2 */}
                                <div className="mb-4">
                                <label htmlFor="short_composition2" className="block text-sm font-medium">
                                    Short Composition 2
                                </label>
                                <input
                                    type="text"
                                    id="short_composition2"
                                    name="short_composition2"
                                    value={medicineDetails.short_composition2}
                                    onChange={handleInput}
                                    placeholder="Enter short composition 2"
                                    className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                                />
                                </div>

                                {/* Quantity */}
                                <div className="mb-4">
                                <label htmlFor="quantity" className="block text-sm font-medium">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={medicineDetails.quantity}
                                    required
                                    onChange={handleInput}
                                    placeholder="Enter quantity"
                                    className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                                />
                                </div>

                                {/* Price */}
                                <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-medium">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={medicineDetails.price}
                                    onChange={handleInput}
                                    placeholder="Enter price"
                                    className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                                />
                                </div>

                                {/* Expiry Date */}
                                <div className="mb-4">
                                <label htmlFor="expiry_date" className="block text-sm font-medium">
                                    Expiry Date
                                </label>
                                <input
                                    type="date"
                                    id="expiry_date"
                                    name="expiry_date"
                                    value={medicineDetails.expiry_date}
                                    onChange={handleInput}
                                    className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm"
                                />
                                </div>

                                {/* Save Button */}
                                <button
                                type="submit"
                                className="w-full bg-highlight dark:bg-highlightHover text-white px-4 py-2 rounded"
                                >
                                Save Medicine
                                </button>
                            </form>

                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventory;
