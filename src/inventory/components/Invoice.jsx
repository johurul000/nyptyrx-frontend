import React, { useEffect, useState } from "react";
import { uid } from 'uid'
import InvoiceItem from "./InvoiceItem";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice, searchPharmacyStock } from "../../features/InventorySlice";
import { useNavigate } from "react-router-dom";
// import InvoiceItem from "../test/InvoiceItem";

const Invoice = () => {

  // Import statements
  const dispatch = useDispatch();

  // States
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const [suggestions, setSuggestions] = useState([]); // To store search suggestions
  const [selectedMedicines, setSelectedMedicines] = useState([]); // For selected suggestion
  const [items, setItems] = useState([]); // List of items in the invoice
  const [discount, setDiscount] = useState(0); // Discount percentage
  const [tax, setTax] = useState(0); // Tax percentage

  // Selectors
  const { serachStock, status } = useSelector((state) => state.inventory);
  

  // Date formatting
  const date = new Date();
  const today = date.toLocaleDateString("en-GB", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  // Helper functions
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  // Derived data
  const subtotal = calculateSubtotal();
  const discountAmount = (discount / 100) * subtotal;
  const taxAmount = (tax / 100) * subtotal;
  const total = subtotal - discountAmount + taxAmount;
  const invoiceNumber = uid(7); // Unique invoice number
  const loading = useSelector((state) => state.inventory.loading);
  const navigate = useNavigate()

  // Form state
  const [formData, setFormData] = useState({

    customer_name: "", // Customer's name
    customer_email: "", // Customer's email
    customer_phone: "", // Customer's phone

    pharmacy_name: "", // Pharmacy name
    pharmacy_email: "", // Pharmacy email
    pharmacy_phone: "", // Pharmacy phone

    subtotal: 0.0, // Make sure it's a float
    discount_percentage: 0.0, // Discount percentage as a number
    tax_percentage: 0.0, // Tax percentage as a number
    total: 0.0, // Total as a number
  });

  const invoicePayload = {
    ...formData,
    items: items.map(({ id, ...rest }) => rest), // Exclude `id` if it's temporary
  };

  const [focusedIndex, setFocusedIndex] = useState(-1);

  

  // Event handlers
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(searchPharmacyStock(term));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      // Move focus to the next suggestion
      setFocusedIndex((prevIndex) => 
        prevIndex < serachStock.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      // Move focus to the previous suggestion
      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : serachStock.length - 1
      );
    } else if (e.key === 'Enter' && focusedIndex !== -1) {
      // Select the focused suggestion on Enter
      const selectedMedicine = serachStock[focusedIndex];
      setSearchTerm(""); // Clear search term immediately
      handleSelectMedicine(selectedMedicine);
      setFocusedIndex(-1);
    }
  };

  const handleSelectMedicine = (medicine) => {
    if (medicine.quantity === 0) {
      alert(`${medicine.medicine_name} is out of stock.`);
      return; // Exit the function if the medicine is out of stock
    }

    const isAlreadySelected = items.some(
      (selected) => selected.medicine_name === medicine.medicine_name
    );
  
    if (isAlreadySelected) {
      alert(`${medicine.medicine_name} is already selected.`);
      return; // Prevent duplicate selections
    }

    setSelectedMedicines([...selectedMedicines, medicine]);
    const id = uid(6); // Generate a unique ID for the new item
    setItems([
      ...items,
      {
        id: id,
        medicine_name: medicine.medicine_name,
        quantity: 1,
        price: medicine.price,
      },
    ]);
    setSearchTerm(""); // Clear the search term after selecting a medicine
  };

  const handleItemChange = (id, field, value) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        if (field === "quantity") {
          const quantityValue = Number(value);
          const selected = selectedMedicines.find(
            (medicine) => medicine.medicine_name === item.medicine_name
          );

          if (selected && quantityValue > selected.quantity) {
            alert(`Stock not enough for ${item.medicine_name}. Available stock: ${selected.quantity}`);
            return item; // Return the item unchanged
          }

          return { ...item, [field]: quantityValue };
        }
        return { ...item, [field]: value };
      }
      return item; // Return other items unchanged
    });
    setItems(updatedItems);
  };

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const addItem = () => {
    const id = uid(6);
    setItems([...items, { id: id, name: "", quantity: 1, price: 1.0 }]);
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if any item's quantity is 0
    const hasInvalidQuantity = items.some(item => item.quantity === 0);

    if (hasInvalidQuantity) {
      alert("Some items have a quantity of 0. Please update the quantity before submitting.");
      return; // Stop form submission
    }

    dispatch(createInvoice(invoicePayload))
    .unwrap()
        .then((data) => {
          console.log(data)
          // alert("Invoice Generated!")
          navigate(`/invoice/${data.invoice_number}`)
        })
        .catch((error) => {
          console.error('Creating invoice failed:', error)
        })
  }

  // Effects
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      subtotal: parseFloat(subtotal).toFixed(2) || 0.0, // Ensuring it is a number
      discount_percentage: parseFloat(discount).toFixed(2) || 0.0,
      tax_percentage: parseFloat(tax).toFixed(2) || 0.0,
      total: parseFloat(total).toFixed(2) || 0.0,
    }));
  }, [discount, tax, items]);

  return (
    <div className="flex flex-col justify-center items-center w-full">

      {/* Search Bar */}
      <div className="relative mb-4 text-black w-[50%]">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            placeholder="Search for items..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {searchTerm && serachStock.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              {serachStock.map((medicine, index) => (
                
                <div
                  key={index}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${focusedIndex === index ? 'bg-gray-100' : ''}`} // Highlight the focused suggestion
                  onClick={() => handleSelectMedicine(medicine)}
                >
                  {medicine.medicine_name}
                </div>
              ))}
            </div>
          )}
        </div>


      <div className="bg-white text-black flex-1 p-6 rounded-lg shadow-md w-[99%] lg:w-[80%]">
        {/* Header */}
        <div className="flex flex-col text-black justify-between space-y-2 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Current Date: </span>
            <span>{today}</span>
          </div>
          {/* <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
            <input
              required
              className="max-w-[130px] border border-gray-300 rounded-lg px-2 py-1 text-sm"
              type="text"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              step="1"
              readOnly
              value={invoiceNumber}
            />
          </div> */}
        </div>

        {/* <div className="mb-4">
          <input
            type="file"
            className="file-input border border-gray-300 rounded-lg px-2 py-1 text-sm"
          />
          
        </div> */}

        <div className="flex flex-col lg:flex-row gap-3">
          {/* Billed To */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Billed To:</h3>
            {[
              { field: "customer_name", placeholder: "Customer Name" },
              { field: "customer_email", placeholder: "Customer Email" },
              { field: "customer_phone", placeholder: "Customer Phone" },
            ].map(({ field, placeholder }) => (
              <input
                key={field}
                type="text"
                value={formData[field]} // Bind the value to formData
                onChange={(e) => handleFormChange(field, e.target.value)} // Update the respective field in formData
                placeholder={placeholder}
                className="w-full border text-black border-gray-300 rounded-lg px-2 py-1 mb-2"
              />
            ))}
          </div>

          {/* From */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">From:</h3>
            {[
              { field: "pharmacy_name", placeholder: "Pharmacy Name" },
              { field: "pharmacy_email", placeholder: "Pharmacy Email" },
              { field: "pharmacy_phone", placeholder: "Pharmacy Phone" },
            ].map(({ field, placeholder }) => (
              <input
                key={field}
                type="text"
                value={formData[field]} // Bind the value to formData
                onChange={(e) => handleFormChange(field, e.target.value)} // Update the respective field in formData
                placeholder={placeholder}
                className="w-full border text-black border-gray-300 rounded-lg px-2 py-1 mb-2"
              />
            ))}
          </div>
          
        </div>

        

        {/* Items */}
        <table className="w-full p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-black text-sm md:text-base">
              <th>ITEM</th>
              <th>QTY</th>
              <th className="text-center">PRICE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.medicine_name}
                quantity={item.quantity}
                price={item.price}
                deleteItem={deleteItem}
                handleItemChange={handleItemChange}
              />
            ))}
          </tbody>
        </table>
        {/* <div className="mb-4">
          <button
            onClick={addItem}
            className={`
              text-white font-bold bg-lightHighlight dark:bg-highlight 
              hover:bg-lightHighlightHover dark:hover:bg-highlightHover rounded p-1 pl-2 pr-2        
              `}
          >
            Add Item
          </button>
        </div> */}

        {/* Summary */}
        <div className="mt-4">
          <div className="flex justify-between">
            <span>Subtotal: </span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <label>
              Discount (%): 
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="ml-2 w-20 border border-gray-300 rounded-lg px-2 py-1"
              />
            </label>
            <span>₹{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <label>
              Tax (%): 
              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(Number(e.target.value))}
                className="ml-2 w-20 border border-gray-300 rounded-lg px-2 py-1"
              />
            </label>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>        

      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="px-6 py-2 bg-highlight hover:bg-highlightHover text-white font-bold rounded-lg disabled:opacity-50"
          onClick={(e) => handleFormSubmit(e)}
          disabled={loading} // Disable the button when loading is true
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin"></div>
            </div>
          ) : (
            'Generate Invoice'
          )}
        </button>
      </div>

    </div>
    
  );
};

export default Invoice;
