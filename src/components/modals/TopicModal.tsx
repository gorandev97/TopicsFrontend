import React, { useEffect, useState } from "react";
import { DropDown } from "../topics/CategoryDropdown";
import { TopicCategory } from "../../interfaces/interfaces";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string, category: string) => void;
  initialTitle?: string;
  initialContent?: string;
  initialCategory?: string;
}

export const TopicModal = ({
  isOpen,
  onClose,
  onSave,
  initialTitle = "",
  initialContent = "",
  initialCategory = "",
}: ModalProps) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [content, setContent] = useState<string>(initialContent);
  const [titleError, setTitleError] = useState<string>("");

  const handleSave = () => {
    if (title.trim() && content.trim() && category) {
      onSave(title, content, category);
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setContent(initialContent);
      setCategory(initialCategory);
    }
  }, [isOpen, initialTitle, initialContent, initialCategory]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (newTitle.length > 60) {
      setTitleError("Title cannot exceed 60 characters.");
    } else {
      setTitleError("");
    }
    setTitle(newTitle);
  };

  const [category, setCategory] = useState(initialCategory);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">
          {title ? "Edit Topic" : "Create Topic"}
        </h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title ?? initialTitle}
            onChange={handleTitleChange}
            maxLength={60} // Set maxLength for the title
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Topic title"
          />
          {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
        </div>
        <DropDown
          className=" w-auto bg-white border border-gray-200 rounded-lg py-2 px-4 flex justify-between items-center relative cursor-pointer"
          selectedItem={category ?? initialCategory}
          setSelectedItem={setCategory}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          items={Object.keys(TopicCategory)}
          isCategory={true}
        />
        <div className="mb-4 mt-4">
          <label htmlFor="content" className="block text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            value={content ?? initialContent}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md h-[200px]"
            placeholder="Topic content"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
