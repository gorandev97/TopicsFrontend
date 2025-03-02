import { useEffect, useRef } from "react";
import { getTopicCategoryString } from "../../helper/calculations";
import { TopicCategory } from "../../interfaces/interfaces";

interface DropDownProps {
  className: string;
  selectedItem: string;
  setSelectedItem: (category: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  items: string[];
  isCategory?: boolean;
}

export const DropDown = ({
  className,
  selectedItem,
  setSelectedItem,
  isDropdownOpen,
  setIsDropdownOpen,
  items,
  isCategory = false,
}: DropDownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={className}
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      {isCategory && selectedItem !== ""
        ? getTopicCategoryString(selectedItem as TopicCategory)
        : selectedItem !== ""
        ? selectedItem
        : "Category"}

      <div
        className={`transform transition-transform duration-300 ml-4 ${
          isDropdownOpen ? "rotate-180" : ""
        }`}
      >
        <i className="ri-arrow-down-line"></i>
      </div>
      {isDropdownOpen && (
        <div
          className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 top-10 overflow-x-auto h-[200px] z-[9999]"
          ref={dropdownRef}
        >
          <div className="py-1">
            {items.map((value, index) => (
              <div
                key={index}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setIsDropdownOpen(false);
                  setSelectedItem(value);
                }}
              >
                {isCategory
                  ? getTopicCategoryString(value as TopicCategory)
                  : value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
