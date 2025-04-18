import React, { useState } from 'react';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const DeleteDelivery = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteDelivery = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/deliverys/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('delivery is deleted successfully', { variant: 'success' });
        navigate('/products/card'); // Redirect to homepage or desired page
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting delivery', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      {loading ? <Spinner /> : null}
      <div style={styles.form}>
        <h3 style={styles.heading}>Are You Sure You Want to Delete This ?</h3>
        <button
          style={styles.buttonDelete}
          onClick={handleDeleteDelivery}
        >
          Yes, Delete it
        </button>
        <button
          style={styles.buttonCancel}
          onClick={() => {
            navigate('/deliverys'); // Redirect to homepage or desired page
          }}
        >
          No
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#fff',
    minHeight: '100vh',
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
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

export default DeleteDelivery;
