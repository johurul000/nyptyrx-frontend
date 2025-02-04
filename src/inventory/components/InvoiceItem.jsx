import React from 'react'
import { TiDeleteOutline } from "react-icons/ti"

const InvoiceItem = ({ id, name, quantity, price, deleteItem, handleItemChange }) => {
  return (
    <tr>
        <td className='w-full'>
            <input
                type="text"
                value={name}
                onChange={(e) => handleItemChange(id, "name", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
                placeholder="Item Name"
            />
        </td>
        <td className='min-w-[65px] md:min-w-[80px] '>
            <input
                type="number"
                value={quantity}
                onChange={(e) =>
                    handleItemChange(id, "quantity", e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
                placeholder="Quantity"
            />

        </td>
        <td className='min-w-[100px] md:min-w-[150px]'>
            <input
            type="number"
                value={price}
                onChange={(e) => handleItemChange(id, "price", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
                placeholder="Price"
            />
        </td>
        <td className='flex justify-center items-center p-2'>
            <button
                onClick={() => deleteItem(id)}
                className="text-white bg-[#d43747] hover:bg-[#BB2D3B] text-center rounded p-1 font-bold"
            >
                <TiDeleteOutline className='h-7 w-7'/>
            </button>
        </td>
    </tr>
  )
}

export default InvoiceItem