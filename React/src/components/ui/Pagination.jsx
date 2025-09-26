// import Button from "./Button";

// export default function Pagination({ page, totalPages, onPageChange }) {
//   return (
//     <div className="flex items-center justify-center gap-2 mt-4">
//       <Button onClick={() => onPageChange(page - 1)} variant="secondary" disabled={page === 1}>
//         Prev
//       </Button>
//       <span>Page {page} of {totalPages}</span>
//       <Button onClick={() => onPageChange(page + 1)} variant="secondary" disabled={page === totalPages}>
//         Next
//       </Button>
//     </div>
//   );
// }


import Button from "./Button";
import "./Pagination.css"; // 👈 import CSS

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <Button
        onClick={() => onPageChange(page - 1)}
        variant="secondary"
        disabled={page === 1}
      >
        Prev
      </Button>

      <span className="pagination-info">
        Page {page} of {totalPages}
      </span>

      <Button
        onClick={() => onPageChange(page + 1)}
        variant="secondary"
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
