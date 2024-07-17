import DOMPurify from "dompurify";

//import parse from "html-react-parser";
/*export const sanitizeInput = (
  input: string | null | undefined
): React.ReactNode => {
  if (!input) return null;
  console.log("raw: ", input);
  const sanitizeHtml = DOMPurify.sanitize(input);

  const parsed = parse(sanitizeHtml) as React.ReactElement;
  console.log("parsed: ", parsed);
  if (parsed?.props?.children) {
    console.log("There are children");
  }
  return parsed;
  // return parsed?.props?.children || parsed;
};
*/

export const sanitizeInput = (input: string | null | undefined): string => {
  //console.log("Raw input: ", input);
  if (!input) return "";

  const config = {
    ALLOWED_TAGS: [], // Only allow safe tags, or leave empty to allow all (not recommended)
    ALLOWED_ATTR: [], // Only allow safe attributes, or leave empty to allow all (not recommended)
    USE_PROFILES: { html: true },
  };
  const sanitized = DOMPurify.sanitize(input, config);
  if (sanitized !== input) return "";
  //console.log("Sanitized: ", sanitized);
  return sanitized;
};
