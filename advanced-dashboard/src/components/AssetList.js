import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate for navigation
import api from "../axiosConfig"; // Your API setup

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search filter state
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [itemsPerPage] = useState(5); // Number of items per page for pagination
  const [sortedField, setSortedField] = useState("name"); // Default sorting field
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order (ascending or descending)
  const navigate = useNavigate(); // For navigation after delete

  useEffect(() => {
    // Fetch assets from the API
    api
      .get("/api/assets/")
      .then((response) => {
        setAssets(response.data); // Set the assets state with the response data
        setLoading(false); // Stop the loading spinner
      })
      .catch((error) => {
        console.error("Error fetching assets:", error);
        setError("Failed to load assets."); // Set an error message if fetching fails
        setLoading(false); // Stop the loading spinner
      });
  }, []);

  // Handle delete an asset by its ID
  const handleDelete = (assetId) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      api
        .delete(`/api/assets/${assetId}`)
        .then(() => {
          // Remove the deleted asset from the list by filtering it out
          setAssets(assets.filter((asset) => asset.id !== assetId));
          navigate("/assets/"); // Navigate to the assets list page after delete
        })
        .catch((error) => {
          console.error("Error deleting asset:", error);
          alert("Failed to delete the asset.");
        });
    }
  };

  // Sorting handler
  const handleSort = (field) => {
    const newSortOrder =
      sortedField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortedField(field);
    setSortOrder(newSortOrder);
  };

  // Filtered and sorted assets based on the search term and sorting options
  const filteredAssets = assets.filter((asset) => {
    return (
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedAssets = filteredAssets.sort((a, b) => {
    if (a[sortedField] < b[sortedField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortedField] > b[sortedField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const indexOfLastAsset = currentPage * itemsPerPage;
  const indexOfFirstAsset = indexOfLastAsset - itemsPerPage;
  const currentAssets = sortedAssets.slice(indexOfFirstAsset, indexOfLastAsset);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // If data is still loading, show a loading message
  if (loading) return <div>Loading assets...</div>;

  // If there was an error fetching the assets, display an error message
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Assets List</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Link to="/assets/new">
        <button>Create New Asset</button>
      </Link>

      <table className="asset-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("description")}>Description</th>
            <th onClick={() => handleSort("value")}>Value</th>
            <th onClick={() => handleSort("serial_number")}>Serial Number</th>
            <th onClick={() => handleSort("barcode")}>Barcode</th>
            <th onClick={() => handleSort("date_acquired")}>Date Acquired</th>
            <th onClick={() => handleSort("assigned_to")}>Assigned To</th>
            <th onClick={() => handleSort("department")}>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAssets.length === 0 ? (
            <tr>
              <td colSpan="9">No assets available.</td>
            </tr>
          ) : (
            currentAssets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.name}</td>
                <td>{asset.description}</td>
                <td>${asset.value}</td>
                <td>{asset.serial_number}</td>
                <td>{asset.barcode}</td>
                <td>{asset.date_acquired}</td>
                <td>{asset.assigned_to?.name || "Not Assigned"}</td>
                <td>{asset.department?.name || "Not Assigned"}</td>
                <td>
                  <Link to={`/assets/${asset.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(asset.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredAssets.length / itemsPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AssetList;
