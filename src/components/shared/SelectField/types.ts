export type SelectFieldOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectFieldOption[];
  disabled?: boolean;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  includeAllOption?: boolean;
  allValue?: string;
  allLabel?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
};
