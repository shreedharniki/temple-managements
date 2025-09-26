// import React, { useState, useEffect } from "react";

// function EditForm({ fields, values = {}, onSubmit, submitLabel = "Save" }) {
//   const [formValues, setFormValues] = useState(values);

//   useEffect(() => setFormValues(values), [values]);

//   const handleChange = (e) =>
//     setFormValues({ ...formValues, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formValues);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-2">
//       {fields.map((field) => (
//         <div key={field.name}>
//           <label className="block font-medium">{field.label}</label>
//           <input
//             type={field.type || "text"}
//             name={field.name}
//             value={formValues[field.name] || ""}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//           />
//         </div>
//       ))}
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {submitLabel}
//       </button>
//     </form>
//   );
// }

// export default EditForm;
