import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL_NODE;
// const BASE_URL = "http://localhost:5000";

// Unified handler based on your backend's structure
const makeApiRequest = async (endpoint, payload, extraHeaders = {}) => {
  const storedLang = JSON.parse(localStorage.getItem("lang"));
  const language = (storedLang?.language || "EN").toUpperCase();

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const sessionid = userData?.sessionId;

  const headers = {
    "Content-Type": "application/json",
    Language: language,
    token: sessionid,
    ...extraHeaders,
  };

  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, payload, {
      headers,
      withCredentials: true,
    });

    const responseData = response.data;

    if ([97, 93, 98].includes(responseData.StatusCode)) {
      return {
        logout: true,
        message: responseData?.StatusMessage || "Session expired",
      };
    }

    if (responseData.StatusCode === 0) {
      return {
        success: true,
        data: responseData?.Data || null,
        message: responseData?.StatusMessage || "Success",
      };
    }

    return {
      success: false,
      message: responseData?.StatusMessage || "Operation failed",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.StatusMessage ||
        error.message ||
        "Unexpected error",
    };
  }
};

// ========== API Methods ==========

export const lockWebUser = (username) =>
  makeApiRequest(
    "/web/userupdate/update-lock",
    { username },
    { method: "USERS.LOCKUSER" }
  );

export const unlockWebUser = (username) =>
  makeApiRequest(
    "/web/userupdate/update-unlock",
    { username },
    { method: "USERS.UNLOCKUSER" }
  );

export const activeWebUser = (username) =>
  makeApiRequest(
    "/web/userupdate/update-active",
    { username },
    { method: "USERS.ACTIVATEUSER" }
  );

export const deactiveWebUser = (username) =>
  makeApiRequest(
    "/web/userupdate/update-deactive",
    { username },
    { method: "USERS.DEACTIVATEUSER" }
  );

export const resetWebUser = (username) =>
  makeApiRequest(
    "/web/userupdate/reset-user",
    { username },
    { method: "USERS.RESETPASSWORD" }
  );

export const updateWebUser = (formData) =>
  makeApiRequest(
    "/web/userupdate/update-user",
    {
      id: formData.userId,
      email: formData.email,
      username: formData.username,
      firstname: formData.firstname,
      lastname: formData.lastname,
      msisdn: formData.msisdn,
      userslevel: formData.userslevel,
      department: formData.department,
      company: formData.company,
      status: formData.status,
      msisdnotp: formData.otp,
      locked: formData.locked,
    },
    { method: "USERS.UPDATEUSER" }
  );
