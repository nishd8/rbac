import React, { useState } from "react";
import MultiSelect from "./multiselect";

const Form = ({ formTitle, fields, onSubmit, buttonText }) => {
  const camelToCap = (text) => {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData((od) => ({ ...od, [e.target.name]: e.target.value }));
  };
  const renderField = (field) => {
    const { type, name, options, value } = field;

    switch (type) {
      case "select":
        return (
          <>
            <label className="mb-2">{camelToCap(name)}</label>
            <select className="custom-input" name={name} onChange={handleChange} defaultValue={value}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </>
        );
      case "textarea":
        return (
          <>
            <label className="mb-2">{camelToCap(name)}</label>
            <textarea
              onChange={handleChange}
              name={name}
              defaultValue={value}
            ></textarea>
          </>
        );
      case "multiselect":
        return (
          <>
            <label className="mb-2">{camelToCap(name)}</label>
            <MultiSelect
              options={options}
              onChange={(values) => {
                setFormData((od) => ({ ...od, [name]: values }));
              }}
            />
          </>
        );
      default:
        return (
          <>
            <label className="mb-2">{camelToCap(name)}</label>
            <input
              type={type}
              name={name}
              defaultValue={value}
              onChange={handleChange}
              className="custom-input"
            />
          </>
        );
    }
  };
  return (
    <div>
      <h3>{formTitle}</h3>
      {fields.map((field, index) => (
        <div key={`${formTitle}-${index}`} className="my-4">
          {renderField(field)}
        </div>
      ))}
      <button
        onClick={() => {
          onSubmit(formData);
        }}
        className="btn btn-primary w-100 my-4"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Form;
