import { useState, useEffect, useRef } from "react";

export default function SearchableDropdown({
  options,
  selectedValue,
  onValueChange,
  placeholder = "Pilih item",
  error,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle clicks outside the component to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleSelectOption = (value) => {
    onValueChange(value);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
    // When opening, if a value is already selected, use it as the search term
    // so the user can see it in the list immediately.
    if (!isOpen && selectedValue) {
      setSearchTerm(selectedValue);
    } else if (isOpen) {
      setSearchTerm(selectedValue || "");
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  // Combine classes for the input
  const inputClasses = [
    "form-input",
    "searchable-dropdown-input",
    isOpen ? "open" : "",
    error ? "error" : "",
  ]
    .join(" ")
    .trim();

  return (
    <div className="searchable-dropdown-container" ref={dropdownRef}>
      <div className="form-select">
        <input
          type="text"
          value={isOpen ? searchTerm : selectedValue || ""}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={placeholder}
          className={inputClasses}
        />
        <svg
          className="select-arrow"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="#64748b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <ul className="searchable-dropdown-list">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelectOption(option)}
                className="searchable-dropdown-list-item"
              >
                {option}
              </li>
            ))
          ) : (
            <li className="searchable-dropdown-list-item no-results">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
