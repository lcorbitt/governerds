import {
  DEFAULT_DESCRIPTION,
  DESCRIPTION_CLASS,
  PAGE_CLASS,
  TITLE_CLASS,
} from "./constants";

interface PublicContentStubProps {
  title: string;
  description?: string;
}

export function PublicContentStub({
  title,
  description = DEFAULT_DESCRIPTION,
}: PublicContentStubProps) {
  return (
    <div className={PAGE_CLASS}>
      <h1 className={TITLE_CLASS}>{title}</h1>
      <p className={DESCRIPTION_CLASS}>{description}</p>
    </div>
  );
}
