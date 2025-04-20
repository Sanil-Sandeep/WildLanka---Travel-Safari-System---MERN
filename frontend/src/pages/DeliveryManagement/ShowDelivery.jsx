import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/spinner';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ShowDelivery = () => {
  const [delivery, setDelivery] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/deliverys/${id}`)
      .then((response) => {
        setDelivery(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    navigate(`/deliverys/delete/${delivery._id}`);
  };

  const handleEdit = () => {
    navigate(`/deliverys/edit/${delivery._id}`);
  };

  return (
    <div>
      <Header />
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.title}>Shipping and Delivery Details</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div id="order-content" style={styles.receipt}>
            <div style={styles.header}>
              <p style={styles.receiptNumber}>Delivery ID: {delivery._id}</p>
            </div>
            <div style={styles.details}>
              <div style={styles.row}>
                <span style={styles.label}>Address:</span>
                <span style={styles.value}>{delivery.Address}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Postal Code:</span>
                <span style={styles.value}>{delivery.PostalCode}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Sender Name:</span>
                <span style={styles.value}>{delivery.SenderName}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Contact Number:</span>
                <span style={styles.value}>{delivery.ContactNumber}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Created At:</span>
                <span style={styles.value}>{new Date(delivery.createdAt).toLocaleString()}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Updated At:</span>
                <span style={styles.value}>{new Date(delivery.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
        <div style={styles.buttonContainer}>
          <button style={{ ...styles.button, ...styles.deleteButton }} onClick={handleDelete}>Delete</button>
          <button style={{ ...styles.button, ...styles.editButton }} onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </div>
    <Footer />
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
    color: 'rgb(53 18 18)',
  },
  receipt: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.9)',
    textcolor: '',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    borderBottom: '2px solid #ccc',
    paddingBottom: '10px',
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
    fontSize: '17px',
  },
  value: {
    color: '#666',
    flex: '2',
    textAlign: 'right',
    fontSize: '18px',
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
    color: '#F1EEDA',
    border: 'none',
  },
  editButton: {
    backgroundColor: '#fff',
    color: '#330D0F',
    border: '5px solid #330D0F',
  },
};

export default ShowDelivery;
