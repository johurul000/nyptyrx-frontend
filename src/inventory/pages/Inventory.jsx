import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMedicineToInventory, editMedicine, fetchPharmacyStock, searchMedicines } from "../../features/InventorySlice"; 
import AddMedicineModal from "../components/AddMedicineModal";
import InventoryTable from "../components/InventoryTable";
import Layout from "../../components/Layout";
import EditMedicineModal from "../components/EditMedicineModal";
import DeleteModel from "../components/DeleteModel";

const Inventory = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
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
    const medicines = useSelector((state) => state.inventory.medicines)
    const [medicineId, setMedicineId] = useState(null)
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        // Move focus to the next suggestion
        setFocusedIndex((prevIndex) => 
          prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        // Move focus to the previous suggestion
        setFocusedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
        );
      } else if (e.key === 'Enter' && focusedIndex !== -1) {
        // Select the focused suggestion on Enter
        const selectedMedicine = searchResults[focusedIndex]
        setSearchQuery("")
        handleSelectMedicine(selectedMedicine);
        setFocusedIndex(-1)
      }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setMedicineDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        dispatch(fetchPharmacyStock())
            .unwrap()
            .then((data) => {
                // console.log('Fetched pharmacy stock:', data);
            })
            .catch((err) => {
                console.error('Failed to fetch inventory:', err);
            });
    }, [dispatch]);


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
            medicine_type: medicine.medicine_type || '',
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
        setShowEditModal(false)
        setShowDeleteModal(false)
        resetForm();
    };

    const handleEdit = (medicine) => {
        setMedicineDetails(medicine);
        setMedicineId(medicine.id)
        setShowEditModal(true);
    };

    const handleDelete = () => {
        setShowDeleteModal(true)
    }

    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        console.log(medicineDetails)

        dispatch(editMedicine({pharmacyId, medicineId, medicineDetails}))
        .unwrap()
        .then(() => {
          closeModal()
        })
        .catch((error) => {
          console.error('Editing medicine failed:', error)
        })
        console.log("Edit Form submitted");
    }

    

    return (
        <Layout>
          <div className="min-h-screen bg-lightBackground dark:bg-dark text-darkText dark:text-white">
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold text-center">Inventory</h1>
              <div className="mt-4 mb-4 flex flex-row justify-end">
                <button
                    className=" bg-highlight dark:bg-highlightHover text-white px-4 py-2 rounded"
                    onClick={() => setShowModal(true)}
                >
                    Add Medicine
                </button>
              </div>
              
      
              <InventoryTable medicines={medicines} onEdit={handleEdit} onDelete={handleDelete}/>
      
              <AddMedicineModal
                showModal={showModal}
                closeModal={closeModal}
                handleFormSubmit={handleFormSubmit}
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                searchResults={searchResults}
                handleSelectMedicine={handleSelectMedicine}
                medicineDetails={medicineDetails}
                handleInput={handleInput}
                focusedIndex={focusedIndex}
                handleKeyDown={handleKeyDown}
              />

             <EditMedicineModal
                showEditModal={showEditModal}
                closeModal={closeModal}
                handleEditFormSubmit={handleEditFormSubmit}
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                searchResults={searchResults}
                handleSelectMedicine={handleSelectMedicine}
                medicineDetails={medicineDetails}
                handleInput={handleInput}
              />

              <DeleteModel
                closeModal={closeModal}
                showDeleteModal={showDeleteModal}
              />
            </div>
          </div>
        </Layout>
      );
};

export default Inventory;
