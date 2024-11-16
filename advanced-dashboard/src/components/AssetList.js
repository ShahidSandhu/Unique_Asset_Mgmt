import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import AssetForm from "../components/AssetForm";
import "./AssetList.css";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]); // To store employees data
  const [departments, setDepartments] = useState([]); // To store employees data
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortedField, setSortedField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedAsset, setSelectedAsset] = useState(null); // For displaying AssetForm
  const [showAssetForm, setShowAssetForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching assets data
    api
      .get("/api/assets/")
      .then((response) => {
        setAssets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching assets:", error);
        setError("Failed to load assets.");
        setLoading(false);
      });

    // Fetching employees data
    api
      .get("/api/employees/")
      .then((response) => {
        setEmployees(response.data); // Store employees data
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setError("Failed to load employees.");
      });

    // Fetching departments data
    api
      .get("/api/departments/")
      .then((response) => {
        setDepartments(response.data); // Store employees data
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        setError("Failed to load departments.");
      });

    // Fetching departments data
    api
      .get("/api/vendors/")
      .then((response) => {
        setVendors(response.data); // Store employees data
      })
      .catch((error) => {
        console.error("Error fetching vendors:", error);
        setError("Failed to load vendors.");
      });

  }, []);

  const handleCreateNewAsset = () => {
    setSelectedAsset(null); // Ensures it's in 'create' mode
    setShowAssetForm(true); // Open AssetForm for new asset creation
  };

  const handleAssetFormClose = () => {
    setShowAssetForm(false); // Close the form when Cancel is clicked
    setSelectedAsset(null); // Reset selectedAsset after form is closed
  };

  const handleSave = (updatedAsset) => {
    console.log("Saving asset with id: " + updatedAsset.id);
    if (updatedAsset.id) {
      // Handle saving the existing asset (edit)
      // For editing: PUT request
      api
        .put(`/api/assets/${updatedAsset.id}/`, updatedAsset) // PUT request to update asset
        .then((response) => {
          setAssets(
            assets.map((asset) =>
              asset.id === updatedAsset.id ? response.data : asset
            )
          );
          setShowAssetForm(false); // Close form after save
          setSelectedAsset(null); // Clear selected asset
        })
        .catch((error) => {
          console.error("Error updating asset:", error);
          alert("Failed to update the asset.");
        });
      console.log("Updated Asset:", updatedAsset);
    } else {
      // Handle saving a new asset
      // For new asset creation: POST request
      api
        .post("/api/assets/", updatedAsset) // POST request to create new asset
        .then((response) => {
          setAssets([...assets, response.data]); // Add new asset to the list
          setShowAssetForm(false); // Close form after save
        })
        .catch((error) => {
          console.error("Error creating asset:", error);
          alert("Failed to create the asset.");
        });
    }
    setShowAssetForm(false); // Close the form after saving
    setSelectedAsset(null); // Reset selectedAsset after save
  };

  const handleDelete = (assetId) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      api
        .delete(`/api/assets/${assetId}`)
        .then(() => {
          setAssets(assets.filter((asset) => asset.id !== assetId));
          navigate("/api/assets/");
        })
        .catch((error) => {
          console.error("Error deleting asset:", error);
          alert("Failed to delete the asset.");
        });
    }
  };

  const handleSort = (field) => {
    const newSortOrder =
      sortedField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortedField(field);
    setSortOrder(newSortOrder);
  };

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

  const indexOfLastAsset = currentPage * itemsPerPage;
  const indexOfFirstAsset = indexOfLastAsset - itemsPerPage;
  const currentAssets = sortedAssets.slice(indexOfFirstAsset, indexOfLastAsset);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (asset) => {
    console.log("Editing asset: ", asset); // Add this to confirm the correct asset is being passed
    setSelectedAsset(asset); // Set selected asset for editing
    setShowAssetForm(true); // Open AssetForm
  };

  if (loading) return <div>Loading assets...</div>;
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

      <div>
        <h1>Asset List</h1>
        <button onClick={handleCreateNewAsset}>Create New Asset</button>

        {showAssetForm && (
          <AssetForm
            assetId={null}
            asset={selectedAsset} // Pass the selected asset for editing
            employees={employees} // Pass employees data
            onClose={handleAssetFormClose}
            onSave={handleSave}
          />
        )}
      </div>

      {selectedAsset ? (
        <AssetForm
          assetId={selectedAsset.id}
          initialAsset={selectedAsset}
          employees={employees} // Pass employees to the form
          onSave={handleSave}
        />
      ) : (
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
                  <td>
                    {employees.find(
                      (employee) => employee.id === asset.assigned_to
                    )?.name || "Not Assigned"}
                  </td>
                  <td>
                    {departments.find((dept) => dept.id === asset.department)
                      ?.name || "Not Assigned"}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(asset)}>Edit</button>
                    <button onClick={() => handleDelete(asset.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

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
