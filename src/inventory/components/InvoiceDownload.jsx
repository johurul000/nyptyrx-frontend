import {
    Page,
    Text,
    View,
    Document,
    PDFViewer,
    PDFDownloadLink,
  } from "@react-pdf/renderer";
  import { styles } from "./styles";
  import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchInvoiceByNumber } from "../../features/InventorySlice";
  
  export default function InvoiceDownload({ invoiceNumber }) {
    const dispatch = useDispatch();
    const { invoice, loading, error } = useSelector((state) => state.inventory);
    const [totalData, setTotalData] = useState([]);
  
    useEffect(() => {
      dispatch(fetchInvoiceByNumber(invoiceNumber))
      .unwrap()
        .then((data) => {
        if (data) {
            setTotalData([
                { label: "Subtotal", value: data.subtotal },
                { label: `Discount (%)`, value: data.discount || '0.00' },
                { label: `Tax (%)`, value: data.tax || '0.00' },
                { label: "Total", value: data.total },
            ]);
        }
    })
    }, [dispatch, invoiceNumber]);
  
    if (loading) {
      return <div> <h2>Loading invoice data...</h2></div>; // Show a loading state
    }
  
    if (error) {
      return <div> <h2>Error fetching invoice: {error}</h2></div>; // Show an error state
    }
  
    if (!invoice) {
      return <div> <h2>No invoice data found.</h2></div>; // Handle missing data
    }
  
    const InvoicePDF = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
              <Text>Invoice #{invoice.invoice_number}</Text>
            </View>
            <View style={styles.spaceY}>
              <Text style={styles.textBold}>{invoice.pharmacy_name}</Text>
              <Text>{invoice.pharmacy_email}</Text>
              <Text>City, State 12345</Text>
            </View>
          </View>
          <View style={styles.spaceY}>
            <Text style={[styles.billTo, styles.textBold]}>Bill To:</Text>
            <Text>{invoice.customer_name}</Text>
            <Text>{invoice.customer_email}</Text>
            <Text>City, State ZIP</Text>
          </View>
          {/* Render the table */}
          <Table style={styles.table}>
            <TH style={[styles.tableHeader, styles.textBold]}>
              <TD style={styles.td}>Item</TD>
              <TD style={styles.td}>Quantity</TD>
              <TD style={styles.td}>Unit Price</TD>
              <TD style={styles.td}>Total</TD>
            </TH>
            {invoice.items.map((item, index) => (
              <TR key={index}>
                <TD style={styles.td}>{item.medicine_name}</TD>
                <TD style={styles.td}>{item.quantity}</TD>
                <TD style={styles.td}>${item.price}</TD>
                <TD style={styles.td}>${item.total}</TD>
              </TR>
            ))}
          </Table>
          <View style={styles.totals}>
            <View
                style={{
                minWidth: "256px",
                }}
            >
                {totalData.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: "8px",
                        }}
                    >
                        <Text style={item.label === "Total" ? styles.textBold : styles.textNormal}>
                        {item.label}
                        </Text>
                        <Text style={item.label === "Total" ? styles.textBold : styles.textNormal}>
                        {item.value}
                        </Text>
                    </View>
                ))}
            </View>
            
         </View>
        </Page>
      </Document>
    );
  
    return (
      <div className="max-w-2xl mx-auto my-10">
        <div className="w-full h-[500px]">
          <PDFViewer width="100%" height="100%">
            <InvoicePDF />
          </PDFViewer>
        </div>
        <div className="mt-6 flex justify-center">
          <PDFDownloadLink document={<InvoicePDF />} fileName="invoice.pdf">
            <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Download PDF
            </button>
          </PDFDownloadLink>
        </div>
      </div>
    );
  }
  