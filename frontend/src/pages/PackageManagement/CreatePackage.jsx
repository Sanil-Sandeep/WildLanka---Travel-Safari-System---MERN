import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const CreatePackage = () => {
  const [packageName, setPackageName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('select'); // Default category
  const [quantityy, setQuantity] = useState(0); // Add stock field
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!packageName) {
      newErrors.packagetName = 'Package name is required';
    }

    if (!description) {
      newErrors.description = 'Description is required';
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (isNaN(quantityy) || quantityy < 0) {
      newErrors.quantityy = 'Valid quantity is required';
    }

    if (image) {
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(image.type)) {
        newErrors.image = 'Only JPEG and PNG images are allowed';
      }
    }

    return newErrors;
  };

  const handleCreatePackage = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append('packageName', packageName);
    formData.append('description', description);
    formData.append('price', parseFloat(price).toFixed(2));
    formData.append('category', category);
    formData.append('quantityy', quantityy); // Include stock in form data
    if (image) formData.append('image', image);

    setLoading(true);
    try {
      await axios.post('http://localhost:5555/packages', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      enqueueSnackbar('Package created successfully!', { variant: 'success' });
      navigate('/packages');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error creating product', { variant: 'error' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      <div style={styles.title}>
        <h1>Create Package</h1>
      </div>
      <div style={styles.formContainer}>
        {loading && <div style={styles.loading}>Loading...</div>}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Package Name</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            style={styles.input}
          />
          {errors.packageName && <span style={styles.errorMessage}>{errors.packageName}</span>}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
          {errors.description && <span style={styles.errorMessage}>{errors.description}</span>}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Price (LKR)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
          />
          {errors.price && <span style={styles.errorMessage}>{errors.price}</span>}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Quantity</label>
          <input
            type="number"
            value={quantityy}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.input}
          />
          {errors.quantityy && <span style={styles.errorMessage}>{errors.quantityy}</span>}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
          >
            <option value="select">Select</option>
            <option value="standard">Standard</option>
            <option value="deluxe ">Deluxe </option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={styles.input}
          />
          {errors.image && <span style={styles.errorMessage}>{errors.image}</span>}
        </div>
        <div style={styles.buttonContainer}>
          <button onClick={handleCreatePackage} style={styles.button}>
            {loading ? 'Creating...' : 'Create Package'}
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
    padding: '2rem',
    fontFamily: `'Poppins', sans-serif`,
    backgroundColor: '#F8F9FA', // Light gray background for a clean look
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    margin: '0 0 1.5rem',
    textAlign: 'center',
    color: '#330D0F',
    fontWeight: '700',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    padding: '2rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  inputGroup: {
    margin: '1rem 0',
  },
  label: {
    display: 'block',
    fontSize: '1rem',
    marginBottom: '0.5rem',
    color: '#330D0F',
    fontWeight: '600',
  },
  input: {
    border: '1px solid #E1E1E1',
    padding: '0.75rem',
    width: '100%',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  select: {
    border: '1px solid #E1E1E1',
    padding: '0.75rem',
    width: '100%',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  textarea: {
    border: '1px solid #E1E1E1',
    padding: '0.75rem',
    width: '100%',
    borderRadius: '4px',
    fontSize: '1rem',
    minHeight: '150px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center', // Centers the button horizontally
    marginTop: '1.5rem', // Adds some space above the button
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#330D0F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    width: '100%', // Make the button span the full width of the form
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  errorMessage: {
    marginTop: '0.5rem',
    color: 'red',
    fontSize: '0.875rem',
  },
  loading: {
    textAlign: 'center',
    padding: '1rem',
  },
};

export default CreatePackage;
