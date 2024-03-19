import { useEffect, useState } from "react";

const MultiSelect = ({ options, onChange }) => {
  const handleChange = (value) => {
    let newSelected = null;
    if (selected.includes(value)) {
      newSelected = selected.filter((item) => item !== value);
      setSelected(newSelected);
    } else {
      newSelected = [...selected, value];
      setSelected(newSelected);
    }
    onChange(newSelected);
  };
  const filterOptions = (e) => {
    setFilterable(
      options.filter((option) =>
        JSON.stringify(option).includes(e.target.value)
      )
    );
  };
  const [selected, setSelected] = useState([]);
  const [filterable, setFilterable] = useState([]);
  useEffect(() => {
    setFilterable(options);
  }, [options]);
  return (
    <div className="">
      <div className="d-flex overflow-auto pb-3">
        {options
          .filter((option) => selected.includes(option.value))
          .map((select, index) => (
            <div
              key={`al-selected-${index}`}
              className="pointer bg-secondary rounded px-2 py-1 mx-1 my-1"
              onClick={() =>
                setSelected((od) => od.filter((item) => item !== select.value))
              }
            >
              {select.label}
              <i className="bi bi-x"></i>
            </div>
          ))}
      </div>
      <input
        type="text"
        placeholder="search"
        onChange={filterOptions}
        className="custom-input mb-3"
      ></input>
      <div>
        {filterable.map((option, index) => (
          <div
            className="mb-1 d-flex justify-content-between bg-secondary py-1 px-2 rounded"
            key={`multiselect-${index}`}
          >
            <input
              checked={option.checked || selected.includes(option.value)}
              disabled={option.disabled}
              type="checkbox"
              onChange={() => {
                handleChange(option.value);
              }}
            />
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
