import React, { useState, useEffect } from "react";

const SearchableDropdown = ({
  options,
  selectedOptions,
  onSelectionChange,
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, options]);

  const handleOptionSelect = (option) => {
    if (!selectedOptions?.includes(option)) {
      onSelectionChange([...(selectedOptions ?? []), option]);
    }
  };

  const removeChip = (option) => {
    const newSelectedOptions = selectedOptions?.filter((opt) => opt !== option);
    onSelectionChange(newSelectedOptions);
  };

  return (
    <div>
      <div>
        {selectedOptions?.map((option) => (
          <span
            key={option}
            style={{
              display: "inline-block",
              margin: "5px",
              padding: "5px",
              border: "1px solid black",
            }}
          >
            {option}
            <button onClick={() => removeChip(option)}>X</button>
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
      />
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            border: "1px solid grey",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {filteredOptions.map((option) => (
            <div
              key={option}
              onClick={(e) => handleOptionSelect(option, e)}
              style={{ padding: "10px", cursor: "pointer" }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
