import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/Auth/authContext"; // Correct import path
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import SearchSubscriber from "./pages/AccountManagement/searchSubscriber";
import ViewWebUsers from "./pages/WebUsers/viewWebUsers";
import DeviceManagement from "./pages/AccountManagement/deviceManagement";
import RegisterNewUsers from "./pages/WebUsers/registerNewUser";
import ManageUserLevel from "./pages/WebUsers/manageUserLevel";
import RolesConfiguration from "./pages/WebUsers/rolesConfiguration";
import AuditTrail from "./pages/AuditTrail/auditTrail";

import TransactionHistory from "./pages/Reports/transactionHistory";
import SalesReport from "./pages/Reports/salesReport";
import AccountSummary from "./pages/Reports/accountSummary";
import CashReport from "./pages/Reports/cashReport";
import ForeignCashSummaryReport from "./pages/Reports/foreignCashSummaryReport";
import CashierSummaryReport from "./pages/Reports/cashierSummaryReport";
import UpsAwbReport from "./pages/Reports/upsAwbReport";
import AramexEidReport from "./pages/Reports/aramexEidReport";
import CardSuccessReport from "./pages/Reports/cardSuccessReport";
import CardFailReport from "./pages/Reports/cardFailReport";
import PrivateRoute from "./components/Auth/PrivateRoute";
import "./i18n";
import Layout from "./components/Layout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <Router basename="/spos-merchant">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        {/* Account Management */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <Dashboard />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/devicemanagement"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <DeviceManagement />
                </Layout>
              }
            />
          }
        />
        {/* <Route
            path="/account/register"
            element={<PrivateRoute element={<Layout username="John Doe"><RegisterSubscriber /></Layout>} />}
          /> */}
        <Route
          path="/account/search"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <SearchSubscriber />
                </Layout>
              }
            />
          }
        />
        {/* Web Users */}
        <Route
          path="/web-users/view-web-users"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <ViewWebUsers />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/web-users/register-new-user"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <RegisterNewUsers />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/web-users/manage-user-level"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <ManageUserLevel />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/web-users/roles-configuration"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <RolesConfiguration />
                </Layout>
              }
            />
          }
        />
        {/* Funds */}
        {/* Reports */}
        {/* <Route
            path="/reports/request-reports"
            element={<PrivateRoute element={<Layout username="John Doe"><RequestReports /></Layout>} />}
          /> */}
        <Route
          path="/reports/transaction-history"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <TransactionHistory />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/reports/sales-report"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <SalesReport />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/reports/account-summary"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <AccountSummary />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/reports/cash-report"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <CashReport />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/reports/foreign-cash-summary-report"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <ForeignCashSummaryReport />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/reports/card-success-report"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <CardSuccessReport />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/reports/card-fail-report"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <CardFailReport />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/reports/cashier-summary-report"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <CashierSummaryReport />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/reports/ups-awb-report"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <UpsAwbReport />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/reports/aramex-eid-report"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <AramexEidReport />
                </Layout>
              }
            />
          }
        />
        {/* Audit Trail */}
        <Route
          path="/audit-trail"
          element={
            <PrivateRoute
              element={
                <Layout username="John Doe">
                  <AuditTrail />
                </Layout>
              }
            />
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
  // </React.StrictMode>
);
