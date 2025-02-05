import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "../../features/InventorySlice";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import FullPageLoader from "../../components/FullPageLoader";

const Invoices = () => {
  const dispatch = useDispatch();
  const { invoices, loading, error } = useSelector((state) => state.inventory);

  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 10;

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  if (loading) return <FullPageLoader />

  let errorMessage = "";
  if (error) {
    errorMessage =
      typeof error === "object"
        ? error?.detail || error?.message || JSON.stringify(error)
        : error;
  }

  // Get current invoices to display
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < Math.ceil(invoices.length / invoicesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSend = (invoiceNumber) => {
    console.log(`Send invoice ${invoiceNumber}`);
  };

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-semibold text-darkText dark:text-white mb-4">
          Invoices
        </h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="overflow-x-auto">
          <table className="w-full border border-borderGray dark:border-lightBorder text-sm md:text-base">
            <thead className="border-b">
              <tr className="bg-lightCard dark:bg-card">
                <th className="px-4 py-2 text-darkText dark:text-white text-left">Invoice Number</th>
                <th className="px-4 py-2 text-darkText dark:text-white text-left">Customer Name</th>
                <th className="px-4 py-2 text-darkText dark:text-white text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((invoice) => (
                <tr key={invoice.id} className="dark:bg-card border-b">
                  <td className="px-4 py-2 text-darkText dark:text-white">
                    {invoice.invoice_number}
                  </td>
                  <td className="px-4 py-2 text-darkText dark:text-white">
                    {invoice.customer_name}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col md:flex-row justify-start md:justify-around items-center gap-2">
                      <Link
                        to={`/invoice/${invoice.invoice_number}`}
                        className="text-white bg-lightHighlight hover:bg-lightHighlightHover dark:bg-highlight dark:hover:bg-highlightHover px-3 py-2 rounded text-sm md:text-base"
                      >
                        View
                      </Link>
                      <button
                        className="text-white bg-lightHighlight hover:bg-lightHighlightHover dark:bg-highlight dark:hover:bg-highlightHover px-3 py-2 rounded text-sm md:text-base"
                        onClick={() => handleSend(invoice.invoice_number)}
                      >
                        Send
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="text-white bg-lightHighlight hover:bg-lightHighlightHover dark:bg-highlight dark:hover:bg-highlightHover px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(invoices.length / invoicesPerPage)}
            className="text-white bg-lightHighlight hover:bg-lightHighlightHover dark:bg-highlight dark:hover:bg-highlightHover px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Invoices;
