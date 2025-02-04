import React from 'react'
import InvoiceDetail from '../components/InvoiceDetail'
import { useParams } from 'react-router-dom'
import InvoiceDownload from '../components/InvoiceDownload'
import Invoice from '../components/InvoiceDownload2'

const ViewInvoice = () => {

  const { invoiceNumber } = useParams()

  return (
    // <InvoiceDetail invoiceNumber={invoiceNumber}/>
    // <InvoiceDownload invoiceNumber={invoiceNumber} />
    <Invoice invoiceNumber={invoiceNumber}/>
  )
}

export default ViewInvoice