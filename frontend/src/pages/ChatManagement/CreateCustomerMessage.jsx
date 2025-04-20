import React, { useState } from 'react';
//import BackButton from '../components/BackButton';
import Spinner from '../../components/spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import backgroundImage from '../../components/images/BlurBackGround.png'; // Adjust this path as needed
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const CreateCustomerMessage = () => {
  const [cMessage, setcMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveMessage = () => {
    const data = {
      cMessage,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/cchats', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Message sent successfully', { variant: 'success' });
        navigate('/cchats');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div>
    <Header />
    <div style={styles.container}>
      <div style={styles.background} />
      {loading ? <Spinner /> : null}
      <div style={styles.form}>
        <div style={styles.messageContainer}>
          <label style={styles.label} htmlFor="message"></label>
          <textarea
            id="message"
            value={cMessage}
            onChange={(e) => setcMessage(e.target.value)}
            style={styles.textarea}
            rows="1"
          />
          <button style={styles.button} onClick={handleSaveMessage}>
            Send
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
    position: 'relative',
    padding: '0.75rem',
    minHeight: '100vh',
    fontFamily: 'Poppins, sans-serif',
    overflow: 'hidden', // Ensure no overflow for the blurred background
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(12px)', // Increased blur effect
    zIndex: -2, // Set behind other elements
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0.75rem',
    width: '750px',
    padding: '0.75rem',
    margin: 'auto',
    marginTop: '35rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for the form
    boxShadow: '0 4px 8px rgba(0.9, 0.9, 2, 0.9)',
    fontFamily: 'Poppins, sans-serif',
    zIndex: 1, // Set above the blurred background
    opacity: 0, // Initial opacity for animation
    transform: 'translateY(20px)', // Initial position for animation
    animation: 'fadeInUp 0.7s forwards', // Animation to apply
  },
  label: {
    fontSize: '0.9375rem',
    marginBottom: '0.5rem',
    color: '#330D0F',
    display: 'block',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textarea: {
    border: '2.5px solid #E1E1E1',
    borderRadius: '0.75rem',
    padding: '0.375rem 0.75rem',
    width: '70%', // Adjusted width to leave space for the button
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    resize: 'none', // Prevents the textarea from being resizable
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent textarea background
    transition: 'border-color 0.3s, transform 0.3s', // Transition for focus effect
  },
  button: {
    padding: '0.375rem 1rem',
    backgroundColor: '#330D0F',
    color: '#F1EEDA',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '1.5rem',
    fontWeight: 'bold',
    fontSize: '0.9375rem',
    fontFamily: 'Poppins, sans-serif',
    transition: 'transform 0.3s, background-color 0.3s', 
  },
};

// Keyframe animations
const keyframes = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  textarea:focus {
    border-color: #330D0F; // Change border color on focus
    transform: scale(1.02); // Slightly scale up on focus
  }

  button:hover {
    transform: scale(1.05); // Scale up on hover
    background-color: #4A1F22; // Darker shade on hover
  }
`;

// Injecting keyframes into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);

export default CreateCustomerMessage;
