import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/spinner";
import { Link, useNavigate } from "react-router-dom";
import EventsTable from "../../components/home/EventsTable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../components/ProductCss/ProductDashboard.css";
import logo from '../../components/images/logo.png'; // Adjust the path if necessary
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';


const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [searchQuery, setSearchQuery] = useState(""); // For combined search

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/events")
      .then((response) => {
        setEvents(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Filter events based on search query for both productName and category
  const filteredEvents = events.filter(
    (eventt) =>
      eventt.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eventt.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePDFReport = () => {
      const doc = new jsPDF();
      const date = new Date().toLocaleDateString();
  
      // Load logo image
      const img = new Image();
      img.src = logo; // The path to the image
      img.onload = function () {
          // Add logo image on the right side
          doc.addImage(img, 'png', doc.internal.pageSize.getWidth() - 44, 10, 30, 30); // Logo (right-aligned: x calculated for margin)
  
          // Align CraftMart title to the left
          doc.setFontSize(22);
          doc.setFont("helvetica", "bold"); // Make WildLanka text bold
          doc.text("WildLanka", 14, 20); // Left-align WildLanka title
  
          // Align Event Report title to the left
          doc.setFontSize(16);
          doc.text("Event Report", 14, 30); // Left-align Event Report title
  
          // Align date to the left
          doc.setFontSize(12);
          doc.setFont("helvetica", "normal");
          doc.text(`${date}`, 14, 40); // Left-align the date
  
          // Draw a solid horizontal line below the date
          const lineStartX = 14; // Starting point on the left
          const lineEndX = doc.internal.pageSize.getWidth() - 14; // Ending point on the right
          const lineY = 44;
          doc.line(lineStartX, lineY, lineEndX, lineY); // Draw horizontal line
  
          let currentY = lineY + 10; // Start position for categories after the line
  
          const categories = Array.from(new Set(filteredEvents.map((eventt) => eventt.category)));
  
          categories.forEach((category) => {
              const categoryEvents = filteredEvents.filter(
                  (eventt) => eventt.category === category
              );
  
              // Modify tableData to include quantity information
              const tableData = categoryEvents.map((eventt) => [
                  eventt.eventName,
                  eventt.price,
                  eventt.quantityy, // Include quantity in the table data
              ]);
  
              // Add category title
              doc.setFontSize(14); // Set font size for the category title
              doc.text(category, 14, currentY); // Add category title on the left side
              currentY += 10; // Increase Y position for the table
  
              // Generate the table for the category with header color #330D0F
              doc.autoTable({
                  startY: currentY,
                  head: [["Event Name", "Price", "Quantity"]],
                  body: tableData,
                  theme: 'grid',
                  headStyles: { fillColor: '#330D0F' }, // Set header color to #330D0F
                  margin: { top: 10 },
              });
  
              currentY = doc.autoTable.previous.finalY + 10; // Set currentY to the end of the previous table plus some margin
          });
  
          // Save the PDF after everything is loaded
          doc.save("Event.pdf");
      };
  };
  
  
  return (
    <div>
      <Header />
    <div className="home-container">
      <div className="button-container">
        <button
          className="button button-table"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="button button-card"
          onClick={() => navigate("/events/card")}
        >
          Card
        </button>
      </div>

      <div className="header-container">
        <h1 className="text-3xl">Event Management</h1>
      </div>

      {/* Search and Buttons Section */}
      <div className="search-button-container">
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search by event name or category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="report-button" onClick={generatePDFReport}>
          Generate Report
        </button>
        <Link to="/events/create">
          <button className="add-button">Add</button>
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <EventsTable events={filteredEvents} />
      ) : null}
    </div>
    <Footer />
    </div>
  );
};

export default EventDashboard;
