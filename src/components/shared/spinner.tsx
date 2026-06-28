import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import {
  SPINNER_BASE_CLASS,
  SPINNER_MD_CLASS,
  SPINNER_SM_CLASS,
} from "./spinner/constants";

type SpinnerSize = "sm" | "md";

interface SpinnerProps extends Omit<ComponentProps<typeof Loader2>, "size"> {
  size?: SpinnerSize;
}

/**
 * Accessible loading spinner. Use inside a `role="status"` container when the
 * spinner is the sole loading indicator on screen.
 */
export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  return (
    <Loader2
      aria-hidden
      className={cn(
        SPINNER_BASE_CLASS,
        size === "sm" ? SPINNER_SM_CLASS : SPINNER_MD_CLASS,
        className,
      )}
      {...props}
    />
  );
}
