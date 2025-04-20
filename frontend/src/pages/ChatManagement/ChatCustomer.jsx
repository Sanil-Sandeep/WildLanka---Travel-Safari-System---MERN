import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/spinner';
import { Link } from 'react-router-dom';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ChatCustomer = () => {
  const [cchats, setCChats] = useState([]);
  const [mchats, setMChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch customer chats
    axios
      .get('http://localhost:5555/cchats')
      .then((response) => {
        const sortedCChats = response.data.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setCChats(sortedCChats);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch manager chats
    axios
      .get('http://localhost:5555/mchats')
      .then((response) => {
        const sortedMChats = response.data.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setMChats(sortedMChats);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Combine and sort chats
  const combinedChats = [...cchats.map(chat => ({ ...chat, type: 'customer' })), ...mchats.map(chat => ({ ...chat, type: 'manager' }))];
  const sortedChats = combinedChats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <div>
      <Header />
    <div style={styles.page}>
      <h1 style={{ fontSize: '36px', color: 'brown' }}>Navodi Tharaka</h1>
      <div style={styles.container}>
        <br /><br />

        {loading ? (
          <Spinner />
        ) : (
          <>
            {/* Combined Chats Section */}
            <div style={styles.chatSection}>
              {sortedChats.map((chat) => (
                <div key={chat._id} style={styles.chatWrapper}>
                  <div style={chat.type === 'customer' ? styles.cchatBox : styles.mchatBox}>
                    <div style={chat.type === 'customer' ? styles.cchatMessage : styles.mchatMessage}>
                      {chat.type === 'customer' ? chat.cMessage : chat.mMessage}
                    </div>
                  </div>
                  <div style={styles.actions}>
                    {chat.type === 'customer' ? (
                      <>
                        <Link to={`/cchats/edit/${chat._id}`} style={styles.link}>
                          Edit
                        </Link>
                        <Link to={`/cchats/delete/${chat._id}`} style={styles.link}>
                          Delete
                        </Link>
                      </>
                    ) : (
                      <Link to={`/mchats/reply/${chat._id}`} style={styles.replylink}>
                        Reply
                      </Link>
                    )}
                  </div>
                  {chat.type === 'customer' && chat.cReply && (
                    <div style={styles.replyBox}>
                      <div style={styles.replyMessage}>{chat.cReply}</div>
                    </div>
                  )}
                  {chat.type === 'manager' && chat.mReply && (
                    <div style={styles.mReplyBox}>
                      <div style={styles.mReplyMessage}>{chat.mReply}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div style={styles.header}>
          <h1 style={styles.title}>Chat with us!</h1>
          <Link to='/cchats/create'>
            <button style={styles.button}>Message</button>
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};


// Styles remain unchanged
const styles = {
  page: {
    backgroundColor: '#fff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '1rem',
    fontFamily: 'Poppins, sans-serif',
  },
  container: {
    width: '60%',
    maxWidth: '1200px',
    backgroundColor: '#fff',
    margin: '0 auto',
    fontFamily: 'Poppins, sans-serif',
    borderRadius: "20px",
    boxShadow: 'inset 8px 0px 20px rgba(0, 0, 0, 0.3)',
  },
  header: {
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '5rem',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'auto',
  },
  title: {
    fontSize: '1.9rem',
    margin: 0,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#330D0F',
    color: '#F1EEDA',
    fontFamily: 'Poppins, sans-serif',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '40px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  cchatSection: {
    width: '100%',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cchatWrapper: {
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
  },
  cchatBox: {
    border: '3px solid #330D0F',
    borderRadius: '25px 0px 25px 25px',
    padding: '1rem',
    color: '#F1EEDA',
    backgroundColor: '#330D0F',
    marginLeft: '22rem',
    marginBottom: '0.5rem',
    width: '500px',
    minHeight: '40px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 7px 8px rgba(0, 0, 0, 0.3)',
  },
  replyBox: {
    border: '3px solid #330D0F',
    borderRadius: '0px 25px 25px 25px',
    padding: '1rem',
    backgroundColor: '#F1EEDA',
    marginBottom: '5rem',
    width: '500px',
    minHeight: '40px',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '4rem',
    boxShadow: '0px 7px 8px rgba(0, 0, 0, 0.3)',
  },
  feedbackText: {
    fontWeight: 'bold',
    marginBottom: '0.2rem',
  },
  cchatMessage: {
    marginBottom: '1rem',
    fontSize: '18px',
    overflowWrap: 'break-word',
  },
  replyText: {
    fontWeight: 'bold',
    marginBottom: '0.2rem',
  },
  replyMessage: {
    marginBottom: '1rem',
    fontSize: '18px',
    overflowWrap: 'break-word',
  },
  actions: {
    fontSize: '15px',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '0.6rem',
    marginBottom: '1rem',
    marginLeft: '24rem',
    fontWeight: 'bold',
  },
  replylink: {
    color: '#330D0F',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  mchatSection: {
    width: '100%',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  mchatWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
  },
  mchatBox: {
    border: '3px solid #330D0F',
    borderRadius: '0px 25px 25px 25px',
    padding: '1rem',
    backgroundColor: '#F1EEDA',
    marginBottom: '0.5rem',
    marginLeft: '4rem',
    minHeight: '50px',
    width: '500px',
    boxShadow: '0px 7px 8px rgba(0, 0, 0, 0.3)',
  },
  mReplyBox: {
    border: '3px solid #330D0F',
    borderRadius: '25px 0px 25px 25px',
    padding: '1rem',
    backgroundColor: '#330D0F',
    color: '#fff',
    marginBottom: '5rem',
    width: '500px',
    minHeight: '40px',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '22rem',
    boxShadow: '0px 7px 8px rgba(0, 0, 0, 0.3)',
  },
  mchatMessage: {
    marginBottom: '1rem',
    fontSize: '18px',
    overflowWrap: 'break-word',
  },
  mReplyMessage: {
    marginBottom: '1rem',
    fontSize: '18px',
    overflowWrap: 'break-word',
  },
};

export default ChatCustomer;
