// src/pages/Assets.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AssetForm from "../components/AssetForm"; // Import AssetForm

import api from "../axiosConfig";

const Assets = () => {

  const { assetId } = useParams(); // Get assetId from the route params (if editing)
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    if (assetId) {
      // Fetch asset data if assetId is provided (for editing)
      api
        .get(`/api/assets/${assetId}/`)
        .then((response) => setAsset(response.data))
        .catch((error) => console.error("Error fetching asset:", error));
    }
  }, [assetId]);

  const handleSave = (savedAsset) => {
    // After saving, you can navigate or show a success message
    navigate("/assets"); // Navigate back to the assets list page
  };

  return (
    <div className="assets-page">
      <h2>{assetId ? "Edit Asset" : "Create New Asset"}</h2>
      <AssetForm assetId={assetId} onSave={handleSave} initialAsset={asset} />
    </div>
  );
};

export default Assets;
