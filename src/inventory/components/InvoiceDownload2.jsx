import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoiceByNumber } from "../../features/InventorySlice";

export default function Invoice({invoiceNumber}) {
  const printRef = React.useRef(null);

  const dispatch = useDispatch();
  const { invoice, loading, error } = useSelector((state) => state.inventory);
  const [invoiceData, setInvoiceData] = useState(null)

  useEffect(() => {
        dispatch(fetchInvoiceByNumber(invoiceNumber))
        .unwrap()
          .then((data) => {
            setInvoiceData(data)
      })
    }, [dispatch, invoiceNumber]);



  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("examplepdf.pdf");
  };

  if (!invoice) {
    // Block rendering until the data is fetched
    return <div><h2>Loading ...... </h2></div>; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div ref={printRef} className="p-8 bg-white border border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-sm text-gray-600">Invoice #{invoice.invoice_number}</p>
            </div>
            <div className="text-right">
              <h2 className="font-semibold">{invoice.pharmacy_name}</h2>
              <p className="text-sm text-gray-600">
                {invoice.pharmacy_email}
                <br />
                City, State 12345
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
            <p className="text-gray-700">
              {invoice.customer_name}
              <br />
              {invoice.customer_email}
              <br />
              City, State ZIP
            </p>
          </div>

          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Item</th>
                <th className="border p-2 text-right">Quantity</th>
                <th className="border p-2 text-right">Unit Price</th>
                <th className="border p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
                {invoice.items.map((item, index) => (
                <tr key={index}>
                    <td className="border p-2">{item.medicine_name}</td>
                    <td className="border p-2 text-right">{item.quantity}</td>
                    <td className="border p-2 text-right">₹{item.price}</td>
                    <td className="border p-2 text-right">₹{item.total}</td>
                </tr>
                ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>₹{invoice.subtotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount (%):</span>
                <span>₹{invoice.discount_percentage}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (%):</span>
                <span>₹{invoice.tax_percentage}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{invoice.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>

  );
}