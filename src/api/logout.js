import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL_NODE;
// const BASE_URL = "http://localhost:5000";

export const verifyLogout = async () => {
  try {
    const storedLang = JSON.parse(localStorage.getItem("lang"));
    const language = (storedLang?.language || "EN").toUpperCase();

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const sessionid = userData?.sessionId;

    const response = await axios.post(
      `${BASE_URL}/web/auth/logout`,
      { sessionid },
      {
        headers: {
          "Content-Type": "application/json",
          Language: `${language}`,
          token: `${sessionid}`,
        },
      }
    );

    if (
      response.data.StatusCode === 97 ||
      response.data.StatusCode === 93 ||
      response.data.StatusCode === 98
    ) {
      return { logout: true, message: response?.StatusMessage };
    } else if (response.data.StatusCode === 0) {
      return {
        success: true,
        message: response.data.StatusMessage,
      };
    } else {
      return {
        message: response.data.StatusMessage,
      };
    }
  } catch (error) {
    return Promise.reject({
      success: false,
      message: error,
    });
  }
};
