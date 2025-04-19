import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../../components/spinner';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Header from '../../../components/headerfooter/Header';
import Footer from '../../../components/headerfooter/Footer';
import logo from '../../../images/logo.png';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const NetProfit = () => {
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/payments')
      .then((response) => {
        setPayments(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/expenses')
      .then((response) => {
        setExpenses(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Set up document title and header
    doc.setFontSize(24);
    doc.setFont('Poppins', 'bold');
    doc.text('WildLanka', 14, 22);

    // Add the logo image
    const logoWidth = 45; // Adjust width as needed
    const logoHeight = 30; // Adjust height as needed
    doc.addImage(logo, 'PNG', 160, 10, logoWidth, logoHeight); // Add logo to the right side

    doc.setFontSize(18);
    doc.text('Income Status Statement', 14, 32);

    // Add report date
    const reportDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.setFont('Poppins', 'normal');
    doc.text(`Date: ${reportDate}`, 14, 42);

    // Draw a line under the header
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.line(10, 45, 205, 45);

    // Define the table for payments
    const paymentColumns = ["Payment ID", "Customer Name", "Total Price"];
    const paymentRows = payments.map(payment => [
      payment._id,
      payment.cardHolderName,
      `Rs ${payment.totalPrice.toFixed(2)}`,
    ]);

    // Add payments table
    doc.autoTable(paymentColumns, paymentRows, {
      startY: 50,
      theme: 'grid',
      headStyles: {
        fillColor: '#330D0F',
        textColor: '#FFFFFF',
        font: 'Poppins',
        fontSize: 10,
        halign: 'center',
      },
      bodyStyles: {
        font: 'Poppins',
        fontSize: 10,
        valign: 'top',
        overflow: 'linebreak',
        cellPadding: 2,
        cellWidth: 'wrap',
      },
      margin: { left: 10, right: 14 },
      columnStyles: {
        0: { cellWidth: 60, halign: 'left' },
        1: { cellWidth: 70, halign: 'left' },
        2: { cellWidth: 60, halign: 'right' },
      },
    });

    // Add total income after payments table
    doc.text(`Total Income: Rs ${totalIncome.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);

    // Define the table for expenses
    const expenseColumns = ["Expense ID", "Name", "Cost"];
    const expenseRows = expenses.map(expense => [
      expense._id,
      expense.name,
      `Rs ${expense.cost.toFixed(2)}`,
    ]);

    // Add expenses table
    doc.autoTable(expenseColumns, expenseRows, {
      startY: doc.autoTable.previous.finalY + 20,
      theme: 'grid',
      headStyles: {
        fillColor: '#330D0F',
        textColor: '#FFFFFF',
        font: 'Poppins',
        fontSize: 10,
        halign: 'center',
      },
      bodyStyles: {
        font: 'Poppins',
        fontSize: 10,
        valign: 'top',
        overflow: 'linebreak',
        cellPadding: 2,
        cellWidth: 'wrap',
      },
      margin: { left: 10, right: 14 },
      columnStyles: {
        0: { cellWidth: 60, halign: 'left' },
        1: { cellWidth: 70, halign: 'left' },
        2: { cellWidth: 60, halign: 'left' },
      },
    });

    // Add total expenses after expenses table
    doc.text(`Total Expenses: Rs ${totalExpenses.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);

    // Calculate net profit
    const netProfit = totalIncome - totalExpenses;

    // Define net income table
    const netIncomeColumns = ["Description", "Amount", "Amount"];
    const netIncomeRows = [];

    // Total Income Row
    netIncomeRows.push(["Total Income", "", `Rs ${totalIncome.toFixed(2)}`]);

    // Expenses Rows
    expenses.forEach(expense => {
      netIncomeRows.push([expense.name, `Rs ${expense.cost.toFixed(2)}`, ""]);
    });

    // Total Expenses Row
    netIncomeRows.push(["Total Expenses", "", `Rs ${totalExpenses.toFixed(2)}`]);

    // Net Profit Row
    netIncomeRows.push(["Net Profit", "", `Rs ${netProfit.toFixed(2)}`]);

    // Add the Net Income Table to the PDF
    doc.autoTable(netIncomeColumns, netIncomeRows, {
      startY: doc.autoTable.previous.finalY + 20,
      theme: 'grid',
      headStyles: {
        fillColor: '#330D0F',
        textColor: '#FFFFFF',
        font: 'Poppins',
        fontSize: 10,
        halign: 'center',
      },
      bodyStyles: {
        font: 'Poppins',
        fontSize: 10,
        valign: 'top',
        overflow: 'linebreak',
        cellPadding: 2,
        cellWidth: 'wrap',
      },
      margin: { left: 10, right: 14 },
      columnStyles: {
        0: { cellWidth: 90, halign: 'left' },
        1: { cellWidth: 50, halign: 'right' },
        2: { cellWidth: 50, halign: 'right' },
      },
      didDrawPage: function (data) {
        doc.setFontSize(10);
        doc.text('Generated by WildLanka', 14, doc.internal.pageSize.height - 10);
      },
    });

    doc.text(`Total Net Profit: Rs ${netProfit.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);

    // Save the PDF
    doc.save('income-status-statement.pdf');
  };


  const totalIncome = payments.reduce((total, payment) => total + payment.totalPrice, 0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.cost, 0);
  const netProfit = totalIncome - totalExpenses;



  const createChart = (chartType = 'bar') => {
    const ctx = document.getElementById('incomeExpenseChart').getContext('2d');
    if (chartInstance) {
      chartInstance.destroy();
    }
    const newChartInstance = new Chart(ctx, {
      type: chartType,
      data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
          label: 'Amount (Rs)',
          data: [totalIncome, totalExpenses],
          backgroundColor: ['#4CAF50', '#FF6347'],
          barThickness: 150, // You can adjust this value to change the width of the bars
        }],
      },
      options: {
        maintainAspectRatio: false,           //can remove
        scales: { 
          y: { 
            beginAtZero: true,
            grid: {
              lineWidth: 3, // Set the thickness of the y-axis grid lines
            },
            ticks: {
              color: '#000', // Change tick color if needed
              font: {
                size: 12, // Adjust tick font size
              }
            }
          },
          x: {
            grid: {
              lineWidth: 3, // Set the thickness of the x-axis grid lines
            },
            ticks: {
              color: '#000', // Change tick color if needed
              font: {
                size: 12, // Adjust tick font size
              }
            }
          },
        },
        plugins: { legend: { display: true } },
      },
    });
    setChartInstance(newChartInstance);
  };


  useEffect(() => {
    if (!loading && payments.length > 0 && expenses.length > 0) {
      createChart();
    }
  }, [loading, payments, expenses]);



  return (
    <div>
      <Header />
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
            <h1 style={styles.title}>Net Profit Management</h1>
            <button
              className="btn btn-primary"
              onClick={generatePDF}
              style={{ ...styles.downloadButton, ...styles.downloadButtonHover }}
            >
              Net Profit Report
            </button>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <>



              <div style={{ marginBottom: '100px' }}>
                <canvas id="incomeExpenseChart" width="400" height="400"></canvas>
              </div>
              <div style={{ marginBottom: '50px' }}></div>
              <div style={styles.summary}>
                <h3>Summary</h3>
                <p>Total Income: Rs {totalIncome}</p>
                <p>Total Expenses: Rs {totalExpenses}</p>
                <p>Net Profit: Rs {netProfit}</p>
              </div>
              <div style={{ marginBottom: '150px' }}></div>



              {/* <div style={styles.tablesContainer}>
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Payment ID</th>
                        <th style={styles.th}>Customer</th>
                        <th style={styles.th}>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment._id}>
                          <td style={styles.td}>{payment._id}</td>
                          <td style={styles.td}>{payment.cardHolderName}</td>
                          <td style={styles.td}>Rs {payment.totalPrice}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="2" style={totalPriceRowStyle.totalPriceLabel}>
                          Total Sales Income :
                        </td>
                        <td style={totalPriceRowStyle.totalPriceValue}>
                          Rs {totalIncome}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Expense ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Expense</th>
                        <th style={styles.th}>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map((expense) => (
                        <tr key={expense._id}>
                          <td style={styles.td}>{expense._id}</td>
                          <td style={styles.td}>{expense.name}</td>
                          <td style={styles.td}>Rs {expense.expense}</td>
                          <td style={styles.td}>Rs {expense.cost}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="3" style={totalPriceRowStyle.totalPriceLabel}>
                          Total Expenses :
                        </td>
                        <td style={totalPriceRowStyle.totalPriceValue}>
                          Rs {totalExpenses}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}




              <div style={styles.tablesContainer}>
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Income Date</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Customer</th>
                        <th style={styles.th}>Amount</th>
                        <th style={styles.th}>Expense Date</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Loop through the maximum length of payments or expenses */}
                      {Array.from({ length: Math.max(payments.length, expenses.length) }).map((_, index) => (
                        <tr key={index}>
                          {/* Income details */}
                          {payments[index] ? (
                            <>
                              <td style={styles.td}>{new Date(payments[index].createdAt).toLocaleDateString()}</td>
                              <td style={styles.td}>Buy Products</td>
                              <td style={styles.td}>{payments[index].cardHolderName}</td>
                              <td style={styles.td}>Rs {payments[index].totalPrice.toFixed(2)}</td>
                            </>
                          ) : (
                            <>
                              <td style={styles.td}></td>
                              <td style={styles.td}></td>
                              <td style={styles.td}></td>
                              <td style={styles.td}></td>
                            </>
                          )}

                          {/* Expense details */}
                          {expenses[index] ? (
                            <>
                              <td style={styles.td}>{new Date(expenses[index].createdAt).toLocaleDateString()}</td>
                              <td style={styles.td}>{expenses[index].expense}</td>
                              <td style={styles.td}>{expenses[index].name}</td>
                              <td style={styles.td}>Rs {expenses[index].cost.toFixed(2)}</td>
                            </>
                          ) : (
                            <>
                              <td style={styles.td}></td>
                              <td style={styles.td}></td>
                              <td style={styles.td}></td>
                              <td style={styles.td}></td>
                            </>
                          )}
                        </tr>
                      ))}
                      {/* Total Row for Income and Expenses */}
                      <tr>
                        <td colSpan="3" style={totalPriceRowStyle.totalPriceLabel}>
                          Total Sales Income:
                        </td>
                        <td style={totalPriceRowStyle.totalPriceValue}>
                          Rs {totalIncome.toFixed(2)}
                        </td>
                        <td colSpan="3" style={totalPriceRowStyle.totalPriceLabel}>
                          Total Expenses:
                        </td>
                        <td style={totalPriceRowStyle.totalPriceValue}>
                          Rs {totalExpenses.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>




              <div style={{ marginBottom: '150px' }}></div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Description</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.td}>Total Income</td>
                    <td style={styles.td}></td>
                    <td style={styles.td}>Rs {totalIncome.toFixed(2)}</td>
                  </tr>
                  {expenses.map((expense) => (
                    <tr key={expense._id}>
                      <td style={styles.td}>{expense.expense}</td>
                      <td style={styles.td}>Rs {expense.cost}</td>
                      <td style={styles.td}></td>
                    </tr>
                  ))}
                  <tr>
                    <td style={styles.td}>Total Expenses</td>
                    <td style={styles.td}></td>
                    <td style={styles.td}>Rs {totalExpenses.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Net Profit</td>
                    <td style={styles.td}></td>
                    <td style={styles.td}>Rs {netProfit.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <h2 style={styles.profitTitle}>Net Profit: Rs {netProfit.toFixed(2)}</h2>
              <div style={{ marginBottom: '150px' }}></div>
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
  },
  profitTitle: {
    fontSize: '1.5rem',
    margin: '1.5rem 0',
    color: '#330D0F',
  },
  backButton: {
    backgroundColor: '#330D0F',
    color: '#F1EEDA',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  tablesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px', // Space between tables
    marginBottom: '2rem', // Space below the tables
  },
  tableWrapper: {
    flex: 1, // Make tables take equal space
    minWidth: '300px', // Optional: set a minimum width for better responsiveness
  },
  table: {
    width: '100%',
    borderSpacing: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
    tableLayout: 'fixed',
    color: '#330D0F',
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
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  td: {
    border: '3px solid #330D0F',
    height: '2.8rem',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    backgroundColor: '#fff',
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
  summary: {
    marginBottom: '20px',
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
};

export default NetProfit;
