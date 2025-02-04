import React from 'react'

const InvoiceItemField = ({ cellData, handleItemChange }) => {
  return (
    <input 
        className={cellData.className}
        type={cellData.type}
        placeholder={cellData.placeholder}
        min={cellData.min}
        max={cellData.max}
        step={cellData.step}
        name={cellData.name}
        id={cellData.id}
        value={cellData.value}
        onChange={handleItemChange}
        required
    />
  )
}

export default InvoiceItemField