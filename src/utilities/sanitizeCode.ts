import DOMPurify from "dompurify";
import parse from "html-react-parser";
export const sanitizeInput = (
  input: string | null | undefined
): React.ReactNode => {
  if (!input) return null;
  console.log(input);
  const sanitizeHtml = DOMPurify.sanitize(input);

  const parsed = parse(sanitizeHtml) as React.ReactElement;
  return parsed?.props?.children || parsed;
};
