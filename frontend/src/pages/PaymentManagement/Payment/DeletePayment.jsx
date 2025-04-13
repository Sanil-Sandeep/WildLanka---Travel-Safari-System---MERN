import React, { useState } from 'react';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../../components/headerfooter/Header';
import Footer from '../../../components/headerfooter/Footer';

const DeletePayment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeletePayment = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/payments/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Payment deleted successfully', { variant: 'success' });
        navigate('/products/card');
      })
      .catch((error) => {
        setLoading(false);
      //alert('An error happened. Please check console');
        enqueueSnackbar('Error', {variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      {loading ? <Spinner /> : null}
      <div style={styles.form}>
        <h3 style={styles.heading}>Are You Sure You Want to Delete Your Payment Details?</h3>

        <button
          style={styles.buttonDelete}
          onClick={handleDeletePayment}
        >
          Yes, Delete it
        </button>
        <button
          style={styles.buttonCancel}
          onClick={() => {
            navigate('/products/card'); // Redirect to homepage or desired page
          }}
        >
          No
        </button>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#fff',
    minHeight: '70vh',
    fontFamily: 'Poppins, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px',
    width: '600px',
    padding: '32px',
    margin: 'auto',
    marginTop: '86px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 9.2)',
    fontFamily: 'Poppins, sans-serif',
  },
  heading: {
    fontSize: '24px',
    margin: '16px 0',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    color: '#330D0F',
  },
  buttonDelete: {
    padding: '16px',
    backgroundColor: '#330D0F',
    color: '#ffffff',
    margin: '16px',
    width: '100%',
    border: 'none',
    borderRadius: '48px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
  },
  buttonCancel: {
    padding: '16px',
    backgroundColor: '#fff',
    color: '#330D0F',
    margin: '16px',
    width: '100%',
    border: '2px solid #330D0F',
    borderRadius: '48px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
  },
};

export default DeletePayment;
