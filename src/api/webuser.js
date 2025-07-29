import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL_NODE;
// const BASE_URL = "http://localhost:5000";

export const userLevelCol = async () => {
  const data = JSON.stringify({ "": "" });

  try {
    const storedLang = JSON.parse(localStorage.getItem("lang"));
    const language = storedLang?.language?.toUpperCase() || "EN";

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const sessionid = userData?.sessionId;

    const response = await axios.post(
      `${BASE_URL}/web/userslevel/getuserlevels`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          method: "USERS.GETUSERSLEVELS",
          Language: language,
          token: sessionid,
        },
        withCredentials: true,
      }
    );

    const resData = response.data;

    // Handle session invalidation or expired
    if ([97, 93, 98].includes(resData.StatusCode)) {
      return { logout: true, message: resData?.StatusMessage };
    }

    if (resData.StatusCode === 0) {
      return { success: true, level: resData.Data };
    }

    // Handle known failure from backend (StatusCode: 1 or others)
    return {
      success: false,
      message: resData?.StatusMessage || "Something went wrong",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.StatusMessage || error.message,
    };
  }
};

export const registerWebUser = async (formData) => {
  const data = {
    username: formData.username,
    msisdn: formData.msisdn,
    msisdnotp: formData.otpMsisdn,
    firstname: formData.firstName,
    lastname: formData.lastName,
    email: formData.email,
    company: formData.company,
    department: formData.department,
    userslevel: formData.userLevel || "admin",
    status: formData.status,
  };

  try {
    const storedLang = JSON.parse(localStorage.getItem("lang"));
    const language = storedLang?.language?.toUpperCase() || "EN";

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const sessionid = userData?.sessionId;

    const response = await axios.post(`${BASE_URL}/web/registeruser`, data, {
      headers: {
        "Content-Type": "application/json",
        method: "USERS.REGISTER",
        Language: language,
        token: sessionid,
      },
      withCredentials: true,
    });

    const resData = response.data;

    if ([97, 93, 98].includes(resData.StatusCode)) {
      return { logout: true, message: resData?.StatusMessage };
    }

    if (resData.StatusCode === 0) {
      return {
        success: true,
        message: resData.StatusMessage,
        data: resData.data,
      };
    } else if (resData.StatusCode === 1) {
      return {
        success: false,
        message: resData.StatusMessage,
      };
    }

    return {
      success: false,
      message: resData?.StatusMessage || "Failed to register user",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.StatusMessage || error.message,
    };
  }
};
