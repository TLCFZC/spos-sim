import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL_NODE;
// const BASE_URL = "http://localhost:5000";

export const GetAuditTrail = async (data) => {
  const { userinput, datefrom, dateto } = data.formData;

  try {
    const storedLang = JSON.parse(localStorage.getItem("lang"));
    const language = (storedLang?.language || "EN").toUpperCase();

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const sessionid = userData?.sessionId;

    const response = await axios.post(
      `${BASE_URL}/audit/get-audit-trail`,
      {
        userid: userinput,
        datefrom: datefrom,
        dateto: dateto,
      },
      {
        headers: {
          "Content-Type": "application/json",
          method: "USERS.GETAUDITTRAILS",
          Language: `${language}`,
          token: `${sessionid}`,
        },
      }
    );

    const result = response.data;

    if (
      result.StatusCode === 97 ||
      result.StatusCode === 93 ||
      result.StatusCode === 98
    ) {
      return { logout: true, message: result?.StatusMessage };
    } else if (result.StatusCode === 0) {
      return {
        success: true,
        audit: result.Data,
        message: result.StatusMessage,
      };
    } else {
      return { success: false, message: result.StatusMessage };
    }
  } catch (error) {
    return Promise.reject({
      success: false,
      message: error.response?.result?.StatusMessage || error.message,
    });
  }
};
