import React from "react";

const Filter = ({ filterBy }) => {
  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={(e) => {
        filterBy(e);
      }}
    >
      <option defaultValue>Filter By...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  );
};

export default Filter;
