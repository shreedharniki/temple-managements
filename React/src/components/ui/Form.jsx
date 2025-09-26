

// components/ui/Form.jsx
import React from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import "./Form.css";

export default function Form({
  fields,
  values,
  onChange,
  onSubmit,
  submitLabel = "Submit",
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="form-container"
    >
      <div className="form-grid">
        {fields.map((field, idx) => (
          <div className="form-group" key={idx}>
            <label className="form-label">{field.label}</label>
            {field.type === "select" ? (
              <Select
                name={field.name}
                value={values[field.name]}
                onChange={onChange}
                options={field.options || []}
              />
            ) : (
              <Input
                type={field.type || "text"}
                name={field.name}
                value={values[field.name]}
                onChange={onChange}
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}
      </div>

      <div className="form-actions">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
