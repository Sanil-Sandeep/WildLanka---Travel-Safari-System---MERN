import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const EditEvent = () => {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantityy, setQuantity] = useState(''); // State for stock
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('select'); // Default category
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // To handle validation errors
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/events/${id}`)
      .then((response) => {
        setEventName(response.data.eventName);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setQuantity(response.data.quantityy); // Get quantity from response
        setCategory(response.data.category);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error loading event', { variant: 'error' });
        console.error(error);
      });
  }, [id, enqueueSnackbar]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!eventName) {
      newErrors.eventName = 'Event name is required';
    }

    if (!description) {
      newErrors.description = 'Description is required';
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!quantityy || isNaN(quantityy) || parseInt(quantityy) < 0) {
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

  const handleEditEvent = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('description', description);
    formData.append('price', parseFloat(price).toFixed(2)); // Ensure price is sent with 2 decimal places
    formData.append('quantityy', parseInt(quantityy)); // Append stock
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    setLoading(true);
    try {
      await axios.put(`http://localhost:5555/events/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      enqueueSnackbar('Event updated successfully!', { variant: 'success' });
      navigate('/events');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error updating event', { variant: 'error' });
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
    <div style={styles.container}>
      <div style={styles.title}>
        <h1>Edit Event</h1>
      </div>
      <div style={styles.formContainer}>
        {loading && <div style={styles.loading}>Loading...</div>}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            style={styles.input}
          />
          {errors.eventName && <span style={styles.errorMessage}>{errors.eventName}</span>}
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
            <option value="campingevents">Camping Events</option>
            <option value="photographyevents">Photography Events</option>
            <option value="culturalevents">Cultural Events</option>
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
          <button onClick={handleEditEvent} style={styles.button}>
            {loading ? 'Updating...' : 'Update Event'}
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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

export default EditEvent;
