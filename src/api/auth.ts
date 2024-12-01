import { useMutation } from "@tanstack/react-query";
import config from "../config";
import { toast } from "react-toastify";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${config.apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("E-mail or password are incorrect");
  }

  return response.json();
};

export const registerUser = async (credentials: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${config.apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.message || "Registration failed";
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during registration:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred during registration");
      throw new Error("Unknown error occurred");
    }
  }
};
const resetPassword = async (commentData: {
  password?: string;
  token?: string | null;
}) => {
  const response = await fetch(`${config.apiUrl}/auth/reset-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    throw new Error("Failed to update password, please resend the mail");
  }
  return response;
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Reset password successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

const forgotPassword = async (commentData: { email: string }) => {
  const response = await fetch(`${config.apiUrl}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    throw new Error("Failed to update password, please resend the mail");
  }
  return response;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Reset link has been sent to your email");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
