import classNames from "classnames";
import React from "react";

export interface LabelProps
  extends React.InputHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, htmlFor, size, ...props }, ref) => {
    return (
      <label
        htmlFor={htmlFor}
        className={classNames(
          "text-[20px] font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";

export default Label;
