// src/components/DataCard.js
import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "./DataCard.css";

function DataCard({ title = "data card", value = "Nill", icon: Icon = null }) {
  return (
    <Card className="data-card text-center mb-3">
      <Card.Body>
        {Icon && <Icon className="data-card-icon" />}{" "}
        {/* Renders icon if provided */}
        <Card.Title className="data-card-title">{title}</Card.Title>
        <Card.Text className="data-card-value">{value}</Card.Text>
      </Card.Body>
    </Card>
  );
}

DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType, // Expects an icon component if provided
};

export default DataCard;
