


// import "./Table.css";
// export default function Table({ columns, data, renderRowActions }) {
//   return (
//     <table className="table w-full border-collapse border border-gray-200">
//       <thead>
//         <tr className="bg-gray-100">
//           {columns.map((col, i) => (
//             <th key={i} className="border px-3 py-2 text-left">
//               {col.label} {/* ✅ Show label instead of field */}
//             </th>
//           ))}
//           {renderRowActions && <th className="border px-3 py-2">Actions</th>}
//         </tr>
//       </thead>
//       <tbody>
//         {data.length > 0 ? (
//           data.map((row, i) => (
//             <tr key={i} className="hover:bg-gray-50">
//               {columns.map((col, j) => (
//                 <td key={j} className="border px-3 py-2">
//                   {row[col.field]} {/* ✅ Use field to fetch value */}
//                 </td>
//               ))}
//               {renderRowActions && (
//                 <td className="border px-3 py-2">{renderRowActions(row)}</td>
//               )}
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td
//               colSpan={columns.length + (renderRowActions ? 1 : 0)}
//               className="text-center py-4"
//             >
//               No records found
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// }


import React, { useState, useMemo } from "react";
import Search from "./Search";
import Pagination from "./Pagination";
import Excel from "./Excel";
import "./Table.css";

export default function Table({ columns, data, renderRowActions, rowsPerPage = 10 }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // Filter data by search query
  const filteredData = useMemo(() => {
    if (!query) return data;
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.field] || "")
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    );
  }, [query, data, columns]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [page, filteredData, rowsPerPage]);

  // Reset page when filteredData changes
  React.useEffect(() => {
    setPage(1);
  }, [query, data]);

  return (
    <div className="w-full">
      {/* Top controls */}
      <div style={{ display: "flex", padding: "10px", gap: "10px" }}>
        <Search value={query} onChange={setQuery} />
        <Excel data={filteredData} fileName="temple.xlsx" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col, i) => (
                <th key={i} className="border px-3 py-2 text-left">
                  {col.label}
                </th>
              ))}
              {renderRowActions && <th className="border px-3 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {columns.map((col, j) => (
                    <td key={j} className="border px-3 py-2">
                      {row[col.field]}
                    </td>
                  ))}
                  {renderRowActions && (
                    <td className="border px-3 py-2">{renderRowActions(row)}</td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (renderRowActions ? 1 : 0)}
                  className="text-center py-4"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
