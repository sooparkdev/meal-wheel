import React, { useState, useEffect, useRef } from "react";

const SearchableDropdown = ({
  options,
  selectedOptions,
  onSelectionChange,
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, options]);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        !inputRef.current?.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

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
      <div ref={inputRef}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowDropdown(true)}
        />
      </div>
      {showDropdown && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            border: "1px solid red",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {filteredOptions.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionSelect(option)}
              style={{
                padding: "10px",
                cursor: "pointer",
                border: "1px solid yellow",
              }}
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
