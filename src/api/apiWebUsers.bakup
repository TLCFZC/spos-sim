import axios from "axios";

const userData = JSON.parse(localStorage.getItem("userData") || "{}"); 
const sessionid = userData?.sessionId; // Get sessionId safely

// const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = 'http://localhost:5000';

/**
 * 
 * @param {string} endpoint 
 * @param {object} payload 
 * @returns {Promise<object>} 
 */
const makeApiRequest = async (endpoint, payload, header) => {
  try {
    console.log("payload: ", payload)
    // const response = await axios.post(`${BASE_URL}${endpoint}`, payload);
    const response = await axios.post(`${BASE_URL}${endpoint}`, payload, header);
    const responseData = response.data;

    if (responseData && (responseData.StatusMessage === "Success" || responseData.success) ) {
      return { success: true, webusers: responseData.Accounts || null, message: responseData?.StatusMessage || null };
    } else {
      return { success: false, message: responseData?.StatusMessage || "Unknown error" };
    }
  } catch (error) {
    throw error;
  }
};

// Define API functions
// export const viewWebUser = (params) => makeApiRequest("/webuser/viewWebUser", params);
// export const searchWebUser = (username) => makeApiRequest("/webuser/searchWebUser", { username });

// export const lockWebUser = (username) => makeApiRequest("/webuser/lockWebUser", { username });
// export const unlockWebUser = (username) => makeApiRequest("/webuser/unlockWebUser", { username });
// export const activeWebUser = (username) => makeApiRequest("/webuser/activeWebUser", { username });
// export const deactiveWebUser = (username) => makeApiRequest("/webuser/deactiveWebUser", { username });
// export const resetWebUser = (username) => makeApiRequest("/webuser/resetWebUser", { username });
// export const updateWebUser = (formData) => makeApiRequest("/webuser/updateWebUser", { formData });

export const lockWebUser = (username) => makeApiRequest("/web/userupdate/update-lock", { username }, {
  headers: {
    'Content-Type': 'application/json',
    'method': 'USERS.LOCKUSER',
    'Language': 'EN',
    "token": `${sessionid}`,
  },
});
export const unlockWebUser = (username) => makeApiRequest("/web/userupdate/update-unlock", { username }, {
  headers: {
    'Content-Type': 'application/json',
    'method': 'USERS.UNLOCKUSER',
    'Language': 'EN',
    "token": `${sessionid}`,
  },
});
export const activeWebUser = (username) => makeApiRequest("/web/userupdate/update-active", { username }, {
  headers: {
    'Content-Type': 'application/json',
    'method': 'USERS.ACTIVATEUSER',
    'Language': 'EN',
    "token": `${sessionid}`,
  },
});
export const deactiveWebUser = (username) => makeApiRequest("/web/userupdate/update-deactive", { username }, {
  headers: {
    'Content-Type': 'application/json',
    'method': 'USERS.DEACTIVATEUSER',
    'Language': 'EN',
    "token": `${sessionid}`,
  },
});
export const resetWebUser = (username) => makeApiRequest("/web/userupdate/reset-user", { username }, {
  headers: {
    'Content-Type': 'application/json',
    'method': 'USERS.RESETPASSWORD',
    'Language': 'EN',
    "token": `${sessionid}`,
  },
});
export const updateWebUser = (formData) => makeApiRequest("/web/userupdate/update-user", { 
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
  msisdn: formData.msisdn,
  msisdnotp: formData.otp,
  locked: formData.locked
 }, {
  headers: {
    'Content-Type': 'application/json',
    'method': 'USERS.UPDATEUSER',
    'Language': 'EN',
    "token": `${sessionid}`,
  },
 });