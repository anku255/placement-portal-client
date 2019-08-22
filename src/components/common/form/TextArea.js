import React from "react";

export default function TextArea({
  label,
  rows,
  placeholder,
  error,
  helpText,
  ...textAreaProps
}) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea
          {...textAreaProps}
          className="textarea"
          placeholder={placeholder}
          rows={rows}
        />
      </div>
      <p className="help has-text-grey">{helpText}</p>
      <p className="help is-danger">{error}</p>
    </div>
  );
}
