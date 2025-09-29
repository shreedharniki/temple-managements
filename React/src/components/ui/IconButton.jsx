import React from "react";
import { Link } from "react-router-dom";
import "./IconButton.css";

export default function IconButton({ icon: Icon, label, to, onClick, variant = "primary" }) {
  const classes = `icon-button ${variant}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {Icon && <Icon style={{ marginRight: label ? "6px" : 0 }} />}
        {label && <span>{label}</span>}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {Icon && <Icon style={{ marginRight: label ? "6px" : 0 }} />}
      {label && <span>{label}</span>}
    </button>
  );
}
