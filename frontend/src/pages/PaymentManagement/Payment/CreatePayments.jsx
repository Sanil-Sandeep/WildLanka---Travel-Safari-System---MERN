import React, { useState, useEffect } from 'react';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import visaImg from '../../../components/images/visa.png';
import masterImg from '../../../components/images/master.png';
import { useSnackbar } from 'notistack';
import Header from '../../../components/headerfooter/Header'
import Footer from '../../../components/headerfooter/Footer'

function CreatePayments() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [email, setEmail] = useState('');
  const [cardType, setCardType] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  useEffect(() => {
    if (cartItems.length > 0) {
      // Concatenate all product names, prices, and quantities from the cart
      const productNames = cartItems.map(item => item.productName).join('\n');
      const prices = cartItems.map(item => item.price).join('\n');
      const quantities = cartItems.map(item => item.quantity).join('\n');

      setProductName(productNames);
      setPrice(prices);
      setQuantity(quantities);

      // Calculate total price for all items
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
      //const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      setTotalPrice(total);
    }
  }, [cartItems]);

  const validateForm = () => {
    const newErrors = {};

    if (!productName) {
      newErrors.productName = 'Product name is required.';
    }

    if (!price) {
      newErrors.price = 'Price is required.';
    }

    if (!quantity) {
      newErrors.quantity = 'Quantity is required.';
    }

    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!email.endsWith('@gmail.com')) {
      newErrors.email = 'Email must end with @gmail.com.';
    }

    if (!cardType) {
      newErrors.cardType = 'Please select a card type.';
    }

    if (!cardHolderName) {
      newErrors.cardHolderName = 'Card holder name is required.';
    } else if (!/\s/.test(cardHolderName)) {
      newErrors.cardHolderName = 'Card holder name must be more than one word.';
    } else if (/\d/.test(cardHolderName)) {
      newErrors.cardHolderName = 'Card holder name must not contain numbers.';
    }

    if (!cardNumber) {
      newErrors.cardNumber = 'Card number is required.';
    } else if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits.';
    } else if (
      (cardType === 'visa' && !/^4/.test(cardNumber)) ||
      (cardType === 'master' && !/^(51|52|53|54|55)/.test(cardNumber))
    ) {
      newErrors.cardNumber = `Card number must start with ${cardType === 'visa' ? '4' : '51-55'}.`;
    }

    if (!cvv) {
      newErrors.cvv = 'CVV is required.';
    } else if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'CVV must be 3 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSavePayment = () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      productName: productName.split('\n'), // Split the concatenated product names into an array
      price: price.split('\n').map(Number), // Split and convert prices to numbers
      quantity: quantity.split('\n').map(Number), // Split and convert quantities to numbers
      totalPrice,
      cardHolderName,
      cardNumber,
      cvv,
      email,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/payments', data)
      .then((response) => {
        setLoading(false);
        enqueueSnackbar('Payment created successfully', { variant: 'success' });

        // Redirect to the ShowPayment page with the newly created payment's ID
        const newPaymentId = response.data._id; // Assuming the backend returns the new payment's ID
        navigate(`/payments/details/${newPaymentId}`);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    // Ensure only numbers are typed
    if (/^\d*$/.test(value)) {
      setCardNumber(value);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    // Ensure only numbers are typed
    if (/^\d*$/.test(value)) {
      setCvv(value);
    }
  };

  const handleCardHolderNameChange = (e) => {
    const value = e.target.value;
    // Ensure only letters and spaces are typed
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setCardHolderName(value);
    }
  };

  return (
    <div>
      <Header/>
    <div style={styles.container}>
      
      <h1 style={styles.title}>Add your payment details</h1>
      {loading && <Spinner />}
      <div style={styles.formContainer}>
    <div style={styles.inputRow}>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Product Name :</label>
        <textarea
          id="productNameInput"
          value={productName}
          readOnly
          onChange={(e) => setProductName(e.target.value)}
          style={{ ...styles.textarea, width: '300px' }} 
          rows="10"
        />
        {errors.productName && <div style={styles.error}>{errors.productName}</div>}
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Price (LKR):</label>
        <textarea
          id="priceInput"
          value={price}
          readOnly
          onChange={(e) => setPrice(e.target.value)}
          style={{ ...styles.textarea, width: '150px' }}
          rows="10"
        />
        {errors.price && <div style={styles.error}>{errors.price}</div>}
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Quantity :</label>
        <textarea
          id="quantityInput"
          value={quantity}
          readOnly
          onChange={(e) => setQuantity(e.target.value)}
          style={{ ...styles.textarea, width: '100px' }}
          rows="10"
        />
        {errors.quantity && <div style={styles.error}>{errors.quantity}</div>}
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Total Price (LKR):</label>
        <textarea
          id="totalPriceInput"
          value={totalPrice}
          readOnly
          style={{ ...styles.textarea, width: '150px' }}
          rows="10"
        />
      </div>
    </div>

        <hr style={styles.hr} />

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email :</label>
          <input 
            type='email'
            value={email}
            onChange={(e) => {setEmail(e.target.value); validateForm();}}
            style={styles.input}
          />
          {errors.email && <div style={styles.error}>{errors.email}</div>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Card Type :</label>
          <div style={styles.cardTypeContainer}>
            <label style={styles.cardTypeLabel}>
              <input
                type='radio'
                value='visa'
                checked={cardType === 'visa'}
                onChange={(e) => {setCardType(e.target.value);  validateForm();}}
                style={styles.radio}
              />
              <img src={visaImg} alt='Visa' style={styles.cardImage} />
            </label>
            <label style={styles.cardTypeLabel}>
              <input
                type='radio'
                value='master'
                checked={cardType === 'master'}
                onChange={(e) => {setCardType(e.target.value);  validateForm();}}
                style={styles.radio}
              />
              <img src={masterImg} alt='MasterCard' style={styles.cardImage} />
            </label>
          </div>
          {errors.cardType && <div style={styles.error}>{errors.cardType}</div>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Card Holder Name :</label>
          <input
            type='text'
            value={cardHolderName}
            onChange={handleCardHolderNameChange}
            style={styles.input}
          />
          {errors.cardHolderName && <div style={styles.error}>{errors.cardHolderName}</div>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Card Number :</label>
          <input
            type='text'
            value={cardNumber}
            onChange={handleCardNumberChange}
            style={styles.input}
          />
          {errors.cardNumber && <div style={styles.error}>{errors.cardNumber}</div>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>CVV :</label>
          <input
            type='text'
            value={cvv}
            onChange={handleCvvChange}
            style={styles.input}
          />
          {errors.cvv && <div style={styles.error}>{errors.cvv}</div>}
        </div>

        <button style={styles.button} onClick={handleSavePayment}>
          Pay Now
        </button>
        {errors.form && <div style={styles.error}>{errors.form}</div>}
      </div>
    </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    margin: '0 0 2rem 0',
    color: '#330D0F',
    textAlign: 'center', // Center the title
  },
  formContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 9.2)',
  },
  label: {
    display: 'block',
    fontSize: '1.1rem',
    marginBottom: '.5rem',
    color: '#330D0F',
   fontWeight:'bold',
  },
  input: {
    width: '70%',
    padding: '.75rem',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '3px solid #330D0F',
    boxSizing: 'border-box',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem', // Adds space between the inputs
  },
  inputGroup: {
    marginBottom: '1rem',
    flex: 1, // Allows inputs to take equal space
  },
  textarea: {
    width: '100%',
    padding: '.75rem',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '3px solid #330D0F',
    boxSizing: 'border-box',
  },
  error: {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '.5rem',
  },
  button: {
    backgroundColor: '#228B22',
    color: '#F1EEDA',
    padding: '.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  cardTypeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  cardTypeLabel: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1rem',
  },
  cardImage: {
    width: '60px',
    height: 'auto',
    marginLeft: '0.5rem',
  },
  radio: {
    marginRight: '0.5rem',
  },
  hr: {
    border: '1px solid #ddd',
    margin: '20px 0',
  },
};


export default CreatePayments;
