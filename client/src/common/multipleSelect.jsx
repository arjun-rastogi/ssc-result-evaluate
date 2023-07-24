import React, { useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";

const MultipleSelect = ({
  name,
  label,
  value,
  options,
  error,
  selectedOptions,
  setSelectedOptions,
  onChange,
  ...rest
}) => {
  const handleSelect = (selectedList, selectedItem) => {
    setSelectedOptions(selectedList);
  };

  useEffect(() => {
    if (selectedOptions) {
      const handleChange = () => {
        onChange(name, selectedOptions);
      };
      handleChange();
    }
  }, [name, selectedOptions]);

  return (
    <>
      <div className="form-group">
        <label
          id={name}
          htmlFor={name}
          dangerouslySetInnerHTML={{ __html: label }}
        />

        <Multiselect
          options={options}
          selectedValues={selectedOptions}
          onSelect={handleSelect}
          onRemove={handleSelect}
          displayValue="name"
        />

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
};

export default MultipleSelect;
