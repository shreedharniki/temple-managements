// export default function Button({ children, onClick, type = "button", variant = "primary" }) {
//   const base = "px-4 py-2 rounded font-medium transition";
//   const styles = {
//     primary: "bg-blue-600 text-white hover:bg-blue-700",
//     secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
//     danger: "bg-red-500 text-white hover:bg-red-600",
//   };

//   return (
//     <button type={type} onClick={onClick} className={`${base} ${styles[variant]}`}>
//       {children}
//     </button>
//   );
// }

import React from "react";
import "./Button.css";

export default function Button({ children, onClick, type = "button", variant = "primary", disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${disabled ? "btn-disabled" : ""}`}
    >
      {children}
    </button>
  );
}
