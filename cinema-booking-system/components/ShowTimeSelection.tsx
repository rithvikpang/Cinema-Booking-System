import React, { useState } from 'react';

interface Props {
  options: (string | null)[] | null;
}

const ComboBox: React.FC<Props> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>('');

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(null);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (index: number | null, option: string | null) => {
    setSelectedOption(option);
    setShowOptions(false); // Hide options after selection
    setActiveOptionIndex(index);
  };

  return (
    <div className="combo-box-container">
      <div
        className="combo-box-selected"
        onClick={toggleOptions}
        style={{
          backgroundColor: selectedOption ? '#007bff' : '#fff',
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

export default ComboBox;
