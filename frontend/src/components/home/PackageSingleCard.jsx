import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PackageSingleCard = ({ packagee }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      style={isSelected ? styles.cardSelected : styles.card}
      onClick={handleClick}
    >
      <Link to={`/packages/${packagee._id}`} style={styles.link}>
        {/* Product Image */}
        <img
          src={`http://localhost:5555${packagee.image}`}
          alt={packagee.packageName}
          style={styles.image}
        />
        {/* Product Details */}
        <div style={styles.details}>
          {/* Product Name */}
          <h2 style={styles.packageName}>{packagee.packageName}</h2>
          {/* Product Price */}
          <h3 style={styles.packagePrice}>
            <span style={styles.currency}>LKR </span>
            {packagee.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h3>
        </div>
      </Link>
    </div>
  );
};

// Inline styles
const styles = {
  card: {
    borderRadius: '0.5rem',
    overflow: 'hidden',
    textAlign: 'center',
    margin: '0.5rem',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    backgroundColor: '#fff', // White background for the card
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for the card
  },
  cardSelected: {
    borderRadius: '0.5rem',
    overflow: 'hidden',
    textAlign: 'center',
    margin: '0.5rem',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    backgroundColor: '#e0d7c4', // Highlight color for selected card
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // More pronounced shadow for selection
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  image: {
    width: '100%',
    height: '200px', // Fixed height for uniform image sizes
    objectFit: 'cover',
  },
  details: {
    padding: '1rem',
  },
  packageName: {
    margin: '0.5rem 0',
    fontSize: '1.25rem', // Bigger font size for product name
    fontWeight: 'bold',
    color: '#333',
  },
  packagePrice: {
    fontSize: '1.5rem', // Bigger font size for price
    color: '#27ae60', // Green color for the price
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  currency: {
    fontSize: '0.75rem', // Smaller font size for LKR
  },
};

export default PackageSingleCard;
