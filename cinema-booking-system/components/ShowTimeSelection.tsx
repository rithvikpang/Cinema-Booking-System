import React, { useState } from 'react';

interface Props {
  options: (string | null)[] | null;
  onSelect: (selectedOption: string | null) => void;
}

const SelectShowTime: React.FC<Props> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Initialize with null

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(null);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (index: number | null, option: string | null) => {
    setSelectedOption(option);
    onSelect(option);
    setShowOptions(false);
    setActiveOptionIndex(index);
  };

  return (
    <div className="combo-box-container">
      <div
        className="combo-box-selected"
        onClick={toggleOptions}
        style={{
          backgroundColor: selectedOption ? '#848afa' : '#fff',
          color: selectedOption ? '#fff' : '#000',
        }}
      >
        {selectedOption || 'Select an option'}
      </div>
      {showOptions && (
        <div className="combo-box-options">
          {options?.map((option, index) => (
            <div
              key={index}
              className={`combo-box-option ${index === activeOptionIndex ? 'active' : ''}`}
              onClick={() => handleOptionClick(index, option)}
            >
              {option || 'None'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectShowTime;
