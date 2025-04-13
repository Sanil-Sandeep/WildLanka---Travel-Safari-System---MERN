import React, { useState } from 'react';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const DeletePackages = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeletePackage = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/packages/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Package Deleted Successfully!', { variant: 'success' });
        navigate('/packages');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting package', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      {loading && <Spinner />}
      <div style={styles.form}>
        <h3 style={styles.heading}>Are you sure you want to delete this Product?</h3>
        <div style={styles.buttonGroup}>
          <button 
            style={styles.buttonDelete}
            onClick={handleDeletePackage}
          >
            Yes, Delete It
          </button>
          <button 
            style={styles.buttonCancel}
            onClick={() => navigate('/packages')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#F8F9FA', /* Light gray background for a clean look */
    minHeight: '100vh',
    fontFamily: `'Poppins', sans-serif`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '16px',
    width: '90%',
    maxWidth: '500px', /* Smaller maxWidth for a more compact look */
    padding: '24px',
    margin: 'auto',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.25rem', /* Slightly smaller for better readability */
    fontWeight: '600',
    marginBottom: '24px',
    color: '#333333', /* Darker color for better contrast */
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px', /* Spacing between buttons */
    width: '100%',
  },
  buttonDelete: {
    padding: '12px 24px',
    backgroundColor: '#C82333', /* Red color for delete action */
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  buttonDeleteHover: {
    backgroundColor: '#A71D2A',
  },
  buttonCancel: {
    padding: '12px 24px',
    backgroundColor: '#E9ECEF', /* Light gray for cancel action */
    color: '#495057',
    border: '2px solid #CED4DA',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  buttonCancelHover: {
    backgroundColor: '#DEE2E6',
    borderColor: '#BDC3C7',
  }
};

export default DeletePackages;
