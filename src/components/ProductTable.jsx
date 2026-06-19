import React from "react";

function ProductTable({ products, onEdit, onDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Details</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.details}</td>
            <td>${p.price}</td>
            <td>{p.quantity}</td>
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(p)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(p.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ProductTable;
