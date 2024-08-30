import React from "react";

// Add "danger" to the list of possible variants
type ButtonVariant =
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "primary"
  | "danger"; // Added "danger"

// Define the props for the Button component
interface ButtonProps {
  variant?: ButtonVariant; // Optional variant prop
  onClick?: () => void; // Optional click handler
  type?: "button" | "submit" | "reset"; // Button type
  className?: string; // Additional CSS classes
  disabled?: boolean; // Optional disabled state
  loading?: boolean; // Added loading state
  children?: React.ReactNode; // Content inside the button
}

// Button component definition
const Button: React.FC<ButtonProps> = ({
  variant = "default", // Default variant
  onClick,
  type = "button", // Default type
  className,
  disabled = false, // Default to not disabled
  loading = false, // Default to not loading
  children,
}) => {
  // Map variant to CSS classes
  const variantClass = {
    link: "text-blue-500 underline",
    default: "bg-gray-300 text-black",
    destructive: "bg-red-500 text-white",
    outline: "border border-gray-300 text-gray-700",
    secondary: "bg-gray-500 text-white",
    ghost: "bg-transparent text-gray-700",
    primary: "bg-blue-500 text-white",
    danger: "bg-red-600 text-white", // Added styling for "danger"
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variantClass} px-4 py-2 rounded ${className}`}
      disabled={disabled || loading} // Apply disabled attribute if loading
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 4V2l-4 4 4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6V6h-2v12c3.31 0 6-2.69 6-6s-2.69-6-6-6z" />
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        children // Render children inside the button
      )}
    </button>
  );
};

export { Button };
