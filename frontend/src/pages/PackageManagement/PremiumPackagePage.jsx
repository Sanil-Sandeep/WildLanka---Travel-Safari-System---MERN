import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from '../../components/spinner';
import { FaSearch } from 'react-icons/fa';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';
import PackageSingleCard from "../../components/home/PackageSingleCard";

const PremiumPackagePage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/packages?category=premium")
      .then((response) => {
        setPackages(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPackages = packages.filter(packagee =>
    packagee.packageName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
    <div style={styles.pageContainer}>
      {loading ? <Spinner /> : (
        <>
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by package name"
              value={searchQuery}
              onChange={handleSearch}
              style={styles.searchInput}
            />
          </div>
          <div style={styles.packageGrid}>
            {filteredPackages.length > 0 ? (
              filteredPackages.map((item) => (
                <PackageSingleCard key={item._id} packagee={item} />
              ))
            ) : (
              <p>No packages available.</p>
            )}
          </div>
        </>
      )}
    </div>
    <Footer />
    </div>
  );
};

// Inline styles
const styles = {
  pageContainer: {
    backgroundColor: 'white',
    padding: '1rem',
    minHeight: '100vh',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '1.5rem',
    maxWidth: '500px', // Increased maxWidth for a larger search bar
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchIcon: {
    position: 'absolute',
    left: '15px', // Adjusted for larger padding
    color: '#007bff',
    fontSize: '1.5rem', // Slightly larger icon
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 2rem 0.75rem 50px', // Increased padding for a larger input field
    borderRadius: '30px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '1.1rem', // Slightly larger font size
  },
  packageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },
};

export default PremiumPackagePage;
