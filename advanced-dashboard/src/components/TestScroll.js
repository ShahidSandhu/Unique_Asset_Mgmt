// src/components/TestScroll.js
import React from "react";

function TestScroll() {
  return (
    <div>
      {Array.from({ length: 100 }, (_, i) => (
        <p key={i}>Content line {i + 1}</p> // Generates multiple lines to ensure scroll
      ))}
    </div>
  );
}

export default TestScroll;
