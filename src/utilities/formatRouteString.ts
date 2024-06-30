export function formatRouteString(str: string) {
  if (str.length > 1 && str.endsWith("/")) {
    return str.slice(0, -1); // Remove the last character
  }
  return str; // No trailing slash to remove
}
