import React from "react";

const TableHeader = (props) => {
  return (
    <>
      <thead>
        <tr>
          {props.columns.map((column) => (
            <th className="clickable" key={column.path || column.key}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
