import React from "react";

const DarkMode = () => {
  return (
    <div>
      <input type="checkbox" className="checkbox" id="checkbox" />
      <label htmlFor="checkbox" className="label">
        <i className="dark" />
        <i className="light" />
        <div className="ball"></div>
      </label>
    </div>
  );
};

export default DarkMode;
