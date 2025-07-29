import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CircleUser, Globe } from "lucide-react";
import ChangePasswordModal from "../Modals/changePasswordModal";
import { useTranslation } from "react-i18next";
import { useAuth } from "../Auth/useAuth";
import { verifyLogout } from "../../api/logout";
import { toast, ToastContainer } from "react-toastify";
import PropTypes from "prop-types";

const Topbar = ({
  handleMouseEnter,
  handleMouseLeave,
  userslevel,
  hoveredIcon,
  username,
  lastLogin,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [disableHover, setDisableHover] = useState(false);

  const dropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();

  // Toggle profile dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle language dropdown
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  // Handle language change
  const changeLanguage = (language) => {
    i18n.changeLanguage(language); // Update language globally
    localStorage.setItem("lang", JSON.stringify({ language: `${language}` }));
    setIsLanguageDropdownOpen(false); // Close dropdown after selection
  };

  // Handle clicks inside language dropdown
  const handleClickInsideLanguageDropdown = (event) => {
    event.stopPropagation();
  };

  // Dropdown closing state handler
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (
      languageDropdownRef.current &&
      !languageDropdownRef.current.contains(event.target)
    ) {
      setIsLanguageDropdownOpen(false);
    }
  };

  // Event Listener to detect clicks outside dropdowns
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      const result = await verifyLogout();

      if (result.success || result.logout) {
        logout();
        navigate("/login");
      } else {
        toast.error("Error: " + result.message);
      }
    } catch (err) {
      toast.error("Error: " + err);
    }
  };

  // Handle change password modal close
  const handleCloseChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
    setDisableHover(null);
  };

  return (
    <div className="ml-auto flex items-center space-x-2 text-lg">
      <ToastContainer />
      <div
        className="cursor-default relative"
        onMouseEnter={() => {
          if (!isChangePasswordModalOpen && !disableHover) {
            handleMouseEnter("user");
          }
        }}
        onMouseLeave={() => {
          if (!isChangePasswordModalOpen && !disableHover) {
            handleMouseLeave();
          }
        }}
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        <CircleUser
          size={34}
          color={
            disableHover || isChangePasswordModalOpen
              ? "#F2F2F2"
              : hoveredIcon === "user" || isDropdownOpen
              ? "#A0C878"
              : "#F2F2F2"
          }
        />

        {isDropdownOpen && (
          <div className="absolute -right-10 mt-2 w-64 bg-[#237C55] text-black shadow-lg rounded-tl-lg rounded-bl-3xl z-50">
            <div className="p-4">
              <p className="font-bold text-white text-lg">{username}</p>
              <p className="font-bold text-white text-base">{userslevel}</p>
              <p className="text-sm text-white">
                {t("last_login")}: {lastLogin}
              </p>

              <button
                onClick={() => {
                  setIsChangePasswordModalOpen(true);
                  handleMouseLeave();
                }}
                className="block mt-6 text-white hover:text-[#A0C878]"
              >
                {t("change_password")}
              </button>
              <button
                onClick={handleLogout}
                className="block text-white hover:text-[#A0C878]"
              >
                {t("logout")}
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        className="cursor-pointer relative"
        onMouseEnter={() => handleMouseEnter("globe")}
        onMouseLeave={handleMouseLeave}
        onClick={toggleLanguageDropdown}
        ref={languageDropdownRef}
      >
        <Globe
          size={34}
          color={
            hoveredIcon === "globe" || isLanguageDropdownOpen
              ? "#A0C878"
              : "#F2F2F2"
          }
        />
        {isLanguageDropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-[#237C55] text-black shadow-lg rounded-tl-lg rounded-bl-3xl"
            onClick={handleClickInsideLanguageDropdown}
          >
            <div className="p-4">
              <button
                onClick={() => {
                  changeLanguage("en");
                  handleMouseLeave();
                }}
                className="block mt-2 w-full text-left px-4 text-white hover:text-[#A0C878]"
              >
                English
              </button>
              <button
                onClick={() => {
                  changeLanguage("fr");
                  handleMouseLeave();
                }}
                className="block mt-2 w-full text-left px-4 text-white hover:text-[#A0C878]"
              >
                Français
              </button>
            </div>
          </div>
        )}
      </div>
      {isChangePasswordModalOpen && (
        <ChangePasswordModal handleClose={handleCloseChangePasswordModal} />
      )}
    </div>
  );
};

Topbar.propTypes = {
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  userslevel: PropTypes.string.isRequired,
  hoveredIcon: PropTypes.string,
  username: PropTypes.string.isRequired,
  lastLogin: PropTypes.string.isRequired,
};

export default Topbar;
