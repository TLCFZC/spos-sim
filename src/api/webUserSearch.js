import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL_NODE;
// const BASE_URL = "http://localhost:5000";

const getCommonHeaders = (method) => {
  const storedLang = JSON.parse(localStorage.getItem("lang"));
  const language = (storedLang?.language || "EN").toUpperCase();

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const sessionid = userData?.sessionId;

  return {
    "Content-Type": "application/json",
    method,
    Language: language,
    token: sessionid || "",
  };
};

export const viewWebUser = async (params) => {
  try {
    const data = {
      useroption: params.SEARCHOPTION,
      userinput: params.USER,
    };

    const response = await axios.post(
      `${BASE_URL}/web/usersearch/search-user`,
      data,
      { headers: getCommonHeaders("USERS.SEARCHUSER") }
    );

    const responseData = response.data;

    if ([97, 93, 98].includes(responseData.StatusCode)) {
      return { logout: true, message: responseData.StatusMessage };
    }

    if (responseData.StatusCode === 0) {
      return { success: true, webusers: responseData.Data };
    }

    return {
      success: false,
      message: responseData.StatusMessage || "Unknown error",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.StatusMessage || "Server error",
    };
  }
};

export const searchWebUser = async (username) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/web/usersearch/view-user`,
      username,
      { headers: getCommonHeaders("USERS.GETUSERSLIST") }
    );

    const responseData = response.data;

    if ([97, 93, 98].includes(responseData.StatusCode)) {
      return { logout: true, message: responseData.StatusMessage };
    }

    if (responseData.StatusCode === 0) {
      return { success: true, webusers: responseData.Data[0] };
    }

    return {
      success: false,
      message: responseData.StatusMessage || "Unknown error",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.StatusMessage || "Server error",
    };
  }
};
