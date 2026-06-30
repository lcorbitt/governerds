export const ROOT_CLASS =
  "flex min-h-32 w-full flex-col items-center justify-center gap-2 py-8";

export const MESSAGE_CLASS = "text-muted-foreground text-sm";

export function formatLoadingMessage(resourceName: string): string {
  return `Loading ${resourceName}…`;
}
