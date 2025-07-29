import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL_NODE;

export const transactionTypeCol = async () => {
  const data = JSON.stringify({ "": "" });

  const response = await axios.post(
    `${BASE_URL}/reports/transactionTypeCollection`,
    data
  );

  const responseData = response.data;

  if (
    responseData &&
    responseData.StatusMessage === "Successfully fetch data"
  ) {
    return { success: true, transactType: responseData.Data };
  } else {
    return {
      success: false,
      message: responseData?.StatusMessage || "Unknown error",
    };
  }
};

export const requestReport = async (formData) => {
  const response = await axios.post(
    `${BASE_URL}/reports/requestReport`,
    formData
  );
  return response.data;
};

export const generateReview = async () => {
  const data = JSON.stringify({ "": "" });

  const response = await axios.post(`${BASE_URL}/reports/generateReview`, data);

  const responseData = response.data;
  const param = JSON.parse(responseData.Data);

  // Extract all DATEFROM values into an array
  const dateFromArray = param.map((item) => {
    const parameters = JSON.parse(item.PARAMETERS);
    return parameters.DATEFROM;
  });

  // Extract all DATETO values into an array
  const dateToArray = param.map((item) => {
    const parameters = JSON.parse(item.PARAMETERS);
    return parameters.DATETO;
  });

  // Extract all DATETO values into an array
  const transTypeArray = param.map((item) => {
    const parameters = JSON.parse(item.PARAMETERS);
    return parameters.TRANSTYPE;
  });

  if (
    responseData &&
    responseData.StatusMessage === "Successfully fetch data"
  ) {
    return {
      success: true,
      rowData: responseData.Data,
      dateFrom: dateFromArray,
      dateTo: dateToArray,
      transType: transTypeArray,
    };
  } else {
    return {
      success: false,
      message: responseData?.StatusMessage || "Unknown error",
    };
  }
};

export const generateDataPDF = async (id) => {
  const payload = {
    ID: id,
  };

  const response = await axios.post(
    `${BASE_URL}/reports/generateDataPDF`,
    payload
  );

  const responseData = response.data;

  if (responseData && responseData.message === "Successfully fetch data") {
    return {
      success: true,
      data: responseData.Data,
      dataFile: responseData.data,
    };
  } else {
    return {
      success: false,
      message: responseData?.StatusMessage || "Unknown error",
    };
  }
};

export const downloadPDF = async (pdfData, reportName) => {
  const payload = {
    data: pdfData,
    reportName: reportName,
  };

  const response = await axios.post(
    `${BASE_URL}/reports/downloadPDF`,
    payload,
    { responseType: "blob" }
  );

  // Create a URL for the PDF blob
  const pdfBlob = new Blob([response.data], { type: "application/pdf" });
  const pdfURL = URL.createObjectURL(pdfBlob);

  // Create a temporary link and trigger download
  const link = document.createElement("a");
  link.href = pdfURL;
  link.download = `${reportName.replace(/\s+/g, "_")}_${new Date()
    .toISOString()
    .replace(/\D/g, "")
    .slice(0, 14)}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadCSV = async (id) => {
  const payload = {
    ID: id.toString(),
  };

  const response = await axios.post(`${BASE_URL}/reports/downloadCSV`, payload);

  const responseData = response.data;

  if (
    responseData &&
    responseData.message === "Successfully fetch data download path"
  ) {
    return {
      success: true,
      data: responseData.Data,
      dataFile: responseData.data,
    };
  } else {
    return {
      success: false,
      message: responseData?.StatusMessage || "Unknown error",
    };
  }
};
