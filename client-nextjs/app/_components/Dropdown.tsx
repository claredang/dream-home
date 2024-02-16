import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

interface Option {
  text: string;
  onClick: () => void;
}

interface DropDownProps {
  options: Option[];
  icon?: React.ReactNode; // This allows passing any JSX element as an icon
  buttonText?: string;
}

const Dropdown = ({ options, icon, buttonText }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full py-6 pb-8">
      <div className="relative inline-block">
        <button
          type="button"
          className="px-2 py-2 bg-white border-[1px] border-bg-black hover:bg-slate-200 rounded-full text-sm inline-flex items-center"
          onClick={toggleDropdown}
        >
          {icon || <HiDotsVertical />}{" "}
          {/* Use custom icon if provided, else use default */}
          {buttonText && <span className="ml-2">{buttonText}</span>}
        </button>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <ul
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {options.map((option, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      option.onClick();
                      closeDropdown();
                    }}
                  >
                    {option.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
