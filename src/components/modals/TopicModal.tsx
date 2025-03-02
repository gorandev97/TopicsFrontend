import React, { useEffect, useState } from "react";
import { DropDown } from "../topics/CategoryDropdown";
import { TopicCategory } from "../../interfaces/interfaces";
import { z } from "zod";

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

export const topicSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty.")
    .max(60, "Title cannot exceed 60 characters."),
  content: z.string().min(1, "Content cannot be empty."),
  category: z.string().min(1, "Category cannot be empty."),
  file: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        if (file instanceof File) {
          return file.size <= 5 * 1024 * 1024;
        }
        return false;
      },
      {
        message: "File size should not exceed 5MB.",
      }
    ),
});

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleSave = () => {
    const result = topicSchema.safeParse({ title, content, category, file });
    if (!result.success) {
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      return;
    }
    onSave(title, content, category, file ?? undefined);
    onClose();
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

    setTitle(newTitle);
  };

  const [category, setCategory] = useState(initialCategory);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      const img = new Image();
      img.onload = () => {
        if (img.width > 1024 || img.height > 1024) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            file: "Image dimensions should not exceed 1024x1024 pixels.",
          }));
          return;
        }
        if (selectedFile.size > 5 * 1024 * 1024) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            file: "Image size should be less than 5MB.",
          }));
          return;
        }
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.file;
          return newErrors;
        });
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
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Category*
          </label>
          <DropDown
            className=" w-auto bg-white border border-gray-200 rounded-lg py-2 px-4 flex justify-between items-center relative cursor-pointer"
            selectedItem={category ?? initialCategory}
            setSelectedItem={setCategory}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            items={Object.keys(TopicCategory).filter(
              (category) => category !== "All"
            )}
            isCategory={true}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>
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
          {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
        </div>
        <div className="mb-2">
          <label htmlFor="content" className="block text-sm font-medium">
            Content*
          </label>
          <textarea
            id="content"
            value={content ?? initialContent}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-md h-[200px]"
            placeholder="Topic content"
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content}</p>
          )}
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
            className={`px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer `}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
