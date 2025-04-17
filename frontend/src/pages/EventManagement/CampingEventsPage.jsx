import React, { useEffect, useState } from "react";
import axios from "axios";
import EventSingleCard from "../../components/home/EventSingleCard";
import Spinner from '../../components/spinner';
import { FaSearch } from 'react-icons/fa';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const CampingEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/events?category=campingevents")
      .then((response) => {
        setEvents(response.data.data);
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

  const filteredEvents = events.filter(eventt =>
    eventt.eventName.toLowerCase().includes(searchQuery.toLowerCase())
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
              placeholder="Search by event name"
              value={searchQuery}
              onChange={handleSearch}
              style={styles.searchInput}
            />
          </div>
          <div style={styles.eventGrid}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((item) => (
                <EventSingleCard key={item._id} eventt={item} />
              ))
            ) : (
              <p>No events available.</p>
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
  eventGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },
};

export default CampingEventsPage;
