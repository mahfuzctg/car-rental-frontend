// File: components/ui/UI/input.tsx

import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional label prop
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={props.id} className="input-label">
            {label}
          </label>
        )}
        <input ref={ref} {...props} className="input-field" />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
