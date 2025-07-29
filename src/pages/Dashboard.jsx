import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { ArrowDownUp, TrendingUp, DollarSign, Users } from "lucide-react";
import LoadingModal from "../components/Modals/LoadingModal";
import {
  fetchChartData,
  fetchUserData,
  fetchRecentTransactions,
  fetchTerminalData,
  fetchPieData,
  fetchTodayChartData,
} from "../api/dashboard";

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sortKey, setSortKey] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [terminalPage, setTerminalPage] = useState(1);
  const [fullChartData, setFullChartData] = useState([]);
  const [userData, setUserData] = useState({});
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [terminalData, setTerminalData] = useState([]);
  const [selectedRange, setSelectedRange] = useState("7");
  const [todayChartData, setTodayChartData] = useState([]);

  const itemsPerPage = 5,
    terminalsPerPage = 5;
  const totalPages = Math.ceil(recentTransactions.length / itemsPerPage);
  const totalTerminalPages = Math.ceil(terminalData.length / terminalsPerPage);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [chart, user, trans, terms, , , today] = await Promise.all([
        fetchChartData(),
        fetchUserData(),
        fetchRecentTransactions(),
        fetchTerminalData(),
        fetchPieData(),
        fetchPieData(),
        fetchTodayChartData(),
      ]);
      setFullChartData(chart);
      setUserData(user);
      setRecentTransactions(trans);
      setTerminalData(terms);
      setTodayChartData(today);
      setLoading(false);
    }
    load();
  }, []);

  const filteredChart =
    selectedRange === "1"
      ? todayChartData
      : fullChartData.slice(0, parseInt(selectedRange));

  const sortedTransactions = [...recentTransactions].sort((a, b) => {
    if (!sortKey) return 0;
    return (a[sortKey] > b[sortKey] ? 1 : -1) * (sortAsc ? 1 : -1);
  });

  const paginatedRecent = sortedTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const paginatedTerminals = terminalData.slice(
    (terminalPage - 1) * terminalsPerPage,
    terminalPage * terminalsPerPage
  );

  const handleSort = (key) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="px-6 py-8 space-y-8">
      {loading && <LoadingModal />}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <TrendingUp className="mx-auto text-green-500 h-8 w-8 mb-2" />
          <div className="text-gray-600">Total Transactions</div>
          <div className="mt-1 text-3xl font-bold">
            {fullChartData.reduce((acc, d) => acc + d.success + d.failed, 0)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <Users className="mx-auto text-green-500 h-8 w-8 mb-2" />
          <div className="text-gray-600">Total Active Cashiers</div>
          <div className="mt-1 text-3xl font-bold text-green-500">
            {fullChartData.reduce((acc, d) => acc + d.failed, 0)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <DollarSign className="mx-auto text-green-500 h-8 w-8 mb-2" />
          <div className="text-gray-600">Total Amount</div>
          <div className="mt-1 text-3xl font-bold">
            $
            {fullChartData
              .reduce((acc, d) => acc + (d.successAmount || 0), 0)
              .toLocaleString()}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Performance Overview</h2>
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="1">Today</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={filteredChart}>
            <CartesianGrid strokeDasharray="4" />
            <XAxis dataKey={selectedRange === "1" ? "time" : "date"} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="successAmount" stackId="a" fill="#10B981" />
            <Bar dataKey="success" stackId="a" fill="#10B981" />
            <Bar dataKey="failedAmount" stackId="b" fill="#EF4444" />
            <Bar dataKey="failed" stackId="b" fill="#FCA5A5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow overflow-auto">
          <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
          <table className="w-full text-sm table-auto">
            <thead className="bg-green-600 text-white">
              <tr>
                {[
                  "Merchant",
                  "Ref ID",
                  "Time",
                  "Desc",
                  "MSISDN",
                  "Remarks",
                ].map((col, i) => (
                  <th
                    key={i}
                    className="px-3 py-2 cursor-pointer"
                    onClick={() =>
                      handleSort(Object.keys(recentTransactions[0] || {})[i])
                    }
                  >
                    <div className="flex items-center justify-center gap-1">
                      {col}
                      <ArrowDownUp size={16} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
           <tbody className="divide-y">
            {paginatedRecent.map((tx) => (
              <tr key={tx.refId || `${tx.merchantId}-${tx.timestamp}`}>
                <td className="px-3 py-2">{tx.merchantId}</td>
                <td className="px-3 py-2">{tx.refId}</td>
                <td className="px-3 py-2">{tx.timestamp}</td>
                <td className="px-3 py-2">{tx.description}</td>
                <td className="px-3 py-2">{tx.msisdn}</td>
                <td className="px-3 py-2">{tx.remarks}</td>
              </tr>
            ))}
          </tbody>
          </table>
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 rounded ${
                    page === pageNum ? "bg-green-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow overflow-auto">
          <h3 className="text-lg font-bold mb-4">Terminal Data</h3>
          <table className="w-full text-sm table-auto">
            <thead className="bg-green-600 text-white">
              <tr>
                {[
                  "Merchant",
                  "Terminal",
                  "Serial",
                  "Status",
                  "Date",
                  "Tx",
                  "Amount",
                ].map((col, i) => (
                  <th key={i} className="px-3 py-2 capitalize">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedTerminals.map((t) => (
                <tr key={t.serial || `${t.merchant}-${t.terminal}`}>
                  <td className="px-3 py-2">{t.merchant}</td>
                  <td className="px-3 py-2">{t.terminal}</td>
                  <td className="px-3 py-2">{t.serial}</td>
                  <td className="px-3 py-2">{t.status}</td>
                  <td className="px-3 py-2">{t.date}</td>
                  <td className="px-3 py-2">{t.transactions}</td>
                  <td className="px-3 py-2">${t.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: totalTerminalPages }, (_, i) => {
              const terminalPageNum = i + 1;
              return (
                <button
                  key={`terminal-page-${terminalPageNum}`}
                  onClick={() => setTerminalPage(terminalPageNum)}
                  className={`px-3 py-1 rounded ${
                    terminalPage === terminalPageNum
                      ? "bg-green-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {terminalPageNum}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <h3 className="text-lg font-bold">Notifications</h3>
          <ul className="text-gray-700 text-sm list-disc list-inside space-y-2">
            <li>🔔 Terminal T001 was activated.</li>
            <li>⚠️ Terminal T005 suspended.</li>
            <li>ℹ️ Firmware update available for SN12350.</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow space-y-3">
          <h3 className="text-lg font-bold">Account Summary</h3>
          {Object.entries(userData).map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="capitalize text-gray-600">
                {k.replace(/([A-Z])/g, " $1")}:
              </span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-xl w-full relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h4 className="text-lg font-semibold mb-4">
              {selectedRange}-Day Overview
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredChart}>
                <CartesianGrid strokeDasharray="4" />
                <XAxis dataKey={selectedRange === "1" ? "time" : "date"} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="success" fill="#10B981" />
                <Bar dataKey="failed" fill="#EF4444" />
                <Bar dataKey="amount" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
