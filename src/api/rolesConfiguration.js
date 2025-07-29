import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL_NODE;
// const BASE_URL = "http://localhost:5000";

export const getRolesConfigTable = async (data) => {
  try {
    const storedLang = JSON.parse(localStorage.getItem("lang"));
    const language = (storedLang?.language || "EN").toUpperCase();

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const sessionid = userData?.sessionId;

    const response = await axios.post(
      `${BASE_URL}/web/rolesconfig/get-roles`,
      { userslevel: data },
      {
        headers: {
          "Content-Type": "application/json",
          method: "USERS.GETROLES",
          Language: `${language}`,
          token: `${sessionid}`,
        },
      }
    );

    const responseData = response.data;

    if (
      responseData.StatusCode === 97 ||
      responseData.StatusCode === 93 ||
      responseData.StatusCode === 98
    ) {
      return { logout: true, message: responseData?.StatusMessage };
    } else if (responseData.StatusCode === 0) {
      return {
        success: true,
        roles: responseData.Data,
        message: responseData.StatusMessage,
      };
    } else {
      return { success: false, message: responseData.StatusMessage };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.StatusMessage || error.message,
    };
  }
};

export const updateRoles = async (userLevel, id, module, actionStatus) => {
  try {
    const storedLang = JSON.parse(localStorage.getItem("lang"));
    const language = (storedLang?.language || "EN").toUpperCase();

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const sessionid = userData?.sessionId;

    const response = await axios.post(
      `${BASE_URL}/web/rolesconfig/update-roles`,
      {
        userslevel: userLevel,
        id: id,
        module: module,
        actionstatus: actionStatus,
      },
      {
        headers: {
          "Content-Type": "application/json",
          method: "USERS.UPDATEROLES",
          Language: `${language}`,
          token: `${sessionid}`,
        },
      }
    );

    const responseData = response.data;

    if (
      responseData.StatusCode === 97 ||
      responseData.StatusCode === 93 ||
      responseData.StatusCode === 98
    ) {
      return { logout: true, message: responseData?.StatusMessage };
    } else if (responseData.StatusCode === 0) {
      return {
        success: true,
        newRole: responseData.Data,
        message: responseData.StatusMessage,
      };
    } else {
      return {
        success: false,
        message: responseData.StatusMessage || "Unknown error",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.StatusMessage || error.message,
    };
  }
};
