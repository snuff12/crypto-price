import { Dispatch, SetStateAction } from "react";

export interface IDropdown {
  onClickElement: Dispatch<SetStateAction<string>>;
  title: string;
  elements: string[];
}
