// export default function Dialog({ open, onClose, title, children }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//       <div className="bg-white p-6 rounded shadow-md w-96">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="font-bold text-lg">{title}</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✖</button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }



// import React from "react";
// import "./Dialog.css";

// export default function Dialog({ open, onClose, title, children }) {
//   if (!open) return null;

//   return (
//     <div className="dialog-overlay">
//       <div className="dialog-container">
//         <div className="dialog-header">
//           <h2 className="dialog-title">{title}</h2>
//           <button onClick={onClose} className="dialog-close">✖</button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// // }


// import React from "react";
// import "./Dialog.css";

// export default function Dialog({ open, onClose, title, description, actions }) {
//   if (!open) return null;

//   return (
//     <div className="dialog-overlay">
//       <div className="dialog-container">
//         <div className="dialog-header">
//           <h2 className="dialog-title">{title}</h2>
//           <button onClick={onClose} className="dialog-close">✖</button>
//         </div>

//         {description && <p className="dialog-description">{description}</p>}

//         {actions && <div className="dialog-actions">{actions}</div>}
//       </div>
//     </div>
//   );
// }


import React from "react";
import "./Dialog.css";

export default function Dialog({ open, onClose, title, description, actions, children }) {
  if (!open) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          <h2 className="dialog-title">{title}</h2>
          <button onClick={onClose} className="dialog-close">✖</button>
        </div>

        {description && <p className="dialog-description">{description}</p>}

        {children && <div className="dialog-children">{children}</div>}

        {actions && <div className="dialog-actions">{actions}</div>}
      </div>
    </div>
  );
}

