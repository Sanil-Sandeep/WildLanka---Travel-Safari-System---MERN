import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/headerfooter/Header';
import Footer from '../../../components/headerfooter/Footer';

const ShowExpense = () => {
  const [expense, setExpense] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/expenses/${id}`)
      .then((response) => {
        setExpense(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    // Implement delete functionality here
    navigate(`/expenses/delete/${expense._id}`);
  };

  const handleEdit = () => {
    navigate(`/expenses/edit/${expense._id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Header/>
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        {/* Assuming you have a back button component */}
        <h1 style={styles.title}>Expense Details</h1>
        <div id="receipt-content" style={styles.receipt}>
          <div style={styles.header}>
            <h2 style={styles.companyName}>Expense</h2>
            <p style={styles.receiptNumber}>Expense ID: {expense._id}</p>
          </div>
          <div style={styles.details}>
             <div style={styles.row}>
                <span style={styles.label}>ID :</span>
                <span style={styles.value}>{expense.eID}</span>
             </div>
             <div style={styles.row}>
                <span style={styles.label}>Name :</span>
                <span style={styles.value}>{expense.name}</span>
             </div>
             <div style={styles.row}>
                <span style={styles.label}>Expense :</span>
                <span style={styles.value}>{expense.expense}</span>
             </div>
             <div style={styles.row}>
                <span style={styles.label}>Amount :</span>
                <span style={styles.value}>{expense.cost}</span>
             </div>
              <div style={styles.row}>
                <span style={styles.label}>Create Time:</span>
                <span style={styles.value}>{new Date(expense.createdAt).toLocaleString()}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Last Update Time:</span>
                <span style={styles.value}>{new Date(expense.updatedAt).toLocaleString()}</span>
              </div>
          </div>
        </div>
        <div style={styles.buttonContainer}>
          <button style={{ ...styles.button, ...styles.deleteButton }} onClick={handleDelete}>Delete</button>
          <button style={{ ...styles.button, ...styles.editButton }} onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: '#fff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    padding: '0 20px',
  },
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    minWidth: '650px',
    backgroundColor: '#fff',
    borderRadius: '10px',
  },
  title: {
    fontSize: '30px',
    margin: '30px 0',
    textAlign: 'center',
    color: '#222',
  },
  receipt: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 9.2)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    borderBottom: '2px solid #ccc',
    paddingBottom: '10px',
  },
  companyName: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#000',
  },
  receiptNumber: {
    fontSize: '20px',
    color: '#333',
  },
  details: {
    paddingTop: '20px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #eee',
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    flex: '1',
    fontSize: '18px',
  },
  value: {
    color: '#666',
    flex: '2',
    textAlign: 'right',
    fontSize: '18px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHead: {
    backgroundColor: '#e6e1e1',
    color: '#330D0F',
  },
  tableHeader: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  },
  totalContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  totalLabel: {
    color: '#444',
  },
  totalValue: {
    color: '#666',
  },
  buttonContainer: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    padding: '10px',
    fontWeight: 'bold',
    fontSize: '16px',
    borderRadius: '40px',
    cursor: 'pointer',
    width: '187px', // Fixed width for consistency
  },
  deleteButton: {
    backgroundColor: '#330D0F',
    color: '#fff',
    border: 'none',
  },
  editButton: {
    backgroundColor: '#fff',
    color: '#330D0F',
    border: '5px solid #330D0F',
  },
};

export default ShowExpense;
