"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import classNames from "classnames";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="relative">
        <input
          type={inputType}
          className={classNames(
            "flex h-10 w-full rounded-md border border-muted bg-transparent px-3 py-2 text-[16px] placeholder:italic",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeIcon className="h-4 w-4 text-black/30" />
            ) : (
              <EyeOffIcon className="h-4 w-4 text-black/30" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
