import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FcHome,
  FcSmartphoneTablet,
  FcBusinessman,
  FcFile,
  FcClock,
  FcMenu,
} from "react-icons/fc";
import { ChevronDown, ChevronUp, ChevronLeft } from "lucide-react";
import { cn } from "../../lib/utils";
import logo from "../../assets/logo-new.png";
import PropTypes from "prop-types";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const stored = JSON.parse(localStorage.getItem("userData"));
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(
    () => localStorage.getItem("expandedItem") || ""
  );

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleItem = (id, hasSubs) => {
    if (!isOpen) return setIsOpen(true);
    if (!hasSubs) return;
    const next = expandedItem === id ? "" : id;
    setExpandedItem(next);
    localStorage.setItem("expandedItem", next);
  };

  const menuItems = [
    { id: "dashboard", title: "Dashboard", icon: FcHome, path: "/dashboard" },
    {
      id: "devicemanagement",
      title: "Device Management",
      icon: FcSmartphoneTablet,
      path: "/devicemanagement",
    },
    {
      id: "webUsers",
      title: t("web_users"),
      icon: FcBusinessman,
      subItems: [
        stored.modules?.includes("USERS.SEARCHUSER") && {
          title: t("view_web_users"),
          path: "/web-users/view-web-users",
        },
        stored.modules?.includes("USERS.REGISTER") && {
          title: t("register_new_user"),
          path: "/web-users/register-new-user",
        },
        stored.modules?.includes("USERS.NEWUSERSLEVEL") && {
          title: t("manage_user_levels"),
          path: "/web-users/manage-user-level",
        },
        stored.modules?.includes("USERS.UPDATEROLES") && {
          title: t("roles_configuration"),
          path: "/web-users/roles-configuration",
        },
      ].filter(Boolean),
    },
    {
      id: "reports",
      title: t("reports"),
      icon: FcFile,
      subItems: [
        {
          title: t("transaction_history"),
          path: "/reports/transaction-history",
        },
        { title: t("sales_report"), path: "/reports/sales-report" },
        { title: t("account_summary"), path: "/reports/account-summary" },
        { title: t("cash_report"), path: "/reports/cash-report" },
        {
          title: t("foreign_cash_summary_report"),
          path: "/reports/foreign-cash-summary-report",
        },
        {
          title: t("card_success_report"),
          path: "/reports/card-success-report",
        },
        { title: t("card_fail_report"), path: "/reports/card-fail-report" },
        {
          title: t("cashier_summary_report"),
          path: "/reports/cashier-summary-report",
        },
        { title: t("ups_awb_report"), path: "/reports/ups-awb-report" },
        { title: t("aramex_eid_report"), path: "/reports/aramex-eid-report" },
      ],
    },
    {
      id: "audit",
      title: t("audit_trail"),
      icon: FcClock,
      subItems: [{ title: t("audit_trail"), path: "/audit-trail" }],
    },
  ];

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow"
        >
          <FcMenu size={24} />
        </button>
      )}

      <div
        className={cn(
          "bg-white h-screen transition-all duration-300 z-40 rounded-tr-2xl rounded-br-2xl fixed xl:static",
          isOpen ? "w-72 left-0" : "hidden"
        )}
      >
        {isOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-4 p-2 rounded-full shadow"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {isOpen && (
          <Link to="/dashboard">
            <div className="flex justify-center items-center h-20">
              <img src={logo} alt="Logo" className="h-12" />
            </div>
          </Link>
        )}

        <nav className="px-2 mt-4">
          {menuItems.map(({ id, title, icon: Icon, path, subItems = [] }) => {
            const hasSubs = subItems.length > 0;
            const expanded = expandedItem === id;

            return (
              <div key={id} className="mb-1">
                {path && !hasSubs ? (
                  <Link
                    to={path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-green-500 hover:text-white transition",
                      location.pathname === path
                        ? "bg-green-500 text-white"
                        : ""
                    )}
                    onClick={() =>
                      !window.matchMedia("(min-width:1280px)").matches &&
                      setIsOpen(false)
                    }
                  >
                    <Icon size={20} />
                    <span className="ml-3">{title}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleItem(id, hasSubs)}
                    className={cn(
                      "w-full flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-green-500 hover:text-white transition",
                      expanded ? "bg-gray-100" : ""
                    )}
                  >
                    <Icon size={20} />
                    <span className="ml-3 flex-1">{title}</span>
                    {hasSubs &&
                      (expanded ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </button>
                )}

                {isOpen && expanded && hasSubs && (
                  <div className="ml-9 mt-1 space-y-1">
                    {subItems.map(({ title: st, path: sp }) => (
                      <Link
                        key={sp}
                        to={sp}
                        onClick={() =>
                          !window.matchMedia("(min-width:1280px)").matches &&
                          setIsOpen(false)
                        }
                        className={cn(
                          "block py-2 px-3 text-sm text-gray-600 hover:bg-green-500 hover:text-white rounded-md transition",
                          location.pathname === sp
                            ? "bg-green-500 text-white"
                            : ""
                        )}
                      >
                        {st}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-0 xl:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;
