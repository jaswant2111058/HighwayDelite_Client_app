import { FC } from "react";
//icons
import loader from "./loader";
import lightEye from "./lightEye";
import chevron from "./chevron";
import upArrow from "./upArrow";
import hidePassword from "./hidePassword";
import showPassword from "./showPassword";
interface IconMap {
  [key: string]: FC;
}

const icons: IconMap = {
  loader,
  lightEye,
  chevron,
  upArrow,
  hidePassword,
  showPassword
};

export default icons;
