// import React from "react";

// export default function Select({ name, value, onChange, options = [] }) {
//   return (
//     <select
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//     >
//       {options.map((opt, i) => (
//         <option key={i} value={opt.value}>
//           {opt.label}
//         </option>
//       ))}
//     </select>
//   );
// }


import React from "react";
import "./Select.css"; // 👈 import CSS

export default function Select({ name, value, onChange, options = [] }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="select"
    >
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
