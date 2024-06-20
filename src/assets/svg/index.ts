import { FC } from "react";
//icons
import loader from "./loader";
import close from "./close";
import success from "./success";
import back from "./back";
import showPassword from "./showPassword";
import hidePassword from "./hidePassword";
import chevron from "./chevron";
import home from "./home";
import downCaret from "./downCaret";
import dashboard from "./dashboard";
import users from "./users";
import admin from "./admin";
import transaction from "./transaction";
import media from "./media";
import cms from "./cms";
import settings from "./settings";
import profit from "./profit";
import loss from "./loss";
import changePassword from "./changePassword";
import logout from "./logout";
import plus from "./plus";
import edit from "./edit";
import activeAdmin from "./activeIcons/activeAdmin";
import activeCms from "./activeIcons/activeCms";
import activeDashboard from "./activeIcons/activeDashboard";
import activeMedia from "./activeIcons/activeMedia";
import activeSettings from "./activeIcons/activeSettings";
import activeTransactions from "./activeIcons/activeTransactions";
import activeUserManagement from "./activeIcons/activeUserManagement";
import notification from "./notification";
import deleteIcon from "./delete";
import lightSpinner from "./lightSpinner";
import editEmail from "./editEmail";
import profile_billing_b from "./profile_billing_b";
import profile_billing_c from "./profile_billing_c";
import profile_info_b from "./porfile_info_b";
import profile_info_c from "./profile_info_c";
import PaidTick from "./PaidTick";
import error from "./error";
import download from "./download";
import deleteSymbol from "./deleteIcon";
import closeIcon from "./closeIcon";
import bell from "./bell";
import binIcon from "./binIcon";
import logout_filled from "./logout_filled";
import lightEye from "./lightEye";
import bluePencil from "./bluePencil";

import lightDelete from "./lightDelete";
import invoice from "./invoice";

import expandMore from "./expandMore";
import modelBell from "./modelBell";
import modelRemove from "./modelRemove";
import ios from "./appleLogo";
import android from "./adnroid";
import Windows from "./windows";
import Mac_OS_X from "./appleLogo";

import greyEditIcon from "./greyEditIcon";
import greyDeleteIcon from "./greyDeleteIcon";
import invoiceID from "./invoiceID";
import copy from "./copy";

interface IconMap {
  [key: string]: FC;
}

const icons: IconMap = {
  loader,
  close,
  success,
  back,
  showPassword,
  hidePassword,
  chevron,
  home,
  downCaret,
  dashboard,
  users,
  admin,
  transaction,
  media,
  cms,
  settings,
  profit,
  loss,
  changePassword,
  logout,
  plus,
  edit,
  activeAdmin,
  activeCms,
  activeDashboard,
  activeMedia,
  activeSettings,
  activeTransactions,
  activeUserManagement,
  notification,
  deleteIcon,
  lightSpinner,
  editEmail,
  profile_billing_b,
  profile_billing_c,
  profile_info_b,
  profile_info_c,
  PaidTick,
  error,
  download,
  closeIcon,
  bell,
  deleteSymbol,
  binIcon,
  logout_filled,
  lightEye,
  bluePencil,

  lightDelete,
  invoice,
  invoiceID,

  expandMore,
  modelBell,
  modelRemove,
  ios,
  Windows,
  Mac_OS_X,
  android,

  greyEditIcon,
  greyDeleteIcon,
  copy,
};

export default icons;
