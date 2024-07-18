import { ValidPath } from "../types";
import { pathData } from "../data/pathData";
export const convertPathToTitle = (path: string) => {
  const title = pathData[path as ValidPath] || "Unknown";
  return title;
};
