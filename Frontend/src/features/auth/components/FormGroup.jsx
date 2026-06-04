import React from "react";

const FormGroup = ({
  name,
  type,
  value,
  placeholder,
  onChange,
  id,
}) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{name}</label>

      <input
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default FormGroup;