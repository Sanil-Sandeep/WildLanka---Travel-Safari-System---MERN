import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../components/spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const EditDelivery = () => {
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [senderName, setSenderName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/deliverys/${id}`)
      .then((response) => {
        setAddress(response.data.Address);
        setPostalCode(response.data.PostalCode);
        setSenderName(response.data.SenderName);
        setContactNumber(response.data.ContactNumber);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
      });
  }, [id, enqueueSnackbar]);

  const validateForm = () => {
    const newErrors = {};

    // Validate address
    if (!address) {
      newErrors.address = 'Address is required.';
    }

    // Validate postal code (must be exactly 5 digits)
    if (!postalCode) {
      newErrors.postalCode = 'Postal Code is required.';
    } else if (!/^\d{5}$/.test(postalCode)) { // Postal code must have exactly 5 digits
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

  const handleEditDelivery = () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      Address: address,
      PostalCode: postalCode,
      SenderName: senderName,
      ContactNumber: contactNumber,
    };

    setLoading(true);
    axios.put(`http://localhost:5555/deliverys/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Delivery details updated successfully', { variant: 'success' });
        navigate(`/deliverys/details/${id}`);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating delivery. Please check the console.', { variant: 'error' });
        console.error(error);
      });
  };

  // Real-time validation for numeric inputs only (for Postal Code and Contact Number)
  const handleNumericInput = (e, setState) => {
    const value = e.target.value;
    // Update the state only if the value is numeric or empty
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
    <div className='p-4' style={{ backgroundColor: '#fff' }}> {/* Updated background color */}
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-[#330D0F] my-6'>Edit Shipping and Delivery Details</h1>
        <p className='text-lg text-[#330D0F] mb-8'>Update the details below to ensure accurate delivery of your shipments.</p>
      </div>
      {loading && <Spinner />}
      <div 
        className='border-2 border-[#E1E1E1] rounded-lg bg-white p-6 shadow-md mx-auto'
        style={{ maxWidth: '400px' }} // Set the maxWidth directly here
      >
        <div className='mb-4'>
          <label className='block text-lg font-semibold text-[#330D0F] mb-2'>Address:</label>
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='border-2 border-[#E1E1E1] p-2 rounded-lg w-full'
          />
          {errors.address && <div className='text-red-500 text-sm mt-1'>{errors.address}</div>}
        </div>

        <div className='mb-4'>
          <label className='block text-lg font-semibold text-[#330D0F] mb-2'>Postal Code:</label>
          <input
            type='text'
            value={postalCode}
            onChange={(e) => handleNumericInput(e, setPostalCode)}
            maxLength="5"
            className='border-2 border-[#E1E1E1] p-2 rounded-lg w-full'
          />
          {errors.postalCode && <div className='text-red-500 text-sm mt-1'>{errors.postalCode}</div>}
        </div>

        <div className='mb-4'>
          <label className='block text-lg font-semibold text-[#330D0F] mb-2'>Sender Name:</label>
          <input
            type='text'
            value={senderName}
            onChange={handleNameInput} // Using the new handler for sender name
            className='border-2 border-[#E1E1E1] p-2 rounded-lg w-full'
          />
          {errors.senderName && <div className='text-red-500 text-sm mt-1'>{errors.senderName}</div>}
        </div>

        <div className='mb-4'>
          <label className='block text-lg font-semibold text-[#330D0F] mb-2'>Contact Number:</label>
          <input
            type='text'
            value={contactNumber}
            onChange={(e) => handleNumericInput(e, setContactNumber)}
            maxLength="10"
            className='border-2 border-[#E1E1E1] p-2 rounded-lg w-full'
          />
          {errors.contactNumber && <div className='text-red-500 text-sm mt-1'>{errors.contactNumber}</div>}
        </div>

        <br />

        <button
          onClick={handleEditDelivery}
          className='bg-[#330D0F] text-white py-2 px-4 rounded-lg w-full hover:bg-[#218838] transition-colors'
        >
          Update Delivery Details
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default EditDelivery;
