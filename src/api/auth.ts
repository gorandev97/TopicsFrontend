import config from "../config";

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
