


// Alert.js
// import React from "react";
// import "./Alert.css";

// export default function Alert({ type = "success", message = "", className = "" }) {
//   return (
//     <div className={`alert alert-${type} ${className}`}>
//       <span className="alert-caret">►</span>
//       {message}
//     </div>
//   );
// }

import React from "react";
import "./Alert.css";

export default function Alert({ type = "success", message = "", children, onClose, className = "" }) {
  if (!message && !children) return null; // Don't render if empty

  return (
    <div className={`alert alert-${type} ${className}`}>
      <span className="alert-caret">►</span>
      <span>{message || children}</span>
      {onClose && (
        <button
          className="alert-close"
          onClick={onClose}
          style={{
            marginLeft: "10px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ✖
        </button>
      )}  
       {/* IF WANT    MANUAVL  X THEN REMOVE OR ANN SET TIME OUT */}
    </div>
  );
}
