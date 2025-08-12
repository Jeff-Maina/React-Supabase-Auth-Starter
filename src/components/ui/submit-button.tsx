import { cn } from "@/lib/utils";
import type { FunctionComponent } from "react";
import { Spinner } from "./spinner";
import { Button, type ButtonProps } from "./button";

interface SubmitButtonProps extends ButtonProps {
  isLoading: boolean;
  pendingText?: string;
}

const SubmitButton: FunctionComponent<SubmitButtonProps> = ({
  isLoading,
  pendingText,
  children,
  className,
  type = "submit",
  ...props
}) => {
  return (
    <Button
      type={type}
      disabled={isLoading}
      className={cn("text-[13px] font-semibold gap-1 ", className)}
      {...props}
    >
      {isLoading ? (
        <>
          <span>{pendingText}</span>
          <Spinner />
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;