import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoiceByNumber } from '../../features/InventorySlice';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles for the PDF layout
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
  },
  invoiceItems: {
    marginTop: 15,
    marginBottom: 15,
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
  },
  invoiceItemRow: {
    flexDirection: 'row',
    padding: 5,
  },
  invoiceItemHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  invoiceItemValue: {
    flex: 1,
    textAlign: 'right',
  },
});

const InvoiceDetail = ({ invoiceNumber }) => {
  const dispatch = useDispatch();
  const { invoice, loading, error } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchInvoiceByNumber(invoiceNumber))
    .unwrap()
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.error('Creating invoice failed:', error)
        })
  }, [dispatch, invoiceNumber]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!invoice) {
    return <p>No invoice found</p>;
  }

  // Invoice PDF Component
  const InvoicePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Invoice #{invoice.invoice_number}</Text>
          <Text style={styles.text}>Customer: {invoice.customer_name}</Text>
          <Text style={styles.text}>Email: {invoice.customer_email}</Text>
          <Text style={styles.text}>Phone: {invoice.customer_phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Pharmacy Details</Text>
          <Text style={styles.text}>Name: {invoice.pharmacy_name}</Text>
          <Text style={styles.text}>Email: {invoice.pharmacy_email}</Text>
          <Text style={styles.text}>Phone: {invoice.pharmacy_phone}</Text>
        </View>

        <View style={styles.invoiceItems}>
          <View style={styles.invoiceItemRow}>
            <Text style={[styles.invoiceItemHeader, { flex: 3 }]}>Medicine Name</Text>
            <Text style={[styles.invoiceItemHeader, { flex: 1 }]}>Quantity</Text>
            <Text style={[styles.invoiceItemHeader, { flex: 1 }]}>Price</Text>
            <Text style={[styles.invoiceItemHeader, { flex: 1 }]}>Total</Text>
          </View>
          {invoice.items.map((item) => (
            <View key={item.id} style={styles.invoiceItemRow}>
              <Text style={[styles.invoiceItemValue, { flex: 3 }]}>{item.medicine_name}</Text>
              <Text style={styles.invoiceItemValue}>{item.quantity}</Text>
              <Text style={styles.invoiceItemValue}>{item.price}</Text>
              <Text style={styles.invoiceItemValue}>{item.total}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Subtotal: {invoice.subtotal}</Text>
          <Text style={styles.text}>Discount: {invoice.discount_percentage}%</Text>
          <Text style={styles.text}>Tax: {invoice.tax_percentage}%</Text>
          <Text style={styles.text}>Total: {invoice.total}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="bg-lightBackground text-darkText py-8 px-10">
      <h2 className="text-2xl font-bold mb-6">Invoice #{invoice.invoice_number}</h2>
      <p className="text-lg">Customer: {invoice.customer_name}</p>
      <p>Email: {invoice.customer_email}</p>
      <p>Phone: {invoice.customer_phone}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Pharmacy Details</h3>
      <p>Name: {invoice.pharmacy_name}</p>
      <p>Email: {invoice.pharmacy_email}</p>
      <p>Phone: {invoice.pharmacy_phone}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Invoice Items</h3>
      <table className="table-auto w-full mb-6">
        <thead>
          <tr className="text-left border-b">
            <th className="px-4 py-2">Medicine Name</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{item.medicine_name}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2">{item.price}</td>
              <td className="px-4 py-2">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mt-6 mb-3">Invoice Summary</h3>
      <p className="text-lg">Subtotal: {invoice.subtotal}</p>
      <p>Discount: {invoice.discount_percentage}%</p>
      <p>Tax: {invoice.tax_percentage}%</p>
      <p>Total: {invoice.total}</p>

      <div className="mt-8">
        <PDFDownloadLink
          document={<InvoicePDF />}
          fileName={`Invoice_${invoice.invoice_number}.pdf`}
        >
          {({ loading }) => (
            loading ? (
              <button className="bg-gray-500 text-white px-6 py-2 rounded-md">Loading PDF...</button>
            ) : (
              <button className="bg-highlight text-white px-6 py-2 rounded-md hover:bg-highlightHover transition duration-300">
                Download PDF
              </button>
            )
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default InvoiceDetail;
