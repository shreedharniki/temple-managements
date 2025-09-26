// export default function Input({ label, type = "text", value, onChange, placeholder }) {
//   return (
//     <div className="mb-3">
//       {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
//       />
//     </div>
//   );
// }


import React from "react";
import "./Input.css";

export default function Input({ label, type = "text", value, onChange, placeholder, name }) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
}
