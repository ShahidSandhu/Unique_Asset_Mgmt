import React, { useState, useEffect } from "react";
import api from "../axiosConfig";

const AssetForm = ({
  asset,
  onSave,
  employees,
  departments,
  vendors,
  categories,
}) => {
  const [formData, setFormData] = useState({
    name: asset ? asset.name : "",
    description: asset ? asset.description : "",
    value: asset ? asset.value : "",
    serialNumber: asset ? asset.serialNumber : "",
    barcode: asset ? asset.barcode : "",
    purchaseDate: asset ? asset.purchaseDate : "",
    dateDisposed: asset ? asset.dateDisposed : "",
    condition: asset ? asset.condition : "Good",
    assignedTo: asset ? asset.assignedTo : "",
    department: asset ? asset.department : "",
    vendor: asset ? asset.vendor : "",
    category: asset ? asset.category : "",
  });

  useEffect(() => {
    if (asset) {
      setFormData({
        id: asset.id || "",
        name: asset.name || "",
        description: asset.description || "",
        type: asset.type || "",
        status: asset.status || "",
        purchaseDate: asset.purchaseDate || "",
        value: asset.value || "",
        location: asset.location || "",
        assignedTo: asset.assigned_to ? asset.assigned_to.id : "", // Ensure 'assignedTo' is populated with the correct employee ID
        condition: asset.condition || "",
        manufacturer: asset.manufacturer || "",
        model: asset.model || "",
        serialNumber: asset.serialNumber || "",
        warrantyExpiration: asset.warrantyExpiration || "",
      });
    }
  }, [asset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Value:</label>
        <input
          type="number"
          name="value"
          value={formData.value}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Serial Number:</label>
        <input
          type="text"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Barcode:</label>
        <input
          type="text"
          name="barcode"
          value={formData.barcode}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Purchase Date:</label>
        <input
          type="date"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date Disposed:</label>
        <input
          type="date"
          name="dateDisposed"
          value={formData.dateDisposed}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Condition:</label>
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
        >
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
      </div>
      <div>
        <label>Assigned To:</label>
        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
        >
          <option value="">Select Employee</option>
          {employees?.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Department:</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          {departments?.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Vendor:</label>
        <select name="vendor" value={formData.vendor} onChange={handleChange}>
          <option value="">Select Vendor</option>
          {vendors?.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );

};

export default AssetForm;
