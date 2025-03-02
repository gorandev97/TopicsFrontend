import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/auth";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "First name should only contain letters and spaces.",
    }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Last name should only contain letters and spaces.",
    }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

const RegisterModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem("userToken", data.access_token);
      navigate("/dashboard");
      onClose();
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    try {
      registerSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate(formData);
    }
  };

  const handleClose = () => {
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={handleClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <div className="relative">
                <input
                  id={field}
                  name={field}
                  type={field === "password" && showPassword ? "text" : field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {field === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                )}

                {errors[field] && (
                  <p className="text-red-500 text-sm">{errors[field]}</p>
                )}
              </div>
            </div>
          ))}
          <Button
            type="submit"
            isDisabled={mutation.isPending}
            title={mutation.isPending ? "Registering..." : "Register"}
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
