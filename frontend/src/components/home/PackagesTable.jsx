import React from "react";
import { Link } from "react-router-dom";
import "../PackageCss/PackageTable.css";

const PackagesTable = ({ packages }) => {
  return (
    <table className="packages-Table">
      <thead>
        <tr>
          <th className="table-Header">No</th>
          <th className="table-Header">Product Name</th>
          <th className="table-Header hidden-md">Category</th>
          <th className="table-Header hidden-md">Image</th>
          <th className="table-Header hidden-md description-column">Description</th>
          <th className="table-Header hidden-md">Price</th>
          <th className="table-Header hidden-md">Quantity</th>
          <th className="table-Header operations-column">Operations</th>
        </tr>
      </thead>
      <tbody>
        {packages.length > 0 ? (
          packages.map((packagee, index) => (
            <tr key={packagee._id} className="table-Row">
              <td className="table-Data">{index + 1}</td>
              <td className="table-Data">{packagee.packageName}</td>
              <td className="table-Data hidden-md">{packagee.category}</td>
              <td className="table-Data hidden-md">
                {packagee.image ? (
                  <img
                    src={`http://localhost:5555${packagee.image}`}
                    alt={packagee.packageName}
                    className="Package-Image"
                  />
                ) : (
                  <p>No Image</p>
                )}
              </td>
              <td className="table-Data hidden-md description-column">{packagee.description}</td>
              <td className="table-Data hidden-md">
                {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(packagee.price)}
              </td>
              <td className="table-Data hidden-md">{packagee.quantityy || 0}</td>
              <td className="table-Data operations-column">
                <div className="actions">
                  <Link to={`/packages/details/${packagee._id}`}>
                    <button className="View-button">View</button>
                  </Link>
                  <Link to={`/packages/edit/${packagee._id}`}>
                    <button className="Edit-button">Edit</button>
                  </Link>
                  <Link to={`/packages/delete/${packagee._id}`}>
                    <button className="Delete-button">Delete</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="table-Data"> 
              No packages available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PackagesTable;
