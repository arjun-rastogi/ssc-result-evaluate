import React from "react";
import JoditEditor from "jodit-react";

const TextArea = ({
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

      <JoditEditor value={value} onChange={onChange} {...rest} />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default TextArea;
