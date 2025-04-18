import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from "../../components/spinner";
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ShowPackage = () => {
  const [packagee, setPackage] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/packages/${id}`)
      .then((response) => {
        setPackage(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Header />
    <div style={styles.container}>
      <h1 style={styles.title}>Package Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.detailsWrapper}>
          {/* Left: Product Name, Image, and Price */}
          <div style={styles.leftSide}>
            <h2 style={styles.packageName}>{packagee.packageName}</h2>
            {packagee.image ? (
              <img
                src={`http://localhost:5555${packagee.image}`}
                alt={packagee.packageName}
                style={styles.image}
              />
            ) : (
              <p style={styles.noImage}>No Image Available</p>
            )}
            <div style={styles.price}>
              <span style={styles.label}>Price: </span>
              {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(packagee.price)}
            </div>
          </div>

          {/* Right: Product Details and Category */}
          <div style={styles.rightSide}>
            <div style={styles.packageDetail}>
              <span style={styles.label}>Description: </span>
              <p style={styles.detailText}>{packagee.description}</p>
            </div>
            <div style={styles.packageDetail}>
              <span style={styles.label}>Category: </span>
              <p style={styles.detailText}>{packagee.category || 'Uncategorized'}</p>
            </div>
            <div style={styles.packageDetail}>
              <span style={styles.label}>Created At: </span>
              <p style={styles.detailText}>{new Date(packagee.createdAt).toLocaleDateString()}</p>
            </div>
            <div style={styles.packageDetail}>
              <span style={styles.label}>Last Updated At: </span>
              <p style={styles.detailText}>{new Date(packagee.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

// Updated Inline styles
const styles = {
  container: {
    padding: '2rem',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#F9F9F9', // Light gray background
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.5rem',
    margin: '1rem 0',
    textAlign: 'center',
    color: '#330D0F',
    fontWeight: 'bold',
  },
  detailsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '900px',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: '1rem',
    padding: '2rem',
    border: '1px solid #E1E1E1',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  leftSide: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '2rem',
  },
  rightSide: {
    flex: '2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '1rem',
  },
  packageName: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#330D0F',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  packageDetail: {
    marginBottom: '1rem',
    fontSize: '1rem',
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#330D0F',
  },
  detailText: {
    fontSize: '1rem',
    color: '#555',
  },
  price: {
    color: '#28A745', // Green color for price
    fontWeight: 'bold',
    fontSize: '1.25rem',
    marginTop: '1rem',
  },
  image: {
    width: '300px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '0.5rem',
    border: '1px solid #E1E1E1',
    marginTop: '1rem',
  },
  noImage: {
    color: '#888',
    fontSize: '1rem',
    marginTop: '1rem',
  },
};

export default ShowPackage;
