import React from "react";

const BatchYearSelect = props => {
  const currentYear = new Date().getFullYear().toString();
  return (
    <div className="field">
      <label className="label">Batch Year</label>
      <div className="control">
        <div className="select">
          <select
            name="batchYear"
            onChange={props.handleInputChange}
            value={props.value}
          >
            <option>{+currentYear}</option>
            <option>{+currentYear + 1}</option>
            <option>{+currentYear + 2}</option>
            <option>{+currentYear + 3}</option>
            <option>{+currentYear + 4}</option>
          </select>
        </div>
        <p className="help is-danger">{props.errorText}</p>
      </div>
    </div>
  );
};

export default BatchYearSelect;
