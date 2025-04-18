import React, { useState } from 'react';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const CreateDelivery = () => {
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [senderName, setSenderName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loading, setLoading] = useState(false);

  // Error states for validation
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Validate address
    if (!address) {
      newErrors.address = 'Address is required.';
    }

    // Validate postal code (must be exactly 5 digits)
    if (!postalCode) {
      newErrors.postalCode = 'Postal Code is required.';
    } else if (!/^\d{5}$/.test(postalCode)) {
      newErrors.postalCode = 'Postal Code must have exactly 5 digits.';
    }

    // Validate sender name (must be more than one word)
    const nameWords = senderName.trim().split(' ');
    if (!senderName) {
      newErrors.senderName = 'Sender Name is required.';
    } else if (nameWords.length < 2) {
      newErrors.senderName = 'Sender Name must contain at least two names.';
    }

     // Validate contact number (must start with 0 and be exactly 10 digits)
  if (!contactNumber) {
    newErrors.contactNumber = 'Contact Number is required.';
  } else if (!/^0\d{9}$/.test(contactNumber)) {
    newErrors.contactNumber = 'Contact Number must start with 0 and be exactly 10 digits.';
  }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDelivery = () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      Address: address,
      PostalCode: postalCode,
      SenderName: senderName,
      ContactNumber: contactNumber.toString(),
    };

    setLoading(true);

    axios
      .post('http://localhost:5555/deliverys', data)
      .then((response) => {
        setLoading(false);

        // Redirect to the ShowDelivery page with the newly created delivery's ID
        const newDeliveryId = response.data._id; // Assuming the backend returns the new delivery's ID
        navigate(`/deliverys/details/${newDeliveryId}`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // Real-time validation for numeric inputs only
  const handleNumericInput = (e, setState) => {
    const value = e.target.value;
    // Update the state only if the value is numeric or empty, and maintain leading zeroes as strings
    if (/^\d*$/.test(value)) {
      setState(value);
    }
  };

  // Real-time validation for sender name to allow only letters and spaces
  const handleNameInput = (e) => {
    const value = e.target.value;
    // Update senderName only if the value contains only letters and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setSenderName(value);
    }
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      <h1 style={styles.title}>Add Shipping and Delivery Details</h1>
      {loading && <Spinner />}
      <div style={styles.formContainer}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.input}
          />
          {errors.address && <p style={styles.error}>{errors.address}</p>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Postal Code</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => handleNumericInput(e, setPostalCode)}
            maxLength="5" // Optional: Limit the input length to 5
            style={styles.input}
          />
          {errors.postalCode && <p style={styles.error}>{errors.postalCode}</p>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Sender Name</label>
          <input
            type="text"
            value={senderName}
            onChange={handleNameInput} // Using the new handler for sender name
            style={styles.input}
          />
          {errors.senderName && <p style={styles.error}>{errors.senderName}</p>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => handleNumericInput(e, setContactNumber)} // Using handleNumericInput for numeric-only validation
            maxLength="10" // Optional: Limit the input length to 10
            style={styles.input}
          />
          {errors.contactNumber && <p style={styles.error}>{errors.contactNumber}</p>}
        </div>

        <button style={styles.button} onClick={handleSaveDelivery}>
          Save
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    margin: '0 0 1.5rem',
    textAlign: 'center',
    color: '#330D0F',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: '2.5px solid #E1E1E1',
    borderRadius: '0.75rem',
    backgroundColor: '#FFFFFF',
    padding: '2rem',
    boxShadow: '0 3.75px 6px rgba(0, 2, 0, 0.9)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  inputGroup: {
    margin: '1rem 0',
  },
  label: {
    display: 'block',
    fontSize: '0.9375rem',
    marginBottom: '0.5rem',
    color: '#330D0F',
    fontWeight: 'bold',
  },
  input: {
    border: '2.5px solid #E1E1E1',
    padding: '0.75rem',
    width: '100%',
    borderRadius: '0.75rem',
    fontSize: '1rem',
  },
  error: {
    marginTop: '0.5rem',
    color: 'red',
    fontSize: '0.9rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#330D0F',
    width: '100%',
    height: '53px',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '2rem',
    transition: 'background-color 0.3s ease',
  },
};

export default CreateDelivery;
