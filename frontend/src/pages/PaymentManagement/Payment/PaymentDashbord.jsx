import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../../components/spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from '../../../components/headerfooter/Header';
import Footer from '../../../components/headerfooter/Footer';
import logo from '../../../images/logo.png';

const PaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/payments')
      .then((response) => {
        setPayments(response.data.data);
        setFilteredPayments(response.data.data); // Initialize filteredPayments with all payments
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredPayments(payments); // Show all payments if search query is empty
      return;
    }

    const results = payments.filter((payment) =>
      payment.productName.some(name => name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      payment.cardHolderName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredPayments(results);
  };

  const totalIncome = filteredPayments.reduce((total, payment) => total + payment.totalPrice, 0);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.setFont('Poppins', 'bold');
    doc.text('WildLanka', 14, 22);

    // Add the logo image
    const logoWidth = 45; // Adjust width as needed
    const logoHeight = 30; // Adjust height as needed
    doc.addImage(logo, 'PNG', 160, 10, logoWidth, logoHeight); // Add logo to the right side


    doc.setFontSize(18);
    doc.setFont('Poppins', 'bold');
    doc.text('Payment Report', 14, 32);

    const reportDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.setFont('Poppins', 'normal');
    doc.text(`Date: ${reportDate}`, 14, 42);

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.line(10, 45, 205, 45);

    const tableColumn = ["No", "Date", "Customer", "Product Name", "Price", "Quantity", "Total Price"];
    const tableRows = filteredPayments.map((payment, index) => [
        `PID_${index + 1}`,
        new Date(payment.createdAt).toLocaleDateString(),
        payment.cardHolderName,
        payment.productName.join('\n'),
        payment.price.join('\n'),
        payment.quantity.join('\n'),
        `Rs ${payment.totalPrice.toFixed(2)}`
    ]);

    doc.autoTable(tableColumn, tableRows, {
        startY: 50,
        theme: 'grid',
        headStyles: {
            fillColor: '#330D0F',
            textColor: '#FFFFFF',
            font: 'Poppins',
            fontSize: 8,
            halign: 'center',
        },
        bodyStyles: {
            font: 'Poppins',
            fontSize: 10,
            valign: 'top',
            overflow: 'linebreak',
            cellPadding: 1,
            cellWidth: 'wrap',
        },
        margin: { left: 10, right: 14 },
        columnStyles: {
            0: { cellWidth: 15, halign: 'center' },
            1: { cellWidth: 50, halign: 'center' },
            2: { cellWidth: 30, halign: 'left' },
            3: { cellWidth: 40, halign: 'left' },
            4: { cellWidth: 20, halign: 'right' },
            5: { cellWidth: 15, halign: 'right' },
            6: { cellWidth: 25, halign: 'right' },
        },
        styles: {
            cellPadding: 1,
            font: 'Poppins',
        },
        didDrawPage: function (data) {
            doc.setFontSize(10);
            doc.text('Generated by WildLanka', 14, doc.internal.pageSize.height - 10);
        },
    });

    const totalPriceY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(14);
    doc.setFont('Poppins', 'bold');
    doc.text(`Total Income : Rs ${totalIncome}`, 14, totalPriceY);

    doc.save('payment-report.pdf');
  };

  return (
    <div>
    <Header/>
    <div style={styles.page}>
      <div style={styles.container}>
      <div style={styles.buttonContainer}>
          <Link to="/expenses">
            <button style={styles.buttonexpense}>Expenses</button>
          </Link>
          <Link to="/payments">
            <button style={styles.buttonincome}>Incomes</button>
          </Link>
          <Link to="/profits">
            <button style={styles.buttonprofit}>Net Profit</button>
          </Link>
        </div>
        <div style={styles.header}>
          <h1 style={styles.title}>Payment Management</h1>
          <Link to='/payments/create'>
            <MdOutlineAddBox style={{ ...styles.addIcon, color: '#0284c7' }} />
          </Link>
        </div>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by Product Name or Card Holder Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchButton}>Search</button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {filteredPayments.length > 0 ? (
              <>
                <button
                  className="btn btn-primary"
                  onClick={generatePDF}
                  style={{ ...styles.downloadButton, ...styles.downloadButtonHover }}
                >
                  Download Payment Report
                </button>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={{ ...styles.th, width: '5%' }}>No</th>
                      <th style={{ ...styles.th, width: '20%' }}>Date</th>
                      <th style={{ ...styles.th, width: '15%' }}>Customer</th>
                      <th style={{ ...styles.th, width: '25%' }}>Product Name</th>
                      <th style={{ ...styles.th, width: '10%' }}>Price</th>
                      <th style={{ ...styles.th, width: '10%' }}>Quantity</th>
                      <th style={{ ...styles.th, width: '15%' }}>Total Price</th>
                      <th style={{ ...styles.th, width: '15%' }}>Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment, index) => (
                      <tr key={payment._id}>
                        <td style={styles.td}>{index + 1}</td>
                        <td style={styles.td}>{new Date(payment.createdAt).toLocaleDateString()}</td>  {/* toLocalString */}
                        <td style={styles.td}>{payment.cardHolderName}</td>
                        <td style={styles.td}>
                          {payment.productName.map((name, idx) => (
                            <React.Fragment key={idx}>
                              {name}
                              <br />
                            </React.Fragment>
                          ))}
                        </td>
                        <td style={styles.td}>
                          {payment.price.map((price, idx) => (
                            <React.Fragment key={idx}>
                              {price}
                              <br />
                            </React.Fragment>
                          ))}
                        </td>
                        <td style={styles.td}>
                          {payment.quantity.map((quantity, idx) => (
                            <React.Fragment key={idx}>
                              {quantity}
                              <br />
                            </React.Fragment>
                          ))}
                        </td>
                        <td style={styles.td}>Rs {payment.totalPrice.toFixed(2)}</td>
                        <td style={styles.td}>
                          <div style={styles.operations}>
                            <Link to={`/payments/details/${payment._id}`}>
                              <BsInfoCircle style={{ ...styles.icon, color: '#047857' }} />
                            </Link>
                            <Link to={`/payments/edit/${payment._id}`}>
                              <AiOutlineEdit style={{ ...styles.icon, color: '#d97706' }} />
                            </Link>
                            <Link to={`/payments/delete/${payment._id}`}>
                              <MdOutlineDelete style={{ ...styles.icon, color: '#dc2626' }} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* Total Price Row */}
                    <tr>
                      <td colSpan="6" style={totalPriceRowStyle.totalPriceLabel}>
                        Total Income :
                      </td>
                      <td style={totalPriceRowStyle.totalPriceValue}>
                        Rs {totalIncome.toFixed(2)}
                      </td>
                      <td style={totalPriceRowStyle.emptyCell}></td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : (
              <p style={{ textAlign: 'center', fontSize: '1.25rem', color: '#330D0F', marginTop: '2rem' }}>No results found.</p>
            )}
          </>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
};

// CSS styles
const styles = {
  page: {
    backgroundColor: '#fff',
    minHeight: '130vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '1rem',
    fontFamily: 'Poppins, sans-serif',
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Poppins, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    color: '#330D0F', 
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: '100px',
    marginTop: '30px',
},
buttonexpense: {
  backgroundColor: '#330D0F',
  color: '#F1EEDA',
  width: '150px',
  height: '50px',
  padding: '10px 20px',
  fontSize: '1rem',
  fontWeight: 'bold',
  fontFamily: 'Poppins, sans-serif',
  borderRadius: '5px',
  cursor: 'pointer',
  border: '2px solid #330D0F',
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  marginLeft: '300px',
},
buttonincome: {
  backgroundColor: '#330D0F',
  color: '#F1EEDA',
  width: '150px',
  height: '50px',
  padding: '10px 20px',
  fontSize: '1rem',
  fontWeight: 'bold',
  fontFamily: 'Poppins, sans-serif',
  borderRadius: '5px',
  cursor: 'pointer',
  border: '2px solid #330D0F',
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  marginLeft: '50px',
},
buttonprofit: {
  backgroundColor: '#330D0F',
  color: '#F1EEDA',
  width: '150px',
  height: '50px',
  padding: '10px 20px',
  fontSize: '1rem',
  fontWeight: 'bold',
  fontFamily: 'Poppins, sans-serif',
  borderRadius: '5px',
  cursor: 'pointer',
  border: '2px solid #330D0F',
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  marginLeft: '50px',
},
  title: {
    fontSize: '1.875rem',
    margin: '2rem 0',
    fontFamily: 'Poppins, sans-serif',
  },
  downloadButton: {
    marginBottom: '10px',
    backgroundColor: '#330D0F',
    borderColor: '#330D0F',
    color: '#fff', // Text color
    padding: '0.5rem 1rem',
    fontSize: '0.88rem',
    fontWeight: 'bold',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    border: '2px solid #330D0F',
    fontFamily: 'Poppins, sans-serif',
    transition: 'background-color 0.3s, border-color 0.3s',
  },
  downloadButtonHover: {
    backgroundColor: '#4a1a1b', // Darker shade for hover
    borderColor: '#4a1a1b',
  },
  addIcon: {
    fontSize: '2rem',
    fontFamily: 'Poppins, sans-serif',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  searchInput: {
    width: '300px',
    padding: '0.5rem',
    fontSize: '0.8rem',
    borderRadius: '0.25rem',
    border: '3px solid #330D0F',
    fontFamily: 'Poppins, sans-serif',
  },
  searchButton: {
    marginLeft: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '0.88rem',
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#330D0F',
    border: '2px solid #330D0F',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  table: {
    width: '100%',
    borderSpacing: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
    tableLayout: 'fixed', // Ensures columns are fixed in width
    color: '#330D0F'
  },
  th: {
    borderTop: '3px solid #330D0F',
    borderBottom: '3px solid #330D0F',
    borderLeft: '3px solid #330D0F',
    borderRight: '3px solid #fff',
    backgroundColor: '#4A1416',
    color: '#FFFFFF',
    height: '3rem',
    fontFamily: 'Poppins, sans-serif',
    overflow: 'hidden', // Hide overflow
    whiteSpace: 'nowrap', // Prevent text from wrapping
    textOverflow: 'ellipsis', // Add ellipsis if content is too long
  },
  thLast: {
    borderRight: '3px solid #330D0F',
    fontFamily: 'Poppins, sans-serif',
  },
  td: {
    border: '3px solid #330D0F',
    height: '2.8rem',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    //wordWrap: 'break-word', // Break long words to fit within the cell
    overflow: 'hidden', // Hide overflow
    textOverflow: 'ellipsis', // Add ellipsis if content is too long
    backgroundColor: '#fff',
  },
  operations: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    fontFamily: 'Poppins, sans-serif',
  },
  icon: {
    fontSize: '1.5rem',
    fontFamily: 'Poppins, sans-serif',
  },
};

const totalPriceRowStyle = {
  totalPriceLabel: {
    border: '3px solid #330D0F',
    borderRadius: '0.25rem',
    textAlign: 'right',
    fontWeight: 'bold',
    padding: '0.75rem',
    backgroundColor: '#330D0F',
    fontFamily: 'Poppins, sans-serif',
    color: '#FFFFFF',
  },
  totalPriceValue: {
    border: '3px solid #330D0F',
    borderRadius: '0.25rem',
    textAlign: 'center',
    backgroundColor: '#330D0F',
    padding: '0.75rem',
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif',
    color: '#FFFFFF',
  },
  emptyCell: {
    border: '3px solid #330D0F',
    borderRadius: '0.25rem',
    padding: '0.75rem',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#fff',
  },
};


export default PaymentDashboard;
