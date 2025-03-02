import React, { useState } from "react";
import { Button } from "../Button";
import { z } from "zod";

const nameSchema = z
  .string()
  .min(1, { message: "Name is required." })
  .regex(/^[a-zA-Z\s]+$/, {
    message: "Name should only contain letters and spaces.",
  });
const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email address." });

type EditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (firstName: string, lastName: string, email: string) => void;
  firstName: string;
  lastName: string;
  email: string;
};

export const EditUserModal = ({
  isOpen,
  onClose,
  onSave,
  firstName,
  lastName,
  email,
}: EditUserModalProps) => {
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    try {
      nameSchema.parse(formData.firstName);
    } catch (error) {
      if (error instanceof z.ZodError) {
        newErrors.firstName = error.errors[0].message;
      }
    }

    try {
      nameSchema.parse(formData.lastName);
    } catch (error) {
      if (error instanceof z.ZodError) {
        newErrors.lastName = error.errors[0].message;
      }
    }

    try {
      emailSchema.parse(formData.email);
    } catch (error) {
      if (error instanceof z.ZodError) {
        newErrors.email = error.errors[0].message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData.firstName, formData.lastName, formData.email);
      onClose();
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={handleClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <Button type="submit" title={"Update"} />
        </form>
      </div>
    </div>
  );
};
