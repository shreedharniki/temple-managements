// export default function Alert({ type = "success", message }) {
//   const colors = {
//     success: "bg-green-100 text-green-700 border-green-400",
//     error: "bg-red-100 text-red-700 border-red-400",
//     warning: "bg-yellow-100 text-yellow-700 border-yellow-400",
//   };

//   return (
//     <div className={`p-3 border-l-4 rounded ${colors[type]}`}>
//       {message}
//     </div>
//   );
// }


// Alert.js
import React from "react";
import "./Alert.css";

export default function Alert({ type = "success", children, className = "" }) {
  return (
    <div className={`alert alert-${type} ${className}`}>
      <span className="alert-caret">►</span> {/* caret icon */}
      {children}
    </div>
  );
}
