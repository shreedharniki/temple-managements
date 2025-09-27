


// Alert.js
import React from "react";
import "./Alert.css";

export default function Alert({ type = "success", message = "", className = "" }) {
  return (
    <div className={`alert alert-${type} ${className}`}>
      <span className="alert-caret">►</span>
      {message}
    </div>
  );
}

