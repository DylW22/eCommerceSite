import DOMPurify from "dompurify";

export const sanitizeInput = (input: string | null | undefined): string => {
  if (!input) return "";

  const config = {
    ALLOWED_TAGS: [], // Only allow safe tags, or leave empty to allow all (not recommended)
    ALLOWED_ATTR: [], // Only allow safe attributes, or leave empty to allow all (not recommended)
    USE_PROFILES: { html: true },
  };
  const sanitized = DOMPurify.sanitize(input, config);
  if (sanitized !== input) return "";
  return sanitized;
};
