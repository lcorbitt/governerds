import { Spinner } from "@/components/shared/Spinner";
import { cn } from "@/lib/utils";

import { MESSAGE_CLASS, ROOT_CLASS, formatLoadingMessage } from "./constants";

interface LoadingStateProps {
  /** Human-readable resource fragment, e.g. "users" → "Loading users…" */
  resourceName: string;
  className?: string;
}

/**
 * Centered client-side loading UI for cards, sections, and tables. Use after
 * initial page paint when TanStack Query (or similar) is fetching data.
 */
export function LoadingState({ resourceName, className }: LoadingStateProps) {
  const message = formatLoadingMessage(resourceName);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className={cn(ROOT_CLASS, className)}
    >
      <Spinner size="md" />
      <p className={MESSAGE_CLASS}>{message}</p>
    </div>
  );
}
