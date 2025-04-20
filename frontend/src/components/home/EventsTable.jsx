import React from "react";
import { Link } from "react-router-dom";
import "../EventCss/EventTable.css";

const EventsTable = ({ events }) => {
  return (
    <table className="events-Table">
      <thead>
        <tr>
          <th className="table-Header">No</th>
          <th className="table-Header">Event Name</th>
          <th className="table-Header hidden-md">Category</th>
          <th className="table-Header hidden-md">Image</th>
          <th className="table-Header hidden-md description-column">Description</th>
          <th className="table-Header hidden-md">Price</th>
          <th className="table-Header hidden-md">Quantity</th>
          <th className="table-Header operations-column">Operations</th>
        </tr>
      </thead>
      <tbody>
        {events.length > 0 ? (
          events.map((eventt, index) => (
            <tr key={eventt._id} className="table-Row">
              <td className="table-Data">{index + 1}</td>
              <td className="table-Data">{eventt.eventName}</td>
              <td className="table-Data hidden-md">{eventt.category}</td>
              <td className="table-Data hidden-md">
                {eventt.image ? (
                  <img
                    src={`http://localhost:5555${eventt.image}`}
                    alt={eventt.eventName}
                    className="Event-Image"
                  />
                ) : (
                  <p>No Image</p>
                )}
              </td>
              <td className="table-Data hidden-md description-column">{eventt.description}</td>
              <td className="table-Data hidden-md">
                {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(eventt.price)}
              </td>
              <td className="table-Data hidden-md">{eventt.quantityy || 0}</td>
              <td className="table-Data operations-column">
                <div className="actions">
                  <Link to={`/events/details/${eventt._id}`}>
                    <button className="View-button">View</button>
                  </Link>
                  <Link to={`/events/edit/${eventt._id}`}>
                    <button className="Edit-button">Edit</button>
                  </Link>
                  <Link to={`/events/delete/${eventt._id}`}>
                    <button className="Delete-button">Delete</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="table-Data"> 
              No Events available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default EventsTable;
