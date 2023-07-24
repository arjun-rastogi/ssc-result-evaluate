import React from "react";

const SearchBox = ({ value, onChange }) => {
  const handleInputChange = (e) => {
    onChange(e.currentTarget.value);
  };

  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default SearchBox;
