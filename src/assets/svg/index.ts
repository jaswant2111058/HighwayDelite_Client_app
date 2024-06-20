import { FC } from "react";
//icons
import loader from "./loader";
import lightEye from "./lightEye";


interface IconMap {
  [key: string]: FC;
}

const icons: IconMap = {
  loader,
  lightEye,
};

export default icons;
