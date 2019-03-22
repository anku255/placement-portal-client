import React from "react";
import PropTypes from "prop-types";

export default function Input(props) {
  const { label, errorText, ...inputProps } = props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" {...inputProps} />
      </div>
      <p className="help is-danger">{errorText}</p>
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

Input.defaultProps = {
  type: "text"
};
