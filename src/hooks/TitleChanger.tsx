import { useLocation } from "react-router-dom";
import { useChangeTitle } from "./useChangeTitle";
import { TitleChangerProps } from "../types";
import { convertPathToTitle } from "../utilities/convertPathToTitle";

export const TitleChanger = ({ children }: TitleChangerProps) => {
  const location = useLocation();
  const title = convertPathToTitle(location.pathname);
  useChangeTitle(title);
  return children;
};
