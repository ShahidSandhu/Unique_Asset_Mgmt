import React, { useState } from "react";
import AssetForm from "./AssetForm";

const AssetManager = () => {
  const [asset, setAsset] = useState(null);

  const handleSave = (savedAsset) => {
    setAsset(savedAsset);
  };

  return (
    <div>
      <h2>{asset ? "Edit Asset" : "Create Asset"}</h2>
      <AssetForm assetId={asset ? asset.id : null} onSave={handleSave} />
    </div>
  );
};

export default AssetManager;
