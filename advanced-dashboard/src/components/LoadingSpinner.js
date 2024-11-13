// src/components/LoadingSpinner.js
import React from "react";
import { Spinner } from "react-bootstrap";

function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status">
        <span className="sr-only"></span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;
