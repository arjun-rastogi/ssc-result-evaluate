import React from "react";

const InputArea = ({
  name,
  label,
  value,
  error,
  className,
  placeholder,
  required,
  onChange,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label
        id={name}
        htmlFor={name}
        dangerouslySetInnerHTML={{ __html: label }}
      />

      <textarea
        id={name}
        name={name}
        value={value}
        className={`form-control ${className}`}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...rest}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default InputArea;
