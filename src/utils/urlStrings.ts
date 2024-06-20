export const getUser = "/auth/user/";
export const login = "/auth/admin-login/";
export const forgotPassword = "/auth/forgot-password/send-otp/";
export const forgotPasswordVerify = "/auth/forgot-password/verify/";
export const changePassword = "/auth/change-password/";
export const uploadImage = "/auth/user/";
export const getAdminUsers = (
  pageNo: number,
  limit: number,
  full_name?: string,
  start_date?: string,
  end_date?: string,
  country?: string,
) => {
  let offset = (pageNo - 1) * limit;
  let url = `/siteadmin/users/filter?offset=${offset}`;
  if (limit) url += `&limit=${limit}`;
  if (full_name) url += `&full_name=${full_name}`;
  if (start_date) url += `&start_date=${start_date}`;
  if (end_date) url += `&end_date=${end_date}`;
  if (country) url += `&country_name=${country}`;
  return url;
};
export const updateAdminUser = (id: string) => `/siteadmin/users/${id}/`;
export const addNewUser = "/auth/signup/";
export const userUtils = (id: string) => `/siteadmin/user-util/${id}/`;

export const getusersInvoice = (offset: number, limit: number) =>
  `/siteadmin/invoices?offset=${offset}&limit=${limit}`;
export const getuserInvoice = (invoice_id: string) =>
  `/siteadmin/invoices/${invoice_id}/`;
export const downloadInvoice = "/payments/download-invoice/";

// media management url

export const getAllUserModels = "/siteadmin/models";
export const getIndividualUserModels = (user_id: string) =>
  `/siteadmin/models/?user_id=${user_id}`;
export const getAllFiles = (model_id: string) =>
  `/proj/get-files/?model_id=${model_id}`;
export const getAdminUserDetails = (user_id: string) =>
  `/siteadmin/users/${user_id}`;
export const pushNotification = "/notifications/push";
export const deleteModels = "/proj/delete-model/";

export const filterInvoice = (start_date: string, end_date: string) =>
  `/siteadmin/invoices/filter?start_date=${start_date}&end_date=${end_date}`;
export const filterUser = (start_date: string, end_date: string) =>
  `/siteadmin/users/filter?start_date=${start_date}&end_date=${end_date}`;
export const retriveModel = (model_id: string | undefined) =>
  `/proj/retrieve-model/${model_id}`;
export const refreshToken = "/auth/token-update/";

export const searchUserInvoice = (full_name: string, pageNo: number) => {
  return `/siteadmin/invoices/?search=${full_name}&limit=10&offset=${pageNo}`;
};

// dashborad urls

export const getUsersStat = (
  start_date: string,
  end_date: string,
  param_string: string,
) => {
  let url = `/siteadmin/total-user/?`;
  if (param_string) {
    url += `${param_string}=true`;
  } else url += `start_date=${start_date}&end_date=${end_date}`;
  return url;
};
export const getMediaStat = (
  start_date: string,
  end_date: string,
  param_string: string,
) => {
  let url = `/siteadmin/media-stat/?`;
  if (param_string) {
    url += `${param_string}=true`;
  } else url += `start_date=${start_date}&end_date=${end_date}`;
  return url;
};
export const getModalData = (
  start_date: string,
  end_date: string,
  param_string: string,
) => {
  let url = `/siteadmin/model-data/?`;
  if (param_string) {
    url += `${param_string}=true`;
  } else url += `start_date=${start_date}&end_date=${end_date}`;
  return url;
};
export const getCountryData = (
  start_date: string,
  end_date: string,
  param_string: string,
) => {
  let url = `/siteadmin/country-data/?`;
  if (param_string) {
    url += `${param_string}=true`;
  } else url += `start_date=${start_date}&end_date=${end_date}`;
  return url;
};
export const getSalesStat = (
  start_date: string,
  end_date: string,
  param_string: string,
) => {
  let url = `/siteadmin/sales-stat/?`;
  if (param_string) {
    url += `${param_string}=true`;
  } else url += `start_date=${start_date}&end_date=${end_date}`;
  return url;
};
export const billingDetailsUrl = (userId: string) => {
  return `/siteadmin/address/${userId}/`;
};

// admin management url

export const getAdminUsersUrl = "/siteadmin/admin/";
export const getSuperAdminDetailsUrl = "/siteadmin/super-admin/";
export const addAdminUserUrl = "/siteadmin/admin/";
export const updateAdminPermissionsUrl = "/siteadmin/admin/";
export const removeAdminUserUrl = "/siteadmin/admin/";
export const transferOwnerOtpSend = "/siteadmin/transfer-owner-otp-send/";
export const transferOwnerOtpVerify = "/siteadmin/transfer-owner-otp-verify/";
export const transferOwnerOtpResend = "/siteadmin/transfer-owner-otp-resend/";
