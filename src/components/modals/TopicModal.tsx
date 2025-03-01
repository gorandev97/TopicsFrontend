import React, { useEffect, useState } from "react";
import { DropDown } from "../topics/CategoryDropdown";
import { TopicCategory } from "../../interfaces/interfaces";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    title: string,
    content: string,
    category: string,
    file?: File
  ) => void;
  initialTitle?: string;
  initialContent?: string;
  initialCategory?: string;
  initialPicture?: string;
}

export const TopicModal = ({
  isOpen,
  onClose,
  onSave,
  initialTitle = "",
  initialContent = "",
  initialCategory = "",
  initialPicture = "",
}: ModalProps) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [content, setContent] = useState<string>(initialContent);
  const [titleError, setTitleError] = useState<string>("");

  const handleSave = () => {
    if (title.trim() && content.trim() && category) {
      onSave(title, content, category, file ?? undefined);
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
  const [file, setFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>("");

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      const img = new Image();
      img.onload = () => {
        if (img.width > 1024 || img.height > 1024) {
          setImageError("Image dimensions should not exceed 1024x1024 pixels.");
          return;
        }
        if (selectedFile.size > 5 * 1024 * 1024) {
          setImageError("File size should not exceed 5MB.");
          return;
        }
        setImageError("");
        setFile(selectedFile);
      };
      img.src = URL.createObjectURL(selectedFile);
    }
  };
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
            Title*
          </label>
          <input
            id="title"
            type="text"
            value={title ?? initialTitle}
            onChange={handleTitleChange}
            maxLength={60}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Topic title"
          />
          {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
        </div>
        <label htmlFor="title" className="block text-sm font-medium">
          Category*
        </label>
        <DropDown
          className=" w-auto bg-white border border-gray-200 rounded-lg py-2 px-4 flex justify-between items-center relative cursor-pointer"
          selectedItem={category ?? initialCategory}
          setSelectedItem={setCategory}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          items={Object.keys(TopicCategory)}
          isCategory={true}
        />
        <div className="mb-4  mt-4">
          <label htmlFor="file" className="block text-sm font-medium">
            Upload Image
          </label>
          <div className="flex items-center">
            <input
              type="file"
              id="file"
              onChange={(e) => {
                handleImageUpload(e);
              }}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => document.getElementById("file")?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
            >
              Choose File
            </button>
            {file ? (
              <span className="ml-2 text-sm text-gray-600">{file.name}</span>
            ) : initialPicture ? (
              <span className="ml-2 text-sm text-gray-600">
                {initialPicture}
              </span>
            ) : null}
          </div>
          {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
        </div>
        <div className="mb-2">
          <label htmlFor="content" className="block text-sm font-medium">
            Content*
          </label>
          <textarea
            id="content"
            value={content ?? initialContent}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md h-[200px]"
            placeholder="Topic content"
          />
        </div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-500 mb-4"
        >
          Fields marked with * are required.
        </label>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer ${
              titleError !== "" || imageError !== ""
                ? "border border-red-500 cursor-not-allowed"
                : ""
            }`}
            disabled={titleError !== "" || imageError !== ""}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
