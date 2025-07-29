// Generic mock API function
const mockApi = (data, delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const fetchPieData = () =>
  mockApi([
    { name: "Success", value: 115 },
    { name: "Failed", value: 5 },
  ]);

export const fetchTerminalData = () =>
  mockApi([
    {
      merchant: "M001",
      terminal: "T001",
      serial: "SN12345",
      status: "Active",
      date: "2024-01-15",
      transactions: 120,
      amount: 12400,
    },
    {
      merchant: "M002",
      terminal: "T002",
      serial: "SN12346",
      status: "Inactive",
      date: "2023-12-10",
      transactions: 85,
      amount: 9800,
    },
    {
      merchant: "M003",
      terminal: "T003",
      serial: "SN12346",
      status: "Active",
      date: "2023-12-10",
      transactions: 85,
      amount: 9800,
    },
    {
      merchant: "M004",
      terminal: "T004",
      serial: "SN12346",
      status: "Active",
      date: "2023-12-10",
      transactions: 85,
      amount: 9800,
    },
    {
      merchant: "M005",
      terminal: "T005",
      serial: "SN12346",
      status: "Active",
      date: "2023-12-10",
      transactions: 85,
      amount: 9800,
    },
    {
      merchant: "M006",
      terminal: "T006",
      serial: "SN12346",
      status: "Inactive",
      date: "2023-12-10",
      transactions: 85,
      amount: 9800,
    },
  ]);

export const fetchTodayChartData = () => {
  const data = [];
  for (let hour = 0; hour < 24; hour++) {
    const timeLabel = `${hour.toString().padStart(2, "0")}:00`;
    const success = Math.floor(Math.random() * 20) + 5;
    const failed = Math.floor(Math.random() * 5);
    data.push({
      time: timeLabel,
      success,
      failed,
      successAmount: success * (Math.floor(Math.random() * 100) + 50),
      failedAmount: failed * (Math.floor(Math.random() * 100) + 50),
    });
  }
  return mockApi(data);
};

export const fetchChartData = () => {
  const data = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split("T")[0];

    const success = Math.floor(Math.random() * 100) + 20;
    const failed = Math.floor(Math.random() * 10);

    data.push({
      date: formattedDate,
      success,
      failed,
      successAmount: success * (Math.floor(Math.random() * 100) + 50),
      failedAmount: failed * (Math.floor(Math.random() * 100) + 50),
    });
  }
  return mockApi(data.reverse());
};

export const fetchRecentTransactions = () =>
  mockApi([
    {
      timestamp: "2024-05-01",
      merchantId: "U001",
      refId: "ref01",
      description: "Payment",
      msisdn: "09876545678",
      remarks: "Success",
    },
    {
      timestamp: "2024-05-02",
      merchantId: "U002",
      refId: "ref02",
      description: "Top-up",
      msisdn: "0976545678",
      remarks: "Failed",
    },
    {
      timestamp: "2024-05-02",
      merchantId: "U003",
      refId: "ref03",
      description: "Top-up",
      msisdn: "0976545678",
      remarks: "Pending",
    },
    {
      timestamp: "2024-05-02",
      merchantId: "U004",
      refId: "ref04",
      description: "Top-up",
      msisdn: "0976545678",
      remarks: "Success",
    },
    {
      timestamp: "2024-05-02",
      merchantId: "U005",
      refId: "ref05",
      description: "Top-up",
      msisdn: "0976545678",
      remarks: "Success",
    },
    {
      timestamp: "2024-05-02",
      merchantId: "U006",
      refId: "ref06",
      description: "Top-up",
      msisdn: "0976545678",
      remarks: "Failed",
    },
  ]);

export const fetchTodaySummary = () =>
  mockApi({ total: 120, success: 115, failed: 5 });

export const fetchUserData = () =>
  mockApi({
    name: "John Doe",
    number: "123456789",
    userLevel: "Admin",
    address: "123 Etisalat St., Dubai",
    contactPerson: "Jane Smith",
    activeTerminals: 5,
    inactiveTerminals: 2,
  });
