import React from "react";
import "./PujaCard.css";

export default function PujaCard({ title, price }) {
  return (
    <div className="puja-card">
      <div className="puja-title">{title}</div>
      <div className="puja-price">₹{price}</div>
    </div>
  );
}
