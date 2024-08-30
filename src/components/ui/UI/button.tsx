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
  children?: React.ReactNode; // Content inside the button
}

// Button component definition
const Button: React.FC<ButtonProps> = ({
  variant = "default", // Default variant
  onClick,
  type = "button", // Default type
  className,
  disabled = false, // Default to not disabled
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
      disabled={disabled} // Apply disabled attribute
    >
      {children} {/* Render children inside the button */}
    </button>
  );
};

export { Button };
