/**
 * Inline form field error. Uses `role="alert"` so screen readers announce
 * validation problems as they appear.
 */
export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-destructive text-sm font-medium">
      {message}
    </p>
  );
}
