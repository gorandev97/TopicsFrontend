import React, { useEffect, useState } from "react";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
  initialTitle?: string;
  initialContent?: string;
}

export const CommentModal = ({
  isOpen,
  onClose,
  onSave,
  initialContent = "",
}: CommentModalProps) => {
  const [content, setContent] = useState<string>(initialContent);
  const handleSave = () => {
    if (content.trim()) {
      onSave(content);
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setContent(initialContent);
    }
  }, [isOpen, initialContent]);

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
        <h2 className="text-xl font-bold mb-4">Edit Comment</h2>
        <div className="mb-4">
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
