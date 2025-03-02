import React, { useState } from "react";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long." })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number." });

type NewPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (password: string) => void;
};

export const NewPasswordModal = ({
  isOpen,
  onClose,
  onSave,
}: NewPasswordModalProps) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    try {
      passwordSchema.parse(newPassword);

      if (newPassword !== repeatPassword) {
        setError("Passwords do not match.");
        return;
      }

      setError("");
      onSave(newPassword);
      onClose();
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(validationError.errors[0].message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Set New Password</h2>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="w-full border rounded px-3 py-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="repeatPassword"
          >
            Repeat Password
          </label>
          <input
            type="password"
            id="repeatPassword"
            className="w-full border rounded px-3 py-2"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
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
