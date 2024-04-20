// components/ComboBox.tsx
import React, { useState } from 'react';

interface ComboBoxProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
  className?: string; // Optional class name prop
}

const ComboBox: React.FC<ComboBoxProps> = ({ options, onSelect, className }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <input
        type="text"
        value={selectedOption}
        placeholder="Select an showtime"
        style={{ fontSize: '16px' }} 
        readOnly
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <ul className="options-list">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelectOption(option)}
              className="option-item"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
