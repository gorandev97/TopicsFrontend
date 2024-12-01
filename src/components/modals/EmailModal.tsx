import React, { useState } from "react";
import { useForgotPassword } from "../../api/auth";

type NewPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const EmailModal = ({ isOpen, onClose }: NewPasswordModalProps) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { mutate } = useForgotPassword();
  const handleSubmit = () => {
    setError("");
    mutate({ email });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Forgot Password?</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Enter your email:
          </label>
          <input
            type="text"
            id="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
