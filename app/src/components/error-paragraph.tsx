import classNames from "classnames";
import React from "react";

interface ParagraphProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ErrorParagraph = ({ children, className, ...rest }: ParagraphProps) => (
  <>
    {children ? (
      <p
        {...rest}
        className={classNames("text-start text-sm text-red-400", className)}
      >
        {children}
      </p>
    ) : null}
  </>
);

export { ErrorParagraph };
