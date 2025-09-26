// components/ui/Table.jsx
// export default function Table({ columns, data, renderRowActions }) {
//   return (
//     <table className="w-full border-collapse border">
//       <thead className="bg-gray-200">
//         <tr>
//           {columns.map((col, i) => (
//             <th key={i} className="border px-3 py-2 text-left">
//               {col}
//             </th>
//           ))}
//           {renderRowActions && <th className="border px-3 py-2">Actions</th>}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, i) => (
//           <tr key={i} className="hover:bg-gray-100">
//             {columns.map((col, j) => (
//               <td key={j} className="border px-3 py-2">
//                 {row[col]}
//               </td>
//             ))}
//             {renderRowActions && (
//               <td className="border px-3 py-2">{renderRowActions(row)}</td>
//             )}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }


import "./Table.css";

export default function Table({ columns, data, renderRowActions }) {
  return (
    <>
  
    <table className="table">
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col}</th>
          ))}
          {renderRowActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col, j) => (
              <td key={j}>{row[col]}</td>
            ))}
            {renderRowActions && <td>{renderRowActions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}
