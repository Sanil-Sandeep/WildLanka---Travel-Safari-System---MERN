import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/EventCss/EventDetailsPage.css'; 
import { addToCart } from "../PaymentManagement/Cart/utils/cart";
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventt, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Event not found");
        } else {
          setError("An error occurred while fetching the event");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleAddToCart = async () => {
    if (eventt.quantityy < quantity) {
      setError("Insufficient quantity available");
      return;
    }

    try {
      // Update quantity in the backend before adding to cart
      await axios.post(`http://localhost:5555/events/purchase/${product._id}`, {
        quantity,
      });

      // Add to cart
      addToCart({
        eventName: eventt.eventName,
        price: eventt.price,
        quantity: parseInt(quantity),
      });
      navigate('/cart');
    } catch (error) {
      setError("An error occurred while updating quantity");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  const formattedPrice = new Intl.NumberFormat('en-SL', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
  }).format(eventt.price);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="event-details-container">
          {/* Left Side: Event Image */}
          <div className="event-Image-container">
            <img
              src={`http://localhost:5555${eventt.image}`}
              alt={eventt.eventName}
              className="event-Image"
            />
          </div>

          {/* Right Side: Event Details */}
          <div className="event-info-container">
            <h1 className="title">{eventt.eventName}</h1>
            <p className="description">{eventt.description}</p>
            {/* Price and Buy Button in the same row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p className="price" style={{ marginBottom: '10px' }}>{formattedPrice}</p>
              <button
                className="button buy-button"
                onClick={handleAddToCart}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4169E1',
                  color: '#fff',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Buy Now
              </button>
            </div>

            {/* Quantity Selector Below the Price */}
            <div className="quantity-selector" style={{ marginTop: '10px' }}>
              <label
                htmlFor="quantity"
                className="quantity-label"
                style={{ marginRight: '8px', fontWeight: 'bold' }}
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                style={{
                  width: '60px',
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  textAlign: 'center',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetailsPage;
